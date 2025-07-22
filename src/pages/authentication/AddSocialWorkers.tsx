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


const AddSocialWorkers = (): ReactElement => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    idNumber: '',
    email: '',
    phone: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    idNumber: '',
    phone: '',
    email: '',
    password: '',
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const validate = (): boolean => {
    let valid = true;
    const newErrors = { ...errors };

    //Validate ID Number: Starts with DDMMYY and is exactly 13 digits
    const idRegex = /^[0-3][0-9][0-1][0-9][0-9]{2}\d{7}$/;
    if (!idRegex.test(formData.idNumber)) {
      newErrors.idNumber = 'ID Number must start with DDMMYY and be exactly 13 digits';
      valid = false;
    }

    //Validate Phone Number: Exactly 10 digits
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
      valid = false;
    }

    //Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
      valid = false;
    }

    // Validate Password: Min 8 chars, at least 1 letter, 1 number, 1 special char
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        'Password must contain letters, numbers, special characters and be at least 8 characters long';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validate()) {
      alert('Social Worker Registered Successfully!');
      console.log(formData);
      setFormData({
        name: '',
        surname: '',
        idNumber: '',
        email: '',
        phone: '',
        password: '',
      });
    }
  };

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
          
          
        </Link>
        <Stack alignItems="center" gap={2.5} width={330} mx="auto">
          <Typography variant="h3">Add Social Worker</Typography>

          {/* Name */}
          <FormControl variant="standard" fullWidth>
            <InputLabel shrink htmlFor="name">Name</InputLabel>
            <TextField
              variant="filled"
              placeholder="Enter full name"
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconifyIcon icon="mdi:user" />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          {/* Surname */}
          <FormControl variant="standard" fullWidth>
            <InputLabel shrink htmlFor="surname">Surname</InputLabel>
            <TextField
              variant="filled"
              placeholder="Enter surname"
              id="surname"
              value={formData.surname}
              onChange={(e) => handleChange('surname', e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconifyIcon icon="mdi:user" />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          {/* ID Number */}
          <FormControl variant="standard" fullWidth error={!!errors.idNumber}>
            <InputLabel shrink htmlFor="idNumber">ID Number</InputLabel>
            <OutlinedInput
              placeholder="Enter 13-digit ID (DDMMYY...)"
              id="idNumber"
              value={formData.idNumber}
              onChange={(e) => handleChange('idNumber', e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconifyIcon icon="ic:baseline-id" />
                </InputAdornment>
              }
              sx={{ backgroundColor: 'action.focus' }}
            />
            {errors.idNumber && (
              <Typography color="error" variant="caption">
                {errors.idNumber}
              </Typography>
            )}
          </FormControl>

          {/* Email */}
          <FormControl variant="standard" fullWidth error={!!errors.email}>
            <InputLabel shrink htmlFor="email">Email</InputLabel>
            <OutlinedInput
              placeholder="Enter your email"
              id="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconifyIcon icon="ic:baseline-email" />
                </InputAdornment>
              }
              sx={{ backgroundColor: 'action.focus' }}
            />
            {errors.email && (
              <Typography color="error" variant="caption">
                {errors.email}
              </Typography>
            )}
          </FormControl>

          {/* Phone */}
          <FormControl variant="standard" fullWidth error={!!errors.phone}>
            <InputLabel shrink htmlFor="phone">Phone Number</InputLabel>
            <OutlinedInput
              placeholder="10 digit phone number"
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconifyIcon icon="ic:baseline-phone" />
                </InputAdornment>
              }
              sx={{ backgroundColor: 'action.focus' }}
            />
            {errors.phone && (
              <Typography color="error" variant="caption">
                {errors.phone}
              </Typography>
            )}
          </FormControl>

          {/* Password */}
          <FormControl variant="standard" fullWidth error={!!errors.password}>
            <InputLabel shrink htmlFor="password">Password</InputLabel>
            <TextField
              variant="filled"
              placeholder="********"
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ color: 'text.secondary' }}
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
            {errors.password && (
              <Typography color="error" variant="caption">
                {errors.password}
              </Typography>
            )}
          </FormControl>

          {/* Register Button */}
          <Button variant="contained" fullWidth onClick={handleSubmit}>
            Register
          </Button>
        </Stack>
      </Stack>

      {/* Right Side */}
      <Suspense fallback={<Skeleton variant="rectangular" height={1} width={1} sx={{ bgcolor: 'primary.main' }} />}>
        {/* You can put an image or graphic here */}
      </Suspense>
    </Stack>
  );
};

export default AddSocialWorkers;
