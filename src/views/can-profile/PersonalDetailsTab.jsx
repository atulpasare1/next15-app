import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

function PersonalDetailsTab() {
  const [details, setDetails] = React.useState({
    name: 'Atul Pasare',
    location: 'India',
    status: 'Not looking for a job',
  });
  const [isEditing, setIsEditing] = React.useState(false);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setIsEditing(false);
    // Handle form submission
    console.log(details);
  };

  return (
    <Box>
      {!isEditing && (
        <Box>
          <Typography>Name: {details.name}</Typography>
          <Typography>Location: {details.location}</Typography>
          <Typography>Status: {details.status}</Typography>
          <Button variant="contained" onClick={() => setIsEditing(true)} style={{ borderRadius: '20px' }}>Edit</Button>
        </Box>
      )}
      {isEditing && (
        <Box>
          <TextField name="name" label="Name" value={details.name} onChange={handleChange} fullWidth margin="normal" InputProps={{ style: { borderRadius: '20px' } }} />
          <TextField name="location" label="Location" value={details.location} onChange={handleChange} fullWidth margin="normal" InputProps={{ style: { borderRadius: '20px' } }} />
          <TextField name="status" label="Status" value={details.status} onChange={handleChange} fullWidth margin="normal" InputProps={{ style: { borderRadius: '20px' } }} />
          <Button variant="contained" onClick={handleSubmit} style={{ borderRadius: '20px' }}>Save</Button>
          <Button variant="contained" onClick={() => setIsEditing(false)} style={{ borderRadius: '20px' }}>Cancel</Button>
        </Box>
      )}
    </Box>
  );
}

export default PersonalDetailsTab;
