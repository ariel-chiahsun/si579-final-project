import {AppBar, Toolbar, Typography, Stack, Button} from '@mui/material'

import { NavLink } from 'react-router-dom'


export const Navbar =()=>{
    const navLinkStyles = ({ isActive }) => {
        return {
          fontWeight: isActive ? 'bold' : 'normal',
          textDecoration: isActive ? 'none' : 'none',
          color: 'black'
        }
      }
    return (
        <AppBar position='static' color='transparent' elevation={0} className="Navbar">
            <Toolbar sx={{ flexGrow: 1 }}>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>Travel Journal</Typography>
                <Stack direction='row' spacing={2}  sx={{ flexGrow: 1 }}>
                    {/* <Button color='inherit'>Explore</Button> */}
                    <Button color='inherit'> <NavLink to='/' style={navLinkStyles}>Gallery</NavLink></Button>
                    <Button color='inherit'><NavLink to='/create' style={navLinkStyles}>Post</NavLink></Button>
                </Stack>
                {/* <Stack direction='row' spacing={2}>
                    <Button color='inherit'  variant="outlined">Login</Button>
                    <Button color='inherit'  variant="contained" disableElevation>Sign Up</Button>
                </Stack> */}
            </Toolbar>
        </AppBar>
    )
}