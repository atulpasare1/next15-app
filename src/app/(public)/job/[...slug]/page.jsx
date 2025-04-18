"use client";

import { useParams } from "next/navigation";
import Head from "next/head";
import { Box, Typography, Chip, Button, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import useSWR from "swr";
import Link from "@/components/Link";

// Utility function to slugify company name
const slugifyCompanyName = (name) => {
  if (!name) return "";
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

// Mock data as fallback
const mockJob = {
  id: "123",
  title: "Senior Java Developer",
  company: "TechCorp",
  companyId: "456",
  companySlug: "techcorp-456",
  company_logo: "https://iitjobs.com/employer/media/company_docs/456/techcorp-logo.png",
  company_url: "https://techcorp.com",
  location: "Remote, USA",
  description: `
    <strong>Mandatory Qualifications :</strong><br/>
    <strong>Financial Services Expertise:</strong><br/>
    Experience working in the financial services industry.<br/>
    Familiarity with financial fraud concepts and related terminology.<br/><br/>
    <strong>Java Development:</strong><br/>
    5+ years of hands-on Java development experience.<br/>
    Spring Framework for distributed architectures.<br/>
    Working with streaming frameworks like Apache, Flink, and Kafka.<br/><br/>
    <strong>Database Knowledge:</strong><br/>
    Proficient with relational databases such as DB2, Oracle, or PostgreSQL.<br/>
    Experience with NoSQL databases like Cassandra.<br/><br/>
    <strong>System Knowledge:</strong><br/>
    Comfortable with both Windows and Linux environments.<br/><br/>
    <strong>Agile Development:</strong><br/>
    Understanding of Agile methodology and expertise with JIRA.
  `,
  keySkills: [
    "Java",
    "Apache",
    "Flink",
    "Kafka",
    "Db2",
    "Oracle",
    "PostgreSQL",
    "Cassandra",
    "Windows",
    "Linux",
  ],
  education: "Any Graduate",
  postedOn: "Today",
  experience: "10+ years of experience",
  openings: 2,
  category: "Java Developer",
  tenure: "Flexible Position",
};

// Custom fetcher for POST request with job_id
const fetcher = async (url, jobId) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ job_id: jobId }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch job details");
  }

  const all = await response.json();
  const data = all.data._source;

  const companyName = data.company_name || "Unknown";
  const companyId = data.company_id || "unknown";
  const companySlug = `${slugifyCompanyName(companyName)}-${companyId}`;

  return {
    id: data.jobId || jobId,
    title: data.job_title || "Unknown",
    company: data.company_name || "Unknown",
    companyId: data.company_id || "unknown",
    companySlug: companySlug,
    company_logo: data.company_logo
      ? `https://iitjobs.com/employer/media/company_docs/${data.company_id}/${data.company_logo}`
      : "/logo.png",
    company_url: data.company_url || "https://iitjobs.com",
    location: data.jobLocation || "Remote",
    description: data.description || "No description available",
    keySkills: data.skills
      ? data.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== "")
      : [],
    education: data.education || "Not specified",
    postedOn: data.postedDate || "Unknown",
    experience: data.experience || "Not specified",
    openings: data.vacancies || 1,
    category: data.job_category || "Not specified",
    tenure: data.jobTenure || "Not specified",
  };
};

// Utility function to strip HTML tags for meta description
const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "").substring(0, 160);
};

