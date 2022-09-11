import { AnimatePresence } from 'framer-motion';
import './App.css';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import WebPage from './webPage';
import FaceApi from './faceApi';
import HomePage from './homePage';
import StartupContainer from './StartupContainer';
export default function App() {
  return (
    <div>
      <FaceApi />
      <AnimatePresence exitBeforeEnter>
        <Router>
          <Routes>
            <Route path="/" element={<StartupContainer />} />
            <Route path="/home" element={<HomePage />} />

            <Route path="/webpage" element={<WebPage />} />
          </Routes>
        </Router>
      </AnimatePresence>
    </div>
  );
}
