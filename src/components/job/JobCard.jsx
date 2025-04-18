import React from 'react';
import { Card, CardContent, Typography, Chip, IconButton, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import classnames from 'classnames';
import CustomAvatar from '@core/components/mui/Avatar';
import { slugify } from '@/libs/helper';
import Link from 'next/link';
import { List, ListItem, ListItemText } from '@mui/material';
const JobCard = ({ job }) => {
  // Destructure job object with fallback values
  const {
    title = job.job_title,
    company = job.company_name,
    experience = job.experience,
    minsalary = job.min_salary_offered,
    maxsalary = job.max_salary_offered,
    location = job.job_location,
    description = job.job_description,
    postedDate = job.posted_date,
    skills = job.skills,
    cmpLogo = `https://iitjobs.com/employer/media/company_docs/${job.cmp_id}/${job.companyLogo}`, // Default logo URL
  } = job;

  return (
    <Card sx={{ maxWidth: 800, margin: 2, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        {/* Job Title and Company */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0}>
          <Typography variant="h6" component="div">
           <Link href={`/job/${slugify(title)}-${slugify(location)}-${job.id}`}>{title}</Link>
          </Typography>
          <img
            src={cmpLogo}
            alt={`${company} Logo`}
            style={{ height: 40 }}
            onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }} // Fallback for broken image
          />
        </Stack>

        {/* Company Rating and Reviews */}
        <Stack direction="row" alignItems="center" spacing={1} mb={0}>
        <Stack direction="row" alignItems="center" mb={3} spacing={0.5}>
            <i className='tabler-map-pin text-lg' />

            <Typography variant="body2" color="text.secondary">
              {location}
            </Typography>
          </Stack>
          <i className='tabler-company text-lg' />
          <Typography variant="body2" mx={5} color="text.secondary">
            {company}
          </Typography>

        </Stack>

        {/* Job Details */}
        <Stack direction="row" spacing={1} mb={0}>

        <List sx={{ width: '100%',mb:0 }}>
      <ListItem>
        <ListItemText

          secondary={
            <>
              <span style={{}}>• 5+ years of experience • 1 opening</span>
            </>
          }
        />
      </ListItem>

    </List>
        </Stack>
{/* Job Description and Skills */}
<Typography variant="body2" color="text.secondary" component="div" mb={2}>
  {skills?.split(',').map((skill, index) => (
    <Chip
      label={skill.trim()}
      key={index}
      size="small"
      variant="filled"
      sx={{ margin: 0.5 }}
    />
  ))}
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
