import React, { useState } from "react";
import axios from "axios";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .hd-root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 1.5rem;
    background-color: #0d0f12;
    background-image:
      radial-gradient(ellipse 80% 60% at 50% -10%, rgba(185,28,28,0.18) 0%, transparent 70%),
      url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    font-family: 'DM Mono', monospace;
  }

  .hd-card {
    background: #13161b;
    border: 1px solid #1e2329;
    border-radius: 4px;
    width: 100%;
    max-width: 560px;
    overflow: hidden;
    box-shadow:
      0 0 0 1px rgba(185,28,28,0.08),
      0 32px 80px rgba(0,0,0,0.6),
      0 4px 20px rgba(0,0,0,0.4);
    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .hd-header {
    padding: 2.5rem 2.5rem 2rem;
    border-bottom: 1px solid #1e2329;
    position: relative;
    overflow: hidden;
  }

  .hd-header::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #dc2626, transparent);
  }

  .hd-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #dc2626;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .hd-eyebrow::before {
    content: '';
    width: 16px;
    height: 1px;
    background: #dc2626;
  }

  .hd-title {
    font-family: 'DM Serif Display', serif;
    font-size: 2rem;
    font-weight: 400;
    color: #f0ece4;
    line-height: 1.15;
    letter-spacing: -0.01em;
  }

  .hd-title em {
    font-style: italic;
    color: #dc2626;
  }

  .hd-subtitle {
    margin-top: 0.5rem;
    font-size: 0.7rem;
    color: #4a5260;
    letter-spacing: 0.05em;
  }

  .hd-body {
    padding: 2rem 2.5rem 2.5rem;
  }

  .hd-section-label {
    font-size: 0.6rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #3a4050;
    margin: 1.75rem 0 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .hd-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #1e2329;
  }

  .hd-section-label:first-child {
    margin-top: 0;
  }

  .hd-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .hd-field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .hd-label {
    font-size: 0.6rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #5a6275;
  }

  .hd-input, .hd-select {
    background: #0d0f12;
    border: 1px solid #1e2329;
    border-radius: 3px;
    color: #c8c2b8;
    font-family: 'DM Mono', monospace;
    font-size: 0.8rem;
    padding: 0.65rem 0.85rem;
    width: 100%;
    appearance: none;
    -webkit-appearance: none;
    transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
    outline: none;
  }

  .hd-input::placeholder { color: #2d3240; }

  .hd-input:focus, .hd-select:focus {
    border-color: #dc2626;
    box-shadow: 0 0 0 2px rgba(220,38,38,0.12);
    background: #0f1116;
    color: #f0ece4;
  }

  .hd-select {
    background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23444'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.85rem center;
    padding-right: 2rem;
    cursor: pointer;
  }

  .hd-select option { background: #13161b; }

  .hd-btn {
    margin-top: 2rem;
    width: 100%;
    padding: 0.9rem 1.5rem;
    background: #dc2626;
    color: #fff;
    border: none;
    border-radius: 3px;
    font-family: 'DM Mono', monospace;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    position: relative;
    overflow: hidden;
  }

  .hd-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%);
    pointer-events: none;
  }

  .hd-btn:hover {
    background: #b91c1c;
    box-shadow: 0 4px 20px rgba(220,38,38,0.35);
    transform: translateY(-1px);
  }

  .hd-btn:active {
    transform: translateY(0);
    box-shadow: none;
  }

  .hd-result {
    margin-top: 1.5rem;
    border-radius: 3px;
    padding: 1.25rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    animation: fadeIn 0.4s ease both;
    border: 1px solid;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .hd-result--high {
    background: rgba(220,38,38,0.07);
    border-color: rgba(220,38,38,0.25);
  }

  .hd-result--low {
    background: rgba(22,163,74,0.07);
    border-color: rgba(22,163,74,0.25);
  }

  .hd-result--error {
    background: rgba(234,179,8,0.06);
    border-color: rgba(234,179,8,0.2);
  }

  .hd-result-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
    line-height: 1;
  }

  .hd-result-text {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .hd-result-title {
    font-family: 'DM Serif Display', serif;
    font-size: 1.1rem;
    font-weight: 400;
  }

  .hd-result--high .hd-result-title { color: #ef4444; }
  .hd-result--low  .hd-result-title { color: #4ade80; }
  .hd-result--error .hd-result-title { color: #facc15; }

  .hd-result-sub {
    font-size: 0.65rem;
    letter-spacing: 0.06em;
    color: #4a5260;
  }
`;

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/predictheartattack",
        formData,
      );
      const data = res.data.prediction;
      setPrediction(data);
    } catch (error) {
      console.error("Error:", error);
      setPrediction("Error connecting to the server.");
    }
  };

  const getResultProps = () => {
    if (prediction === "Error connecting to the server.")
      return {
        cls: "hd-result--error",
        icon: "⚡",
        title: "Connection Failed",
        sub: "Unable to reach the prediction server.",
      };
    if (prediction === 1)
      return {
        cls: "hd-result--high",
        icon: "⚠",
        title: "High Risk Detected",
        sub: "Elevated probability of heart disease.",
      };
    return {
      cls: "hd-result--low",
      icon: "✓",
      title: "Low Risk Detected",
      sub: "No significant indicators of heart disease.",
    };
  };

  return (
    <>
      <style>{styles}</style>
      <div className="hd-root">
        <div className="hd-card">
          <div className="hd-header">
            <div className="hd-eyebrow">Cardiac Assessment Tool</div>
            <h1 className="hd-title">
              Heart <em>Disease</em>
              <br />
              Predictor
            </h1>
            <p className="hd-subtitle">
              Enter patient vitals to generate a risk assessment
            </p>
          </div>

          <div className="hd-body">
            <form onSubmit={handleSubmit}>
              <div className="hd-section-label">Demographics</div>
              <div className="hd-grid-2">
                <div className="hd-field">
                  <label className="hd-label">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="hd-input"
                    required
                  />
                </div>
                <div className="hd-field">
                  <label className="hd-label">Sex</label>
                  <select
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    className="hd-select"
                    required
                  >
                    <option value="">Select</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
              </div>

              <div className="hd-section-label">Cardiac Indicators</div>
              <div className="hd-grid-2">
                <div className="hd-field">
                  <label className="hd-label">Chest Pain Type</label>
                  <select
                    name="chestPainType"
                    value={formData.chestPainType}
                    onChange={handleChange}
                    className="hd-select"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="ATA">ATA</option>
                    <option value="NAP">NAP</option>
                    <option value="TA">TA</option>
                    <option value="ASY">ASY</option>
                  </select>
                </div>
                <div className="hd-field">
                  <label className="hd-label">Resting ECG</label>
                  <select
                    name="restingECG"
                    value={formData.restingECG}
                    onChange={handleChange}
                    className="hd-select"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Normal">Normal</option>
                    <option value="ST">ST</option>
                  </select>
                </div>
                <div className="hd-field">
                  <label className="hd-label">Exercise Angina</label>
                  <select
                    name="exerciseAngina"
                    value={formData.exerciseAngina}
                    onChange={handleChange}
                    className="hd-select"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
                  </select>
                </div>
                <div className="hd-field">
                  <label className="hd-label">ST Slope</label>
                  <select
                    name="st_slope"
                    value={formData.st_slope}
                    onChange={handleChange}
                    className="hd-select"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Flat">Flat</option>
                    <option value="Up">Up</option>
                  </select>
                </div>
              </div>

              <div className="hd-section-label">Vitals</div>
              <div className="hd-grid-2">
                <div className="hd-field">
                  <label className="hd-label">Resting BP</label>
                  <input
                    type="number"
                    name="restingBP"
                    value={formData.restingBP}
                    onChange={handleChange}
                    className="hd-input"
                    required
                  />
                </div>
                <div className="hd-field">
                  <label className="hd-label">Cholesterol</label>
                  <input
                    type="number"
                    name="cholesterol"
                    value={formData.cholesterol}
                    onChange={handleChange}
                    className="hd-input"
                    required
                  />
                </div>
                <div className="hd-field">
                  <label className="hd-label">Max Heart Rate</label>
                  <input
                    type="number"
                    name="maxHR"
                    value={formData.maxHR}
                    onChange={handleChange}
                    className="hd-input"
                    required
                  />
                </div>
                <div className="hd-field">
                  <label className="hd-label">Oldpeak</label>
                  <input
                    type="number"
                    step="0.1"
                    name="oldpeak"
                    value={formData.oldpeak}
                    onChange={handleChange}
                    className="hd-input"
                    required
                  />
                </div>
              </div>

              <div className="hd-section-label">Blood Glucose</div>
              <div className="hd-field">
                <label className="hd-label">Fasting Blood Sugar (0 or 1)</label>
                <input
                  type="number"
                  name="fastingBS"
                  value={formData.fastingBS}
                  onChange={handleChange}
                  className="hd-input"
                  required
                />
              </div>

              <button type="submit" className="hd-btn">
                Run Prediction
              </button>
            </form>

            {prediction !== null &&
              (() => {
                const { cls, icon, title, sub } = getResultProps();
                return (
                  <div className={`hd-result ${cls}`}>
                    <div className="hd-result-icon">{icon}</div>
                    <div className="hd-result-text">
                      <div className="hd-result-title">{title}</div>
                      <div className="hd-result-sub">{sub}</div>
                    </div>
                  </div>
                );
              })()}
          </div>
        </div>
      </div>
    </>
  );
}
