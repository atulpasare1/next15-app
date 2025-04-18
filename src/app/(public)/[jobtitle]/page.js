'use client';
import JobCard from '@/components/job/JobCard';
import SearchBar from '@/components/job/SearchBar';
import React, { useState, useEffect } from 'react';
import apiService, { endpoints } from '@/libs/apiService';
import { useRouter,useParams,useSearchParams, usePathname } from 'next/navigation';
import { from } from 'stylis';

const JobSearchResult = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [jobtitle, setJobtitle] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('Your Experience');
  const [companyName, setCompanyName] = useState("");
  const [filters, setFilters] = useState({});
  const [queryFilters, setQueryFilters] = useState({});
  const [totalPages, setTotalPages] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalItems: 0,
    currentpge: 1,
    from: 0,
    to:0
  });
  const router = useRouter();
// Get dynamic params and pathname
//const params = useParams();
const pathname = usePathname();
// Mock params for dynamic routes (replace with actual params from Next.js dynamic routes)
const params = {
  jobtitle: pathname.split('/')[1]?.replace('-jobs', '') || '',
};

// Fetch jobs with specific parameters, including query filters
const fetchJobsWithParams = async (jobKeyword, jobLocation, jobCompany, queryFilters = {}) => {
  setLoading(true);
  try {
    // Create a clean params object without undefined values
    const params = {};

    // Add path-based parameters
    if (jobKeyword) params.k = jobKeyword;
    if (jobLocation) params.l = jobLocation;
    if (jobCompany) params.k = jobCompany; // Using 'k' for company as per your logic

    // Add query-based parameters
    Object.entries(queryFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        params[key] = value; // API expects array values (e.g., is_remote: ['1', '3', '0'])
      } else {
        params[key] = value;
      }
    });

    // Build query string, handling array parameters correctly
    const queryString = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => queryString.append(`${key}[]`, val));
      } else {
        queryString.append(key, value);
      }
    });

    // Make direct fetch request to the API
    const apiUrl = `https://testxlake.iitjobs.com/api${endpoints.job.searchJobs}${queryString ? '?' + queryString : ''}`;
    console.log('Fetching from URL:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const responseData = await response.json();
    console.log('API Response:', responseData);

    // Check if response data exists and has the expected structure
    if (!responseData || !responseData.data || !responseData.data.jobs) {
      console.error('Unexpected API response format:', responseData);
      setJobs([]);
      return;
    }

    // Handle no jobs found
    if (responseData.data.jobs.length === 0) {
      console.log('No jobs found with the current parameters. Trying alternative approach...');
      if (jobCompany && !jobKeyword && !jobLocation) {
        const keywordFromCompany = jobCompany.split(' ')[0];
        console.log('Trying search with keyword instead:', keywordFromCompany);
        return fetchJobsWithParams(keywordFromCompany, '', '', queryFilters);
      }
    }

    console.log('Fetched jobs:', responseData);

    setJobs(
      responseData.data.jobs.map((jobs) => {
        const job = jobs._source;
        return {
          id: job.id,
          cmp_id: job.company_id,
          companyLogo: job.company_logo,
          job_title: job.job_title,
          company_name: job.company_name,
          job_location: job.job_location,
          min_salary_offered: job.min_salary_offered,
          max_salary_offered: job.max_salary_offered,
          skills: job.skills,
          experience: job.experience,
          job_description: job.job_description,
          posted_date: job.posted_date || '1 Day Ago',
        };
      })
    );
    // Assume API returns total_pages or similar (adjust based on actual response)
    setTotalPages(responseData.data.pagination.total || 1);
    setPagination({
      currentPage: responseData.data.pagination.current_page || 1,
      totalPages: responseData.data.pagination.last_page   || 1,
      pageSize: responseData.data.pagination.page_size || 10,
      totalItems: responseData.data.pagination.total || 0,
      from: responseData.data.pagination.from || 0,
      to: responseData.data.pagination.to || 0,
    });
  } catch (err) {
    console.error('Error fetching jobs:', err);
    console.error('Error details:', { message: err.message });
    setJobs([]);
  } finally {
    setLoading(false);
  }
};

