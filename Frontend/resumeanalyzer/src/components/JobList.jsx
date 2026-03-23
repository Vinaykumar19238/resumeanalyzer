import React, { useState, useEffect } from "react";
import API from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";

function JobList({ filterSkills }) {

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [matchingJobs, setMatchingJobs] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const skillsFromResume = location.state?.skills || [];

  const activeSkills = filterSkills?.length ? filterSkills : skillsFromResume;

  useEffect(() => {

    fetchJobs();

  }, []);

  useEffect(() => {
    if (activeSkills && activeSkills.length > 0) {
      // Filter jobs based on matching skills
      const filtered = jobs.filter(job => {
        if (!job.requiredSkills) return false;
        const jobSkills = job.requiredSkills.toLowerCase().split(',').map(s => s.trim());
        return activeSkills.some(skill =>
          jobSkills.some(jobSkill => jobSkill.includes(skill.toLowerCase()))
        );
      });
      setMatchingJobs(filtered);
      setFilteredJobs(filtered);
    } else {
      setMatchingJobs([]);
      setFilteredJobs(jobs);
    }
  }, [activeSkills, jobs]);

  const MOCK_JOBS = [
    { id: 1, title: 'Frontend Developer', company: 'Google', package: '$120,000 - $150,000', requiredSkills: 'JavaScript, React, HTML, CSS' },
    { id: 2, title: 'Backend Engineer', company: 'Amazon', package: '$130,000 - $160,000', requiredSkills: 'Node.js, Express, MongoDB, Python' },
    { id: 3, title: 'Full Stack Developer', company: 'Netflix', package: '$140,000 - $180,000', requiredSkills: 'React, Node.js, PostgreSQL, Docker' },
    { id: 4, title: 'Cloud Architect', company: 'Microsoft', package: '$150,000 - $190,000', requiredSkills: 'AWS, Docker, Kubernetes, Terraform' },
    { id: 5, title: 'Data Scientist', company: 'Meta', package: '$135,000 - $170,000', requiredSkills: 'Python, Machine Learning, SQL, Pandas' },
    { id: 6, title: 'UI/UX Designer', company: 'Apple', package: '$110,000 - $140,000', requiredSkills: 'Figma, HTML, CSS, Tailwind' }
  ];

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs", { timeout: 1000 });
      if (res.data && res.data.length > 0) {
        setJobs(res.data);
      } else {
        setJobs(MOCK_JOBS);
      }
    } catch (err) {
      console.log('Backend unavailable, using mock jobs for preview.');
      setJobs(MOCK_JOBS);
    }
  };

  return (

    <div className="card glass-panel">
      <div className="card-icon">💼</div>
      <h2>{activeSkills && activeSkills.length > 0 ? 'Matching Jobs' : 'All Available Jobs'}</h2>

      <div className="job-list">
        {filteredJobs && filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <div key={job.id} className={`job-item ${activeSkills && activeSkills.length > 0 ? 'match' : ''}`}>
              <h3>💼 {job.title} at {job.company || 'Tech Corp'}</h3>
              <p style={{ color: 'var(--accent-primary)', fontWeight: 'bold', marginBottom: '8px' }}>💰 Package: {job.package || 'Competitive'}</p>
              <p><strong>Required Skills:</strong> {job.requiredSkills}</p>
              {activeSkills && activeSkills.length > 0 && (
                <span className="match-text">✓ Matches your skills</span>
              )}
            </div>
          ))
        ) : (
          <p className="empty-state">
            {filterSkills && filterSkills.length > 0 ? 'No matching jobs found.' : 'No jobs available at the moment.'}
          </p>
        )}
      </div>

    </div>

  );

}

export default JobList;