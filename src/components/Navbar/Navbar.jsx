import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import NavbarMobile from './NavbarMobile';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import PollIcon from '@mui/icons-material/Poll';
import ProfileFragment from './ProfileFragment';
import { useAuth } from '../../contexts/AuthContext';


export default function Navbar() {

  const auth = useAuth();

  return (
    <AppBar position='sticky' >
      <Container 
        maxWidth='lg'
        sx={{
          display: 'flex',
          minHeight: '10vh'
        }}
      >
        <Toolbar
          variant="dense"
          sx={{
            width: "100%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'transparent'
            }}
        >
            <Box sx={{ display: "flex", gap: 5}}>
              <Link to="/">
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center", color: "white"}}>
                    <PollIcon />
                    <Typography variant="h5" >
                      LifestyleData
                    </Typography>
                  </Box>
              </Link>    
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              { auth.token === "" ?
                  <>
                    <Link to="/login">
                      <Button
                        color="info"
                        variant="contained"
                          sx={{
                            gap: 1
                          }}
                        >
                          Zaloguj się
                      </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      color="info"
                      variant="contained"
                        sx={{
                          gap: 1
                        }}
                      >
                        Zarejestruj się
                    </Button>
                  </Link>
                  </>
              :
                 <></>
              }
            </Box>
            
            <ProfileFragment />

            {/*mobile version*/}
            <NavbarMobile />
                    
          </Toolbar>
      </Container>
    </AppBar>
    )
}