'use client';
import JobCard from '@/components/job/JobCard';
import SearchBar from '@/components/job/SearchBar';
import React, { useState, useEffect } from 'react';
import apiService, { endpoints } from '@/libs/apiService';
import { useRouter,useParams, usePathname } from 'next/navigation';

const JobSearchResult = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [jobtitle, setJobtitle] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('Your Experience');
  const [companyName, setCompanyName] = useState("");
  const router = useRouter();
// Get dynamic params and pathname
const params = useParams();
const pathname = usePathname();
  // Extract values from URL and fetch jobs
  useEffect(() => {
    // Reset state to avoid stale values
    setJobtitle("");
    setLocation("");
    setCompanyName("");

    // Handle route: /[keyword]-jobs (e.g., /java-jobs)
    if (pathname.match(/\/[^/]+-jobs$/)) {
      const keyword = params.keyword;
      if (keyword) {
        // Convert keyword to readable format (e.g., "java" -> "Java")
        const formattedJobtitle = keyword
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        setJobtitle(formattedJobtitle);
      }
    }
    // Handle route: /[keyword]-jobs-in-[location] (e.g., /java-jobs-in-india)
    else if (pathname.match(/\/[^/]+-jobs-in-[^/]+$/)) {
      const keyword = params.keyword;
      const location = params.location;
      if (keyword) {
        const formattedJobtitle = keyword
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        setJobtitle(formattedJobtitle);
      }
      if (location) {
        const formattedLocation = location
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        setLocation(formattedLocation);
      }
    }
    // Handle route: /jobs-by-[companyName] (e.g., /jobs-by-iitjobs-inc)
    else if (pathname.match(/\/jobs-by-[^/]+$/)) {
      const company = params.companyName;
      if (company) {
        const formattedCompanyName = company
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        setCompanyName(formattedCompanyName);
      }
    }

    // Fetch jobs after setting parameters
    fetchJobs();
  }, [pathname, params]);

  // Fetch jobs based on current state
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await apiService.get(endpoints.job.searchJobs, {
        params: {
          k: jobtitle || undefined,
          l: location || undefined,
          exp: experience !== 'Your Experience' ? experience : undefined,
        },
      });
      console.log('Fetched jobs:', response.data);
      const data = Array.isArray(response.data) ? response.data.data : [];
      setJobs(data);
      console.log('Fetched jobs:', data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // // Handle form submission from SearchBar
  // const handleSearchSubmit = (newJobtitle, newLocation, newExperience) => {
  //   setJobtitle(newJobtitle);
  //   setLocation(newLocation);
  //   setExperience(newExperience);
  //   fetchJobs(); // Refetch jobs with new parameters

  //   const formattedJobtitle = newJobtitle.trim().replace(/\s+/g, '-').toLowerCase();
  //   const formattedLocation = newLocation.trim().replace(/\s+/g, '-').toLowerCase();
  //   const formattedExperience = newExperience.trim().replace(/\s+/g, '-').toLowerCase();

  //   let searchUrl = `/${formattedJobtitle}-jobs`;
  //   if (formattedLocation) searchUrl += `-in-${formattedLocation}`;
  //   if (formattedExperience && formattedExperience !== 'your-experience') searchUrl += `-${formattedExperience}`;

  //   console.log('Navigating to:', searchUrl);
  //   router.push(searchUrl);
  // };

  // Handle form submission and navigate to appropriate route
  const handleSearchSubmit = (newJobtitle, newLocation, newCompanyName) => {
    // Update state
    setJobtitle(newJobtitle);
    setLocation(newLocation);
    setCompanyName(newCompanyName);

    // Format inputs for URL (convert to kebab-case)
    const formattedJobtitle = newJobtitle
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();
    const formattedLocation = newLocation
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();
    const formattedCompanyName = newCompanyName
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();

    let searchUrl = "";

    // Determine route based on inputs
    if (formattedCompanyName && !formattedJobtitle && !formattedLocation) {
      // Route 3: /jobs-by-[companyName]
      searchUrl = `/jobs-by-${formattedCompanyName}`;
    } else if (formattedJobtitle && formattedLocation) {
      // Route 2: /[keyword]-jobs-in-[location]
      searchUrl = `/${formattedJobtitle}-jobs-in-${formattedLocation}`;
    } else if (formattedJobtitle) {
      // Route 1: /[keyword]-jobs
      searchUrl = `/${formattedJobtitle}-jobs`;
    } else {
      // Fallback: Redirect to a default route or homepage
      searchUrl = "/jobs";
    }

    // Navigate to the new URL
    console.log("Navigating to:", searchUrl);
    router.push(searchUrl);

    // Fetch jobs immediately with new parameters
    fetchJobs(newJobtitle, newLocation, newCompanyName);
  };

  // Mock fetchJobs function (replace with your actual implementation)

  // Example form to test handleSearchSubmit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newJobtitle = formData.get("jobtitle") || "";
    const newLocation = formData.get("location") || "";
    const newCompanyName = formData.get("companyName") || "";
    handleSearchSubmit(newJobtitle, newLocation, newCompanyName);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 min-h-screen">
      {/* Header for Mobile */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{loading ? 'Loading...' : `${jobs.length} search results`}</h1>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="bg-gray-200 p-2 rounded-lg"
        >
          Filters
        </button>
      </div>

      {/* SearchBar with submit handler */}
      <SearchBar onSubmit={handleSearchSubmit} initialJobtitle={jobtitle} initialLocation={location} initialExperience={experience} />

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
        {loading ? (
            <p>Loading jobs...</p>
          ) : Array.isArray(jobs) && jobs.length > 0 ? (
            jobs.map((job, index) => <JobCard key={index} job={job} />)
          ) : (
            <p>No jobs found.</p>
          )}
        </div>

        {/* Hidden on mobile */}
        <div className="hidden md:block w-1/4 bg-blue-50 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Login with iitjobs and experience more !</h2>
          <ul className="text-blue-700 list-disc list-inside mb-4">
            <li>Personalised job matches</li>
            <li>Direct connect with HRs</li>
            <li>Latest updates on the job</li>
          </ul>
          <div className="bg-gray-200 p-4 rounded-lg mb-4"></div>
          <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
            Create profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobSearchResult;
