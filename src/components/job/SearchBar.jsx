'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, TextField, Button, Stack } from '@mui/material';

const SearchBar = ({ initialJobtitle = '', initialLocation = '', initialExperience = 'Your Experience', onSubmit }) => {
  const [jobtitle, setJobtitle] = useState(initialJobtitle);
  const [location, setLocation] = useState(initialLocation);
  const [experience, setExperience] = useState(initialExperience);
  const router = useRouter();

  // Sync state with initial props when they change
  useEffect(() => {
    setJobtitle(initialJobtitle);
    setLocation(initialLocation);
    setExperience(initialExperience);
  }, [initialJobtitle, initialLocation, initialExperience]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure jobtitle is not empty
    if (!jobtitle) {
      console.error('Job title is required');
      return;
    }

    // Call the onSubmit callback passed from the parent
    if (onSubmit) {
      onSubmit(jobtitle, location, experience);
    }

    // Optionally construct and navigate to URL (if needed independently)
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

    console.log('Navigating to:', searchUrl);
    router.push(searchUrl);
  };

  return (
    <Box
      sx={{
        p: 5,
        backgroundColor: '#fff',
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
          p: 2,
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
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 2, sm: 2 }}
        sx={{ flexGrow: 1, width: '100%' }}
      >
        {/* Keyword Search Input */}
        <TextField
          variant="outlined"
          placeholder="java"
          value={jobtitle || initialJobtitle}
          onChange={(e) => setJobtitle(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: <i className="tabler-magnifying-glass text-lg" />,
          }}
          sx={{ width: '100%', flexGrow: 1, '& .MuiOutlinedInput-root': { borderRadius: 20 } }}
        />

        {/* Location Search Input */}
        <TextField
          variant="outlined"
          placeholder="City/State/Country"
          value={location || initialLocation}
          onChange={(e) => setLocation(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: <i className="tabler-map-pin text-lg" />,
          }}
          sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: 20 } }}
        />

        {/* Experience Input */}
        <TextField
          variant="outlined"
          placeholder="Your Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: <i className="tabler-clock text-lg" />, // Optional: Add an experience-related icon
          }}
          sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: 20 } }}
        />
      </Stack>

      {/* Search Button */}
      <Button
        variant="contained"
        size="small"
        onClick={handleSubmit}
        sx={{
          borderRadius: 20,
          mt: { xs: 2, sm: 0 },
          ml: { sm: 2, xs: 0 },
          backgroundColor: '#757575',
          '&:hover': { backgroundColor: '#616161' },
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
