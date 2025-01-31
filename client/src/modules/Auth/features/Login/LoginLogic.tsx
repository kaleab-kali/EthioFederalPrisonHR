import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useLoginMutation,
  useForgetPasswordRequestMutation,
} from "../../service/mutation";

const LoginPage2: React.FC = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const forgetPassReq = useForgetPasswordRequestMutation();
  const { mutate: handleLogin, status: loading } = useLoginMutation();

  const onFinish = (values: { userName: string; password: string }) => {
    handleLogin(values);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    forgetPassReq.mutate(userName);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url(/6.webp)" }}
    >
      {/* Header */}
      <header className="flex items-center justify-center p-6 bg-transparent">
        <img
          src={process.env.PUBLIC_URL + "/fpp.jpg"}
          alt="Company Logo"
          className="h-24 w-24 rounded-full"
        />
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            የፌዴራል ማረሚያ ፖሊስ የሰው ሀብት ሲስተም ዳታ ቤዝ
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const values = {
                userName: formData.get("userName") as string,
                password: formData.get("password") as string,
              };
              onFinish(values);
            }}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700"
              >
                userName
              </label>
              <input
                id="userName"
                name="userName"
                type="userName"
                required
                placeholder="Enter your userName"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading === "pending"}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {loading === "pending" ? "Signing in..." : "Sign in"}
              </button>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={showModal}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Modal for Forgot Password */}
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Forgot Password
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleOk();
              }}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="forgot-userName"
                  className="block text-sm font-medium text-gray-700"
                >
                  userName
                </label>
                <input
                  id="forgot-userName"
                  type="text"
                  required
                  placeholder="Enter your userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage2;
