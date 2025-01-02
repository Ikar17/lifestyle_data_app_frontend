import { Box, MenuItem, Button } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


export default function NavbarMobile(){

    const auth = useAuth();

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };

    const signout = () => {
      auth.logout();
    }

    return(
        <>
          { auth.token === "" ? 
              <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>
                <Drawer
                  anchor="top"
                  open={open}
                  onClose={toggleDrawer(false)}
                  PaperProps={{
                    sx: {
                      top: 'var(--template-frame-height, 0px)',
                    },
                  }}
                >
                  <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                  </Box>
                  <Divider sx={{ my: 3 }} />
                    <MenuItem>
                      <Link to="/login">
                        <Button color="primary" variant="contained" fullWidth>
                          Zaloguj się
                        </Button>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/register">
                        <Button color="primary" variant="outlined" fullWidth>
                          Zarejestruj się
                        </Button>
                      </Link> 
                    </MenuItem>
                  </Box>
                </Drawer>
              </Box>
            :
            <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>
                <Drawer
                  anchor="top"
                  open={open}
                  onClose={toggleDrawer(false)}
                  PaperProps={{
                    sx: {
                      top: 'var(--template-frame-height, 0px)',
                    },
                  }}
                >
                  <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                  </Box>
                  <MenuItem>
                    <Link to="/account">
                        <Button color="primary" variant="contained" fullWidth>
                            Profil
                        </Button>
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 3 }} />
                    <MenuItem>
                      <Link to="/dashboard">
                        <Button color="primary" variant="outlined">
                          Strona główna
                        </Button>
                      </Link>
                    </MenuItem>
                    <MenuItem >
                      <Link to="/air" >
                        <Button color="primary" variant="outlined">
                          Stan powietrza
                        </Button>
                      </Link> 
                    </MenuItem>
                    {auth.role === "ADMIN" ? 
                      <MenuItem>
                        <Link to="/users">
                          <Button color="primary" variant="outlined">
                            Użytkownicy
                          </Button>
                        </Link>
                      </MenuItem>
                    :
                      <></>
                    }
                    <Divider sx={{ my: 3 }} />
                    <MenuItem>
                      <Button color="error" variant="contained" onClick={signout}>
                          Wyloguj się
                      </Button>
                    </MenuItem>
                  </Box>
                </Drawer>
              </Box>
          }
          </>  
    )
}