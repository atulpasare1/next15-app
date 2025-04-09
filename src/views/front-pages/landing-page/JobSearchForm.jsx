'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function JobSearchForm() {
  const [jobtitle, setJobtitle] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('Your Experience'); // Replacing jobtype with experience
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure jobtitle is not empty
    if (!jobtitle) {
      console.error('Job title is required');
      return;
    }

    const formattedJobtitle = jobtitle.trim().replace(/\s+/g, '-').toLowerCase();
    const formattedLocation = location.trim().replace(/\s+/g, '-').toLowerCase();
    const formattedExperience = experience.trim().replace(/\s+/g, '-').toLowerCase();

    let searchUrl = `/${formattedJobtitle}-jobs`;

    if (formattedLocation) {
      searchUrl = `${searchUrl}-in-${formattedLocation}`;
    }

    if (formattedExperience && formattedExperience !== 'your-experience') {
      searchUrl = `${searchUrl}-${formattedExperience}`;
    }

    // Ensure the search URL is correctly formed before navigating
    console.log('Navigating to:', searchUrl);
    router.push(searchUrl);
  };

  return (
    <div className="max-w-4xl mx-auto p-4   flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white rounded-lg shadow-md p-2 flex items-center border border-gray-200">
        {/* Search Input (Job Title) */}
        <div className="flex-1 flex items-center border-r border-gray-200 pr-2">
          <input
            type="text"
            placeholder="Search jobs by 'compar'"
            value={jobtitle}
            onChange={(e) => setJobtitle(e.target.value)}
            className="w-full p-2 outline-none text-gray-700 placeholder-gray-400"
          />
          <svg
            className="w-5 h-5 text-gray-400 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z"
            ></path>
          </svg>
        </div>

        {/* Experience Dropdown */}
        <div className="flex items-center border-r border-gray-200 px-2">
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="p-2 outline-none text-gray-700 bg-white appearance-none"
          >
            <option>Your Experience</option>
            <option>0-1 Years</option>
            <option>1-3 Years</option>
            <option>3-5 Years</option>
            <option>5+ Years</option>
          </select>
          <svg
            className="w-5 h-5 text-gray-400 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>

        {/* Location Input */}
        <div className="flex-1 flex items-center border-r border-gray-200 px-2">
          <input
            type="text"
            placeholder="Search for an area or..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 outline-none text-gray-700 placeholder-gray-400"
          />
          <svg
            className="w-5 h-5 text-gray-400 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1 1 0 01-1.414 0l-4.243-4.243a8 8 0 1111.314 0z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-r-lg hover:bg-green-700 transition-colors"
        >
          Search jobs
        </button>
      </form>
    </div>
  );
}
