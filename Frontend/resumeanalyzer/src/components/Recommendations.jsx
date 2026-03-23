import React, { useState, useEffect } from "react";
import API from "../services/api";
import { useLocation } from "react-router-dom";

function Recommendations({ skills }){

const [allJobs, setAllJobs] = useState([]);
const [recommendedJobs, setRecommendedJobs] = useState([]);
const location = useLocation();
const skillsFromRouter = location.state?.skills || [];
const activeSkills = skills?.length ? skills : skillsFromRouter;

useEffect(() => {
  fetchJobs();
}, []);

useEffect(() => {
  if (activeSkills && activeSkills.length > 0) {
    // Filter jobs based on matching skills
    const recommended = allJobs.filter(job => {
      if (!job.requiredSkills) return false;
      const jobSkills = job.requiredSkills.toLowerCase().split(',').map(s => s.trim());
      return activeSkills.some(skill => 
        jobSkills.some(jobSkill => jobSkill.includes(skill.toLowerCase()))
      );
    });
    setRecommendedJobs(recommended);
  } else {
    setRecommendedJobs([]);
  }
}, [activeSkills, allJobs]);

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
        setAllJobs(res.data);
      } else {
        setAllJobs(MOCK_JOBS);
      }
    } catch (error) {
      console.log('Backend unavailable, using mock jobs for preview.');
      setAllJobs(MOCK_JOBS);
    }
  };

return(

<div className="card glass-panel">
  <div className="card-icon">⭐</div>
  <h2>Recommended Opportunities</h2>

  {activeSkills && activeSkills.length > 0 ? (
    <div>
      <div className="tag-container">
        <p style={{width: '100%', color: 'var(--text-muted)', fontWeight: '500', marginBottom: '4px'}}>
          Your Skills:
        </p>
        {activeSkills.map((skill, index) => (
          <span key={index} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>

      {recommendedJobs && recommendedJobs.length > 0 ? (
        <div>
          <p style={{color: 'var(--text-main)', fontWeight: '500', marginBottom: '12px'}}>
            {recommendedJobs.length} {recommendedJobs.length === 1 ? 'opportunity' : 'opportunities'} matching your skills:
          </p>
          <div className="job-list">
            {recommendedJobs.map(job => (
              <div key={job.id} className="job-item featured">
                <h3>⭐ {job.title} at {job.company || 'Top Tier Firm'}</h3>
                <p style={{ color: 'var(--accent-primary)', fontWeight: 'bold', marginBottom: '8px' }}>💰 Package: {job.package || 'Highly Competitive'}</p>
                <p><strong>Required Skills:</strong> {job.requiredSkills}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="empty-state">
          No matching opportunities found at the moment.
        </p>
      )}
    </div>
  ) : (
    <p className="empty-state" style={{color: 'var(--accent-primary)'}}>
      Upload your resume to see personalized job recommendations based on your skills and experience.
    </p>
  )}
</div>

);

}

export default Recommendations;