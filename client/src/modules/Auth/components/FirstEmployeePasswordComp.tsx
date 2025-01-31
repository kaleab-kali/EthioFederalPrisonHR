import React, { useState } from "react";
import { useFirstTimePasswordEmployeeMutation } from "../service/mutation";

const FirstEmployeePasswordComp: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const newpass = useFirstTimePasswordEmployeeMutation();

  const onFinish = (values: any) => {
    setLoading(true);
    const { newPassword, confirmPassword, userName } = values;

    console.log("Submitted values:", values);
    const data = {
      userName: userName,
      newPassword: newPassword,
    };
    newpass.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create New Password
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const values = {
              userName: formData.get("userName") as string,
              newPassword: formData.get("newPassword") as string,
              confirmPassword: formData.get("confirmPassword") as string,
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
              type="text"
              required
              placeholder="Enter your userName"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              placeholder="Enter new password"
              minLength={8}
              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-2 text-sm text-gray-500">
              Password must be at least 8 characters and include uppercase,
              lowercase, and a number.
            </p>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              placeholder="Confirm new password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? "Submitting..." : "Submit Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FirstEmployeePasswordComp;
