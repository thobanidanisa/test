import { ReactElement, Suspense, useState } from 'react';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import logo from 'assets/logo/elegant-logo.png';
import Image from 'components/base/Image';

const AddSocialWorker = (): ReactElement => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  return (
    <Stack
      direction="row"
      bgcolor="background.paper"
      boxShadow={(theme) => theme.shadows[3]}
      height={850}
      width={{ md: 600 }}
    >
      <Stack width={{ md: 0.5 }} m={2.5} gap={10}>
        <Link href="/" width="fit-content">
          <Image src={logo} width={82.6} />
        </Link>
        <Stack alignItems="center" gap={2.5} width={330} mx="auto">
          <Typography variant="h3">Add Social Worker</Typography>
          <FormControl variant="standard" fullWidth>
            <InputLabel shrink htmlFor="name">
              Name
            </InputLabel>
            <TextField
              variant="filled"
              placeholder="Enter your full name"
              id="name"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ width: 16, height: 16 }}>
                    <IconifyIcon icon="mdi:user" width={1} height={1} />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl >
              
          <FormControl variant="standard" fullWidth>
              <InputLabel shrink htmlFor="surname">
                Surname
              </InputLabel>
              <TextField
              variant="filled"
              placeholder="Enter your surname"
              id="name"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ width: 16, height: 16 }}>
                    <IconifyIcon icon="mdi:user" width={1} height={1} />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        
          <FormControl variant="standard" fullWidth>
            <InputLabel shrink htmlFor="email">
              ID Number
            </InputLabel>
            <OutlinedInput
              placeholder="Enter your ID"
              id="id"
              endAdornment={
                <InputAdornment position="end" sx={{ width: 16, height: 16 }}>
                  <IconifyIcon icon="ic:baseline-id" width={1} height={1} />
                </InputAdornment>
              }
              sx={{
                width: 1,
                backgroundColor: 'action.focus',
              }}
            />
          </FormControl>

          <FormControl variant="standard" fullWidth>
            <InputLabel shrink htmlFor="email">
              Email
            </InputLabel>
            <OutlinedInput
              placeholder="Enter your email"
              id="email"
              endAdornment={
                <InputAdornment position="end" sx={{ width: 16, height: 16 }}>
                  <IconifyIcon icon="ic:baseline-email" width={1} height={1} />
                </InputAdornment>
              }
              sx={{
                width: 1,
                backgroundColor: 'action.focus',
              }}
            />
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <InputLabel shrink htmlFor="phonenumber">
              Phone Number
            </InputLabel>
            <OutlinedInput
              placeholder="Phone No."
              id="phonenumber"
              endAdornment={
                <InputAdornment position="end" sx={{ width: 16, height: 16 }}>
                  <IconifyIcon icon="ic:baseline-phone" width={1} height={1} />
                </InputAdornment>
              }
              sx={{
                width: 1,
                backgroundColor: 'action.focus',
              }}
            />
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <InputLabel shrink htmlFor="password">
              Password
            </InputLabel>
            <TextField
              variant="filled"
              placeholder="********"
              type={showPassword ? 'text' : 'password'}
              id="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{
                        color: 'text.secondary',
                      }}
                    >
                      {showPassword ? (
                        <IconifyIcon icon="ic:baseline-key-off" />
                      ) : (
                        <IconifyIcon icon="ic:baseline-key" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <Button variant="contained" fullWidth>
            Register
          </Button>
          
        </Stack>
      </Stack>
      <Suspense
        fallback={
          <Skeleton variant="rectangular" height={1} width={1} sx={{ bgcolor: 'primary.main' }} />
        }
      >

        
      </Suspense>
    </Stack>
  );
};

export default AddSocialWorker;
