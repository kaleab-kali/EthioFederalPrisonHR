import React, { useState } from "react";
import { FaWpforms } from "react-icons/fa";
import Breadcrumb from "../../employee/components/BreadCrumb";

interface IComplaintForm {
  empID: string;
  category: string;
  subcategory: string;
  reason: string;
}

const ComplaintForm: React.FC = () => {
  const [form, setForm] = useState<IComplaintForm>({
    empID: "",
    category: "",
    subcategory: "",
    reason: "",
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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Breadcrumb />
      <div className="flex justify-center items-center ">
        
        <div className="flex flex-row justify-between p-8 bg-white shadow-lg rounded-lg max-w-2xl">
          <div className="w-1/2 pr-4">
            <h2 className="text-2xl font-bold mb-4">Complaint Form</h2>
            <form>
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
