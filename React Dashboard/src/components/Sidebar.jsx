import React from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Typography, 
  Avatar,
  Divider,
  useTheme
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const drawerWidth = 260;

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, active: true },
    { text: 'Orders', icon: <ShoppingCartIcon />, active: false },
    { text: 'Customers', icon: <PeopleIcon />, active: false },
    { text: 'Products', icon: <InventoryIcon />, active: false },
    { text: 'Analytics', icon: <AnalyticsIcon />, active: false },
  ];

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo Area */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ 
          width: 32, 
          height: 32, 
          borderRadius: 2, 
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '1.2rem'
        }}>
          O
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '-0.5px' }}>
          Orderly<Box component="span" sx={{ color: 'primary.main' }}>Analytics</Box>
        </Typography>
      </Box>

      {/* Navigation Links */}
      <List sx={{ px: 2, flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              sx={{
                borderRadius: '12px',
                backgroundColor: item.active ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                color: item.active ? theme.palette.primary.main : theme.palette.text.secondary,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: theme.palette.text.primary,
                },
                transition: 'all 0.2s ease',
              }}
              onClick={() => {
                if (!item.active) {
                  alert("Coming Soon");
                }
              }}
            >
              <ListItemIcon sx={{ 
                color: 'inherit', 
                minWidth: 40 
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontWeight: item.active ? 600 : 500,
                  fontSize: '0.95rem'
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* User Profile Section */}
      <Box sx={{ p: 2, mb: 1 }}>
        <Box sx={{ 
          p: 2, 
          borderRadius: '16px', 
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.06)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
          }
        }}>
          <Avatar sx={{ width: 40, height: 40, bgcolor: theme.palette.primary.main, color: '#09090b', fontWeight: 'bold' }}>AN</Avatar>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Anubhav
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Administrator
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
      {/* Desktop permanent drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
