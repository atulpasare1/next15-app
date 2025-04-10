import React from 'react';
import { Card, CardContent, Typography, Chip, IconButton, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import classnames from 'classnames';
import CustomAvatar from '@core/components/mui/Avatar';
const JobCard = ({ job }) => {
  // Destructure job object with fallback values
  const {
    title = 'Senior Software Developer (JAVA)',
    company = 'Siemens',
    rating = 4.1,
    reviews = 4908,
    experience = '5-10 Yrs',
    salary = '₹ Not disclosed',
    location = 'Bengaluru',
    description = 'Hello talented techie! We re looking for dedicated individuals with the skills to help us build and maintain a cutting-edge distribution system.',
    postedDate = '1 Day Ago',
    skills = ['software development', 'distribution system', 'spring boot', 'java', 'oops', 'kubernetes'],
    companyLogo = 'https://demos.pixinvent.com/vuexy-nextjs-admin-template/demo-1/images/logos/google.png', // Default logo URL
  } = job;

  return (
    <Card sx={{ maxWidth: 800, margin: 2, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        {/* Job Title and Company */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <img
            src={companyLogo}
            alt={`${company} Logo`}
            style={{ height: 40 }}
            onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }} // Fallback for broken image
          />
        </Stack>

        {/* Company Rating and Reviews */}
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <i className='tabler-star text-lg' />
          <Typography variant="body2" color="text.secondary">
            {rating} ★ {reviews} Reviews
          </Typography>
        </Stack>

        {/* Job Details */}
        <Stack direction="row" spacing={1} mb={2}>
          <Chip label={experience} size="small" variant="outlined" />
          <Chip label={salary} size="small" variant="outlined" />
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <i className='tabler-map-pin text-lg' />
            <Typography variant="body2" color="text.secondary">
              {location}
            </Typography>
          </Stack>
        </Stack>

        {/* Job Description and Skills */}
        <Typography variant="body2" color="text.secondary" mb={2}>
          {description}
          <br />
          {skills.join(' • ')}
        </Typography>

        {/* Posted Date and Save Button */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" color="text.secondary">
            {postedDate}
          </Typography>
          <IconButton aria-label="save">
          <i className='tabler-bookmark text-lg' />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default JobCard;
