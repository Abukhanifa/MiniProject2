import React, { useState } from 'react';
import axios from 'axios';

const ResumeMatch = () => {
  const [file, setFile] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleMatch = async () => {
    if (!file) return setError('Please upload your resume first.');
    const resumeForm = new FormData();
    resumeForm.append('resume', file);

    const token = localStorage.getItem('access_token');
    const vacancyId = localStorage.getItem('vacancyId');

    try {
      setLoading(true);
      const uploadRes = await axios.post('http://127.0.0.1:8000/resume/upload/', resumeForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      const resumeId = uploadRes.data.resume_id;

      const matchRes = await axios.post(
        'http://127.0.0.1:8000/resume/match/',
        { resume_id: resumeId, vacancy_id: vacancyId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFeedback(matchRes.data);
    } catch (err) {
      console.error(err);
      setError('Failed to match resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-4">Match Your Resume to This Vacancy</h2>

        <input
          type="file"
          onChange={handleFileChange}
          className="w-full border p-2 rounded mb-4"
        />

        <button
          onClick={handleMatch}
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Matching...' : 'Upload & Match'}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {feedback && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800">Match Results</h3>
            <p className="text-blue-600 font-bold mt-2">Match Score: {feedback.rating}/10</p>


            <div className="mt-4">
              <h4 className="font-semibold">Skill Gaps:</h4>
              <ul className="list-disc pl-5">
                {feedback.skill_gaps?.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold">Resume Formatting Suggestions:</h4>
              <ul className="list-disc pl-5">
                {feedback.formatting_suggestions?.map((suggestion, i) => (
                  <li key={i}>{suggestion}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold">Keyword Optimization:</h4>
              <ul className="list-disc pl-5">
                {feedback.keyword_optimization?.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold">Overall Resume Rating:</h4>
              <p className="text-green-600 font-bold">{feedback.rating}/10</p>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold">Recommendations:</h4>
              <ul className="list-disc pl-5">
                {feedback.recommendations?.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeMatch;
