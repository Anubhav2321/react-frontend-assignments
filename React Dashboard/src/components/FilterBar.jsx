import React from 'react';
import { Box, FormControl, Select, MenuItem, Button, Typography, InputLabel } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { categories, statuses } from '../data/orders';

const dateRanges = [
  { value: 'all', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: '7days', label: 'Last 7 Days' },
  { value: '30days', label: 'Last 30 Days' },
  { value: '90days', label: 'Last 90 Days' },
];

const devices = ['All Devices', 'Mobile', 'Tablet', 'PC'];

const FilterBar = ({ 
  selectedDateRange, 
  setSelectedDateRange, 
  selectedCategory, 
  setSelectedCategory, 
  selectedStatus, 
  setSelectedStatus,
  selectedDevice,
  setSelectedDevice,
  resetFilters
}) => {
  return (
    <Box sx={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 2,
      p: 2,
      mb: 4,
      background: 'rgba(20, 20, 25, 0.4)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.2)',
      alignItems: 'center'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
        <FilterListIcon sx={{ color: 'text.secondary' }} />
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
          Filters
        </Typography>
      </Box>

      <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 140 }, flex: { xs: '1 1 100%', sm: '0 1 auto' } }}>
        <InputLabel id="date-range-label" sx={{ color: 'text.secondary' }}>Date Range</InputLabel>
        <Select
          labelId="date-range-label"
          value={selectedDateRange}
          label="Date Range"
          onChange={(e) => setSelectedDateRange(e.target.value)}
          sx={{
            color: 'text.primary',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' }
          }}
        >
          {dateRanges.map(range => (
            <MenuItem key={range.value} value={range.value}>{range.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 140 }, flex: { xs: '1 1 100%', sm: '0 1 auto' } }}>
        <InputLabel id="category-label" sx={{ color: 'text.secondary' }}>Category</InputLabel>
        <Select
          labelId="category-label"
          value={selectedCategory}
          label="Category"
          onChange={(e) => setSelectedCategory(e.target.value)}
          sx={{
            color: 'text.primary',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' }
          }}
        >
          <MenuItem value="all">All Categories</MenuItem>
          {categories.map(cat => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 140 }, flex: { xs: '1 1 100%', sm: '0 1 auto' } }}>
        <InputLabel id="status-label" sx={{ color: 'text.secondary' }}>Status</InputLabel>
        <Select
          labelId="status-label"
          value={selectedStatus}
          label="Status"
          onChange={(e) => setSelectedStatus(e.target.value)}
          sx={{
            color: 'text.primary',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' }
          }}
        >
          <MenuItem value="all">All Statuses</MenuItem>
          {statuses.map(stat => (
            <MenuItem key={stat} value={stat}>{stat}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 140 }, flex: { xs: '1 1 100%', sm: '0 1 auto' } }}>
        <InputLabel id="device-label" sx={{ color: 'text.secondary' }}>Device Size</InputLabel>
        <Select
          labelId="device-label"
          value={selectedDevice}
          label="Device Size"
          onChange={(e) => setSelectedDevice(e.target.value)}
          sx={{
            color: 'text.primary',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' }
          }}
        >
          {devices.map(dev => (
            <MenuItem key={dev} value={dev === 'All Devices' ? 'all' : dev}>{dev}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} />

      <Button 
        variant="outlined" 
        onClick={resetFilters}
        sx={{
          width: { xs: '100%', sm: 'auto' },
          color: 'text.secondary',
          borderColor: 'rgba(255,255,255,0.1)',
          '&:hover': {
            borderColor: 'rgba(255,255,255,0.3)',
            backgroundColor: 'rgba(255,255,255,0.05)',
            color: 'text.primary'
          }
        }}
      >
        Reset Filters
      </Button>
    </Box>
  );
};

export default FilterBar;
