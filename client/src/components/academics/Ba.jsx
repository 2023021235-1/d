import React from 'react';
import { BookOpen, Users, Award } from 'lucide-react';
import './styles/BA.css';

const BA = () => {
  return (
    <section className="ba-wrapper">
      <div className="ba-header">
        <h1>Bachelor of Arts (B.A.)</h1>
      </div>
      <div className="ba-card">
        <div className='Bainfo'>
          Explore a diverse range of disciplines designed to foster critical thinking,
          cultural literacy, and academic excellence.
        </div>
        <div className="ba-stats">
          <div className="ba-stat-item">
            <BookOpen size={28} />
            <span><strong>10</strong> Major Disciplines</span>
          </div>
          <div className="ba-stat-item">
            <Users size={28} />
            <span><strong>Merit-based</strong> Admission</span>
          </div>
          <div className="ba-stat-item">
            <Award size={28} />
            <span><strong>University Approved</strong> Capacity</span>
          </div>
        </div>

        <h2>Available Subject Groups</h2>
        <ul className="ba-subject-grid">
          <li>Hindi</li>
          <li>English</li>
          <li>Sanskrit</li>
          <li>History</li>
          <li>Political Science</li>
          <li>Sociology</li>
          <li>Economics</li>
          <li>Education</li>
          <li>Psychology</li>
          <li>Geography</li>
        </ul>

        <p>
          Admission is based on <strong>university-approved intake</strong>, evaluated through
          <strong> merit</strong> and <strong>seat availability</strong>. All programs are
          supervised by a highly qualified faculty with a focus on academic rigor.
        </p>
      </div>
    </section>
  );
};

export default BA;
