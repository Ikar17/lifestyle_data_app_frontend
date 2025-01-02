import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import NavbarMobile from './NavbarMobile';
import { MenuItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import PollIcon from '@mui/icons-material/Poll';
import ProfileFragment from './ProfileFragment';
import { useAuth } from '../../contexts/AuthContext';


export default function Navbar() {
  const auth = useAuth();

  return (
    <AppBar
      position='sticky'
      sx={{
        background: 'linear-gradient(to right, #1976d2, #2196f3)', 
        boxShadow: 4,
      }}
    >
      <Container 
        maxWidth='lg'
        sx={{
          display: 'flex',
          minHeight: '10vh',
        }}
      >
        <Toolbar
          variant="dense"
          sx={{
            width: "100%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: "flex", gap: 5 }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                  color: "white",
                  transition: 'color 0.3s',
                  '&:hover': {
                    color: '#ffeb3b',
                  }
                }}
              >
                <PollIcon fontSize='large' />
                <Typography variant="h5" fontWeight='bold'>
                  LifestyleData
                </Typography>
              </Box>
            </Link>    
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: "center" }}>
            {auth.token === "" ? (
              <>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Button
                    color="info"
                    variant="contained"
                    sx={{
                      borderRadius: 8,
                      textTransform: 'none',
                      px: 3,
                      boxShadow: 3,
                      '&:hover': {
                        backgroundColor: 'info.dark',
                      },
                    }}
                  >
                    Zaloguj się
                  </Button>
                </Link>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <Button
                    color="secondary"
                    variant="contained"
                    sx={{
                      borderRadius: 8,
                      textTransform: 'none',
                      px: 3,
                      boxShadow: 3,
                      '&:hover': {
                        backgroundColor: 'secondary.dark',
                      },
                    }}
                  >
                    Zarejestruj się
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                  <MenuItem sx={{ color: "white", fontWeight: 'bold', '&:hover': { color: '#ffeb3b' } }}>
                    Strona główna
                  </MenuItem>
                </Link>
                <Link to="/air" style={{ textDecoration: 'none' }}>
                  <MenuItem sx={{ color: "white", fontWeight: 'bold', '&:hover': { color: '#ffeb3b' } }}>
                    Stan powietrza
                  </MenuItem>
                </Link>
                {auth.role === "ADMIN" ? 
                  <Link to="/users" style={{ textDecoration: 'none' }}>
                    <MenuItem sx={{ color: "white", fontWeight: 'bold', '&:hover': { color: '#ffeb3b' } }}>
                      Użytkownicy
                    </MenuItem>
                  </Link>
                  :
                  <></>
                }
              </>
            )}

            <ProfileFragment />
          </Box>

          {/* wersja mobilna */}
          <NavbarMobile />

        </Toolbar>
      </Container>
    </AppBar>
  )
}