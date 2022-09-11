import { useNavigate } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import {
  WiCloud,
  WiCloudy,
  WiFog,
  WiRain,
  WiSnow,
  WiSprinkle,
  WiThunderstorm,
  WiDaySunny,
} from 'react-icons/wi';
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
import {
  BsFillSkipBackwardCircleFill,
  BsPlayCircleFill,
  BsFillSkipForwardCircleFill,
  BsNewspaper,
  BsCloudFill,
  BsSunFill,
  BsCloudRainFill,
  BsFillCloudSnowFill,
  BsFillCloudDrizzleFill,
  BsFillCloudLightningRainFill,
  BsWind,
} from 'react-icons/bs';
import WebPage from './webPage';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import loadingLogo from './smart-mirror.jpg';
import FaceApi from './faceApi';
import { getQuote, getRandomFact, getRandomJoke } from './api';

const Home = () => {
  const navigate = useNavigate();
  const [dateTime, setDateTime] = useState(new Date());
  const [setMediaCard, setMediaCardState] = useState(false);
  const [name, setName] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState('');
  const controls = useAnimation();

  const mediaCardRef = useRef(null);

  const [events, setEvents] = useState([]);
  const [weather, setWeather] = useState({});
  const [faceDetected, setFaceDetected] = useState(false);
  const [newsArticles, setNewsArticles] = useState([]);
  const [expression, setExpression] = useState('neutral');
  const [joke, setJoke] = useState('');

  useEffect(() => {
    getRandomJoke()
      .then((data) => {
        setJoke(data);
      })
      .catch((err) => {
        console.log(err);
      });
    window.electron.ipcRenderer.sendMessage('list-events', 'list-events');

    window.electron.ipcRenderer.on('list-events-reply', (arg) => {
      setEvents(arg);
    });
  }, []);

  useEffect(() => {
    const name = window.electron.store.get('firstName');

    setName(name);

    fetch(
      'http://api.openweathermap.org/data/2.5/weather?id=1270642&appid=d7a3899e98bd2b99c0688f59a49d5812'
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(
      'https://newsapi.org/v2/top-headlines?country=in&pageSize=5&apiKey=f254019d7c71408b959eae759cdbe058'
    )
      .then((res) => res.json())
      .then((data) => {
        setNewsArticles(data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
    getQuote()
      .then((data) => {
        setQuote(data);
        console.log('quote', data);
      })
      .catch((err) => {
        console.log(err);
      });
    // setLoading(false);
  }, []);
  const greetings = (name) => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return `Good Morning`;
    } else if (hour < 18) {
      return `Good Afternoon`;
    } else {
      return `Good Evening`;
    }
  };

  useEffect(() => {
    window.electron.ipcRenderer.on('face-detection-result', (event, data) => {
      // get first element of array
      const firstElement = event[0];
      console.log(firstElement);

      setFaceDetected(true);

      // if expression is not equal to highest expression
      if (expression !== firstElemen.highest) {
        setExpression(firstElement.highest);
      }
    });
    const interval = setInterval(() => {
      fetch(
        'http://api.openweathermap.org/data/2.5/weather?id=1270642&appid=d7a3899e98bd2b99c0688f59a49d5812'
      )
        .then((res) => res.json())
        .then((data) => {
          setWeather(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 600000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (faceDetected) {
      setLoading(false);
      //   check if previous timeOut exists
      if (window.faceDetectionTimeout) {
        clearTimeout(window.faceDetectionTimeout);
      }
      // set new timeout
      window.faceDetectionTimeout = setTimeout(() => {
        setFaceDetected(false);
      }, 20000);
    }
  }, [faceDetected]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key={2}
          transition={{ duration: 3 }}
        >
          <div className="time-container p-4 2xl:p-16 xl:p-8 ">
            {/* iframe */}

            <div className="top flex items-center">
              <div className="time-text">
                <motion.div
                  className="time-text-time"
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <h2 className="time-text-time-hours text-5xl font-extralight leading-none	">
                    {dateTime.getHours()}:{dateTime.getMinutes()}
                  </h2>
                </motion.div>
                <motion.div
                  className="time-text-date"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 2 }}
                >
                  <h2 className="time-text-date-date text-2xl text-white font-medium">
                    {moment(dateTime).format('dddd, MMMM Do')}
                  </h2>
                </motion.div>
              </div>
              <div className="weather-container ml-auto flex gap-6">
                {weather.weather ? (
                  <>
                    <div className="weather-info mt-auto pb-1">
                      <div className="weather-info-description">
                        <h2 className="weather-city-details-text text-2xl text-white font-medium">
                          {/* UPPERCASE FIRST LETTER */}
                          {weather.weather[0].description
                            .charAt(0)
                            .toUpperCase() +
                            weather.weather[0].description.slice(1)}
                        </h2>
                      </div>
                      <div className="weather-info-humidity">
                        <h2 className="weather-city-humidity-text text-gray-300 text-sm">
                          Humidity:{' '}
                          <span className="text-white font-medium">
                            {weather.main.humidity}%
                          </span>
                        </h2>
                      </div>
                      <div className="weather-info-pressure">
                        <h2 className="weather-city-pressure-text text-gray-300 text-sm">
                          Pressure:{' '}
                          <span className="text-white font-medium">
                            {weather.main.pressure} hPa
                          </span>
                        </h2>
                      </div>
                      <div className="weather-feels-like">
                        <h2 className="weather-city-feels-like-text text-gray-300 text-sm">
                          Feels Like:{' '}
                          <span className="text-white font-medium">
                            {Math.round(weather.main.feels_like) - 273}° C
                          </span>
                        </h2>
                      </div>
                    </div>

                    <div className="weather-container-weather mt-auto">
                      <div className="weather-details flex flex-row items-center gap-2">
                        <div className="weather-details-text flex">
                          <h2 className="weather-details-text-text text-4xl font-extralight leading-none	">
                            {/* round off and convert to c */}
                            {Math.round(weather.main.temp - 273.15)}
                            <sup> &deg;</sup>
                          </h2>
                        </div>
                        <div className="weather-details-icon text-4xl leading-none">
                          {weather.weather[0].main === 'Rain' ? (
                            <BsCloudRainFill />
                          ) : weather.weather[0].main === 'Clouds' ? (
                            <BsCloudFill />
                          ) : weather.weather[0].main === 'Clear' ? (
                            <BsSunFill />
                          ) : weather.weather[0].main === 'Snow' ? (
                            <BsFillCloudSnowFill />
                          ) : weather.weather[0].main === 'Drizzle' ? (
                            <BsFillCloudDrizzleFill />
                          ) : weather.weather[0].main === 'Thunderstorm' ? (
                            <BsFillCloudLightningRainFill />
                          ) : weather.weather[0].main === 'Atmosphere' ? (
                            <BsWind />
                          ) : (
                            <BsSunFill />
                          )}
                        </div>
                      </div>
                      <div className="weather-city-details ">
                        {/* weather city and country */}
                        <h2 className="weather-city-details-text text-2xl text-gray-300">
                          {weather.name}, {weather.sys.country}
                        </h2>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="weather-icon">
                    <WiCloud />
                  </div>
                )}
              </div>
            </div>
            <div className="news-container mt-10 flex justify-between">
              <AnimatePresence exitBeforeEnter initial={false}>
                {expression === 'neutral' ? (
                  <motion.div
                    className="news-container-left gap-4 flex flex-col"
                    initial={{ opacity: 0, x: -100 }}
                    exit={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={1}
                  >
                    <div className="news-container-title border-b-1 border-white w-3/6">
                      <motion.h2
                        className="news-container-title-text text-lg  text-white flex items-center gap-2"
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={{ opacity: 1, x: '0%' }}
                        transition={{
                          duration: 1,
                          ease: [0.6, 0.05, -0.01, 0.9],
                        }}
                      >
                        <BsNewspaper /> Headlines
                      </motion.h2>
                    </div>
                    <div className="news-container-news w-3/4">
                      {/* get 5 articles from newsArticles */}
                      <motion.ul
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: {
                            opacity: 0,
                            transition: {
                              when: 'afterChildren',
                            },
                          },

                          visible: {
                            opacity: 1,

                            transition: {
                              delayChildren: 0.5,
                              staggerChildren: 0.3,
                              when: 'beforeChildren',
                            },
                          },
                        }}
                      >
                        {newsArticles.length > 0 ? (
                          newsArticles.map((article, i) => {
                            return (
                              <motion.li
                                custom={i}
                                className="news-container-news-article-title text-sm text-gray-400 leading-8"
                                variants={{
                                  visible: (i) => ({
                                    opacity: 1,
                                    x: 0,
                                  }),
                                  hidden: { opacity: 0, x: -100 },
                                }}
                                key={i}
                                transition={{
                                  delay: i * 0.6,
                                }}
                              >
                                {article.title}
                              </motion.li>
                            );
                          })
                        ) : (
                          <div className="news-container-news-article">
                            <span className="news-container-news-article-title text-sm font-extralight  text-gray-400">
                              No News
                            </span>
                          </div>
                        )}
                      </motion.ul>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    className="joke-container-left gap-4 flex flex-col"
                    initial={{ opacity: 0, x: -100 }}
                    exit={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: '0%' }}
                    key={2}
                  >
                    <div className="joke-container-title border-b-1 border-white w-3/6">
                      <h2 className="joke-container-title-text text-lg  text-white flex items-center gap-2">
                        🙂 Joke
                      </h2>
                    </div>
                    <div className="joke-container w-1/2">
                      <p className="joke-container-text text-xl text-white leading-8 ">
                        You look {expression}. Here's a joke for you.
                      </p>
                      <p className="joke-container-text text-2xl text-gray-400 leading-8">
                        {joke}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="calendar-container flex flex-col gap-6">
                <div className="calendar-container-title text-lg text-white border-b-1 border-white flex gap-2 items-center ">
                  <FaCalendarAlt /> Upcoming Events
                </div>
                <div className="calendar-container-events flex flex-col gap-2">
                  {/* get the upcoming events from events */}
                  {events.length > 0 ? (
                    events.map((event, i) => {
                      return (
                        <div className="calendar-container-events-event flex flex-row gap-4 justify-between">
                          <div className="calendar-container-events-event-title text-sm text-white">
                            {event.summary}
                          </div>
                          <div className="calendar-container-events-event-date text-sm text-gray-400">
                            {moment(event.start.date).fromNow()}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="calendar-container-events-event flex flex-row gap-2">
                      <div className="calendar-container-events-event-date text-sm text-gray-400">
                        No Events
                      </div>
                      <div className="calendar-container-events-event-title text-sm text-gray-400">
                        No Events
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className="media-container mt-0 2xl:px-16 xl:px-8 px-4 flex justify-between"
            // swipe left to hide
          >
            <motion.div
              className="media-card flex  gap-6 h-fit"
              //  swipe left to hide
              drag="x"
              dragElastic={0.1}
              onDragEnd={async (e, info) => {
                // if swipe left hide
                const offset = info.offset.x;
                const velocity = info.velocity.x;
                console.log(offset, velocity);

                if (offset < -200 || velocity < -500) {
                  await controls.start({
                    x: '-100%',
                    transition: { duration: 0.2 },
                  });
                } else {
                  controls.start({
                    x: 0,
                    opacity: 1,
                    transition: { duration: 0.5 },
                  });
                }
              }}
              animate={controls}
              dragSnapToOrigin={true}
            >
              <div className="media-card-image h-32 w-32 border-2 border-white overflow-hidden rounded-3xl">
                <img
                  className="media-card-image-img"
                  src={'http://unsplash.it/500/500?random&gravity=center'}
                  alt="media"
                  className="media-card-image-img object-cover object-center"
                />
              </div>
              <div className="media-content flex flex-col w-80">
                <div className="media-content-title text-lg text-white font-medium">
                  Beyond the Sea
                </div>
                <div className="media-content-author text-sm text-gray-400">
                  Alan Walker
                </div>
                <div className="media-progress flex flex-row gap-1 items-center mt-4">
                  {/* create a seek bar using tailwind */}
                  <span className="media-progress-text text-gray-400 text-xs">
                    0:00
                  </span>
                  <div className="seek-bar w-full bg-white h-0.5"></div>
                  <span className="media-progress-text text-xs text-gray-400">
                    {/* get the duration of the song */}
                    3:00
                  </span>
                </div>
                <div className="media-content-controls flex flex-row gap-1 items-center mt-auto justify-between">
                  <div className="media-content-controls-backward-icon">
                    <BsFillSkipBackwardCircleFill size={30} />
                  </div>
                  <div className="media-content-controls-play-icon ">
                    <FaPlayCircle size={30} />
                  </div>
                  <div className="media-content-controls-forward-icon">
                    <BsFillSkipForwardCircleFill size={30} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="greeting-container absolute  bottom-32 left-0 right-0">
            <div className="bottom-text">
              <motion.h2
                className="bottom-text-text text-4xl  text-center font-thin"
                initial={{ opacity: 0, y: '-100%', scale: 0.5 }}
                animate={{ opacity: 1, y: '0%', scale: 1 }}
                transition={{
                  duration: 1,
                  ease: [0.6, 0.05, -0.01, 0.9],

                  delay: 4,
                }}
              >
                Hi, {name}! {greetings()}
              </motion.h2>
              <motion.p
                className="quote-text text-center text-gray-400 text-sm leading-none"
                initial={{ opacity: 0, y: '-100%', scale: 0.5 }}
                animate={{ opacity: 1, y: '0%', scale: 1 }}
                transition={{
                  duration: 1,
                  ease: [0.6, 0.05, -0.01, 0.9],

                  delay: 4,
                }}
              >
                {quote}
              </motion.p>
            </div>
          </div>
          <div className="bottom bottom-4  absolute left-1/2 -translate-x-1/2">
            <motion.div
              className="bottom-menu flex flex-row gap-2 "
              initial={{ opacity: 0, scale: 0.5, y: '100%' }}
              animate={{ opacity: 1, scale: 1, y: '0%' }}
              transition={{
                duration: 1,
                ease: [0.6, 0.05, -0.01, 0.9],
              }}
            >
              <div
                className="bottom-menu-item  border-1 border-x-white p-4 rounded-xl justify-center items-center flex"
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
              <div
                className="bottom-menu-item  border-1 border-x-white p-4 rounded-xl justify-center items-center flex"
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
                className="bottom-menu-item  border-1 border-x-white p-4 rounded-xl justify-center items-center flex"
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
                className="bottom-menu-item  border-1 border-x-white p-4 rounded-xl"
                onClick={() => {
                  navigate('/home');
                }}
              >
                <div className="bottom-menu-item-icon">
                  <FaHome size={30} />
                </div>
              </div>

              <div
                className="bottom-menu-item  border-1 border-x-white p-4 rounded-xl"
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
                className="bottom-menu-item  border-1 border-x-white p-4 rounded-xl"
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
                className="bottom-menu-item  border-1 border-x-white p-4 rounded-xl"
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
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
};

const LoadingScreen = () => {
  return (
    <motion.div
      className="loading-screen w-screen h-screen flex justify-center items-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 2 }}
      key={3}
      transition={{ duration: 1, ease: [0.6, 0.05, -0.01, 0.9] }}
    >
      <img src={loadingLogo} alt="loading" className="loading-screen-logo" />
    </motion.div>
  );
};

export default Home;
