import ForgeUI, { render, Fragment, Select, Option, Form, useState } from '@forge/ui';
import api, { route } from "@forge/api";

const App = () => {
  const [projects] = useState(async () => {
    const res = await api.asApp().requestJira(route`/rest/api/3/project/search`);
    const data = await res.json();
    return data.values.map((project) => ({
      label: project.name,
      value: project.id,
    }));
  });

  return (
    <Form onSubmit={data => console.log('Selected projects:', data.projects)}>
      <Select label="Select projects" isMulti name="projects">
        {projects.map((project) => (
          <Option label={project.label} value={project.value} />
        ))}
      </Select>
    </Form>
  );
};

export const run = render(<App />);