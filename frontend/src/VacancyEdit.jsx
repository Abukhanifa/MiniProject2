import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VacancyEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ⬅️ For navigation
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    required_skills: '',
    experience_required: '',
    location: '',
    job_type: 'full_time',
    salary_min: '',
    salary_max: ''
  });

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/vacancies/vacancies/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(response.data);
      } catch (err) {
        console.error('Error fetching vacancy:', err);
      }
    };

    if (id) fetchVacancy();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/vacancies/vacancies/${id}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Vacancy updated successfully!');
      navigate('/profile'); // ⬅️ Redirect to profile page after update
    } catch (err) {
      console.error('Error updating vacancy:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Vacancy</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded-md" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded-md" />
        <input name="required_skills" value={formData.required_skills} onChange={handleChange} placeholder="Required Skills" className="w-full p-2 border rounded-md" />
        <input name="experience_required" value={formData.experience_required} onChange={handleChange} placeholder="Experience (years)" className="w-full p-2 border rounded-md" />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="w-full p-2 border rounded-md" />
        <select name="job_type" value={formData.job_type} onChange={handleChange} className="w-full p-2 border rounded-md">
          <option value="full_time">Full-Time</option>
          <option value="part_time">Part-Time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
          <option value="remote">Remote</option>
        </select>
        <input name="salary_min" value={formData.salary_min} onChange={handleChange} placeholder="Salary Min" type="number" className="w-full p-2 border rounded-md" />
        <input name="salary_max" value={formData.salary_max} onChange={handleChange} placeholder="Salary Max" type="number" className="w-full p-2 border rounded-md" />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700">Update Vacancy</button>
      </form>
    </div>
  );
};

export default VacancyEdit;

