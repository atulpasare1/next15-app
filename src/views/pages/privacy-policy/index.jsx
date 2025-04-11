'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
// import FaqHeader from '@views/pages/faq/FaqHeader'
// import Faqs from '@views/pages/faq/Faqs'
// import FaqFooter from '@views/pages/faq/FaqFooter'

const privacyPolicy = [
    {
      title: "Privacy Policy",
      subtitle: "iitjobs, Inc wants you to fully understand our privacy practices.",
      detail:
       " Your loyalty as a job seeker, customer or visitor is important, and we hope that our concerns regarding your privacy, as described in this policy (the \"Privacy Policy\" or \"Policy\"), demonstrate our commitment to making your experience with iitjobs, Inc an enjoyable and satisfying one. Although iitjobs, Inc respects the privacy of all those who visit our Web sites and use our online services, we do collect information from our visitors, including job seekers and customers. This Privacy Policy governs your interaction with the iitjobs, Inc web site and your registration for and use of iitjobs, Inc's online services (collectively, the \"Services\"). Except as set forth within this Privacy Policy and our Terms of Agreement and other published guidelines, we do not release personally identifiable information about our members and visitors without their permission. Note that, by using the Services, you signify your agreement to this Privacy Policy. If you do not agree to this Policy, please do not use the Services. Your continued use of the Services subsequent to changes to this Policy will mean that you accept the changes; If you have any questions regarding this Privacy Policy, or any other privacy issues in connection with the Services please e mail at admin@iitjobs.com Please read this Privacy Policy to learn more about the ways in which we use and protect your personal information. iitjobs, Inc reserves the right to change this Privacy Policy at any time and without any notice by posting a revised Privacy Policy on our Web site. Any such revision will become effective immediately upon posting."
    },

    
    {
      title: "Disclosure of Personal Information",
      detail:
        "We do not share, sell or rent your personal information to third parties – ever."
    },
    {
      title: "Information We Collect and How We Use That Information",
      detail:
        "We collect both non-personally identifiable information and personally identifiable information through your use of our Services. This includes page visits, cookies, and voluntarily submitted data such as resumes and profiles."
    },
    {
        title: "1. Non-personally identifiable information",
        detail:
          "We collect and aggregate anonymous data about user interactions, including page visits, link clicks, and browsing behaviors. This involves logging IP addresses, browser types, and operating systems. While this data doesn't identify users personally, it may reveal Internet Service Providers and general geographic information.Cookies are small text files stored on your computer that help us track your navigation through our site and Services, remember user preferences, and display relevant advertisements. These cookies do not contain personal data unless you have previously provided such information to us. You may manage your cookie settings via your browser preferences.We also use transparent image files (pixels/GIFs) for advertisement tracking and performance. Data from these may be shared in aggregate with advertisers but will remain non-personally identifiable.Some third-party advertisers and partners may place cookies or similar technologies when you interact with our site or their ads. We are not responsible for the data practices of third-party websites or advertisers, and we encourage users to review their privacy policies."
      },
      {
        title: "2. Personally identifiable information",
        detail:
          "In certain areas of the Services – such as those in which you Announce Availability, complete a profile, submit your résumé, create a new account, or enter iitjobs, Inc-sponsored contests or promotions – we may request that you provide us with certain personally identifiable information, such as your e-mail address, name, zip code, profession, or work experience. We will, in such situations, seek to identify which informational items are required and which are optional.Job seekers should post profiles and resumes on iitjobs, Inc only if they wish such information to be viewed by iitjobs, Inc's customers. At any time, job seekers may elect that their profile and resume not be searchable by iitjobs, Inc's customers by logging into their account and changing the status of their profile or, if that is not possible, they may contact iitjobs, Inc at admin@iitjobs.com and we will make the change for them.Additionally, job seekers may elect to make their profile searchable by iitjobs, Inc customers on a confidential basis only. In this case, the user's name, contact information and resume will not be displayed to customers performing searches on iitjobs, Inc. If the customer desires to contact the confidential job seeker regarding an employment opportunity, they will send an email to the job seeker through the iitjobs, Inc system. iitjobs, Inc will forward the email to the seeker's email address. The seeker's email address will not be provided directly to the customer.The Services are not available to children under 18 years of age. We do not knowingly collect personally identifiable information from children under 18 years of age.Please note that iitjobs, Inc cannot control the acts of users of the Services. All members and visitors should be aware that, when they disclose personally identifiable information in a resume or profile or other medium, the information may be collected and used by others to send that person unsolicited email from other parties outside iitjobs, Inc.In the event that you encounter any iitjobs, Inc user who is improperly collecting or using information about you or other users, please contact admin@iitjobs.com."
      },
    {
      title: "3. How we use (and do not use) non-personally identifiable information",
      detail:
        "We use non-personally identifiable information in aggregate form to build higher quality, more useful Services by performing statistical analyses of the collective characteristics and behavior of our visitors and members, and by measuring demographics and interests regarding specific areas of the Services. We may provide statistical information based on this data to advertisers and other current and potential business partners. We may also use the aggregate data to inform these third parties as to the number of people who have seen and clicked through links to their sites."
    },
    {
      title: "4. How we use (and do not use) personally identifiable information",
      detail:
      "iitjobs, Inc does not sell, re-sell or distribute for re-sale your personally identifiable information. iitjobs, Inc's customers may only use the information provided in resumes and profiles of job seekers to evaluate seekers' qualifications for the customer's open job opportunities. Job seekers should be aware, however, that iitjobs, Inc has no way to control how a customer actually uses the service and how they use the resume and profile information.If you believe a iitjobs, Inc customer is using personally identifiable information inappropriately, please notify iitjobs, Inc at admin@iitjobs.com Please note that iitjobs, Inc reserves the right to disclose information submitted by or concerning any visitor or member as we reasonably feel is necessary to protect our systems or business. Specifically, but without limitation, we reserve the right to disclose such information when a visitor or member is in violation of our Terms of Agreement or other published guidelines, or partakes (or is reasonably suspected of partaking) in any harmful, infringing or illegal activity, even without a subpoena, warrant, or other court order, and to disclose such information in response to court and governmental orders, civil subpoenas, discovery requests, and as otherwise required by law, as well as in response to allegations of infringement.We cooperate with law enforcement agencies in identifying those who may be using our servers or services for illegal activities. We also reserve the right to report any suspected illegal activity to law enforcement for investigation or prosecution, or to suspend or terminate your membership in connection with any suspected illegal or infringing activity.Finally, iitjobs, Inc reserves the right to assign, sell, license, or otherwise transfer to a third party your personally identifiable information in connection with an assignment, sale, joint venture, or other transfer or disposition of any portion or all of iitJobs, Inc's or its affiliated entities' assets or stock.",
     
  },

  
  {
    title: "Subject to the foregoing, iitjobs, Inc uses your personally identifying information in several ways:",
    detail:
      " • To customize various aspects of the Services to your preferences.\n\n • To determine which advertisements or sponsor messages will appear on your screen.\n\n • To send you iitjobs, Inc solicitations, product announcements, and other communications we believe may be of interest to you (you may opt out of receiving these materials as described below).\n\nTo send you certain email messages that are critical to your use of the Services, such as system status updates or order confirmations (because these messages contain important information, you may not be able to opt out of receiving them).\n\n • To pre-populate forms displayed for the purpose of collecting individual data by iitjobs, Inc and/or its sponsors (no data will be automatically transferred to any advertiser or third party—data will only be transferred if you voluntarily request it, such as by clicking the \"Submit\" button).\n\n • As necessary to support the operation of the Services, including billing, account maintenance, and record-keeping."
     

  },
  {
    title: "In addition to the circumstances described above, iitjobs, Inc may disclose your personally identifiable information to third parties as follows:",
    detail:
      "• When a job seeker posts a profile or resume on iitjobs, Inc on a non-confidential basis, such information will be shared with iitjobs, Inc's customers. (Note that at any time, job seekers may elect that their profile and resume not be searchable by iitjobs, Inc's customers by logging into their account and changing the status of their profile or they may contact iitjobs, Inc at admin @ iitjobs.com and we will make the change for them.\n\n • When a job seeker elects to make his or her profile searchable by iitjobs, Inc customers on a confidential basis only, the user's name, contact information and resume will not be displayed to customers performing searches on iitjobs, Inc. If the customer desires to contact the confidential job seeker regarding an employment opportunity, it will send an email to the job seeker through the iitjobs, Inc system. iitjobs, Inc will forward the email to the seeker's email address. The seeker's email address will not be provided directly to the customer.\n\n • If you 'opt in' to receive promotional materials (see below), information you have made available to iitjobs, Inc may be made available to third parties who provide goods or services that we believe may be of interest to you.\n\n • If you provide us with your credit card information, we will not release that information to third parties unless necessary to complete a transaction between you and such a third party. Credit card transactions are handled by a third-party financial institution, which receives the credit card number and other personal identifying information only to verify the credit card numbers and process transactions.\n\n • All information made available to iitjobs, Inc may be made available to our contractors and consultants, and professional advisors (such as attorneys or accountants), but only to the extent necessary for them to perform services on our behalf, and only under a duty of confidentiality"
     

  },
  
    {
      title: "5. Opting In",
      detail:
        "You may choose to 'opt in' to receive promotional materials from iitjobs, Inc and/or its affiliates, advertisers, or other business partners. You will be given the opportunity to 'opt in' to receive such materials at every point at which we collect personally identifiable information through the Services. You may change your 'opt in' status or 'opt out' with respect to such materials at any time by contacting us at admin@iitjobs.com. You may also contact those third parties directly."

    },
    {
      title: "6. Surveys and Sweepstakes",
      detail:
        "Occasionally, iitjobs, Inc may conduct surveys in order to better deliver advertisements and content and to better understand your needs relating to the Services. We will not share your survey information with any third party, except in aggregate form. In addition, if and when we sponsor sweepstakes or other promotions, or third parties sponsor such promotions in conjunction with us, either the third party or we will post relevant privacy information in the official rules and/or registration area for the sweepstakes or promotion. That privacy information, to the extent it conflicts with this Policy, will govern that particular promotion or sweepstakes - please remember to read it carefully."
    },
    {
      title: "7. Deleting or correcting personal information",
      detail:
        "If you would like to have your personally identifiable information removed from iitjobs, Inc's database, or would like to correct an error in such information, please contact us at admin@iitjobs.com, and we will use reasonable efforts to comply with your request. Keep in mind, however, that there will be residual information that will remain within iitjobs, Inc databases, access logs, and other records, which may or may not contain such personally identifiable information. The residual information will not be used for commercial purposes; however iitjobs, Inc reserves the right, from time to time, to re-contact former customers or users of iitjobs, Inc."
    },
    {
      title: "8. Questions?",
      detail:
        "Questions regarding this Privacy Policy should be directed to admin@iitjobs.com"
    }
  ];
  
  export default function PrivacyPolicy() {
    return (
      <>
        <style>
          {`
            @media (min-width: 1536px) {
              .container {
                max-width: 1536px !important;
              }
            }
          `}
        </style>
  
        <div className="container mx-auto px-4 py-8 space-y-4">
  {privacyPolicy.map((section, index) => (
    <div key={index}>
      <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
      <h5 className="text-xl font-semibold mb-2">{section.subtitle ?? ''}</h5>
      <p className="text-gray-700 whitespace-pre-wrap text-justify">{section.detail}</p>
    </div>
  ))}
</div>

      </>
    );
  }
  
  
  