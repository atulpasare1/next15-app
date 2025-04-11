'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
// import FaqHeader from '@views/pages/faq/FaqHeader'
// import Faqs from '@views/pages/faq/Faqs'
// import FaqFooter from '@views/pages/faq/FaqFooter'

const aboutusContent = [
    {
      heading: "About Us",
      text: "Since 2006, iitjobs is a growing, global tech hub with over 500k unique monthly visitors. We focus on strategic sourcing to connect top talent with employers. With globalization and fast-paced technological advancements driving an increase in outsourcing and remote jobs, we are dedicated to bridge the gap between small and large companies, and individuals across the world."
    },
    {
      heading: "Tech Careers with No Bounds",
      text: "We have a team of technology recruiters who have recruited people from Brazil to Australia, Africa/EU/Russia to USA, Canada, NZ, Singapore and India, almost anywhere in the world. Our platform’s vast reach empowers us to master strategic sourcing and acquire top talent, without neglecting employers’ needs."
    },
    {
      heading: "Our Mission",
      text: "We create possibilities for your career, beyond borders."
    }
  ];
  
  const aboutusTimeline = [
    {
      year: "2006",
      detail:
        "Company was born (~50 employees) and the first iteration of the job portal was created, when resumes were barely being sent out to employers through the internet. Fun fact: We gave away an iPod each month to a randomly-selected user, sending it to people all the way from Malaysia to Lithuania."
    },
    {
      year: "2008",
      detail:
        "The recession hit and we were forced to let go of all our employees, putting a pause on iitjobs."
    },
    {
      year: "2013",
      detail:
        "We started rebuilding ourselves and focused more on recruitment services with large global companies, specifically on contract work force."
    },
    {
      year: "2020",
      detail:
        "The growth continued until we hit another bump in the road, COVID. Moving past the uncertainty, the shift in remote jobs opened up new doors."
    },
    {
      year: "Now",
      detail:
        "Your next career move starts now. Come along on your professional journey with us..."
    }
  ];
  
  export default function AboutusView() {
    return (
      <section id="landingContact" className="bg-white py-10">
        <div className="container mx-auto px-4 md:flex md:justify-between gap-6">
          {/* Left Section */}
          <div className="md:w-2/3 space-y-10">
            {aboutusContent.map((item, index) => (
              <div key={index} className="relative">
                <h2 className="text-xl font-bold text-blue-700 mb-2">{item.heading}</h2>
                <p className="text-gray-700 text-justify">{item.text}</p>
              </div>
            ))}
          </div>
  
          {/* Right Section */}
          <div className="md:w-1/3 mt-10 md:mt-0 relative">
            <div className="border-l-4 border-gray-400 h-full relative pl-6">
              {aboutusTimeline.map((item, index) => (
                <div key={index} className="relative mb-10 pl-5">
                  <div className="w-6 h-6 bg-gray-200 border-2 border-gray-600 rounded-full absolute -left-[1.6rem] top-0"></div>
                  <h6 className="text-sm font-semibold text-gray-700 mb-1 opacity-0 animate-fadeIn" style={{ animationDelay: `${index * 3}s`, animationFillMode: 'forwards' }}>{item.year}</h6>
                  <p className="text-sm text-gray-600 opacity-0 animate-fadeIn" style={{ animationDelay: `${index * 3 + 1}s`, animationFillMode: 'forwards' }}>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
  
          <style jsx>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
  
            .animate-fadeIn {
              animation: fadeIn 1s ease-in-out forwards;
            }
             .pl-6 {
    padding-left: 13px !important;
    }
 @media (min-width: 1536px) {
              .container {
                max-width: 1536px !important;
              }
            }
             .border-l-4 {
    border-left-width: 1px !important;
}
          `}</style>
        </div>
      </section>
    );
  }