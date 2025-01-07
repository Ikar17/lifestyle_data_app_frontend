import { Box, IconButton} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";


export default function ProfileFragment(){
    const auth = useAuth();

    const signout = () => {
      auth.logout();
      setAnchorEl(null);
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <>
        { auth.token !== "" ?
            <Box>
                <IconButton aria-label="Menu button" onClick={handleClick} sx={{color: "white"}}>
                    <AccountCircleIcon />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                    <MenuItem>
                        <Link to="/account" onClick={handleClose}>
                            <Button color="primary" variant="contained" fullWidth>
                            Profil
                            </Button>
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Button color="error" variant="contained" fullWidth onClick={signout}>
                          Wyloguj się
                        </Button>
                    </MenuItem>
                </Menu>
            </Box>
            :
            <></>
        }
        </>
    )
}