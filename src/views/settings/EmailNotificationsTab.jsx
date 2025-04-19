"use client";

import React from 'react';
import { Box, Typography, Switch, FormControlLabel } from '@mui/material';

function EmailNotificationsTab() {
  const [isEnabled, setIsEnabled] = React.useState(false);

  const handleToggle = () => {
    setIsEnabled(!isEnabled);
    // Handle save logic
    console.log('Email notifications enabled:', !isEnabled);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Email Notifications
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Receive email updates for new opportunities and messages.
      </Typography>
      <FormControlLabel
        control={<Switch checked={isEnabled} onChange={handleToggle} />}
        label="Enable Email Notifications"
      />
    </Box>
  );
}

export default EmailNotificationsTab;
