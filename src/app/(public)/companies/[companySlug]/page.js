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
  const [activeTab, setActiveTab] = useState("profile");


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
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            {company.logo && (
              <img
                src={company.logo}
                alt={`${company.name} Logo`}
                className="h-16 w-16 object-contain rounded-md"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{company.name}</h1>
              <div className="flex flex-wrap items-center gap-3 mt-1">
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center gap-1"
                >
                  🔗 {company.website}
                </a>
                <span className="text-sm text-gray-500">📍 {company.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 border rounded-full text-sm ${
            activeTab === "profile" ? "bg-gray-100" : "bg-white"
          } hover:bg-gray-200`}
          onClick={() => setActiveTab("profile")}
        >
          👤 Profile
        </button>
        <button
          className={`px-4 py-2 border rounded-full text-sm ${
            activeTab === "jobs" ? "bg-gray-100" : "bg-white"
          } hover:bg-gray-200`}
          onClick={() => setActiveTab("jobs")}
        >
          📋 Jobs By {company.name}
        </button>
      </div>

      {/* Content Based on Tab */}
      {activeTab === "profile" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Side - About */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
              <h2 className="text-lg font-semibold mb-3 text-gray-800">ABOUT</h2>
              <p className="text-gray-700 text-sm leading-relaxed">{company.description}</p>
            </div>
          </div>

          {/* Right Side - Contacts and Social Info */}
          <div className="space-y-4">
            {/* CONTACTS */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-3 text-gray-800">CONTACTS</h2>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Website:</strong>{" "}
                <a href={company.website} className="text-blue-500 hover:underline">
                  {company.website}
                </a>
              </p>
              <p className="text-sm text-gray-700">
                <strong>Address:</strong> Opposite Jaguar Showroom, beside HP petrol pump, Shaikpet Hyderabad Telangana India 500008
              </p>
            </div>

            {/* SOCIAL INFO */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-3 text-gray-800">SOCIAL INFO</h2>
              <a
                href="https://www.linkedin.com/company/geekymindz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-sm flex items-center gap-1"
              >
                🔗 linkedin.com/company/geekymindz
              </a>
            </div>
          </div>
        </div>
      )}

      {activeTab === "jobs" && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            Jobs by {company.name}
          </h2>
          {company.jobs && company.jobs.length > 0 ? (
            <ul className="list-disc pl-5 space-y-2 text-sm text-blue-600">
              {company.jobs.map((job, index) => (
                <li key={index}>
                  <a
                    href={`/job/${job.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}-${company.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}-${job.id}`}
                    className="hover:underline"
                  >
                    {job.title}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600">No jobs available for this company.</p>
          )}
        </div>
      )}
    </div>
  );
}
