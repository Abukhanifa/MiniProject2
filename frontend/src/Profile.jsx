import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userVacancies, setUserVacancies] = useState([]);
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileAndVacancies = async () => {
      try {
        const userRes = await axios.get('http://localhost:8000/users/api/profile/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo(userRes.data);

        const vacanciesRes = await axios.get('http://localhost:8000/vacancies/vacancies/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userId = userRes.data.id;
        const filteredVacancies = vacanciesRes.data.filter(
          (vacancy) => vacancy.recruiter === userId
        );
        setUserVacancies(filteredVacancies);
      } catch (err) {
        console.error('Error:', err);
      }
    };

    if (token) fetchProfileAndVacancies();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/vacancies/vacancies/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserVacancies((prev) => prev.filter((vacancy) => vacancy.id !== id));
    } catch (err) {
      console.error('Error deleting vacancy:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Profile</h1>

      {/* User Info */}
      {userInfo && (
        <div className="bg-gray-100 p-4 rounded shadow mb-6">
          <p><strong>Username:</strong> {userInfo.username}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
        </div>
      )}

      {/* Vacancies Section */}
      {(userInfo?.role === 'recruiter' || userInfo?.role === 'admin') && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Your Vacancies</h2>
            <button
              onClick={() => navigate('/vacancies/create')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              + New Vacancy
            </button>
          </div>

          {userVacancies.length === 0 ? (
            <p className="text-gray-600">You have not posted any vacancies yet.</p>
          ) : (
            <ul className="space-y-4">
              {userVacancies.map((vacancy) => (
                <li key={vacancy.id} className="border p-4 rounded shadow">
                  <h3 className="text-lg font-bold">{vacancy.title}</h3>
                  <p className="text-gray-700">{vacancy.description}</p>
                  <p className="text-sm text-gray-500">
                    Location: {vacancy.location} | Type: {vacancy.job_type}
                  </p>
                  <p className="text-sm text-gray-500">
                    Salary: ${vacancy.salary_min} - ${vacancy.salary_max}
                  </p>
                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={() => navigate(`/vacancies/edit/${vacancy.id}`)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(vacancy.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
