import React, { useEffect, useState } from 'react';
import { invoke, router } from '@forge/bridge';

function Modal({ isOpen, onClose, issues }) {
  if (!isOpen) return null;

  const handleIssueClick = async (issueKey) => {
    try {
      const issueUrl = `/browse/${issueKey}`;
      await router.open(issueUrl);
    } catch (error) {
      console.error('Failed to navigate to the issue:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Issues List</h3>
        <ul>
          {issues.map((issue) => (
            <li key={issue.id}>
              <button
                onClick={() => handleIssueClick(issue.key)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#5271ff',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: '18px',
                }}
              >
                {issue.key} - {issue.summary}
              </button>
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [fieldStatistics, setFieldStatistics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [issueList, setIssueList] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectList = await invoke('getProjects');
        setProjects(projectList);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to fetch projects.');
      }
    };

    fetchProjects();
  }, []);

  const handleProjectChange = async (event) => {
    const selectedValue = event.target.value;
    const project = projects.find((p) => p.value === selectedValue);
    setSelectedProject(project);

    if (project) {
      setLoading(true);
      try {
        const statistics = await invoke('getFieldStatistics', { projectKey: project.key });
        setFieldStatistics(statistics);
      } catch (err) {
        console.error('Error fetching field statistics:', err);
        setError('Failed to fetch field statistics.');
      } finally {
        setLoading(false);
      }
    }
  };

  const openModalWithIssues = (issueLinks) => {
    setIssueList(issueLinks);
    setModalOpen(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <select onChange={handleProjectChange}>
        <option value="">Select a project</option>
        {projects.map((project) => (
          <option key={project.value} value={project.value}>
            {project.label}
          </option>
        ))}
      </select>

      {selectedProject && fieldStatistics.length > 0 && (
        <div className="custom-fields-table">
          <h2>{selectedProject.label}</h2>
          <table>
            <thead>
              <tr className="colum-titles">
                <th>Name</th>
                <th>Empty Value Rate</th>
                <th>Empty Value Issues</th>
              </tr>
            </thead>
            <tbody>
              {fieldStatistics.map((stat) => (
                <tr key={stat.id}>
                  <td className="custom-fields-name">{stat.name}</td>
                  <td>
                    <div className="empty-value-rate-container">
                      <div
                        style={{
                          width: `${stat.emptyValueRate || 0}%`,
                          backgroundColor: '#41b8d5',
                          borderRadius: '30px',
                        }}
                      ></div>
                      <span className="empty-rate-value-percentage">{stat.emptyValueRate || 0}%</span>
                    </div>
                  </td>
                  <td>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        openModalWithIssues(stat.issueLinks);
                      }}
                      className="number-of-issues"
                    >
                      {stat.emptyValueIssues} issues
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} issues={issueList} />
    </div>
  );
}

export default App;
