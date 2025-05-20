import React from 'react';
import '../admissions/styles/AdmissionProcedure.css';

const AdmissionProcedure = () => {
  return (
    <div className="admission-container">
      <h1 className="admission-title">Admission Procedure</h1>
      <div className="admission-content">

        {/* General Instructions */}
        <section className="admission-section section-light-blue">
          <h2 className="admission-section-title">प्रवेश प्रक्रिया की जानकारी</h2>
          <p className="admission-section-paragraph">
            डी ए वी पी जी कॉलेज गोरखपुर में इस वर्ष स्नातक और परास्नातक प्रवेश प्रक्रिया ऑफलाइन एवं ऑनलाइन द्वारा की जा रही है ।
            ऑनलाइन एडिमशन एप्लीकेशन फॉर्म सत्र 2023-2024 के लिए <strong>Click Here</strong> पर क्लिक करें ।
          </p>
        </section>

        {/* General Procedure */}
        <section className="admission-section section-light-yellow">
          <h2 className="admission-section-title">सामान्य प्रक्रिया</h2>
          <ol className="admission-section-list list-decimal list-inside">
            <li className="admission-section-list-item">कार्यालय काउन्टर से प्रवेश फार्म प्राप्त करना ।</li>
            <li className="admission-section-list-item">प्रवेश फार्म को वांछित समस्त अभिलेखों की छायाप्रति के साथ कार्यालय काउन्टर पर निर्धारित तिथि तक जमा करना ।</li>
            <li className="admission-section-list-item">कार्यालय काउन्टर पर प्रवेश फार्म जमा कर प्रवेश काउंसलिंग की सूचना प्राप्त करना ।</li>
            <li className="admission-section-list-item">निर्धारित काउन्सलिंग तिथि पर स्वयं उपस्थित होकर समस्त मूल अभिलेखों के साथ प्रवेश सुनिश्चित करना ।</li>
            <li className="admission-section-list-item">प्राप्त शुल्क चालान में अंकित तिथि में प्रवेश शुल्क बैंक में जमा करना ।</li>
            <li className="admission-section-list-item">बैंक से प्राप्त मोहर लगी शुल्क चालान को कार्यालय में जमा करना ।</li>
            <li className="admission-section-list-item">लेजर नंबर मिलने के बाद प्रथम सेमेस्टर परीक्षा फार्म भरना ।</li>
            <li className="admission-section-list-item">छात्र प्रति शुल्क रसीद जमा कर पहचान पत्र प्राप्त करना ।</li>
            <li className="admission-section-list-item">छात्र प्रति शुल्क रसीद पुस्तकालय में जमा कर पुस्तकालय कार्ड प्राप्त करना ।</li>
          </ol>
          <p className="important-note admission-section-paragraph">
            <strong>नोट:</strong> सेमेस्टर परीक्षा फार्म न भर पाने वाले छात्र/छात्रा विश्वविद्यालय की परीक्षा से वंचित हो जायेंगे, जिसकी जिम्मेदारी स्वयं उनकी होगी ।
          </p>
        </section>

        {/* Terms and Conditions */}
        <section className="admission-section section-light-pink">
          <h2 className="admission-section-title">Terms & Conditions</h2>
          <p className="admission-section-paragraph">
            Admission in B.A./B.Sc./B.Com / M.A. 1st Semester will be based on Class 12 marks.<br />
            Admission form with brochure can be obtained for ₹450 from the college counter.<br />
            Submit the filled admission form with documents at the college counter and collect a deposit slip.
          </p>

          <strong className="admission-subheading">Documents to be attached with admission form:</strong>
          <ul className="admission-section-list list-disc list-inside">
            <li className="admission-section-list-item">High School Marksheet (photocopy)</li>
            <li className="admission-section-list-item">Intermediate Marksheet (photocopy)</li>
            <li className="admission-section-list-item">Graduation Marksheet & Certificate (photocopy)</li>
            <li className="admission-section-list-item">Caste Certificate (if applicable)</li>
            <li className="admission-section-list-item">Certificates for surcharge/weightage (if applicable)</li>
          </ul>

          <p className="admission-section-paragraph text-red-600">
            <strong>Note –</strong> All attachments must be self-signed.
          </p>

          <strong className="admission-subheading">Documents required at the time of counseling:</strong>
          <ul className="admission-section-list list-disc list-inside">
            <li className="admission-section-list-item">Photocopies of 10th, 12th, and Graduation marksheets & certificates</li>
            <li className="admission-section-list-item">Character Certificate</li>
            <li className="admission-section-list-item">Original Transfer Certificate</li>
            <li className="admission-section-list-item">Original surcharge/weightage certificate (if applicable)</li>
            <li className="admission-section-list-item">Original caste/EWS certificate for reserved categories</li>
            <li className="admission-section-list-item">2 passport size photos</li>
            <li className="admission-section-list-item">Deposit slip of admission form</li>
          </ul>

          <p className="admission-section-paragraph">
            <span>Minimum 40% in 10+2 required for general category; not mandatory for SC/ST/OBC.</span><br />
            <span>Seat reservation: SC - 21%, ST - 2%, OBC - 27%</span><br />
            <span>Failed students can reappear as ex-students.</span><br />
            <span>False information will lead to cancellation of admission and disciplinary action.</span>
          </p>
        </section>

        {/* Weightage Section */}
        <section className="admission-section section-light-green">
          <h2 className="admission-section-title">Permissible Weightage</h2>
          <ul className="admission-section-list list-disc list-inside">
            <li className="admission-section-list-item">3% for Female Students</li>
            <li className="admission-section-list-item">3% for NCC ‘C’ Certificate Holders</li>
            <li className="admission-section-list-item">2% for NCC ‘B’ Certificate Holders</li>
            <li className="admission-section-list-item">3% for National Level Players</li>
            <li className="admission-section-list-item">3% for Physically Handicapped</li>
            <li className="admission-section-list-item">2% for District/State Level Players</li>
            <li className="admission-section-list-item">2% for Dependents of Freedom Fighters/Ex-Soldiers</li>
            <li className="admission-section-list-item">10% for Dependents of College Staff</li>
            <li className="admission-section-list-item">2% for Scout/Guide/NSS Certificate holders</li>
          </ul>
          <p className="admission-section-paragraph">
            <span>No refund if candidate doesn’t meet criteria. Rules may change at Principal’s discretion.</span><br />
            <span>The college reserves the right to reject any application without reason.</span><br />
            <span>A student will be considered bona fide until June 30 of the session.</span><br />
            <span>Misrepresentation or concealment of facts will lead to cancellation of admission.</span>
          </p>
        </section>

        {/* Merit List */}
        <section className="admission-section section-light-purple">
          <h2 className="admission-section-title">Publication of Merit List</h2>
          <p className="admission-section-paragraph">
            Merit list for B.A./B.Sc./B.Com./M.A. 1st Semester will be published within one week after the last date of application submission on the college website.<br />
            It is the applicant’s responsibility to stay informed about admission updates.
          </p>
        </section>

      </div>
    </div>
  );
};

export default AdmissionProcedure;