export default function JobDetailPage() {
  const { slug } = useParams();
  let jobId = null;

  if (slug && Array.isArray(slug) && slug.length > 0) {
    const parts = slug[0].split("-");
    jobId = parts.pop();
  }

  const { data: job, error } = useSWR(
    jobId ? [`https://testxlake.iitjobs.com/api/job-details`, jobId] : null,
    ([url, jobId]) => fetcher(url, jobId),
    {
      fallbackData: mockJob,
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  if (error) {
    console.error("Error fetching job details:", error);
    return <div className="text-center py-10">Error loading job</div>;
  }
  if (!job) return <div className="text-center py-10">Loading...</div>;

  // Generate JobPosting schema
  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: stripHtml(job.description),
    datePosted: job.postedOn === "Today" ? new Date().toISOString().split("T")[0] : job.postedOn,
    hiringOrganization: {
      "@type": "Organization",
      name: job.company,
      sameAs: job.company_url,
      logo: job.company_logo,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        addressCountry: "US",
      },
    },
    employmentType: job.tenure || "FULL_TIME",
    experienceRequirements: {
      "@type": "OccupationalExperienceRequirements",
      yearsOfExperience: job.experience.match(/\d+/)?.[0] || 0,
    },
    educationRequirements: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: job.education || "Not specified",
    },
    skills: job.keySkills.join(", "),
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        minValue: 0,
        maxValue: 0,
        unitText: "YEAR",
      },
    },
    jobLocationType: job.location.includes("Remote") ? "TELECOMMUTE" : undefined,
    url: `https://testxlake.iitjobs.com/job/${slug[0]}`,
  };

  // Clean up schema by removing undefined or empty fields
  Object.keys(jobSchema).forEach((key) => {
    if (jobSchema[key] === undefined || jobSchema[key] === "") {
      delete jobSchema[key];
    }
  });

  return (
    <>
      <Head>
        {/* Title */}
        <title>{`${job.title} at ${job.company} - IITJobs`}</title>

        {/* Meta Tags */}
        <meta
          name="description"
          content={`Apply for ${job.title} at ${job.company} in ${job.location}. ${stripHtml(job.description)}`}
        />
        <meta name="keywords" content={`${job.title}, ${job.company}, ${job.keySkills.join(", ")}, job, career`} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph */}
        <meta property="og:title" content={`${job.title} at ${job.company}`} />
        <meta
          property="og:description"
          content={`Apply for ${job.title} at ${job.company} in ${job.location}. ${stripHtml(job.description)}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://testxlake.iitjobs.com/job/${slug[0]}`} />
        <meta property="og:image" content={job.company_logo} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${job.title} at ${job.company}`} />
        <meta
          name="twitter:description"
          content={`Apply for ${job.title} at ${job.company} in ${job.location}. ${stripHtml(job.description)}`}
        />
        <meta name="twitter:image" content={job.company_logo} />

        {/* Canonical URL */}
        <link rel="canonical" href={`https://testxlake.iitjobs.com/job/${slug[0]}`} />

        {/* JSON-LD Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }} />
      </Head>

      <Box className="container mx-auto p-6 max-w-6xl">
        {/* Header */}
        <Box className="bg-white rounded-lg shadow-md p-6 mb-6">
          <Box className="flex items-center justify-between flex-wrap gap-4">
            <Box className="flex items-center gap-4">
              <img
                src={job.company_logo}
                alt={`${job.company} Logo`}
                className="w-12 h-12 rounded-md object-cover"
              />
              <Box>
                <Typography variant="h5" className="font-semibold text-gray-800">
                  {job.title}
                </Typography>
                <Typography className="text-sm text-blue-600 font-medium">
                  <Link href={`/companies/${job.companySlug}`} aria-label={`View ${job.company} company page`}>
                    <span className="hover:underline">{job.company}</span>
                  </Link>
                </Typography>
              </Box>
            </Box>
            <Typography className="text-sm text-gray-600">
              📍 <strong>{job.location}</strong>
            </Typography>
          </Box>
        </Box>

        {/* Two-column Layout */}
        <Grid container spacing={6}>
          {/* Left: Job Content */}
          <Grid item xs={12} md={8}>
            <Paper elevation={0} className="bg-white p-6 rounded-lg max-w-3xl min-w-3xl shadow-sm mb-6">
              <Typography variant="h6" className="mb-3 font-semibold text-gray-800">
                Description
              </Typography>
              <Typography
                variant="body2"
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </Paper>

            <Paper elevation={0} className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <Typography variant="h6" className="mb-3 font-semibold text-gray-800">
                Key Skills
              </Typography>
              <Box className="flex flex-wrap gap-2">
                {job.keySkills.length > 0 ? (
                  job.keySkills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      className="bg-green-50 text-green-700 border border-green-200"
                      size="small"
                    />
                  ))
                ) : (
                  <Typography className="text-gray-500">No skills listed</Typography>
                )}
              </Box>
            </Paper>

            <Paper elevation={0} className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <Typography variant="h6" className="mb-3 font-semibold text-gray-800">
                Education
              </Typography>
              <Typography className="text-gray-700">{job.education}</Typography>
            </Paper>

            <Button
              variant="contained"
              color="primary"
              className="w-full py-3 mb-6 rounded-full text-white bg-primary hover:bg-blue-700"
              onClick={() => alert("Apply Now clicked!")}
            >
              <span className="material-icons mr-2">Apply Now</span>
            </Button>

            <Paper elevation={0} className="bg-white p-3 rounded-lg shadow-sm mb-6">
              <Box className="flex gap-4 text-xl">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                >
                  <i className="tabler-brand-facebook-filled text-black-600 hover:text-blue-800"></i>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                >
                  <i className="tabler-brand-linkedin text-black-700 hover:text-blue-900"></i>
                </a>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on WhatsApp"
                >
                  <i className="tabler-brand-whatsapp text-green-600 hover:text-green-800"></i>
                </a>
              </Box>
            </Paper>
          </Grid>

          {/* Right: Job Metadata */}
          <Grid item xs={12} md={4}>
            <Paper elevation={0} className="bg-white p-6 rounded-lg shadow-sm">
              <Box className="space-y-4 text-sm text-gray-700">
                <Typography>
                  🗓️ <strong>Posted On:</strong> {job.postedOn}
                </Typography>
                <Typography>
                  💼 <strong>Experience:</strong> {job.experience}
                </Typography>
                <Typography>
                  👥 <strong>Openings:</strong> {job.openings}
                </Typography>
                <Typography>
                  🏷️ <strong>Category:</strong> {job.category}
                </Typography>
                <Typography>
                  ⏳ <strong>Tenure:</strong> {job.tenure}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
