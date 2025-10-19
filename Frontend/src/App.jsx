import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [formData, setFormData] = useState({
    age: 0,
    sex: "",
    chestPainType: "",
    restingBP: 0,
    cholesterol: 0,
    fastingBS: 0,
    restingECG: "",
    maxHR: 0,
    exerciseAngina: "",
    oldpeak: 0,
    st_slope: "",
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/predictheartattack",
        formData
      );
      const data = res.data.prediction; // Ensure backend sends 'prediction'
      setPrediction(data);
    } catch (error) {
      console.error("Error:", error);
      setPrediction("Error connecting to the server.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          ❤️ Heart Disease Predictor
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
          {/* Age */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Sex */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Sex</label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Sex</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>

          {/* Chest Pain Type */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Chest Pain Type
            </label>
            <select
              name="chestPainType"
              value={formData.chestPainType}
              onChange={handleChange}
              className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Type</option>
              <option value="ATA">ATA</option>
              <option value="NAP">NAP</option>
              <option value="TA">TA</option>
              <option value="ASY">ASY</option>
            </select>
          </div>

          {/* Resting BP */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Resting BP
            </label>
            <input
              type="number"
              name="restingBP"
              value={formData.restingBP}
              onChange={handleChange}
              className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Cholesterol */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Cholesterol
            </label>
            <input
              type="number"
              name="cholesterol"
              value={formData.cholesterol}
              onChange={handleChange}
              className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Fasting BS */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Fasting Blood Sugar (0 or 1)
            </label>
            <input
              type="number"
              name="fastingBS"
              value={formData.fastingBS}
              onChange={handleChange}
              className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Resting ECG */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Resting ECG
            </label>
            <select
              name="restingECG"
              value={formData.restingECG}
              onChange={handleChange}
              className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Type</option>
              <option value="Normal">Normal</option>
              <option value="ST">ST</option>
            </select>
          </div>

          {/* Max HR */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Max Heart Rate
            </label>
            <input
              type="number"
              name="maxHR"
              value={formData.maxHR}
              onChange={handleChange}
              className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Exercise Angina */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Exercise Angina
            </label>
            <select
              name="exerciseAngina"
              value={formData.exerciseAngina}
              onChange={handleChange}
              className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select</option>
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>
          </div>

          {/* Oldpeak */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Oldpeak
            </label>
            <input
              type="number"
              step="0.1"
              name="oldpeak"
              value={formData.oldpeak}
              onChange={handleChange}
              className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* ST Slope */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              ST Slope
            </label>
            <select
              name="st_slope"
              value={formData.st_slope}
              onChange={handleChange}
              className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select</option>
              <option value="Flat">Flat</option>
              <option value="Up">Up</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Predict
          </button>
        </form>

        {prediction !== null && (
          <div className="mt-6 text-center text-lg font-semibold">
            {prediction === "Error connecting to the server." ? (
              <span className="text-red-500">{prediction}</span>
            ) : prediction === 1 ? (
              <span className="text-red-600">
                ⚠️ High risk of heart disease
              </span>
            ) : (
              <span className="text-green-600">
                ✅ Low risk of heart disease
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
