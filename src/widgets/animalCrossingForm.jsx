import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PetsIcon from '@mui/icons-material/Pets';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import axios from 'axios';

const defaultTheme = createTheme();
const favorite = await axios.get('http://localhost:3000/');
const villagers = favorite.data.data;
console.log(villagers);

export default function AnimalCrossingForm() {
  const [formData, setFormData] = useState({
    name: '',
    personality: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:3000/', formData)
      .then(response => {
        console.log('Form submitted successfully:', response.data.data);
        alert("Submitted: " + response.data.data.name +" with a personality of: "+ response.data.data.personality);
      }).json(response.data.data)
      .catch(error => {
        console.error('Error:', error.response.data);
      });
  };

  return (
    <React.Fragment>
      <Box sx={{
        marginTop: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left'
      }}>
        <a href="../villagers.html" target="_blank">
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Villagers" />
          </ListItemButton>
        </a>
      </Box>

      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Avatar sx={{ m: 1, bgcolor: '#1c7c24' }}>
              <PetsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              What's your favorite Animal Crossing villager and its personality type?
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Villager Name"
                name="name"
                autoComplete="Ex: Rosie"
                autoFocus
                value={formData.name}
                onChange={handleInputChange}/>
              <TextField
                margin="normal"
                required
                fullWidth
                name="personality"
                label="Villager Personality"
                id="personality"
                autoComplete="Ex: Peppy"
                value={formData.personality}
                onChange={handleInputChange}/>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Submit
              </Button>
            </Box>
            <Box>
            {villagers.map((villager) => (
              <div key={villager.id}>
                <p>Name: {villager.name}</p>
                <p>Personality: {villager.personality}</p>
              </div>
            ))}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}