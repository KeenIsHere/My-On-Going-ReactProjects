import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import '@tensorflow/tfjs-backend-webgl';

let model = null;

export const loadModel = async () => {
  model = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
    { maxFaces: 1 }
  );
  return model;
};

export const detectFace = async (videoElement) => {
  if (!model) return null;
  return model.estimateFaces(videoElement);
};