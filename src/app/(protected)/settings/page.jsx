"use client";

import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import VisibilityTab from '@views/settings/VisibilityTab';
import AccountTab from '@views/settings/AccountTab';
import EmailNotificationsTab from '@views/settings/EmailNotificationsTab';

function ProfilePage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', width: '100%', bgcolor: 'background.paper' }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: 'divider', minWidth: '200px' }}
      >
        <Tab label="Visibility" />
        <Tab label="Account" />
        <Tab label="Email Notifications" />

      </Tabs>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {value === 0 && <VisibilityTab />}
        {value === 1 && <AccountTab />}
        {value === 2 && <EmailNotificationsTab />}

      </Box>
    </Box>
  );
}

export default ProfilePage;
