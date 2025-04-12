"use client";

import { useParams } from "next/navigation";
import {
  Box,
  Typography,
  Divider,
  Chip,
  Button,

  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import { useEffect, useState } from "react";

export default function JobDetailPage() {
  const { slug } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    if (slug && Array.isArray(slug) && slug.length > 0) {
      const parts = slug[0].split("-");
      let jobTitleParts = [];
      let locationParts = [];
      let company = "";
      let jobId = "";

      // Assume jobId is the last part (numeric)
      jobId = parts.pop();
      if (isNaN(jobId)) {
        // If the last part isn't a number, it's part of the company or location
        parts.push(jobId);
        jobId = parts.pop(); // Try the next part
      }

      // Assume company is the last non-numeric part
      company = parts.pop();
      if (!company || isNaN(company)) {
        company = parts.pop() || "Unknown"; // Fallback if no clear company
      }

      // Remaining parts: split into jobTitle and location
      const remainingParts = parts;
      const locationIndex = remainingParts.findIndex((part) =>
        ["in", "india", "usa"].includes(part.toLowerCase())
      );
      if (locationIndex !== -1) {
        locationParts = remainingParts.slice(locationIndex);
        jobTitleParts = remainingParts.slice(0, locationIndex);
      } else {
        jobTitleParts = remainingParts;
      }

      const jobTitle = jobTitleParts
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      const location = locationParts
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
// Mock API call to fetch job data (replace with real API)
const fetchJob = async () => {
  const mockJob = {
    id: jobId,
    title: jobTitle,
    company: company.charAt(0).toUpperCase() + company.slice(1),
    location: `${location}, India`, // Assuming India is implied
    description: `
      **Primary Technical Skills**
      HTML, SCSS, TypeScript, JavaScript, Core Java, Data Structures, XML/JSON/YAML
      **Frontend**: Material UI, Angular 14+
      Backend: MongoDB, SQL (PostgreSQL)
      Testing: Automated Unit & Functional Testing, Selenium, Pytest experience is a plus
      Add-on Technical Skills: MEAN or MERN stack framework exposure is a plus
      Cloud: Google Cloud Platform (GCP), Cloud Certifications are a plus
      CI/CD & DevOps: Git, Docker, Kubernetes, Kafka, Knowledge of DevOps tools is a plus
    `,
    responsibilities: "Responsibilities",
    keySkills: [
      "Html",
      "Scss",
      "TypeScript",
      "JavaScript",
      "Core Java",
      "Data Structures",
      "XML/JSON/YAML",
      "Angular 14+",
      "MongoDB",
      "SQL",
    ],
    education: "Any Graduate",
    postedOn: "Today",
    experience: "5+ years of experience",
    openings: 2,
    category: "Software Developer",
    tenure: "Flexible Position",
  };
  setJob(mockJob);
};
      fetchJob();
    }
  }, [slug]);

  if (!job) return <div className="text-center py-10">Loading...</div>;

  return (
    <Box className="container mx-auto p-6 max-w-4xl">
      <Paper elevation={3} className="p-6 bg-white rounded-lg shadow-lg">
        {/* Header Section */}
        <Box className="flex items-center justify-between mb-6 border-b pb-4">
          <Box className="flex items-center">
            <Typography
              variant="h4"
              component="h1"
              className="font-bold text-gray-800 mr-4"
            >
              {job.title}
            </Typography>
            <Typography
              variant="body2"
              className="text-gray-600 italic"
            >
              {job.company} - An Experian Group Company
            </Typography>
          </Box>
          <Typography variant="body2" className="text-gray-600">
            {job.location}
          </Typography>
        </Box>

        {/* Main Content and Sidebar */}
        <Grid container spacing={4}>
          {/* Description Section */}
          <Grid item xs={8}>
            <Typography
              variant="h6"
              className="text-gray-800 mb-4 font-semibold"
            >
              Description
            </Typography>
            <Typography
              variant="body2"
              className="text-gray-700 mb-4"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
          </Grid>

          {/* Sidebar Section */}
          <Grid item xs={4}>
            <Box className="bg-gray-50 p-4 rounded-lg">
              <Typography
                variant="body2"
                className="text-gray-600 mb-2 flex items-center"
              >
                <span className="material-icons mr-2">event</span>
                <strong>Posted On:</strong> {job.postedOn}
              </Typography>
              <Typography
                variant="body2"
                className="text-gray-600 mb-2 flex items-center"
              >
                <span className="material-icons mr-2">work</span>
                <strong>Experience:</strong> {job.experience}
              </Typography>
              <Typography
                variant="body2"
                className="text-gray-600 mb-2 flex items-center"
              >
                <span className="material-icons mr-2">groups</span>
                <strong>Openings:</strong> {job.openings}
              </Typography>
              <Typography
                variant="body2"
                className="text-gray-600 mb-2 flex items-center"
              >
                <span className="material-icons mr-2">category</span>
                <strong>Category:</strong> {job.category}
              </Typography>
              <Typography
                variant="body2"
                className="text-gray-600 flex items-center"
              >
                <span className="material-icons mr-2">access_time</span>
                <strong>Tenure:</strong> {job.tenure}
              </Typography>
            </Box>
          </Grid>

          {/* Key Skills Section */}
          <Grid item xs={12}>
            <Typography
              variant="h6"
              className="text-gray-800 mb-4 font-semibold"
            >
              Key Skills
            </Typography>
            <Box className="flex flex-wrap gap-2">
              {job.keySkills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  className="bg-green-50 text-green-700"
                  variant="outlined"
                />
              ))}
            </Box>
          </Grid>

          {/* Education Section */}
          <Grid item xs={12}>
            <Typography
              variant="h6"
              className="text-gray-800 mb-4 font-semibold"
            >
              Education
            </Typography>
            <Typography variant="body2" className="text-gray-700">
              {job.education}
            </Typography>
          </Grid>

          {/* Apply Now Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              className="w-full py-3 rounded-full mt-6 text-white"
              onClick={() => alert("Apply Now clicked!")} // Replace with actual apply logic
            >
              <span className="material-icons mr-2">send</span> Apply Now
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );

}
