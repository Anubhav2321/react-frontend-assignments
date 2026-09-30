import React, { useMemo } from 'react';
import { Card, CardContent, Typography, Box, useTheme, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const RevenueChart = ({ orders }) => {
  const theme = useTheme();

  // Process data for the chart
  const chartData = useMemo(() => {
    if (!orders || orders.length === 0) return [];

    // Group by date
    const grouped = orders.reduce((acc, order) => {
      const date = order.date;
      if (!acc[date]) {
        acc[date] = { date, Revenue: 0, Sales: 0 };
      }
      acc[date].Revenue += order.amount;
      acc[date].Sales += order.quantity;
      return acc;
    }, {});

    // Sort by date and format
    const sortedDates = Object.keys(grouped).sort();
    
    return sortedDates.map(date => {
      // Format date like 'Sep 28'
      const dateObj = new Date(date);
      const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return {
        ...grouped[date],
        name: formattedDate
      };
    });
  }, [orders]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.1)',
          p: 2,
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)'
        }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5, fontWeight: 600 }}>{label}</Typography>
          {payload.map((entry, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: index !== payload.length - 1 ? 1 : 0 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: entry.color }} />
              <Typography variant="body1" sx={{ color: '#fff', fontWeight: 500, minWidth: 60 }}>
                {entry.name}
              </Typography>
              <Typography variant="body1" sx={{ color: entry.color, fontWeight: 700, ml: 'auto' }}>
                {entry.name === 'Revenue' ? '$' : ''}{entry.value.toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Box>
      );
    }
    return null;
  };

  return (
    <Card sx={{ height: '100%', minHeight: { xs: 320, sm: 420 } }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h6" sx={{ color: 'text.primary', mb: 0.5, fontWeight: 700 }}>
              Revenue & Sales Trend
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Performance over the selected period
            </Typography>
          </Box>
          <IconButton size="small" sx={{ color: 'text.secondary' }}>
            <MoreVertIcon />
          </IconButton>
        </Box>

        {chartData.length === 0 ? (
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography sx={{ color: 'text.secondary' }}>No data available for the selected filters.</Typography>
          </Box>
        ) : (
          <Box sx={{ width: '100%', flexGrow: 1, minHeight: 300 }}>
            <ResponsiveContainer>
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.4}/>
                    <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette.secondary.main} stopOpacity={0.4}/>
                    <stop offset="95%" stopColor={theme.palette.secondary.main} stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke={theme.palette.text.secondary} 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                  tick={{ fill: theme.palette.text.secondary }}
                />
                <YAxis 
                  yAxisId="left"
                  stroke={theme.palette.text.secondary} 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                  dx={-10}
                  tick={{ fill: theme.palette.text.secondary }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  stroke={theme.palette.text.secondary} 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dx={10}
                  tick={{ fill: theme.palette.text.secondary }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '13px' }} />
                
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="Revenue" 
                  stroke={theme.palette.primary.main} 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  activeDot={{ r: 6, strokeWidth: 0, fill: theme.palette.primary.main }}
                />
                <Area 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="Sales" 
                  stroke={theme.palette.secondary.main} 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                  activeDot={{ r: 6, strokeWidth: 0, fill: theme.palette.secondary.main }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
