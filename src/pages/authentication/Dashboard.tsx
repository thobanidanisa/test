import { Box, Grid, Typography, Paper, useTheme, Divider } from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

const pieData = [
  { name: 'Pending Applications', value: 6 },
  { name: 'Approved Applications', value: 12 },
  { name: 'Rejected Applications', value: 4 },
];

const COLORS = ['#FFBB28', '#00C49F', '#FF4C4C'];

const barData = [
  { name: 'Week 1', Applications: 4 },
  { name: 'Week 2', Applications: 6 },
  { name: 'Week 3', Applications: 5 },
  { name: 'Week 4', Applications: 7 },
];

const statCards = [
  { label: 'Total Applications', value: 22 },
  { label: 'Total Approved', value: 12 },
  { label: 'Total Rejected', value: 4 },
  { label: 'Active Clients', value: 10 },
];

export default function Dashboard() {
  const theme = useTheme();

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Dashboard Overview
      </Typography>

      {/* Stat Cards */}
      <Grid container spacing={3} mb={4}>
        {statCards.map((card, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                borderLeft: `6px solid ${COLORS[idx % COLORS.length]}`,
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                {card.label}
              </Typography>
              <Typography variant="h5" fontWeight={600}>
                {card.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        {/* Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Application Status Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Weekly Applications
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Applications" fill={theme.palette.primary.main} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Divider and footer section */}
      <Divider sx={{ my: 4 }} />
      <Typography variant="body2" color="textSecondary" align="center">
        © {new Date().getFullYear()} SoberPath Rehab Management System Dashboard
      </Typography>
    </Box>
  );
}