// Regular fetchJobs that uses the current state
const fetchJobs = async () => {
  setLoading(true);
  try {
    const params = {};
    if (jobtitle) params.k = jobtitle;
    if (location) params.l = location;
    if (companyName) params.company = companyName;

    // Include query filters from state
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        params[key] = value;
      } else {
        params[key] = value;
      }
    });

    const queryString = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => queryString.append(`${key}[]`, val));
      } else {
        queryString.append(key, value);
      }
    });

    const apiUrl = `https://testxlake.iitjobs.com/api${endpoints.job.searchJobs}${queryString ? '?' + queryString : ''}`;
    console.log('Fetching from URL:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const responseData = await response.json();
    console.log('API Response:', responseData);

    if (!responseData || !responseData.data || !responseData.data.jobs) {
      console.error('Unexpected API response format:', responseData);
      setJobs([]);
      return;
    }

    console.log('Fetched jobs:', responseData);

    setJobs(
      responseData.data.jobs.map((jobs) => {
        const job = jobs._source;
        return {
          id: job.id,
          cmp_id: job.company_id,
          companyLogo: job.company_logo,
          job_title: job.job_title,
          company_name: job.company_name,
          job_location: job.job_location,
          min_salary_offered: job.min_salary_offered,
          max_salary_offered: job.max_salary_offered,
          skills: job.skills,
          experience: job.experience,
          job_description: job.job_description,
          posted_date: job.posted_date || '1 Day Ago',
        };
      })
    );
  } catch (err) {
    console.error('Error fetching jobs:', err);
    console.error('Error details:', { message: err.message });
    setJobs([]);
  } finally {
    setLoading(false);
  }
};
// Update URL with new page
const updatePage = (newPage) => {
  const newParams = new URLSearchParams(searchParams);
  newParams.set('page', newPage);
  router.push(`${pathname}?${newParams.toString()}`);
};

useEffect(() => {
  // Reset state to avoid stale values
  setJobtitle('');
  setLocation('');
  setCompanyName('');
  setFilters({});

  let jobKeyword = '';
  let jobLocation = '';
  let jobCompany = '';
  const queryFilters = {};

  // Extract query parameters
  searchParams.forEach((value, key) => {
    const baseKey = key.replace('[]', '');
    if (key.includes('[]')) {
      if (!queryFilters[baseKey]) queryFilters[baseKey] = [];
      queryFilters[baseKey].push(value);
    } else {
      queryFilters[key] = value;
    }
  });

  console.log('Extracted query filters:', queryFilters);

  // Handle route: /[keyword]-jobs (e.g., /java-jobs)
  if (pathname.match(/\/[^/]+-jobs$/)) {
    const keyword = params.jobtitle;
    if (keyword) {
      const formattedKeyword = keyword
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      setJobtitle(formattedKeyword);
      jobKeyword = formattedKeyword;
    }
  }
  // Handle route: /[keyword]-jobs-in-[location] (e.g., /java-jobs-in-bangalore)
  else if (pathname.match(/\/[^/]+-jobs-in-[^/]+$/)) {
    const keyword = params.jobtitle;
    const locationMatch = pathname.match(/jobs-in-([^/]+)$/);
    const location = locationMatch ? locationMatch[1] : '';

    if (keyword) {
      const formattedKeyword = keyword
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      setJobtitle(formattedKeyword);
      jobKeyword = formattedKeyword;
    }

    if (location) {
      const formattedLocation = location
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      setLocation(formattedLocation);
      jobLocation = formattedLocation;
    }
  }
  // Handle route: /jobs-by-[companyName] (e.g., /jobs-by-iitjobs-inc)
  else if (pathname.match(/\/jobs-by-[^/]+$/)) {
    const companyMatch = pathname.match(/\/jobs-by-([^/]+)$/);
    const company = companyMatch ? companyMatch[1] : '';

    if (company) {
      const formattedCompanyName = company
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      const originalCompanyName = company.replace(/-/g, ' ');
      setCompanyName(formattedCompanyName);
      jobCompany = originalCompanyName;
    }
  }

  console.log('Extracted parameters:', { jobKeyword, jobLocation, jobCompany, queryFilters });

  // Store query filters in state
  setFilters(queryFilters);

  // Fetch jobs with all parameters
  fetchJobsWithParams(jobKeyword, jobLocation, jobCompany, queryFilters);
}, [pathname, searchParams]);

