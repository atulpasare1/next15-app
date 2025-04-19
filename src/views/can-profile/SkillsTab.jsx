import React from 'react';
import { Box, Chip, TextField, Button, Typography } from '@mui/material';

function SkillsTab() {
  const [skills, setSkills] = React.useState(['Skill1', 'Skill2']);
  const [input, setInput] = React.useState('');
  const [isEditing, setIsEditing] = React.useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddSkill = () => {
    if (input && !skills.includes(input)) {
      setSkills([...skills, input]);
      setInput('');
    }
  };

  const handleDelete = (skillToDelete) => {
    setSkills(skills.filter((skill) => skill !== skillToDelete));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Handle save logic
    console.log(skills);
  };

  return (
    <Box>
      {!isEditing && skills.length > 0 && (
        <Box>
          {skills.map((skill) => (
            <Chip key={skill} label={skill} onDelete={() => handleDelete(skill)} sx={{ m: 0.5, borderRadius: '20px' }} />
          ))}
          <Button variant="contained" onClick={() => setIsEditing(true)} style={{ borderRadius: '20px' }}>Edit</Button>
        </Box>
      )}
      {!isEditing && skills.length === 0 && <Typography>No skills added.</Typography>}
      {isEditing && (
        <Box>
          <TextField
            label="Add Skill"
            value={input}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
            fullWidth
            margin="normal"
            InputProps={{ style: { borderRadius: '20px' } }}
          />
          <Button variant="contained" onClick={handleAddSkill} style={{ borderRadius: '20px' }}>Add</Button>
          <Box sx={{ mt: 2 }}>
            {skills.map((skill) => (
              <Chip key={skill} label={skill} onDelete={() => handleDelete(skill)} sx={{ m: 0.5, borderRadius: '20px' }} />
            ))}
          </Box>
          <Button variant="contained" onClick={handleSave} style={{ borderRadius: '20px' }}>Save</Button>
          <Button variant="contained" onClick={() => setIsEditing(false)} style={{ borderRadius: '20px' }}>Cancel</Button>
        </Box>
      )}
    </Box>
  );
}

export default SkillsTab;
