import React, { useState, useRef } from "react";
import API from "../services/api";
import { extractSkillsFromFile } from "../utils/skillExtractor";
import { useNavigate } from "react-router-dom";

function ResumeUpload({ onSkillsExtracted }) {

  const [file, setFile] = useState(null);
  const [extractedSkills, setExtractedSkills] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFile = (selectedFile) => {
    if (selectedFile) {
      // Check if file is PDF or Word document
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
      } else {
        alert('Please upload a PDF, Word document, or Text file');
      }
    }
  };

  const handleFileChange = (e) => {
    handleFile(e.target.files[0]);
    e.target.value = ''; // Reset input so same file can be selected again
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const uploadResume = async () => {
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      let extractedData = { skills: [] };

      try {
        // Try to send to backend API
        const res = await API.post("/resume/upload", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          timeout: 1000 // Reduced timeout to fail fast and trigger the frontend fallback seamlessly
        });

        if (res.data) {
          setExtractedSkills(res.data.skills.join(', '));

          if (onSkillsExtracted) {
            onSkillsExtracted(res.data.jobs);
          }

          // ✅ Redirect to Job List page
          navigate("/jobs", { state: { jobs: res.data.jobs } });
        }
      } catch (apiError) {
        // If backend fails, use frontend skill extraction
        console.log('Backend processing unavailable, using frontend extraction...');
        const frontendResult = await extractSkillsFromFile(file);

        // Check if there was a message (error or info)
        if (frontendResult.message) {
          console.log('Message:', frontendResult.message);
          if (frontendResult.skills.length === 0) {
            alert(frontendResult.message + '\n\nPlease use a .txt file with your resume content or ensure a backend service is running.');
            throw new Error(frontendResult.message);
          }
        }

        if (frontendResult.skills && frontendResult.skills.length > 0) {
          extractedData.skills = frontendResult.skills;
        } else {
          alert('Could not extract skills from file. Please ensure your resume contains common technical skills like: JavaScript, Python, React, Node.js, Docker, AWS, SQL, etc.');
          throw new Error('No skills extracted');
        }
      }

      if (extractedData.skills && extractedData.skills.length > 0) {
        setExtractedSkills(extractedData.skills.join(', '));
        if (onSkillsExtracted) {
          onSkillsExtracted(extractedData.skills);
        }
        alert(`Resume uploaded successfully! Found ${extractedData.skills.length} skills.`);
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
        // ✅ Redirect to Job List page for fallback frontend extraction
        navigate("/jobs", { state: { skills: extractedData.skills } });
      }
    } catch (error) {
      console.error('Error uploading resume:', error);
      // Error already shown via alert above
    } finally {
      setIsLoading(false);
    }
  };

return (

  <div className="card glass-panel">
    <div className="card-icon">📄</div>
    <h2>Upload Resume</h2>

    <div className="alert-info">
      <strong>💡 Tip:</strong> For best results, use a .txt file with your resume. You can copy your resume content into a text file and upload it here.
    </div>

    <div className="form">
      <label
        className="file-upload-zone"
        htmlFor="resume-upload-input"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          display: 'block',
          borderColor: isDragging ? 'var(--accent-primary)' : 'rgba(139, 92, 246, 0.4)',
          background: isDragging ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.05)'
        }}
      >
        <span className="icon">📁</span>
        <p>Click or drag-and-drop to upload resume</p>
        <input
          id="resume-upload-input"
          type="file"
          ref={fileInputRef}
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <div className="filename">
          {file ? file.name : 'Choose PDF, Word, or Text file'}
        </div>
      </label>

      {extractedSkills && (
        <div className="extracted-skills">
          <strong>Extracted Skills:</strong>
          <p>{extractedSkills}</p>
        </div>
      )}

      <button type="button" onClick={uploadResume} disabled={!file || isLoading}>
        {isLoading ? 'Processing...' : 'Upload Resume'}
      </button>
    </div>
  </div>

);


}

export default ResumeUpload;