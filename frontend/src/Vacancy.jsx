import React from 'react';
import { useNavigate } from 'react-router-dom';

const VacancyCard = ({ vacancy, userRole }) => {
  const navigate = useNavigate();

  const skillsArray = vacancy.required_skills
    ? vacancy.required_skills.split(',').map((skill) => skill.trim())
    : [];

  const handleMatch = () => {
    localStorage.setItem('vacancyId', vacancy.id);
    navigate('/match-resume');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mb-6">
      <h3 className="text-xl font-bold text-gray-800">{vacancy.title}</h3>
      <p className="text-gray-600 my-2">{vacancy.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-gray-500 text-sm">{vacancy.job_type}</span>
        <span className="text-gray-500 text-sm">{vacancy.location || 'Location not specified'}</span>
      </div>
      <div className="mt-4">
        <h4 className="text-md font-semibold text-gray-700">Required Skills:</h4>
        <ul className="list-disc pl-5 text-sm text-gray-600">
          {skillsArray.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="text-md font-semibold text-gray-700">Experience Required:</h4>
        <p className="text-gray-600">{vacancy.experience_required} years</p>
      </div>
      {vacancy.salary_min || vacancy.salary_max ? (
        <div className="mt-4">
          <h4 className="text-md font-semibold text-gray-700">Salary:</h4>
          <p className="text-gray-600">
            {vacancy.salary_min ? `$${vacancy.salary_min}` : 'Negotiable'} -{' '}
            {vacancy.salary_max ? `$${vacancy.salary_max}` : 'Negotiable'}
          </p>
        </div>
      ) : null}

      {/* Only show "Match Me" button to job seekers */}
      {userRole === 'job_seeker' && (
        <div className="mt-4 text-right">
          <button
            onClick={handleMatch}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Match Me!
          </button>
        </div>
      )}
    </div>
  );
};

const Vacancies = () => {
  const [vacancies, setVacancies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [userRole, setUserRole] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch user profile to get role
        const profileRes = await fetch('http://127.0.0.1:8000/users/api/profile/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        if (!profileRes.ok) throw new Error('Failed to fetch user profile');
        const profileData = await profileRes.json();
        setUserRole(profileData.role); // Assuming "role" is in the response

        // 2. Fetch vacancies
        const vacanciesRes = await fetch('http://127.0.0.1:8000/vacancies/vacancies/');
        if (!vacanciesRes.ok) throw new Error('Failed to fetch vacancies');
        const vacanciesData = await vacanciesRes.json();
        setVacancies(vacanciesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading vacancies...</div>;
  }

  if (error) {
    return <div className="text-center text-lg font-semibold text-red-500">{error}</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-8">
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Vacancies</h2>
        <div className="space-y-6">
          {vacancies.map((vacancy) => (
            <VacancyCard key={vacancy.id} vacancy={vacancy} userRole={userRole} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vacancies;
