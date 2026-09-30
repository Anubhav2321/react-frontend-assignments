import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip
} from '@mui/material';

const RecentOrders = ({ orders }) => {
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'Processing': return 'info';
      case 'Pending': return 'warning';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  // Limit to 10 rows for display
  const displayOrders = orders.slice(0, 10);

  return (
    <Card>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ color: 'text.primary', mb: 0.5 }}>
            Recent Orders
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Latest transactions and their statuses
          </Typography>
        </Box>

        {displayOrders.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography sx={{ color: 'text.secondary' }}>No orders found matching the criteria.</Typography>
          </Box>
        ) : (
          <TableContainer sx={{ 
            overflowX: 'auto',
            '&::-webkit-scrollbar': { height: 8 },
            '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4 }
          }}>
            <Table sx={{ minWidth: 700 }} aria-label="recent orders table">
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayOrders.map((order) => {
                  const dateObj = new Date(order.date);
                  const formattedDate = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                  
                  return (
                    <TableRow key={order.id}>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>{order.id}</TableCell>
                      <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>{order.customer}</TableCell>
                      <TableCell sx={{ color: 'text.primary' }}>{order.product}</TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>{order.category}</TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>{formattedDate}</TableCell>
                      <TableCell align="right" sx={{ color: 'text.primary', fontWeight: 600 }}>
                        ${order.amount.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        <Chip 
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'currentColor' }} />
                              {order.status}
                            </Box>
                          } 
                          color={getStatusColor(order.status)} 
                          size="small" 
                          sx={{ 
                            fontWeight: 600, 
                            borderRadius: '6px',
                            px: 0.5,
                            bgcolor: (theme) => theme.palette[getStatusColor(order.status)].main + '20',
                            color: (theme) => theme.palette[getStatusColor(order.status)].main,
                            border: '1px solid',
                            borderColor: (theme) => theme.palette[getStatusColor(order.status)].main + '30',
                          }} 
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
