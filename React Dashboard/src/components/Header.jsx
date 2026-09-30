import React, { useState } from 'react';
import { 
  Box, 
  IconButton, 
  Typography, 
  Avatar, 
  useTheme, 
  Menu, 
  MenuItem, 
  InputBase, 
  Badge,
  ListItemIcon,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

const Header = ({ handleDrawerToggle, searchQuery, setSearchQuery }) => {
  const theme = useTheme();
  
  // States for search and menus
  const [searchOpen, setSearchOpen] = useState(false);
  const [anchorElNotif, setAnchorElNotif] = useState(null);
  const [anchorElProfile, setAnchorElProfile] = useState(null);

  const handleOpenNotif = (event) => setAnchorElNotif(event.currentTarget);
  const handleCloseNotif = () => setAnchorElNotif(null);

  const handleOpenProfile = (event) => setAnchorElProfile(event.currentTarget);
  const handleCloseProfile = () => setAnchorElProfile(null);

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      p: 3,
      mb: 1,
      flexWrap: 'wrap',
      gap: 2
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Box>
          <Typography variant="h4" sx={{ color: 'text.primary', mb: 0.5, fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
            Dashboard
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', display: { xs: 'none', sm: 'block' } }}>
            Overview of your order management performance
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', display: { xs: 'block', sm: 'none' } }}>
            Overview of performance
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        
        {/* Search Bar */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          background: searchOpen ? 'rgba(255,255,255,0.05)' : 'transparent',
          borderRadius: '20px',
          px: searchOpen ? 2 : 0,
          transition: 'all 0.3s ease',
          width: searchOpen ? { xs: '150px', sm: '200px' } : '40px',
          overflow: 'hidden'
        }}>
          <IconButton onClick={() => setSearchOpen(!searchOpen)} sx={{ 
            color: 'text.secondary',
            '&:hover': { background: searchOpen ? 'transparent' : 'rgba(255,255,255,0.05)', color: 'text.primary' }
          }}>
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder="Search orders, customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ 
              color: 'text.primary', 
              width: searchOpen ? '100%' : '0px',
              opacity: searchOpen ? 1 : 0,
              transition: 'all 0.3s ease',
            }}
          />
        </Box>

        {/* Notifications */}
        <IconButton 
          onClick={handleOpenNotif}
          sx={{ 
            color: 'text.secondary',
            '&:hover': { background: 'rgba(255,255,255,0.05)', color: 'text.primary' }
          }}
        >
          <Badge badgeContent={3} color="primary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        
        <Menu
          anchorEl={anchorElNotif}
          open={Boolean(anchorElNotif)}
          onClose={handleCloseNotif}
          PaperProps={{
            sx: {
              mt: 1.5,
              background: 'rgba(20, 20, 25, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff',
              minWidth: '250px'
            }
          }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Notifications</Typography>
          </Box>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
          <MenuItem onClick={handleCloseNotif} sx={{ py: 1.5 }}>
            <Typography variant="body2">New order #ORD-1075 received</Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseNotif} sx={{ py: 1.5 }}>
            <Typography variant="body2">Product "Coffee Maker" is low on stock</Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseNotif} sx={{ py: 1.5 }}>
            <Typography variant="body2">System update scheduled for midnight</Typography>
          </MenuItem>
        </Menu>

        {/* Profile */}
        <Avatar 
          onClick={handleOpenProfile}
          sx={{ 
            width: 40, 
            height: 40, 
            ml: 1, 
            bgcolor: theme.palette.primary.main,
            color: '#000',
            fontWeight: 'bold',
            cursor: 'pointer',
            border: '2px solid rgba(255,255,255,0.1)',
            transition: 'all 0.2s',
            '&:hover': { borderColor: theme.palette.primary.main, transform: 'scale(1.05)' }
          }}
        >
          AN
        </Avatar>

        <Menu
          anchorEl={anchorElProfile}
          open={Boolean(anchorElProfile)}
          onClose={handleCloseProfile}
          PaperProps={{
            sx: {
              mt: 1.5,
              background: 'rgba(20, 20, 25, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff',
              minWidth: '200px'
            }
          }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Anubhav</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Administrator</Typography>
          </Box>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
          <MenuItem onClick={handleCloseProfile}>
            <ListItemIcon><PersonIcon fontSize="small" sx={{ color: 'text.secondary' }} /></ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={handleCloseProfile}>
            <ListItemIcon><SettingsIcon fontSize="small" sx={{ color: 'text.secondary' }} /></ListItemIcon>
            Settings
          </MenuItem>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
          <MenuItem onClick={handleCloseProfile}>
            <ListItemIcon><LogoutIcon fontSize="small" sx={{ color: 'error.main' }} /></ListItemIcon>
            <Typography color="error">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
