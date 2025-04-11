'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
// import FaqHeader from '@views/pages/faq/FaqHeader'
// import Faqs from '@views/pages/faq/Faqs'
// import FaqFooter from '@views/pages/faq/FaqFooter'

// components/ServicesView.jsx (ya jahan bhi rakhna ho)

const recruitmentSContent = [
    {
      heading: "Career Page Optimization",
      description:
        "Companies can directly optimize the career page, which will be searchable in various search engines promoting company brand image. Candidates will apply on your career page and review several questions on your ATS, will reduce the cost of job postings on job boards. We break free from typical job postings as they are expensive, time-bound (~30 days), and prone to over-saturation. Since over 80% of job seekers when seeing a job listing will often go to the company website, our career page optimization will instead directly lead the user to your career page."
    },
    {
      heading: "Applicant Tracking System",
      description:
        "The ATS is tailored to the unique requirements of your company, taking into factors such as industry, size, hiring volume, and specific job roles. Customization involves configuring the system's features, interface, and workflows to align with the company's recruitment processes."
    },
    {
      heading: "Recruitment Process Outsourcing",
      description:
        "Increase recruiting capability and effectiveness by leveraging our service. We improve the quality of hire with faster time-to-fill, ensuring a competitive edge. Focusing on the key functions and shifting demands of recruitment, we do the grunt work for recruitment."
    }
  ];
  
  export default function SecruitmentServices() {
    return (
      <section className="py-10">
        <div className="container mx-auto px-4">
        <div className="text-right mt-6">
              <button
                className="btn btn-outline-primary rounded-full px-6 py-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                data-bs-toggle="modal"
                data-bs-target="#editUser"
              >
                Book a Demo
              </button>
            </div>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold pb-6">Recruitment Services</h2>
  
            {recruitmentSContent.map((item, index) => (
              <div key={index} className="mb-6">
                <h4 className="text-xl font-semibold text-primary mb-2">
                  {item.heading}
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {item.description}
                </p>
                {index < recruitmentSContent.length - 1 && (
                  <hr className="my-4 border-gray-300" />
                )}
              </div>
            ))}
  
           
          </div>
          <style jsx>{`
          
          @media (min-width: 1536px) {
                       .container {
                         max-width: 1536px !important;
                       }
                     }
                      
                   `}</style>
        </div>
      </section>
    );
  }
  
  