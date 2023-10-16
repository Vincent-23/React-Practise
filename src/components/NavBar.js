import React,{ useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import './Styles/NavBar.scss';


const NavBar = () => {
    let baseCls = 'navbar';
    const pages = ['Home', 'Task', 'Emi Calculator', 'Video Gallery', 'Shopping Cart'];
    const navigate = useNavigate();
    const [badgeCount, setBadgeCount] = useState(0);
    const toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        if (sidebar.style.width === '250px') {
          sidebar.style.width = '0';
        } else {
          sidebar.style.width = '250px';
        }
      }
      
     
      const handleNavigate = (route) => {
        switch (route) {
          case 'Home':
            return navigate('/');
          case 'Task':
            return navigate('/task');
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
      useEffect(() => {
        let cartDatas = JSON.parse(localStorage.getItem("User"));
        let cartCount = cartDatas.length > 0 ? cartDatas.length : 0;
        console.log('cartCount!',cartDatas,typeof cartCount,typeof 1)
        setBadgeCount(cartCount);
    },[])
  return (
    <div className={`${baseCls}__container`}>
        <Box sx={{ flexGrow: 1 }} className={`${baseCls}__appBar`}>
            <AppBar position="static" >
                <Toolbar variant="dense">
                <IconButton edge="start" onClick={() => toggleSidebar()} color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
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
                <Badge badgeContent={badgeCount} color="error" onClick={() => handleCart()}>
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