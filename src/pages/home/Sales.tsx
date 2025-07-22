import { ReactElement, Suspense, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import loginBanner from 'assets/authentication-banners/login.png';
import IconifyIcon from 'components/base/IconifyIcon';
import Image from 'components/base/Image';

const Sales = (): ReactElement => {
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const validate = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
      newErrors.email = 'Enter a valid email address';
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = () => {
    if (validate()) {
      // Add authentication logic if needed
      navigate('/authentication/recent-activities');
    }
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
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        boxShadow={3}
        borderRadius={3}
        overflow="hidden"
        bgcolor="background.paper"
        maxWidth={960}
        width="100%"
      >
        {/* Login Form Section */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 4, md: 6 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Stack spacing={4} maxWidth={400} width="100%" mx="auto">
            <Typography variant="h4" fontWeight="bold" textAlign="center">
              Sober <em>PATH</em> System
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
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconifyIcon icon="ic:baseline-email" />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel shrink htmlFor="password">
                Password
              </InputLabel>
              <TextField
                id="password"
                placeholder="********"
                variant="filled"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                        sx={{ color: 'text.secondary' }}
                      >
                        <IconifyIcon
                          icon={showPassword ? 'ic:baseline-key-off' : 'ic:baseline-key'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <Box textAlign="right">
              <Link href="/authentication/forgot-password" underline="hover" variant="body2">
                Forgot password?
              </Link>
            </Box>

            <Button variant="contained" fullWidth size="large" onClick={handleLogin}>
              Log In
            </Button>
          </Stack>
        </Box>

        {/* Image Banner Section */}
        <Suspense
          fallback={
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              sx={{ bgcolor: 'primary.main', flex: 1 }}
            />
          }
        >
          <Image
            src={loginBanner}
            alt="Login banner"
            sx={{
              width: { xs: '100%', md: 480 },
              height: '100%',
              objectFit: 'cover',
              display: { xs: 'none', md: 'block' },
            }}
          />
        </Suspense>
      </Stack>
    </Box>
  );
};

export default Sales;
