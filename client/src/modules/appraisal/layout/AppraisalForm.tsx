import React, { useState, useEffect } from "react";
import { FaClipboardList, FaSearch } from "react-icons/fa";
import "tailwindcss/tailwind.css";
import { useSubmitRegistration } from "../services/mutation";
import axios from "axios";

interface IAppraisalForm {
  employeeId: string;
  currentLevel: string;
  nextLevel: string;
  scores: {
    education: number;
    service: number;
    attitude: number;
    behaviour: number;
    workEfficiency: number;
    disciplinary: number;
  };
  totalScore: number;
}

const AppraisalForm: React.FC = () => {
  const createAppraisalForm = useSubmitRegistration();
  const [form, setForm] = useState<IAppraisalForm>({
    employeeId: "",
    currentLevel: "",
    nextLevel: "",
    scores: {
      education: 0,
      service: 0,
      attitude: 0,
      behaviour: 0,
      workEfficiency: 0,
      disciplinary: 0,
    },
    totalScore: 0,
  });

  const titleMap = [
    "Constable",
    "Assistant Sergeant",
    "Deputy Sergeant",
    "Sergeant",
    "Chief Sergeant",
    "Assistant Inspector",
    "Deputy Inspector",
    "Inspector",
    "Chief Inspector",
    "DeputyCommander",
    "Commander",
  ];

  const fetchEmployeeData = async () => {
    if (!form.employeeId) return;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/employees/${form.employeeId}`
      );
      const employeeData = response.data;

      const currentTitle = employeeData.employee.title;
      const currentIndex = titleMap.indexOf(currentTitle);
      const nextTitle =
        currentIndex !== -1 && currentIndex < titleMap.length - 1
          ? titleMap[currentIndex + 1]
          : "";

      setForm((prevForm) => ({
        ...prevForm,
        currentLevel: currentTitle,
        nextLevel: nextTitle,
        scores: {
          ...prevForm.scores,
          service: employeeData.employee.evaluation[0].total * 0.15,
          attitude: employeeData.employee.evaluation[0].total * 0.25,
          behaviour: employeeData.employee.evaluation[0].total * 0.25,
          workEfficiency: employeeData.employee.evaluation[0].total * 0.25,
        },
      }));
    } catch (error) {
      console.error("Error fetching employee data", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => {
      const updatedScores = {
        ...prevForm.scores,
        [name]: parseFloat(value) || 0,
      };

      // Recalculate the total score whenever the scores change
      const newTotalScore =
        updatedScores.education +
        updatedScores.service +
        updatedScores.attitude +
        updatedScores.behaviour +
        updatedScores.workEfficiency -
        updatedScores.disciplinary;

      return {
        ...prevForm,
        scores: updatedScores,
        totalScore: newTotalScore,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAppraisalForm.mutate(form);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
      <div className="md:w-2/3 pr-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Appraisal Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                name="employeeId"
                value={form.employeeId}
                onChange={(e) =>
                  setForm({ ...form, employeeId: e.target.value })
                }
                required
                className="input-field"
                placeholder="Employee ID"
              />
              <button
                type="button"
                className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700"
                onClick={fetchEmployeeData}
              >
                <FaSearch />
              </button>
            </div>
            <input
              type="text"
              name="currentLevel"
              value={form.currentLevel}
              onChange={(e) =>
                setForm({ ...form, currentLevel: e.target.value })
              }
              required
              className="input-field"
              placeholder="Current Level"
            />
            <input
              type="text"
              name="nextLevel"
              value={form.nextLevel}
              onChange={(e) => setForm({ ...form, nextLevel: e.target.value })}
              required
              className="input-field"
              placeholder="Next Level"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Education (out of 15) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Education (out of 10)
              </label>
              <input
                type="number"
                name="education"
                value={form.scores.education}
                onChange={handleChange}
                className="input-field"
                required
                max={10}
              />
            </div>

            {/* Service (Disabled) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Service (out of 15)
              </label>
              <input
                type="number"
                name="service"
                value={form.scores.service.toFixed(2)}
                disabled
                className="input-field bg-gray-200 cursor-not-allowed"
              />
            </div>

            {/* Attitude (Disabled) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Attitude (out of 25)
              </label>
              <input
                type="number"
                name="attitude"
                value={form.scores.attitude.toFixed(2)}
                disabled
                className="input-field bg-gray-200 cursor-not-allowed"
              />
            </div>

            {/* Behaviour (Disabled) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Behaviour (out of 25)
              </label>
              <input
                type="number"
                name="behaviour"
                value={form.scores.behaviour.toFixed(2)}
                disabled
                className="input-field bg-gray-200 cursor-not-allowed"
              />
            </div>

            {/* Work Efficiency (Disabled) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Work Efficiency (out of 25)
              </label>
              <input
                type="number"
                name="workEfficiency"
                value={form.scores.workEfficiency.toFixed(2)}
                disabled
                className="input-field bg-gray-200 cursor-not-allowed"
              />
            </div>

            {/* Disciplinary */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Disciplinary
              </label>
              <input
                type="number"
                name="disciplinary"
                value={form.scores.disciplinary}
                onChange={handleChange}
                className="input-field"
                required
                max={10}
              />
            </div>
          </div>

          <div className="text-lg font-bold text-gray-700">
            Total Score: {form.totalScore.toFixed(2)}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="hidden md:flex md:w-1/3 items-center justify-center">
        <FaClipboardList size="80%" className="text-gray-300" />
      </div>
    </div>
  );
};

export default AppraisalForm;
