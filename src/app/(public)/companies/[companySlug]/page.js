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
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";

export default function CompanyDetailPage() {
  const { companySlug } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    // Parse companySlug to extract company name and ID
    if (companySlug) {
      const [companyNameRaw, companyId] = companySlug.split("-");
      const companyName = companyNameRaw
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      // Mock API call to fetch company data (replace with real API)
      const fetchCompany = async () => {
        const mockCompany = {
          id: companyId,
          name: companyName,
          description:
            "Predigle is an Experian Group Company specializing in innovative software solutions. We focus on delivering cutting-edge technology to empower businesses worldwide.",
          logo: "/placeholder-logo.png", // Replace with actual logo URL
          location: "Chennai, Tamil Nadu, India",
          website: "https://www.predigle.com",
          jobs: [
            { id: "100056", title: "Software Developer" },
            { id: "100057", title: "Senior Software Engineer" },
          ],
          contactEmail: "careers@predigle.com",
        };
        setCompany(mockCompany);
      };
      fetchCompany();
    }
  }, [companySlug]);

  if (!company) return <div className="text-center py-10">Loading...</div>;

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
              {company.name}
            </Typography>
            {company.logo && (
              <img
                src={company.logo}
                alt={`${company.name} Logo`}
                className="h-10 mr-4"
              />
            )}
          </Box>
          <Typography variant="body2" className="text-gray-600">
            {company.location}
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
              About {company.name}
            </Typography>
            <Typography
              variant="body2"
              className="text-gray-700 mb-4"
            >
              {company.description}
            </Typography>
            <Typography
              variant="body2"
              className="text-gray-600 mb-2"
            >
              <strong>Website:</strong>{" "}
              <a href={company.website} className="text-blue-500">
                {company.website}
              </a>
            </Typography>
            <Typography
              variant="body2"
              className="text-gray-600"
            >
              <strong>Contact Email:</strong> {company.contactEmail}
            </Typography>
          </Grid>

          {/* Sidebar Section */}
          <Grid item xs={4}>
            <Box className="bg-gray-50 p-4 rounded-lg">
              <Typography
                variant="h6"
                className="text-gray-800 mb-4 font-semibold"
              >
                Current Job Openings
              </Typography>
              {company.jobs.map((job, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  className="text-gray-600 mb-2"
                >
                  <a
                    href={`/job/${job.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}-${company.location
                      .toLowerCase()
                      .replace(/, /g, "-")
                      .replace(/\s+/g, "-")}-${company.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}-${job.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {job.title}
                  </a>
                </Typography>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
