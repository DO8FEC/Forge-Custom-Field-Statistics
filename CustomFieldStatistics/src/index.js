import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';

const resolver = new Resolver();

resolver.define('getProjects', async () => {
  const response = await api.asApp().requestJira(route`/rest/api/3/project/search`);
  const data = await response.json();

  return data.values.map((project) => ({
    label: project.name,
    value: project.id,
    key: project.key,
  }));
});

resolver.define('getServerInfo', async () => {
  const response = await api.asApp().requestJira(route`/rest/api/3/serverInfo`);
  const serverInfo = await response.json();
  return { baseUrl: serverInfo.baseUrl };
});

resolver.define('getCustomFields', async ({ payload }) => {
  const { projectKey } = payload;

  const metaRes = await api.asApp().requestJira(route`/rest/api/3/issue/createmeta?projectKeys=${projectKey}&expand=projects.issuetypes.fields`);
  const metaData = await metaRes.json();

  const customFields = metaData.projects[0].issuetypes
    .flatMap((issuetype) => Object.values(issuetype.fields))
    .filter((field) => field.schema && field.schema.custom)
    .map((field) => ({
      id: field.key,
      name: field.name,
    }));

  return customFields;
});

resolver.define('getFieldStatistics', async ({ payload }) => {
  const { projectKey } = payload;

  // Fetch base URL
  const serverInfoRes = await api.asApp().requestJira(route`/rest/api/3/serverInfo`);
  const serverInfo = await serverInfoRes.json();
  const baseUrl = serverInfo.baseUrl;

  // Fetch custom fields
  const metaRes = await api.asApp().requestJira(route`/rest/api/3/issue/createmeta?projectKeys=${projectKey}&expand=projects.issuetypes.fields`);
  const metaData = await metaRes.json();

  const customFields = metaData.projects[0].issuetypes
    .flatMap((issuetype) => Object.values(issuetype.fields))
    .filter(
      (field) =>
        field.schema &&
        field.schema.custom &&
        !["Team", "Flagged", "Development", "Rank", "Design", "Vulnerability", "Start date", "Issue color"].includes(
          field.name
        )
    )
    .map((field) => ({
      id: field.key,
      name: field.name,
    }));

  // Fetch issues
  const issueRes = await api.asApp().requestJira(route`/rest/api/3/search?jql=project=${projectKey}&fields=*all&maxResults=1000`);
  const issueData = await issueRes.json();

  const issues = issueData.issues;

  // Calculate statistics
  const statistics = customFields.map((field) => {
    const totalIssues = issues.length;

    // Filter issues where the field is empty
    const emptyIssues = issues.filter((issue) => !issue.fields[field.id]);

    // Construct web links for the issues
    const issueLinks = emptyIssues.map((issue) => ({
      id: issue.id,
      key: issue.key,
      summary: issue.fields.summary,
      url: `${baseUrl}/browse/${issue.key}`, // Construct the link dynamically
    }));

    const emptyValueRate = totalIssues ? ((emptyIssues.length / totalIssues) * 100).toFixed(2) : '0';

    return {
      name: field.name,
      id: field.id,
      emptyValueRate,
      emptyValueIssues: emptyIssues.length, // Count of issues with empty values
      issueLinks, // Array of links for issues with empty values
    };
  });

  return statistics;
});

export const handler = resolver.getDefinitions();
