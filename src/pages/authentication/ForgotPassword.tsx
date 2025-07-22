import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  Link,
  Skeleton,
  Stack,
  TextField,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import { Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from 'components/base/Image';
import IconifyIcon from 'components/base/IconifyIcon';
import forgotPassword from 'assets/authentication-banners/forgot-password.png';
import logo from 'assets/logo/elegant-logo.png';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleReset = () => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    setError('');
    alert('A password reset link has been sent to your email.');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          maxWidth: 960,
          width: '100%',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        {/* Left Section */}
        <Stack
          sx={{
            flex: 1,
            p: { xs: 4, md: 6 },
            justifyContent: 'center',
          }}
        >
          {/* Logo */}
          <Box mb={3}>
            <Link href="/">
              <Image src={logo} sx={{ width: 100 }} />
            </Link>
          </Box>

          {/* Content */}
          <Stack spacing={4} maxWidth={400} width="100%" mx="auto">
            <Typography variant="h4" fontWeight="bold">
              Forgot Password
            </Typography>

            <FormControl fullWidth>
              <InputLabel shrink htmlFor="email">
                Email
              </InputLabel>
              <TextField
                id="email"
                placeholder="Enter your email"
                variant="filled"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(error)}
                helperText={error}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconifyIcon icon="ic:baseline-email" />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <Button variant="contained" size="large" fullWidth onClick={handleReset}>
              Send Reset Link
            </Button>

            <Typography variant="body2" color="text.secondary" textAlign="center">
              Back to{' '}
              <Link
                underline="hover"
                onClick={() => navigate('/authentication/login')}
                sx={{ cursor: 'pointer' }}
              >
                Log in
              </Link>
            </Typography>
          </Stack>
        </Stack>

        {/* Right Banner Section */}
        <Suspense
          fallback={
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              sx={{ flex: 1, bgcolor: 'primary.main' }}
            />
          }
        >
          <Image
            src={forgotPassword}
            alt="Forgot Password Banner"
            sx={{
              width: { xs: '100%', md: 480 },
              height: '100%',
              objectFit: 'cover',
              display: { xs: 'none', md: 'block' },
            }}
          />
        </Suspense>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
