import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import HeroSection from './components/landing_page/HeroSection';
import Footer from './components/Footer';
import Login from './components/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import ViewNews from './components/admin/ViewNews';
import FacultyDashboard from './components/faculty/FacultyDashboard';
import Navbar from './components/Navbar';
import ContactUs from './components/contact-us/ContactUs';
import History from './components/about-us/History';
import VisionMission from './components/about-us/Vision';
import CodeOfConduct from './components/about-us/CodeofConduct';
import AdmissionProcedure from './components/admissions/AdmissionProcedure';
import BA from './components/academics/Ba';
import BCA from './components/academics/Bca';
import BCOM from './components/academics/Bcom';
import BSC from './components/academics/Bsc';
import MAProgram from './components/academics/Ma';
import FacultyOfArts from './components/academics/FacultyofArts';
import FacultyCardList from './components/admin/Facultylist';
import FacultyList from './components/academics/ViewFaculty';
import FacultyOfScience from './components/academics/FacultyofScience';
import GoverningBody from './components/administration/GoverningBody';
import ManagerMessage from './components/administration/ManagersMsg';
import PrincipalMessage from './components/administration/Prinicipalsmsg';
import Career from './components/administration/Career';
import CommitteeAgainstSexualHarassment from './components/administration/Sexual';
import PractorialBoard from './components/administration/Practorial';
import NonTeachingStaff from './components/administration/NonTeaching';
import GrievanceCell from './components/administration/Grievance';
import LiteraryClub from './components/administration/Literary';
import ResearchInnovation from './components/administration/Research';
import AlumniAssoc from './components/alumini/alumniassoc';
import AlumniReg from './components/alumini/alumnireg';
import CCorner from './components/CCorner';
import Syllabus from './components/syllabus';
import TimeTable from './components/timetable';
import NotAvailable from './components/Na';
import AdmissionForm from './components/Registration';
function App() {
  const[data, setdata] = useState(null);
  const[user, setUser] = useState(null);
  const [visited,setVisited]= useState(0);
  const sampleData = [
  { Type: 'News', Title: 'Admissions Open', Link: 'admission.pdf' },
  { Type: 'News', Title: 'Orientation Scheduled', Link: '' },
];
  return (
    <Router>
      <div className="App">
        <Navbar user={user}/>
        <Routes>
          <Route path="/" element={<HeroSection visited={visited} setVisited={setVisited}/>} />
           <Route path="/login" element={<Login setdata={setdata} setUser={setUser} />} />
            <Route path="/AdminDashboard" element={<AdminDashboard   setUser={setUser}/>} />
             <Route path="/FacultyDashboard" element={<FacultyDashboard data={data} setUser={setUser}/>} />
             
            <Route path="/registration" element={<AdmissionForm />} /> 
            <Route path="/c_corner" element={<CCorner />} />
            <Route path="/syllabus" element={<Syllabus />} />
            <Route path="/timetable" element={<TimeTable />} />


            <Route path="/history" element={<History />} />
            <Route path="/vision" element={<VisionMission />} />
            <Route path="/code-of-conduct" element={<CodeOfConduct />} />

            <Route path="/governing-body" element={<GoverningBody />} />
            <Route path="/managers-message" element={<ManagerMessage />} />
            <Route path="/principals-message" element={<PrincipalMessage />} />
            <Route path="/public-relation-officer-not" element={<BSC />} />
            <Route path="/non-teaching-staff" element={<NonTeachingStaff />} />
            <Route path="/proctorial-board" element={<PractorialBoard />} />
            <Route path="/grievance-cell" element={<GrievanceCell/>} />
            <Route path="/research-innovation" element={<ResearchInnovation />} />
            <Route path="/literary-club" element={<LiteraryClub />} />
            <Route path="/career-counselling" element={<Career />} />
             <Route path="/sexual-harassment-committee" element={<CommitteeAgainstSexualHarassment />} />
            <Route path="/iqac-committee-not" element={<MAProgram />} />


            <Route path="/ba" element={<BA />} />
            <Route path="/bca" element={<BCA />} />
            <Route path="/bcom" element={<BCOM />} />
            <Route path="/bsc" element={<BSC />} />
            <Route path="/ma" element={<MAProgram />} />

            <Route path="/faculty/arts" element={<FacultyOfArts send={sampleData} />} />
            <Route path="/faculty/science" element={<FacultyOfScience send={sampleData} />} />
            <Route path="/arts/viewfaculty" element={<FacultyList factultyType={"Faculty of Arts"}/>} />
            <Route path="/science/viewfaculty" element={<FacultyList  factultyType={"Faculty of Science"}/>} />
           
             <Route path="/alumni-registration" element={<AlumniReg />} />
             <Route path="/alumni-association" element={<AlumniAssoc />} />
             
            
             <Route path="/admission-procedure" element={<AdmissionProcedure />} />
             <Route path="/contact" element={<ContactUs />} />
             
         <Route path="/viewNews" element={<ViewNews />} />
             <Route path="/viewalumni" element={<ViewNews />} />
       
            <Route path="*" element={<NotAvailable />} />


        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
