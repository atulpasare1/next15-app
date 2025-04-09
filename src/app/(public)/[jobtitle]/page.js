'use client';
import JobSearchForm from '@/views/front-pages/landing-page/JobSearchForm';
import React, { useState } from 'react';

const JobCard = ({ title, company, location, salary, type, experience, language, urgency }) => (
  <div className="bg-white p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">{company}</p>
      </div>
      <span className="text-green-500 text-sm font-medium"></span>
    </div>
    <div className="text-gray-600 text-sm mt-2">
      <p>{location}</p>
      <p>{salary}</p>
    </div>
    <div className="flex items-center text-sm text-gray-500 mt-2">
      <span className="mr-2">{type}</span> •
      <span className="mx-2">{experience}</span> •
      <span className="ml-2">{language}</span>
    </div>
    {urgency && (
      <span className="inline-block bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded mt-2">
        {urgency}
      </span>
    )}
  </div>
);

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-4  min-h-screen">
      {/* Header for Mobile */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">500+ search results</h1>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="bg-gray-200 p-2 rounded-lg"
        >
          Filters
        </button>
      </div>
      <JobSearchForm />
      {/* Drawer for Filters (Mobile) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white p-4 shadow-lg transform ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50 md:hidden`}
      >
        <button
          onClick={() => setIsDrawerOpen(false)}
          className="mb-4 text-red-500"
        >
          Close
        </button>
        <h2 className="text-lg font-semibold mb-2">Filters</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Experience</label>
          <input
            type="range"
            min="0"
            max="31"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-sm text-gray-600">0 years - 31 years</div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Date posted</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="radio" name="date" className="mr-2" defaultChecked />
              All
            </label>
            <label className="flex items-center">
              <input type="radio" name="date" className="mr-2" />
              Last 24 hours
            </label>
            <label className="flex items-center">
              <input type="radio" name="date" className="mr-2" />
              Last 3 days
            </label>
            <label className="flex items-center">
              <input type="radio" name="date" className="mr-2" />
              Last 7 days
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Salary</label>
          <input
            type="range"
            min="0"
            max="150000"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-sm text-gray-600">₹0 - ₹1.5 Lakhs</div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Highest education</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="radio" name="education" className="mr-2" />
              10 or Below 10th
            </label>
          </div>
        </div>
      </div>

      {/* Overlay for Drawer */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsDrawerOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        {/* Hidden on mobile, shown on desktop */}
        <div className="hidden md:block w-1/4 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Filters</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Experience</label>
            <input
              type="range"
              min="0"
              max="31"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-sm text-gray-600">0 years - 31 years</div>
          </div>
          {/* Add other filter sections here as in the drawer */}
        </div>

        {/* Job Listings */}
        <div className="w-full md:w-2/4 space-y-4">
          <JobCard
            title="Full Stack Java Developer"
            company="InnoShri"
            location="Baner, Pune"
            salary="₹15,000 - ₹40,000 monthly"
            type="Work from Office"
            experience="Min. 1 year"
            language="Basic English"
          />
          <JobCard
            title="Java Backend Developer"
            company="JioFin Limited"
            location="Gurgaon/Gurugram"
            salary="₹60,000 - ₹140,000 monthly"
            type="Work from Office"
            experience="Min. 5 years"
            language="Good Intermediate / Ac"
            urgency="Urgently hiring"
          />
          <JobCard
            title="Full Stack Web Developer"
            company="Digital Software Solution"
            location="Sikandra, Agra"
            salary="₹15,000 - ₹20,000 monthly"
            type="Work from Office"
            experience="Min. 1 year"
            language="Basic English"
            urgency="Urgently hiring"
          />
        </div>

        {/* Hidden on mobile */}
        <div className="hidden md:block w-1/4 bg-blue-50 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Login with Apna and experience more !</h2>
          <ul className="text-blue-700 list-disc list-inside mb-4">
            <li>Personalised job matches</li>
            <li>Direct connect with HRs</li>
            <li>Latest updates on the job</li>
          </ul>
          <div className="bg-gray-200 p-4 rounded-lg mb-4">

          </div>
          <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
            Create profile &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
