import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { motion } from 'framer-motion';
// left chevron from react-icons
import { FaInstagram, FaFacebook, FaHome } from 'react-icons/fa';

import { AiOutlineLeft } from 'react-icons/ai';
import {
  FaInstagram,
  FaFacebook,
  FaHome,
  FaPlayCircle,
  FaYoutube,
  FaTwitter,
  FaCalendarAlt,
  FaWhatsappSquare,
  FaWhatsapp,
  FaGoogle,
} from 'react-icons/fa';
const WebPage = (props) => {
  // useLocation hook to get the pathname
  const pageParams = useLocation();
  const navigate = useNavigate();

  return (
    <motion.div
      className="webpage w-screen h-screen relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3 }}
    >
      <div className=" bottom bottom-4  absolute left-1/2 -translate-x-1/2 z-10">
        <div className="bottom-menu flex flex-row gap-2 ">
          <div
            className="bottom-menu-item  border-1 border-x-white p-4 rounded-xl justify-center items-center flex bg-black"
            onClick={() => {
              navigate('/webPage', {
                state: {
                  url: 'https://www.google.com',
                },
              });
            }}
          >
            <div className="bottom-menu-item-icon">
              <FaGoogle size={30} />
            </div>
          </div>
          ``
          <div
            className="bottom-menu-item  border-1 border-x-white p-4 rounded-xl justify-center items-center flex bg-black"
            onClick={() => {
              navigate('/webPage', {
                state: {
                  url: 'https://instagram.com/',
                },
              });
            }}
          >
            <div className="bottom-menu-item-icon">
              <FaInstagram size={30} />
            </div>
          </div>
          <div
            className="bottom-menu-item  border-1 border-x-white p-4 rounded-xl justify-center items-center flex bg-black"
            onClick={() => {
              navigate('/webPage', {
                state: {
                  url: 'https://youtube.com',
                },
              });
            }}
          >
            <div className="bottom-menu-item-icon">
              <FaYoutube size={30} />
            </div>
          </div>
          <div
            className="bottom-menu-item  border-1 border-x-white p-4 rounded-xl bg-black"
            onClick={() => {
              navigate('/home');
            }}
          >
            <div className="bottom-menu-item-icon">
              <FaHome size={30} />
            </div>
          </div>
          <div
            className="bottom-menu-item  border-1 border-x-white p-4 rounded-xl bg-black"
            onClick={() => {
              navigate('/webPage', {
                state: {
                  url: 'https://facebook.com/',
                },
              });
            }}
          >
            <div className="bottom-menu-item-icon">
              <FaFacebook size={30} />
            </div>
          </div>
          <div
            className="bottom-menu-item  border-1 border-x-white p-4 rounded-xl bg-black"
            onClick={() => {
              navigate('/webPage', {
                state: {
                  url: 'https://twitter.com/',
                },
              });
            }}
          >
            <div className="bottom-menu-item-icon">
              <FaTwitter size={30} />
            </div>
          </div>
          <div
            className="bottom-menu-item  border-1 border-x-white p-4 rounded-xl bg-black"
            onClick={() => {
              navigate('/webPage', {
                state: {
                  url: 'https://web.whatsapp.com/',
                },
              });
            }}
          >
            <div className="bottom-menu-item-icon">
              <FaWhatsapp size={30} />
            </div>
          </div>
        </div>
      </div>
      <div className="embed-responsive embed-responsive-1by1 w-screen h-full">
        {/* display istagram */}
        <webview
          className="embed-responsive-item"
          src={pageParams.state.url}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </motion.div>
  );
};

export default WebPage;
