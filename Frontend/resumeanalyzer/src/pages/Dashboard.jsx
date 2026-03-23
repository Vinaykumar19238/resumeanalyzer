import React, { useState } from "react";
import ResumeUpload from "../components/ResumeUpload";
import JobList from "../components/JobList";
import Recommendations from "../components/Recommendations";

function Dashboard() {

  const [extractedSkills, setExtractedSkills] = useState([]);
  const username = localStorage.getItem('username') || 'Guest';

  const handleSkillsExtracted = (skills) => {
    setExtractedSkills(skills);
  };

  return (

    <div className="dashboard">
      <h1>Welcome , {username}!</h1>

      <div className="dashboard-content">
        <ResumeUpload onSkillsExtracted={handleSkillsExtracted} />
        {extractedSkills && extractedSkills.length > 0 && (
          <>
            <JobList filterSkills={extractedSkills} />
            <Recommendations skills={extractedSkills} />
          </>
        )}
      </div>
    </div>

  );

}

export default Dashboard;