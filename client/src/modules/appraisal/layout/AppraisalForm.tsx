import React, { useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import "tailwindcss/tailwind.css";
import { useSubmitRegistration } from "../services/mutation";

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
  scoreOutOf30: number;
  scoreOutOf70: number;
  totalScore: number;
}

const MAX_SCORE = 20;

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
    scoreOutOf30: 0,
    scoreOutOf70: 0,
    totalScore: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name in form.scores) {
      const numericValue = Math.min(Number(value), MAX_SCORE);
      const updatedScores = { ...form.scores, [name]: numericValue };
      const maxScore = 100; // Maximum sum of positive attributes before scaling
      const scaledMax = 30; // Desired scale

      const rawScore =
        updatedScores.education +
        updatedScores.service +
        updatedScores.attitude +
        updatedScores.behaviour +
        updatedScores.workEfficiency -
        updatedScores.disciplinary;

      // Normalize to be out of 30
      const scoreOutOf30 = (rawScore / maxScore) * scaledMax;
      // const scoreOutOf30 =
      //   updatedScores.education +
      //   updatedScores.service +
      //   updatedScores.attitude +
      //   updatedScores.behaviour +
      //   updatedScores.workEfficiency -
      //   updatedScores.disciplinary;
      setForm({
        ...form,
        scores: updatedScores,
        scoreOutOf30,
        totalScore: scoreOutOf30 + form.scoreOutOf70,
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleScoreOutOf70Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const scoreOutOf70 = Number(e.target.value);
    setForm({
      ...form,
      scoreOutOf70,
      totalScore: form.scoreOutOf30 + scoreOutOf70,
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
            <input
              type="text"
              name="employeeId"
              value={form.employeeId}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Employee ID"
            />
            <input
              type="text"
              name="currentLevel"
              value={form.currentLevel}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Current Level"
            />
            <input
              type="text"
              name="nextLevel"
              value={form.nextLevel}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Next Level"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.keys(form.scores).map((score) => (
              <div key={score}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {score} out of 20
                </label>
                <input
                  type="number"
                  name={score}
                  value={form.scores[score as keyof IAppraisalForm["scores"]]}
                  onChange={handleChange}
                  className="input-field"
                  required
                  max={MAX_SCORE}
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Score out of 70
            </label>
            <input
              type="number"
              name="scoreOutOf70"
              value={form.scoreOutOf70}
              onChange={handleScoreOutOf70Change}
              className="input-field"
              min={0}
              max={70}
              required
            />
            {form.scoreOutOf70 > 70 && (
              <p className="text-red-500 text-sm mt-1">
                Score cannot be more than 70.
              </p>
            )}
          </div>

          <div className="text-lg font-bold text-gray-700">
            Score out of 30: {form.scoreOutOf30}
          </div>
          <div className="text-lg font-bold text-gray-700">
            Total Score: {form.totalScore}
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
