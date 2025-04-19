import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

function EducationTab() {
  const [education, setEducation] = React.useState({
    institution: 'Kathmandu Engineering College',
    degree: 'Associate Degree in Nursing (ADN)',
    status: '',
  });
  const [isEditing, setIsEditing] = React.useState(false);

  const handleChange = (e) => {
    setEducation({ ...education, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setIsEditing(false);
    // Handle form submission
    console.log(education);
  };

  return (
    <Box>
      {!isEditing && (
        <Box>
          <Typography>Institution: {education.institution}</Typography>
          <Typography>Degree: {education.degree}</Typography>
          <Typography>Status: {education.status}</Typography>
          <Button variant="contained" onClick={() => setIsEditing(true)} style={{ borderRadius: '20px' }}>Edit</Button>
        </Box>
      )}
      {!isEditing && !education.institution && <Typography>No education details added.</Typography>}
      {isEditing && (
        <Box>
          <TextField name="institution" label="Institution" value={education.institution} onChange={handleChange} fullWidth margin="normal" InputProps={{ style: { borderRadius: '20px' } }} />
          <TextField name="degree" label="Degree" value={education.degree} onChange={handleChange} fullWidth margin="normal" InputProps={{ style: { borderRadius: '20px' } }} />
          <TextField name="status" label="Status" value={education.status} onChange={handleChange} fullWidth margin="normal" InputProps={{ style: { borderRadius: '20px' } }} />
          <Button variant="contained" onClick={handleSubmit} style={{ borderRadius: '20px' }}>Save</Button>
          <Button variant="contained" onClick={() => setIsEditing(false)} style={{ borderRadius: '20px' }}>Cancel</Button>
        </Box>
      )}
    </Box>
  );
}

export default EducationTab;
