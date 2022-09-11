import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ScaleLoader from 'react-spinners/ScaleLoader';
import loadingLogo from './smart-mirror.jpg';
import introduction from './introduction.mp3';
const StartupContainer = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const sound = new Audio(introduction);
    sound.play();

    window.electron.ipcRenderer.once('face-api-loaded-reply', (arg) => {
      console.log('arg');
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    });
  }, []);

  return (
    <motion.div
      className="loading-screen w-screen h-screen flex justify-center items-center flex-col"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 2 }}
      key={1}
      transition={{ duration: 1, ease: [0.6, 0.05, -0.01, 0.9] }}
    >
      <img src={loadingLogo} alt="loading" className="loading-screen-logo" />
      <ScaleLoader size={50} color="#fff" loading={true} />
    </motion.div>
  );
};

export default StartupContainer;
