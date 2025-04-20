import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-10">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-6">About This Project</h1>

        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          This platform harnesses the power of artificial intelligence to revolutionize how resumes are evaluated and matched with job opportunities. Whether you're a job seeker looking to refine your resume or a company searching for top-tier talent, this solution simplifies the process with intelligent automation.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          By analyzing uploaded resumes, it provides tailored feedback on formatting, relevant skills, and compatibility with specific job descriptions. Built on a robust backend powered by Django and Django Rest Framework, it ensures reliable performance and secure user experiences.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed">
          The frontend is crafted using modern JavaScript frameworks like React, Vue, or Next.js, offering flexibility and smooth interactivity. Behind the scenes, the system leverages multiple databases to handle data efficiently, ensuring fast and accurate responses for both candidates and recruiters.
        </p>
      </div>
    </div>
  );
};

export default About;
