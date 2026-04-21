import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Programs from './pages/Programs';
import Admissions from './pages/Admissions';
import Research from './pages/Research';
import Life from './pages/Life';
import ComingSoon from './pages/ComingSoon';
import AboutPage from './pages/AboutPage';
import DeptPage from './pages/DeptPage';
import NoticePage from './pages/NoticePage';
import GalleryPage from './pages/GalleryPage';
import VTourPage from './pages/VTourPage';
import IqacPage from './pages/IqacPage';
import GenericLifePage from './pages/GenericLifePage';
import StandardInfoPage from './pages/StandardInfoPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="programs" element={<Programs />} />
          <Route path="admissions" element={<Admissions />} />
          <Route path="research" element={<Research />} />
          <Route path="life" element={<Life />} />
          <Route path="apply" element={<Admissions />} />
          
          {/* Spotlight & Archive Routes */}
          <Route path="spotlight/archive" element={<ComingSoon />} />
          <Route path="notices/archive" element={<ComingSoon />} />
          
          {/* New Feature Routes */}
          <Route path="about" element={<StandardInfoPage configPath="/config/page-about-config.json" />} />
          <Route path="academics" element={<StandardInfoPage configPath="/config/page-academics-config.json" />} />
          <Route path="facilities" element={<StandardInfoPage configPath="/config/page-facilities-config.json" />} />
          <Route path="placement" element={<StandardInfoPage configPath="/config/page-placement-config.json" />} />
          <Route path="students" element={<StandardInfoPage configPath="/config/page-students-config.json" />} />
          <Route path="departments/:deptId" element={<DeptPage />} />
          <Route path="notices" element={<NoticePage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="vtour" element={<VTourPage />} />
          
          {/* Programs/Iqac style cloned routes */}
          <Route path="iqac" element={<IqacPage configPath="/config/page-iqac-config.json" />} />
          <Route path="naac" element={<IqacPage configPath="/config/page-naac-config.json" />} />
          <Route path="rd" element={<IqacPage configPath="/config/page-rd-config.json" />} />
          <Route path="nba" element={<IqacPage configPath="/config/page-nba-config.json" />} />
          <Route path="moocs" element={<IqacPage configPath="/config/page-moocs-config.json" />} />
          <Route path="nirf" element={<IqacPage configPath="/config/page-nirf-config.json" />} />

          {/* Life style cloned routes */}
          <Route path="uba" element={<GenericLifePage configPath="/config/page-uba-config.json" />} />
          <Route path="iic" element={<GenericLifePage configPath="/config/page-iic-config.json" />} />
          <Route path="idealab" element={<GenericLifePage configPath="/config/page-idealab-config.json" />} />
          <Route path="antiragging" element={<GenericLifePage configPath="/config/page-antiragging-config.json" />} />
          <Route path="silverjubilee" element={<GenericLifePage configPath="/config/page-silverjubilee-config.json" />} />
          <Route path="events" element={<GenericLifePage configPath="/config/page-events-config.json" />} />
          <Route path="ariia" element={<GenericLifePage configPath="/config/page-ariia-config.json" />} />
          <Route path="contact" element={<GenericLifePage configPath="/config/page-contact-config.json" />} />
          <Route path="training-placement" element={<GenericLifePage configPath="/config/page-tnp-config.json" />} />

          {/* Catch-all route for unimplemented links */}
          <Route path="*" element={<ComingSoon />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
