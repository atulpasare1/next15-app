import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Document, Page } from 'react-pdf';

function ResumeTab() {
  const [file, setFile] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Box>
      {!isEditing && !file && <Typography>No resume uploaded.</Typography>}
      {!isEditing && file && (
        <Box>
          <Document file={file}>
            <Page pageNumber={1} />
          </Document>
          <Button variant="contained" onClick={toggleEdit} style={{ borderRadius: '20px' }}>Edit</Button>
        </Box>
      )}
      {isEditing && (
        <Box>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} style={{ borderRadius: '20px' }} />
          <Button variant="contained" component="label" style={{ borderRadius: '20px' }}>
            Upload Resume
            <input type="file" hidden accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
          </Button>
          <Button variant="contained" onClick={toggleEdit} style={{ borderRadius: '20px' }}>Cancel</Button>
        </Box>
      )}
    </Box>
  );
}

export default ResumeTab;
