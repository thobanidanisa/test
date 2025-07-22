import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Button,
  Divider,
  Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';

export default function UserProfile() {
  const admin = {
    name: 'Andani Baloyi',
    email: 'admin@soberpath.org',
    phone: '+27 71 234 5678',
    role: 'Rehab Admin',
    location: 'Soweto, South Africa',
    avatarUrl: '', // Add path to avatar or leave empty for default
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        User Profile
      </Typography>

      <Card elevation={4}>
        <CardContent>
          <Grid container spacing={4}>
            {/* Left Section */}
            <Grid item xs={12} md={4}>
              <Stack alignItems="center" spacing={2}>
                <Avatar
                  src={admin.avatarUrl}
                  sx={{ width: 120, height: 120, fontSize: 40 }}
                >
                  {admin.name.charAt(0)}
                </Avatar>
                <Typography variant="h6">{admin.name}</Typography>
                <Typography color="textSecondary">{admin.role}</Typography>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  size="small"
                >
                  Edit Profile
                </Button>
              </Stack>
            </Grid>

            {/* Right Section */}
            <Grid item xs={12} md={8}>
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Contact Information
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Stack spacing={2}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <EmailIcon color="action" />
                    <Typography>{admin.email}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <PhoneIcon color="action" />
                    <Typography>{admin.phone}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <LocationOnIcon color="action" />
                    <Typography>{admin.location}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <PersonIcon color="action" />
                    <Typography>{admin.role}</Typography>
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
