import React from "react";

function AdminPage() {

  const recentCandidates = [
    { id: 1, name: 'Alice Johnson', job: 'Frontend Developer', match: 92, status: 'Interviewing' },
    { id: 2, name: 'Bob Smith', job: 'Backend Engineer', match: 85, status: 'Under Review' },
    { id: 3, name: 'Charlie Davis', job: 'Data Scientist', match: 40, status: 'Rejected' },
    { id: 4, name: 'Diana Prince', job: 'Cloud Architect', match: 98, status: 'Offer Extended' },
    { id: 5, name: 'Evan Wright', job: 'UI/UX Designer', match: 76, status: 'Under Review' }
  ];

  const getMatchColor = (score) => {
    if (score >= 90) return '#4ade80'; // Green
    if (score >= 70) return '#facc15'; // Yellow
    return '#f87171'; // Red
  };

  return (
    <div className="dashboard" style={{ maxWidth: '1200px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Admin Dashboard</h1>
        <button style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>+ Post New Job</button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="card glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '0.5rem' }}>Total Candidates</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>1,284</div>
          <p style={{ color: '#4ade80', fontSize: '0.85rem', marginTop: '0.5rem' }}>↑ 12% this week</p>
        </div>
        <div className="card glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '0.5rem' }}>Active Job Postings</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>24</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Across 3 departments</p>
        </div>
        <div className="card glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '0.5rem' }}>Avg. Match Rate</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>68%</div>
          <p style={{ color: '#4ade80', fontSize: '0.85rem', marginTop: '0.5rem' }}>↑ 5% improvement</p>
        </div>
      </div>

      {/* Candidate Tracking Table */}
      <div className="card glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ margin: 0 }}>Applicant Tracking System</h2>
          <input 
            type="text" 
            placeholder="Search candidates..." 
            style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', width: '250px' }}
          />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '500' }}>Candidate Name</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '500' }}>Applied Role</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '500' }}>Match Score</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '500' }}>Status</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '500' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentCandidates.map((candidate) => (
                <tr key={candidate.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1rem', fontWeight: '500' }}>{candidate.name}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{candidate.job}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontWeight: 'bold', color: getMatchColor(candidate.match) }}>{candidate.match}%</span>
                      <div style={{ width: '80px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${candidate.match}%`, height: '100%', background: getMatchColor(candidate.match) }}></div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '12px', 
                      fontSize: '0.85rem',
                      background: candidate.status === 'Offer Extended' ? 'rgba(74, 222, 128, 0.2)' : 
                                  candidate.status === 'Rejected' ? 'rgba(248, 113, 113, 0.2)' : 'rgba(139, 92, 246, 0.2)',
                      color: candidate.status === 'Offer Extended' ? '#4ade80' : 
                             candidate.status === 'Rejected' ? '#f87171' : 'var(--accent-primary)'
                    }}>
                      {candidate.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <button style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', background: 'transparent', border: '1px solid var(--accent-primary)' }}>Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
}

export default AdminPage;