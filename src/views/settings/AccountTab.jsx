"use client";

import React from 'react';
import { Box, Typography, Switch, FormControlLabel } from '@mui/material';

function AccountTab() {
  const [isActive, setIsActive] = React.useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
    // Handle save logic
    console.log('Account active:', !isActive);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Account Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Enable this to activate your account for all services.
      </Typography>
      <FormControlLabel
        control={<Switch checked={isActive} onChange={handleToggle} />}
        label="Activate Account"
      />
    </Box>
  );
}

export default AccountTab;
