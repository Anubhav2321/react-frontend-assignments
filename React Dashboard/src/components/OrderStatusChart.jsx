import React, { useMemo } from 'react';
import { Card, CardContent, Typography, Box, useTheme, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const OrderStatusChart = ({ orders }) => {
  const theme = useTheme();

  const STATUS_COLORS = {
    'Completed': theme.palette.success.main,
    'Processing': theme.palette.info.main,
    'Pending': theme.palette.warning.main,
    'Cancelled': theme.palette.error.main
  };

  const chartData = useMemo(() => {
    if (!orders || orders.length === 0) return [];

    const counts = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(counts).map(status => ({
      name: status,
      value: counts[status]
    }));
  }, [orders]);

  const totalOrders = chartData.reduce((sum, entry) => sum + entry.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.1)',
          p: 2,
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5
        }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: payload[0].payload.fill }} />
          <Typography variant="body1" sx={{ color: '#fff', fontWeight: 600 }}>
            {payload[0].name}
          </Typography>
          <Typography variant="body1" sx={{ color: payload[0].payload.fill, fontWeight: 700, ml: 2 }}>
            {payload[0].value}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Card sx={{ height: '100%', minHeight: { xs: 350, sm: 420 } }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h6" sx={{ color: 'text.primary', mb: 0.5, fontWeight: 700 }}>
              Order Status
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Distribution of current orders
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
          <Box sx={{ width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <Box sx={{ width: '100%', height: 260 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={75}
                    outerRadius={105}
                    paddingAngle={6}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={8}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || theme.palette.text.secondary} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
            
            {/* Center Label */}
            <Box sx={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -60%)', 
              textAlign: 'center',
              pointerEvents: 'none' 
            }}>
              <Typography variant="h4" sx={{ color: 'text.primary', fontWeight: 700 }}>
                {totalOrders}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                Total
              </Typography>
            </Box>

            {/* Custom Legend */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, mt: 1, width: '100%' }}>
              {chartData.map((entry, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: STATUS_COLORS[entry.name] }} />
                  <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
                    {entry.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderStatusChart;
