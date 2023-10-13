import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import './Styles/NavBar.scss';
import { useNavigate } from 'react-router-dom';


const NavBar = () => {
    let baseCls = 'navbar';
    const pages = ['Home', 'Emi Calculator', 'Video Gallery', 'Shopping Cart'];
    const navigate = useNavigate();
        const SideBar = () => {
        console.log('Clicl!')
        return (
        <div class="container">
            <button onclick={() => toggleSidebar()}>Toggle Sidebar</button>
            <div class="sidebar" id="sidebar">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
            </div>
        </div>
        )
    }
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        if (sidebar.style.width === '250px') {
          sidebar.style.width = '0';
        } else {
          sidebar.style.width = '250px';
        }
      }
      
      const handleCloseNavMenu = () => {
        setAnchorElNav(null);
      };
      const handleNavigate = (route) => {
        switch (route) {
          case 'Home':
            return navigate('/');
          case 'Emi Calculator':
              return navigate('/emicalculator');
          case 'Video Gallery':
              return navigate('/videogallery');
          case 'Shopping Cart':
              return navigate('/product');
          default:
              return navigate('/home')
        }
      }

      const handleCart = () => {
        navigate('/cart/')
      }
  return (
    <div>
        <Box sx={{ flexGrow: 1 }} className='appBar'>
            <AppBar position="static" >
                <Toolbar variant="dense">
                <IconButton edge="start" onClick={() => toggleSidebar()} color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                {/* <Typography variant="h6" color="inherit" component="div">
                    Home
                </Typography> */}
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {pages.map((page) => (
                    <Button
                      key={page}
                      onClick={() => handleNavigate(page)}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {page}
                    </Button>
                  ))}
                </Box>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                // onClick={handleMenu}
                color="inherit"
              >
                <Badge badgeContent={4} color="error" onClick={() => handleCart()}>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

                {/* <SideBar /> */}
                </Toolbar>
            </AppBar>
        </Box>
    </div>
  )
}

export default NavBar;