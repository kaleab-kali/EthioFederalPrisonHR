import React, { useState } from "react";
import { FaWpforms } from "react-icons/fa";
import Breadcrumb from "../../employee/components/BreadCrumb";
import { useCreateComplaint } from "../services/mutation";

interface IComplaintForm {
  empID: string;
  category: string;
  subcategory: string;
  reason: string;
  attachments?: FileList | null;
}

const ComplaintForm: React.FC = () => {
  const createComplaint = useCreateComplaint();
  const [form, setForm] = useState<IComplaintForm>({
    empID: "",
    category: "",
    subcategory: "",
    reason: "",
    attachments: null,
  });

  const categories = {
    "Article 30": ["Subcategory 1", "Subcategory 2"],
    "Article 29": ["Subcategory A", "Subcategory B"],
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) => ({ ...prevForm, attachments: e.target.files }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", form);

    // You may need to handle file upload differently depending on your backend setup
    const formData = new FormData();
    formData.append("employeeId", form.empID);
    formData.append("category", form.category);
    formData.append("complaint", form.subcategory);
    formData.append("description", form.reason);
    if (form.attachments) {
      Array.from(form.attachments).forEach((file) =>
        formData.append("attachments", file)
      );
    }

    createComplaint.mutate(formData as any); // Update this if your mutation expects FormData
  };

  return (
    <>
      <Breadcrumb />
      <div className="flex justify-center items-center">
        <div className="flex flex-row justify-between p-8 bg-white shadow-lg rounded-lg max-w-2xl">
          <div className="w-1/2 pr-4">
            <h2 className="text-2xl font-bold mb-4">Complaint Form</h2>
            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="empID"
                >
                  Employee ID
                </label>
                <input
                  type="text"
                  name="empID"
                  value={form.empID}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="category"
                >
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {Object.keys(categories).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {form.category && (
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="subcategory"
                  >
                    Subcategory
                  </label>
                  <select
                    name="subcategory"
                    value={form.subcategory}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="" disabled>
                      Select subcategory
                    </option>
                    {categories[form.category].map((subcategory) => (
                      <option key={subcategory} value={subcategory}>
                        {subcategory}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="reason"
                >
                  Reason
                </label>
                <textarea
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="attachments"
                >
                  Attachments
                </label>
                <input
                  type="file"
                  id="attachments"
                  name="attachments"
                  multiple
                  onChange={handleFileChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                />
              </div>

              <div className="flex justify-start">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          <div className="w-1/2 flex items-center justify-center">
            <FaWpforms size="80%" className="text-gray-300" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ComplaintForm;
