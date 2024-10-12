// import { useState, useEffect } from 'react';

// type MediaStreamConstraints = {
//   audio?: boolean;
//   video?: boolean;
// };

// export const useUserMedia = (requestedMedia: MediaStreamConstraints): MediaStream | null => {
//   const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

//   useEffect(() => {
//     const enableStream = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia(requestedMedia);
//         setMediaStream(stream);
//       } catch (err) {
//         console.error('Error accessing media devices.', err);
//       }
//     };

//     enableStream();

//     return () => {
//       if (mediaStream) {
//         mediaStream.getTracks().forEach((track: MediaStreamTrack) => {
//           track.stop();
//         });
//       }
//     };
//   }, [requestedMedia, mediaStream]);

//   return mediaStream;
// };
import { useState, useEffect } from 'react';

type MediaStreamConstraints = {
  audio?: boolean;
  video?: boolean;
};

export const useUserMedia = (requestedMedia: MediaStreamConstraints): MediaStream | null => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const enableStream = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia(requestedMedia);
        setMediaStream(stream);
      } catch (err) {
        console.error('Error accessing media devices.', err);
      }
    };

    enableStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      }
    };
  }, [requestedMedia]); // Remove mediaStream from the dependency array

  return mediaStream;
};
