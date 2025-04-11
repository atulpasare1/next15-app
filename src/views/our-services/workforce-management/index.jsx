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

const WorkforceManagementContent = [
    {
      heading: "Timesheet Tracking",
      description:
        "We can address the inconvenient aspects of workforce management, helping improve efficiency, accountability, and trust. With our system, you can streamline the process of workforce management by gaining insights into resource allocation through analyzing work hours and tracking project timelines.."
    },
    {
      heading: "Applicant Tracking System",
      description:
        "We can help you unify billing and invoicing seamlessly for effortless financial operations. Iitjobs ensures compliance with automated processes and reduces invoicing errors. We also provide access to comprehensive reporting and analytics for goal-oriented financial management that leads to strategic decision-making."
    }
   
  ];
  
  export default function WorkforceManagement() {
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
            <h2 className="text-3xl font-semibold pb-6">Workforce Management</h2>
  
            {WorkforceManagementContent.map((item, index) => (
              <div key={index} className="mb-6">
                <h4 className="text-xl font-semibold text-primary mb-2">
                  {item.heading}
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {item.description}
                </p>
                {index < WorkforceManagementContent.length - 1 && (
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
  
  