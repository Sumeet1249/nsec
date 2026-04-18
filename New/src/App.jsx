import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Programs from './pages/Programs';
import Admissions from './pages/Admissions';
import Research from './pages/Research';
import Life from './pages/Life';
import ComingSoon from './pages/ComingSoon';

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
          
          {/* Catch-all route for unimplemented links */}
          <Route path="*" element={<ComingSoon />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
