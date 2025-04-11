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

const technologyContent = [
    {
      heading: "Resume Data Migration",
      description:
        "We maintain data fidelity while migrating data to any ATS database, facilitating a smooth transition. We provide seamless email, attachment, and resume migration to your chosen ATS, a solution for the vast, diverse data points across a plethora of resumes."
    },
    {
      heading: "Market Intelligence Analysis",
      description:
        "Our analysis assists you in understanding market trends, competitor activities, customer needs, and emerging opportunities to make informed decisions. Beat out your competitor's recruitment strategy with our deep analysis of gaps, weaknesses, and market trends. We help you mitigate risks and develop crisis management strategies for resilient business continuity."
    },
    {
      heading: "Distribution of Job Openings",
      description:
        "We post various job postings that are readily searchable on any search engine and enable easy access for job seekers to navigate your postings leading to your career page. Through this streamlined approach, we are able to enhance the accessibility of your job openings."
    }
  ];
  
  export default function TechnologyServices() {
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
            <h2 className="text-3xl font-semibold pb-6">Data and Technology Services</h2>
  
            {technologyContent.map((item, index) => (
              <div key={index} className="mb-6">
                <h4 className="text-xl font-semibold text-primary mb-2">
                  {item.heading}
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {item.description}
                </p>
                {index < technologyContent.length - 1 && (
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
  
  