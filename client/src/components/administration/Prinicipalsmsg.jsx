import React from 'react';
import './styles/Prinicipalsmsg.css';
import p4 from "../images/p4.webp"

const Prinicipalsmsg = () => {
  return (
    <div className="page_content">
  <h2 className="principal-title">Principal’s Message</h2>

  <div className="principal-message-container">
    <img src={p4} alt="Principal" className="principal-image" />
    
    {/* Text beside image */}
    <div className="principal-text-beside">
      <p>
        “Education helps one to acquire knowledge, culture, righteousness and eradicates evil habits and ignorance” — <em>Dayanand Saraswati</em>
      </p>
      <p>
        Aryan Educational Society established D.A.V.P.G. College Gorakhpur to inculcate values with rational thinking amongst students who are torchbearers of the future society.
      </p>
      <p>
        The institution is committed to nurturing intellectual curiosity, ethical leadership, and a spirit of innovation among its students. It promotes a balanced development of mind and character, encouraging critical thinking, empathy, and social responsibility.
      </p>
    </div>
  </div>

  {/* Text below image */}
  <div className="principal-text-below">
    <p>
      In this era of information technology where all information is available at our fingertips, we at DAVPG College, Gorakhpur emphasise on knowledge-based learning with the help of dedicated and well-qualified teachers. Well-equipped laboratories strengthen the practical learning of concepts.
    </p>
    <p>
      The college gives equal opportunity to each and every student to bring out the best in them. It has all the amenities for the all-round development of students. Sports events are organised to foster grit and stamina, and cultural activities allow them to explore their creativity.
    </p>
    <p>
      Students are encouraged to be part of active units of NCC, NSS, and Rovers and Rangers. These platforms give students opportunities to learn and enhance their life skills.
    </p>
    <p>
      We at DAVPG College, Gorakhpur are here with the mission to provide quality education and holistic development through a team of dedicated teachers, motivated students, and supportive parents.
    </p>
    <div className="principal-signature">Prof. Shail Pande</div>
  </div>
</div>


  
  );
};

export default Prinicipalsmsg;
