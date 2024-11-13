import Resolver from '@forge/resolver';
import api from '@forge/api';
//import { run } from '..';

// Resolver function to handle fetching Jira projects
const resolver = new Resolver();

// Define resolver for fetching Jira projects
// resolver.define('getProjects', async (req) => {
//   try {
//     const response = await requestJira('/rest/api/3/project');
//     const projects = await response.json();
//     return projects; // Send the list of projects back to the frontend
//   } catch (error) {
//     console.error('Error fetching projects:', error);
//     return { error: 'Failed to fetch projects' };
//   }
// });
const fetchProjects = async () => {
  try {
    const response = await api.asApp().requestJira('/rest/api/3/search');
    const projects = await response.json();
    console.log('Inside fetchProjects');
    console.log(projects);
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
};

export const run = fetchProjects;

export const handler = resolver.getDefinitions();