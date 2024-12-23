// import React, { useState, useRef, useEffect } from 'react';
// import { useUserMedia } from '../../../common/hooks/useUserMedia';

// const WebcamRegistration: React.FC = () => {
//   const [image, setImage] = useState<string | null>(null);
//   const [isVideoReady, setIsVideoReady] = useState<boolean>(false); // Track video readiness
//   const videoRef = useRef<HTMLVideoElement | null>(null); // Ref for the video element
//   const mediaStream = useUserMedia({ video: true });

//   // Capture the image when the video is ready and the capture button is clicked
//   const handleCapture = () => {
//     if (videoRef.current && isVideoReady) { // Ensure the video is ready
//       console.log('Capturing image...');
//       const canvas = document.createElement('canvas');
//       canvas.width = videoRef.current.videoWidth;
//       canvas.height = videoRef.current.videoHeight;
//       const ctx = canvas.getContext('2d');
//       if (ctx) {
//         console.log('Drawing image on canvas...');
//         ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//         const imageDataUrl = canvas.toDataURL('image/jpeg');
//         setImage(imageDataUrl); // Set the image data URL to state
//       } else {
//         console.error('Failed to get canvas context.');
//       }
//     } else {
//       console.error('Video stream not fully loaded or not ready.');
//     }
//   };

//   // Attach the media stream to the video element when available
//   useEffect(() => {
//     if (videoRef.current && mediaStream) {
//       if (!videoRef.current.srcObject) {
//         videoRef.current.srcObject = mediaStream; // Attach mediaStream to video element
//       }

//       // Listen for the 'loadeddata' event to know when the video is ready to capture
//       videoRef.current.onloadeddata = () => {
//         console.log('Video is ready for capturing.');
//         setIsVideoReady(true); // Set the flag to true when the video is ready
//       };
//     }

//     return () => {
//       // Stop all media tracks when component unmounts
//       if (mediaStream) {
//         mediaStream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, [mediaStream]);

//   return (
//     <div>
//       <video
//         ref={videoRef}
//         width="300"
//         height="200"
//         autoPlay
//       ></video>
//       <button onClick={handleCapture} disabled={!isVideoReady}>
//         Capture Image
//       </button>
//       {image ? (
//         <img src={image} alt="Captured" width="300" />
//       ) : (
//         <p>Image will appear here after capture.</p>
//       )}
//     </div>
//   );
// };

// export default WebcamRegistration;


import React, { useState, useEffect, useRef } from 'react';
import { useUserMedia } from '../../../common/hooks/useUserMedia';

const WebcamRegistration: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false); // Track video readiness
  const videoRef = useRef<HTMLVideoElement | null>(null); // Ref for the video element
  const mediaStream = useUserMedia({ video: true }); // Hook to get media stream

  // Capture the image when the video is ready and the capture button is clicked
  const handleCapture = () => {
    if (videoRef.current && isVideoReady) {
      console.log('Capturing image...');
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        setImage(imageDataUrl); // Save the captured image to state
      } else {
        console.error('Failed to get canvas context.');
      }
    } else {
      console.error('Video stream not ready or video element missing.');
    }
  };

  // Attach the media stream to the video element once
  useEffect(() => {
    if (videoRef.current && mediaStream && !videoRef.current.srcObject) {
      console.log('Attaching media stream to video element.');
      videoRef.current.srcObject = mediaStream; // Attach the media stream

      videoRef.current.onloadeddata = () => {
        setIsVideoReady(true); // Set video ready when the data is loaded
      };
    }

    // Cleanup: Stop all media tracks when component unmounts
    return () => {
      if (mediaStream) {
        console.log('Stopping media stream tracks.');
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mediaStream]); // Only run when the mediaStream changes

  return (
    <div>
      <video
        ref={videoRef}
        width="300"
        height="200"
        autoPlay
        playsInline // Ensures video plays inline on mobile devices
        style={{ backgroundColor: 'black' }} // Give a background for better visibility
      />
      <button onClick={handleCapture} disabled={!isVideoReady}>
        Capture Image
      </button>
      {image ? (
        <img src={image} alt="Captured" width="300" />
      ) : (
        <p>Image will appear here after capture.</p>
      )}
    </div>
  );
};

export default WebcamRegistration;
