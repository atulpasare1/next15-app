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

const servicesContent = [
    {
      title: "Recruitment Services",
      link: "/our-services/recruitment-services",
      features: [
        "Career Page Optimization",
        "Applicant Tracking System",
        "Recruitment Process Outsourcing"
      ]
    },
    {
      title: "Data and Technology Services",
      link: "/our-services/data-and-technology-services",
      features: [
        "Resume Data Migration",
        "Market Intelligence Analysis",
        "Distribution of Job Openings"
      ]
    },
    {
      title: "Employee Development",
      link: "/our-services/employee-developments",
      features: [
        "Candidate Sourcing",
        "Technical Evaluation",
        "Global Training Delivery"
      ]
    },
    {
      title: "Workforce Management",
      link: "/our-services/workforce-management",
      features: [
        "Timesheet Tracking",
        "Integrated Billing"
      ]
    }
  ];
  
  export default function ServicesView() {
    return (
      <section id="services">
        <div className="container mx-auto px-4 py-8 space-y-4">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-primary">Our Company Services</h1>
            <p className="mt-2 text-gray-600 text-sm">
              Contact us <a href="mailto:services@iitjobs.com" className="underline text-primary ">services@iitjobs.com</a> to learn more about how you can utilize our personalized recruiting services for your company.
            </p>
          </div>
  
          <div className="text-right mb-6">
            <a href="/book-demo" className="btn btn-outline-primary">
              Book a Demo
            </a>
          </div>
  
          <div className="grid gap-6">
            {servicesContent.map((service, index) => (
              <a href={service.link} key={index} className="block hover:shadow-lg transition">
                <div className="card rounded border">
                  <div className="card-header bg-primary text-white text-center p-4 rounded-t">
                    <h5 className="text-lg font-semibold">{service.title}</h5>
                  </div>
                  <div className="card-body bg-white p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {service.features.map((feature, i) => (
                      <div key={i} className="text-center">
                        <p className="text-gray-700 text-sm">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </a>
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
  