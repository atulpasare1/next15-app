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

const employeeContent = [
    {
      heading: "Candidate Sourcing",
      description:
        "Timing is everything in the fast-paced world of competitive recruitment. We Identify and attract top-tier talent through a strategic talent acquisition approach, saving you time and resources by targeting candidates with the right skills and cultural fit. Using our resources, we can tap into a global talent pool to source diverse and skilled talent across demographics. Our strategy ensures long-term talent acquisition by making informed decisions using data analytics."
    },
    {
      heading: "Technical Evaluation",
      description:
        "We provide strategies to cultivate an environment fostering innovation and growth by impartially assessing technical skills. We validate tech professionals with skill benchmarking to match industry standards for precise evaluation. We ensure project success by placing the right talent in the right project at the right time to optimize team composition."
    },
    {
      heading: "Global Training Delivery",
      description:
        "Propel your business with our global-scale innovation and expertise. We provide trainers for your organization, depending on the skills needed to keep up with the constant changes in technology, enabling a high retention rate for your employees."
    }
  ];
  
  export default function EmployeeDevelopments() {
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
            <h2 className="text-3xl font-semibold pb-6">Employee Developments</h2>
  
            {employeeContent.map((item, index) => (
              <div key={index} className="mb-6">
                <h4 className="text-xl font-semibold text-primary  mb-2">
                  {item.heading}
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {item.description}
                </p>
                {index < employeeContent.length - 1 && (
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
  
  