// Generate numbered page links (e.g., 1, 2, 3, ..., totalPages)
const renderPageLinks = () => {
  const currentPage = Number(filters.page || 1);
  const maxPagesToShow = 5; // Limit number of page links
  const pages = [];
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => updatePage(i)}
        disabled={i === currentPage}
        style={{
          margin: '0 5px',
          padding: '5px 10px',
          background: i === currentPage ? '#007bff' : '#fff',
          color: i === currentPage ? '#fff' : '#007bff',
          border: '1px solid #007bff',
          borderRadius: '4px',
          cursor: i === currentPage ? 'default' : 'pointer',
        }}
      >
        {i}
      </button>
    );
  }

  return pages;
};

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
    fetchJobs();
  };

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

      {/* Search Bar */}
      <SearchBar onSubmit={handleSearchSubmit} initialJobtitle={jobtitle} initialLocation={location} initialExperience={experience} />

      {/* Drawer for Filters (Mobile) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white p-4 shadow-lg transform ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50 md:hidden`}
      >
        <button onClick={() => setIsDrawerOpen(false)} className="mb-4 text-red-500">
          Close
        </button>
        <FilterContent />
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsDrawerOpen(false)}></div>
      )}

      {/* Main Content */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        {/* Sidebar Filters (Desktop) */}
        <div className="hidden md:block w-1/4  p-4 rounded-lg ">
          <FilterContent />
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
      </div>
         {/* Pagination Controls */}
         <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={() => updatePage(Number(filters.page || 1) - 1)}
          disabled={Number(filters.page || 1) <= 1}
          style={{
            margin: '0 10px',
            padding: '5px 10px',
            background: Number(filters.page || 1) <= 1 ? '#ccc' : '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: Number(filters.page || 1) <= 1 ? 'not-allowed' : 'pointer',
          }}
        >
          Previous
        </button>

        {renderPageLinks()}

        <button
          onClick={() => updatePage(Number(filters.page || 1) + 1)}
          disabled={Number(filters.page || 1) >= totalPages}
          style={{
            margin: '0 10px',
            padding: '5px 10px',
            background: Number(filters.page || 1) >= totalPages ? '#ccc' : '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: Number(filters.page || 1) >= totalPages ? 'not-allowed' : 'pointer',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

// FILTER CONTENT COMPONENT (Used for both mobile + desktop)
function FilterContent() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2H3V4zm0 6h18v2H3v-2zm0 6h18v2H3v-2z" />
        </svg>
        Filter
      </h2>

      <div className="border-t pt-4">
        <DisclosureSection title="Work Mode" position={1}>
          {["Remote", "Hybrid", "In-Person"].map((option) => (
            <CheckboxOption key={option} label={option} />
          ))}
        </DisclosureSection>

        <DisclosureSection title="Job Type" position={2}>
          {["Full-Time", "Part-Time", "Contract", "Internship"].map((option) => (
            <CheckboxOption key={option} label={option} />
          ))}
        </DisclosureSection>

        <DisclosureSection title="Date Posted" position={3}>
          {["Last 24 hours", "Last 3 days", "Last 7 days", "Last 14 days"].map((option) => (
            <CheckboxOption key={option} label={option} />
          ))}
        </DisclosureSection>
      </div>
    </div>
  );
}

// DROPDOWN COMPONENT
function DisclosureSection({ title, children, position }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-2">
      <button
        className="w-full flex justify-between items-center text-left font-medium text-gray-800 bg-transparent focus:outline-none focus:ring-0 shadow-none pb-2"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm">{title}</span>
        <span className="text-sm">{open ? '▾' : '▸'}</span>
      </button>



      {open && (
        <div className="space-y-1 pl-2 text-sm text-gray-700">
          {children}
        </div>
      )}
       {/* Show horizontal line only when open and position is 1 or 2 */}
       {open && position < 3 && <div className="border-b border-gray-300 mb-2 mt-2"></div>}
    </div>
  );
}


// CHECKBOX COMPONENT
function CheckboxOption({ label }) {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" />
      <span>{label}</span>
    </label>
  );

};



export default JobSearchResult;
