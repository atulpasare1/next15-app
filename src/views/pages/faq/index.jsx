'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports

import Faqs from '@views/pages/faq/Faqs'
// import FaqFooter from '@views/pages/faq/FaqFooter'

const FAQ = ({ data }) => {
  // States
  const [searchValue, setSearchValue] = useState('')

  return (
    <Grid container spacing={6}>
      
      <Grid size={{ xs: 12 }}>
        <Faqs faqData={data} searchValue={searchValue} />
      </Grid>
      
    </Grid>
    
  )
  
}

export default FAQ
