import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

// Mock employee data (replace with your API call)
const mockEmployeeData = {
  id: '12345',
  name: 'John Doe',
  position: 'Software Engineer',
  department: 'Engineering',
};

const EmployeePhotoCapture: React.FC = () => {
  const [empID, setEmpID] = useState<string>('');
  const [employeeInfo, setEmployeeInfo] = useState<{ id: string; name: string; position: string; department: string } | null>(null);
  const [capturedImages, setCapturedImages] = useState<{ front: string | null; side: string | null; other: string | null }>({
    front: null,
    side: null,
    other: null,
  });
  const [error, setError] = useState<string | null>(null);

  const webcamRef = useRef<Webcam>(null);

  const handleVerify = () => {
    // Clear previous errors
    setError(null);

    // Simulate fetching employee data (replace with actual API call)
    if (empID === mockEmployeeData.id) {
      setEmployeeInfo(mockEmployeeData);
    } else {
      setError('Invalid Employee ID. Please enter a valid ID.');
    }
  };

  const captureImage = (type: 'front' | 'side' | 'other') => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImages((prev) => ({ ...prev, [type]: imageSrc }));
    } else {
      setError('Failed to capture image. Please ensure your webcam is connected and accessible.');
    }
  };

  const handleSave = () => {
    // Simulate saving logic
    if (capturedImages.front && capturedImages.side && capturedImages.other) {
      console.log('Images saved:', capturedImages);
      alert('Images saved successfully!');
    } else {
      setError('Please capture all three images (front, side, and other) before saving.');
    }
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">Employee Photo Capture</h1>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
            <p>{error}</p>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Side: Employee ID Input and Information */}
          <div className="flex-1">
            <div className="mb-4">
              <label htmlFor="empID" className="block text-sm font-medium mb-2">
                Enter Employee ID
              </label>
              <input
                type="text"
                id="empID"
                value={empID}
                onChange={(e) => setEmpID(e.target.value)}
                className="bg-gray-700 text-white p-2 rounded w-full"
                placeholder="Employee ID"
              />
              <button
                onClick={handleVerify}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full mt-4"
              >
                Verify
              </button>
            </div>

            {employeeInfo && (
              <div className="bg-gray-700 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-2">Employee Information</h2>
                <p><strong>ID:</strong> {employeeInfo.id}</p>
                <p><strong>Name:</strong> {employeeInfo.name}</p>
                <p><strong>Position:</strong> {employeeInfo.position}</p>
                <p><strong>Department:</strong> {employeeInfo.department}</p>
              </div>
            )}
          </div>

          {/* Right Side: Capture Screen */}
          {employeeInfo && (
            <div className="flex-1">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full h-auto rounded-lg"
                onUserMediaError={() => setError('Webcam access denied. Please allow access to your camera.')}
              />
              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => captureImage('front')}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  Capture Front
                </button>
                <button
                  onClick={() => captureImage('side')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                >
                  Capture Side
                </button>
                <button
                  onClick={() => captureImage('other')}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
                >
                  Capture Other
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Save Images
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Display Captured Images */}
        {employeeInfo && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {capturedImages.front && (
              <div className="bg-gray-700 p-2 rounded-lg">
                <img src={capturedImages.front} alt="Front" className="w-full h-auto rounded-lg" />
                <p className="text-center mt-2">Front</p>
              </div>
            )}
            {capturedImages.side && (
              <div className="bg-gray-700 p-2 rounded-lg">
                <img src={capturedImages.side} alt="Side" className="w-full h-auto rounded-lg" />
                <p className="text-center mt-2">Side</p>
              </div>
            )}
            {capturedImages.other && (
              <div className="bg-gray-700 p-2 rounded-lg">
                <img src={capturedImages.other} alt="Other" className="w-full h-auto rounded-lg" />
                <p className="text-center mt-2">Other</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeePhotoCapture;