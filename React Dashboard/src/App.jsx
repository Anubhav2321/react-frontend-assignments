import React, { useState, useMemo } from 'react';
import { Box, CssBaseline, ThemeProvider, Grid, Toolbar } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';

import theme from './theme';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import StatCard from './components/StatCard';
import RevenueChart from './components/RevenueChart';
import OrderStatusChart from './components/OrderStatusChart';
import RecentOrders from './components/RecentOrders';

import { mockOrders } from './data/orders';

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDevice, setSelectedDevice] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resetFilters = () => {
    setSelectedDateRange('all');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSelectedDevice('all');
    setSearchQuery('');
  };

  // Filter logic
  const filteredOrders = useMemo(() => {
    return mockOrders.filter(order => {
      // Status filter
      if (selectedStatus !== 'all' && order.status !== selectedStatus) return false;
      
      // Category filter
      if (selectedCategory !== 'all' && order.category !== selectedCategory) return false;

      // Device filter
      if (selectedDevice !== 'all' && order.device !== selectedDevice) return false;

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !order.customer.toLowerCase().includes(query) &&
          !order.product.toLowerCase().includes(query) &&
          !order.id.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      // Date Range filter
      if (selectedDateRange !== 'all') {
        const orderDate = new Date(order.date);
        const today = new Date('2026-09-30'); // Using a fixed 'today' matching our mock data context
        const diffTime = Math.abs(today - orderDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (selectedDateRange === 'today' && diffDays > 0) return false;
        if (selectedDateRange === '7days' && diffDays > 7) return false;
        if (selectedDateRange === '30days' && diffDays > 30) return false;
        if (selectedDateRange === '90days' && diffDays > 90) return false;
      }

      return true;
    });
  }, [selectedDateRange, selectedCategory, selectedStatus]);

  // KPI Calculations
  const metrics = useMemo(() => {
    const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.amount, 0);
    const totalSales = filteredOrders.reduce((sum, order) => sum + order.quantity, 0);
    const totalOrders = filteredOrders.length;
    
    // Unique customers
    const uniqueCustomers = new Set(filteredOrders.map(order => order.customer)).size;

    return {
      revenue: totalRevenue,
      sales: totalSales,
      orders: totalOrders,
      customers: uniqueCustomers
    };
  }, [filteredOrders]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        
        <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

        <Box component="main" sx={{ flexGrow: 1, p: { xs: 1.5, sm: 2, md: 4 }, width: { md: `calc(100% - 260px)` } }}>
          <Header 
            handleDrawerToggle={handleDrawerToggle} 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <FilterBar 
            selectedDateRange={selectedDateRange}
            setSelectedDateRange={setSelectedDateRange}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            selectedDevice={selectedDevice}
            setSelectedDevice={setSelectedDevice}
            resetFilters={resetFilters}
          />

          {/* KPI Cards */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} lg={3}>
              <StatCard 
                title="Total Revenue"
                value={`$${metrics.revenue.toLocaleString()}`}
                change="+12.5%"
                comparisonText="vs last month"
                icon={<AttachMoneyIcon />}
                accentColor={theme.palette.success.main}
                isPositive={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <StatCard 
                title="Total Sales"
                value={metrics.sales.toLocaleString()}
                change="+8.2%"
                comparisonText="vs last month"
                icon={<ShoppingBagIcon />}
                accentColor={theme.palette.secondary.main}
                isPositive={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <StatCard 
                title="Total Orders"
                value={metrics.orders.toLocaleString()}
                change="-2.4%"
                comparisonText="vs last month"
                icon={<InventoryIcon />}
                accentColor={theme.palette.primary.main}
                isPositive={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <StatCard 
                title="Total Customers"
                value={metrics.customers.toLocaleString()}
                change="+18.1%"
                comparisonText="vs last month"
                icon={<PeopleIcon />}
                accentColor={theme.palette.warning.main}
                isPositive={true}
              />
            </Grid>
          </Grid>

          {/* Charts Section */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} lg={8}>
              <RevenueChart orders={filteredOrders} />
            </Grid>
            <Grid item xs={12} lg={4}>
              <OrderStatusChart orders={filteredOrders} />
            </Grid>
          </Grid>

          {/* Recent Orders Table */}
          <Box sx={{ mb: 4 }}>
            <RecentOrders orders={filteredOrders} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
