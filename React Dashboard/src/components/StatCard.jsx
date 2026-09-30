import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const StatCard = ({ title, value, change, comparisonText, icon, accentColor, isPositive }) => {
  return (
    <Card sx={{ 
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        transform: 'translateY(-6px)',
        boxShadow: `0 20px 40px -10px rgba(0,0,0,0.5), 0 0 0 1px ${accentColor}40`,
        '& .icon-box': {
          background: `${accentColor}20`,
          color: accentColor,
        }
      }
    }}>
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '4px',
        height: '100%',
        backgroundColor: accentColor,
      }} />
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {title}
          </Typography>
          <Box className="icon-box" sx={{ 
            p: 1, 
            borderRadius: '12px', 
            background: 'rgba(255,255,255,0.05)',
            color: 'text.secondary',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}>
            {icon}
          </Box>
        </Box>
        
        <Typography variant="h4" sx={{ mb: 2, color: 'text.primary' }}>
          {value}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 0.5,
            color: isPositive ? 'success.main' : (isPositive === false ? 'error.main' : 'text.secondary'),
            bgcolor: isPositive ? 'success.main' + '15' : (isPositive === false ? 'error.main' + '15' : 'rgba(255,255,255,0.05)'),
            px: 1,
            py: 0.25,
            borderRadius: '4px',
            fontSize: '0.8rem',
            fontWeight: 600
          }}>
            {isPositive && <ArrowUpwardIcon sx={{ fontSize: 14 }} />}
            {isPositive === false && <ArrowDownwardIcon sx={{ fontSize: 14 }} />}
            {change}
          </Box>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {comparisonText}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
