import { useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import tinyFace from '../../assets/models/tiny_face_detector_model-weights_manifest.json';
import faceLandmark from '../../assets/models/face_landmark_68_model-weights_manifest.json';
import faceRecognition from '../../assets/models/face_recognition_model-weights_manifest.json';
import faceExpression from '../../assets/models/face_expression_model-weights_manifest.json';

function FaceApi() {
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    console.log(tinyFace);
    startVideo();
    videoRef && loadModels();
  }, []);
  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(
        'https://faceapi-bucket.s3.ap-south-1.amazonaws.com/models'
      ),
      faceapi.nets.faceRecognitionNet.loadFromUri(
        'https://faceapi-bucket.s3.ap-south-1.amazonaws.com/models'
      ),

      faceapi.nets.faceExpressionNet.loadFromUri(
        'https://faceapi-bucket.s3.ap-south-1.amazonaws.com/models'
      ),
    ]).then(() => {
      window.electron.ipcRenderer.sendMessage('face-api-loaded', true);
      faceDetection();
    });
  };
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const faceDetection = async () => {
    console.log('faceDetection');
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      // send a message only if there is at least one face detected
      if (detections.length > 0) {
        window.electron.ipcRenderer.sendMessage('face-detection', detections);
      }
    }, 1000);
  };
  return (
    <div className="app">
      <div className="app__video">
        <video
          crossOrigin="anonymous"
          ref={videoRef}
          autoPlay
          // hide video so not to show on screen
          style={{ display: 'none' }}
        ></video>
      </div>
    </div>
  );
}
export default FaceApi;
