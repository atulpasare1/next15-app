import React from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import ResumeTab from '@views/can-profile/ResumeTab';
import PersonalDetailsTab from '@views/can-profile/PersonalDetailsTab';
import SkillsTab from '@views/can-profile/SkillsTab';
import EducationTab from '@views/can-profile/EducationTab';

function ProfilePage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Resume" />
        <Tab label="Personal Details" />
        <Tab label="Skills" />
        <Tab label="Education" />
      </Tabs>
      {value === 0 && <ResumeTab />}
      {value === 1 && <PersonalDetailsTab />}
      {value === 2 && <SkillsTab />}
      {value === 3 && <EducationTab />}
    </Box>
  );
}

export default ProfilePage;
