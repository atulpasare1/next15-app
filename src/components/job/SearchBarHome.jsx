'use client';


import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, TextField, Button, Stack } from '@mui/material';

const SearchBarHome = () => {
   const [jobtitle, setJobtitle] = useState('');
    const [location, setLocation] = useState('');
    const [experience, setExperience] = useState('Your Experience'); // Replacing jobtype with experience
    const router = useRouter();

    const handleSubmit = (e) => {
      e.preventDefault();

      // Ensure jobtitle is not empty
      if (!jobtitle) {
        console.error('Job title is required');
        return;
      }

      const formattedJobtitle = jobtitle.trim().replace(/\s+/g, '-').toLowerCase();
      const formattedLocation = location.trim().replace(/\s+/g, '-').toLowerCase();
      const formattedExperience = experience.trim().replace(/\s+/g, '-').toLowerCase();

      let searchUrl = `/${formattedJobtitle}-jobs`;

      if (formattedLocation) {
        searchUrl = `${searchUrl}-in-${formattedLocation}`;
      }

      if (formattedExperience && formattedExperience !== 'your-experience') {
        searchUrl = `${searchUrl}-${formattedExperience}`;
      }

      // Ensure the search URL is correctly formed before navigating
      console.log('Navigating to:', searchUrl);
      router.push(searchUrl);
    };
  return (
     <Box
          sx={{
            p: 5,
            backgroundColor: 'transparent',
            borderRadius: 5,
            boxShadow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1000px',
            margin: '0 auto',
            marginBottom: 2,
            '@media (max-width: 600px)': {
              flexDirection: 'column',
              alignItems: 'stretch',
              p: 2, // Reduced padding on mobile for better fit
            },
            '& > *': {
              flexGrow: 1,
              margin: '0 8px',
            },
            '& > *:first-child': {
              marginLeft: 0,
            },
            '& > *:last-child': {
              marginRight: 0,
            },
            '& .MuiTextField-root': {
              flexGrow: 1,
              marginRight: 2,
            },
            '& .MuiButton-root': {
              flexShrink: 0,
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderRadius: 20,
              },
            },
            '& .MuiInputAdornment-root': {
              marginRight: 0,
            },
            '& .MuiButtonBase-root': {
              borderRadius: 20,
              padding: '6px 16px',
            },
            '& .MuiButton-contained': {
              backgroundColor: '#757575',
              '&:hover': {
                backgroundColor: '#616161',
              },
            },
          }}
        >
      <Stack
        direction={{ xs: 'column', sm: 'row' }} // Responsive direction: column on mobile, row on desktop
        spacing={{ xs: 2, sm: 2 }} // Adjust spacing based on screen size
        sx={{ flexGrow: 1, width: '100%' }}
      >
        {/* Keyword Search Input */}
        <TextField
          variant="outlined"
          placeholder="java"
          size="small"
          value={jobtitle}
          onChange={(e) => setJobtitle(e.target.value)}
          InputProps={{
            startAdornment: <i className="tabler-magnifying-glass text-lg" />,
          }}
          sx={{ width: '100%',flexGrow: 1, '& .MuiOutlinedInput-root': { borderRadius: 20 } }}
        />

        {/* Location Search Input */}
        <TextField
          variant="outlined"
          placeholder="City/State/Country"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: <i className="tabler-map-pin text-lg" />,
          }}
          sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: 20 } }}
        />
        <TextField
          variant="outlined"
          placeholder="City/State/Country"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: <i className="tabler-map-pin text-lg" />,
          }}
          sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: 20 } }}
        />
      </Stack>

      {/* Search Button */}
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleSubmit}
        sx={{
          borderRadius: 20,
          mt: { xs: 2, sm: 0 }, // Add margin-top on mobile to separate from inputs
          ml: { sm: 2, xs: 0 }, // Remove left margin on mobile

          '&:hover': { backgroundColor: '#616161' },
          '@media (max-width: 600px)': {
            marginTop: 2, // Add margin-top on mobile to separate from inputs
              p: 4, // Reduced padding on mobile for better fit
            },
        }}
      >
        Search
      </Button>
      </Box>
  );
};

export default SearchBarHome;
