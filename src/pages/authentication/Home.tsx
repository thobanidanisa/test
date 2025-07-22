import { ReactElement, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Tooltip,
  Fade,
  useTheme,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PersonOffIcon from '@mui/icons-material/PersonOff';

// ✅ FIXED: Use correct casing for the filename
import { currentUserRole, UserRole } from 'utils/UserRole';

interface Activity {
  id: string;
  type: 'admin-added' | 'client-applied' | 'application-updated' | 'admin-removed';
  user: string;
  details: string;
  timestamp: string;
}

const allActivities: Activity[] = [
  {
    id: '1',
    type: 'admin-added',
    user: 'Andani Baloyi',
    details: 'Added new rehab administrator: Sizwe',
    timestamp: '2025-07-09T10:15:00',
  },
  {
    id: '2',
    type: 'client-applied',
    user: 'SocialWorker - Zach Hlongwane',
    details: 'Client Michael Smith applied for rehab (APP-001)',
    timestamp: '2025-07-09T09:45:00',
  },
  {
    id: '3',
    type: 'application-updated',
    user: 'Sizwe',
    details: 'Application APP-002 status changed to Approved',
    timestamp: '2025-07-08T16:20:00',
  },
  {
    id: '4',
    type: 'admin-removed',
    user: 'Thobani Danisa',
    details: 'Removed rehab administrator: John Roe',
    timestamp: '2025-07-08T14:05:00',
  },
];

const iconMap = {
  'admin-added': <PersonAddIcon />,
  'client-applied': <HowToRegIcon />,
  'application-updated': <EditNoteIcon />,
  'admin-removed': <PersonOffIcon />,
};

const chipColorMap = {
  'admin-added': 'primary',
  'client-applied': 'success',
  'application-updated': 'warning',
  'admin-removed': 'error',
};

export default function Home(): ReactElement {
  const theme = useTheme();
  const [activities, setActivities] = useState<Activity[]>([]);

  const role: UserRole = currentUserRole;

  useEffect(() => {
    let filteredActivities = allActivities;

    if (role === 'social-worker') {
      filteredActivities = allActivities.filter((activity) =>
        activity.type === 'client-applied'
      );
    } else if (role === 'ngo-admin') {
      filteredActivities = allActivities.filter((activity) =>
        ['admin-added', 'admin-removed'].includes(activity.type)
      );
    } else if (role === 'rehab-admin') {
      filteredActivities = allActivities; // Show all
    }

    const sorted = filteredActivities.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    setActivities(sorted);
  }, [role]);

  return (
    <Box
      component="main"
      sx={{
        p: 4,
        width: '100%',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Home ({role.replace('-', ' ')})
      </Typography>

      <Grid container spacing={3}>
        {activities.map((activity) => (
          <Grid item xs={12} sm={6} md={4} key={activity.id}>
            <Fade in timeout={400}>
              <Card
                elevation={4}
                sx={{
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar sx={{ mr: 2 }}>
                      {iconMap[activity.type]}
                    </Avatar>
                    <Chip
                      size="small"
                      color={chipColorMap[activity.type] as any}
                      label={activity.type.replace('-', ' ').toUpperCase()}
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>

                  <Typography variant="body1" mb={1}>
                    {activity.details}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    <Tooltip title={new Date(activity.timestamp).toLocaleString()} arrow>
                      <span>
                        {new Date(activity.timestamp).toLocaleDateString('en-ZA', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}{' '}
                        at{' '}
                        {new Date(activity.timestamp).toLocaleTimeString('en-ZA', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </Tooltip>{' '}
                    — <strong>{activity.user}</strong>
                  </Typography>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
