// src/pages/socialworkers/SocialWorkerList.tsx

import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * SocialWorker interface including password field.
 * Adjust/add fields to match your AddSocialWorker form.
 */
interface SocialWorker {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  // Add additional fields if needed, e.g.:
  // region: string;
  // qualification: string;
}

/**
 * Manually enter initial social workers here, including passwords.
 * Ensure each has a unique `id`. For demonstration only: plaintext passwords.
 */
const initialSocialWorkers: SocialWorker[] = [
  {
    id: 1,
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice.smith@example.com',
    phone: '0821234567',
    password: 'passAlice1',
    // region: 'Region A',
    // qualification: 'MSW',
  },
  {
    id: 2,
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    phone: '0837654321',
    password: 'bobSecret!',
    // region: 'Region B',
    // qualification: 'BSW',
  },
  {
    id: 3,
    firstName: 'Carol',
    lastName: 'Williams',
    email: 'carol.williams@example.com',
    phone: '0845551234',
    password: 'carolPwd123',
    // region: 'Region C',
    // qualification: 'MSW',
  },
  // Add more entries manually as needed
];

// Key for localStorage persistence
const STORAGE_KEY = 'socialWorkerList';

/**
 * Load from localStorage if present and valid; otherwise return initialSocialWorkers.
 */
const loadSocialWorkers = (): SocialWorker[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: unknown = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        // Validate minimal shape including password
        const validated = (parsed as any[]).filter((sw) =>
          typeof sw.id === 'number' &&
          typeof sw.firstName === 'string' &&
          typeof sw.lastName === 'string' &&
          typeof sw.email === 'string' &&
          typeof sw.phone === 'string' &&
          typeof sw.password === 'string'
          // && typeof sw.region === 'string' // if additional fields
        ) as SocialWorker[];
        if (validated.length > 0) {
          return validated;
        }
      }
    }
  } catch {
    // ignore parse errors
  }
  return initialSocialWorkers;
};

/** Persist to localStorage */
const saveSocialWorkers = (list: SocialWorker[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
};

const SocialWorkerList: React.FC = () => {
  const [workers, setWorkers] = useState<SocialWorker[]>(() => loadSocialWorkers());

  // Persist whenever workers change
  useEffect(() => {
    saveSocialWorkers(workers);
  }, [workers]);

  // State for Edit dialog
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [editingWorker, setEditingWorker] = useState<SocialWorker | null>(null);

  // Fields in edit form
  const [editFirstName, setEditFirstName] = useState<string>('');
  const [editLastName, setEditLastName] = useState<string>('');
  const [editEmail, setEditEmail] = useState<string>('');
  const [editPhone, setEditPhone] = useState<string>('');
  const [editPassword, setEditPassword] = useState<string>('');
  // Additional fields if needed:
  // const [editRegion, setEditRegion] = useState<string>('');
  // const [editQualification, setEditQualification] = useState<string>('');
  const [editError, setEditError] = useState<string>('');

  // Open Edit dialog and pre-fill fields
  const openEditDialog = (worker: SocialWorker) => {
    setEditingWorker(worker);
    setEditFirstName(worker.firstName);
    setEditLastName(worker.lastName);
    setEditEmail(worker.email);
    setEditPhone(worker.phone);
    setEditPassword(worker.password);
    // setEditRegion(worker.region || '');
    // setEditQualification(worker.qualification || '');
    setEditError('');
    setEditOpen(true);
  };

  const closeEditDialog = () => {
    setEditOpen(false);
    setEditingWorker(null);
  };

  // Handle Edit submission
  const handleEditSubmit = () => {
    if (!editingWorker) return;
    // Basic required validation
    if (!editFirstName.trim() ||
        !editLastName.trim() ||
        !editEmail.trim() ||
        !editPhone.trim() ||
        !editPassword
        // || !editRegion.trim() // if required
    ) {
      setEditError('Please fill in all required fields.');
      return;
    }
    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editEmail.trim())) {
      setEditError('Enter a valid email address.');
      return;
    }
    // Optionally phone format validation

    // Construct updated worker
    const updated: SocialWorker = {
      id: editingWorker.id,
      firstName: editFirstName.trim(),
      lastName: editLastName.trim(),
      email: editEmail.trim(),
      phone: editPhone.trim(),
      password: editPassword,
      // region: editRegion.trim(),
      // qualification: editQualification.trim(),
    };
    setWorkers(prev =>
      prev.map(w => (w.id === updated.id ? updated : w))
    );
    closeEditDialog();
  };

  // Handle Delete
  const handleDelete = (worker: SocialWorker) => {
    if (!window.confirm(`Delete social worker "${worker.firstName} ${worker.lastName}"?`)) {
      return;
    }
    setWorkers(prev => prev.filter(w => w.id !== worker.id));
    if (editingWorker && editingWorker.id === worker.id) {
      closeEditDialog();
    }
  };

  return (
    <Box sx={{ padding: '1rem' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Social Workers
      </Typography>

      {workers.length === 0 ? (
        <Typography>No social workers available.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>First Name</strong></TableCell>
                <TableCell><strong>Last Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Phone</strong></TableCell>
                <TableCell><strong>Password</strong></TableCell>
                {/* Add more header cells if additional fields */}
                {/* <TableCell><strong>Region</strong></TableCell> */}
                <TableCell align="right"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workers.map(worker => (
                <TableRow key={worker.id} hover>
                  <TableCell>{worker.id}</TableCell>
                  <TableCell>{worker.firstName}</TableCell>
                  <TableCell>{worker.lastName}</TableCell>
                  <TableCell>{worker.email}</TableCell>
                  <TableCell>{worker.phone}</TableCell>
                  <TableCell>{worker.password}</TableCell>
                  {/* <TableCell>{worker.region}</TableCell> */}
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => openEditDialog(worker)}
                        sx={{ mr: 1 }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(worker)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={closeEditDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Social Worker</DialogTitle>
        <DialogContent dividers>
          {editError && (
            <Typography color="error" sx={{ mb: 2 }}>
              {editError}
            </Typography>
          )}
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              mt: 1,
            }}
          >
            {/* First Name */}
            <TextField
              label="First Name"
              value={editFirstName}
              onChange={e => setEditFirstName(e.target.value)}
              required
            />
            {/* Last Name */}
            <TextField
              label="Last Name"
              value={editLastName}
              onChange={e => setEditLastName(e.target.value)}
              required
            />
            {/* Email */}
            <TextField
              label="Email"
              type="email"
              value={editEmail}
              onChange={e => setEditEmail(e.target.value)}
              required
            />
            {/* Phone */}
            <TextField
              label="Phone"
              value={editPhone}
              onChange={e => setEditPhone(e.target.value)}
              required
            />
            {/* Password */}
            <TextField
              label="Password"
              type="text"
              value={editPassword}
              onChange={e => setEditPassword(e.target.value)}
              required
            />
            {/* Additional fields: uncomment and adjust if your form has these */}
            {/*
            <FormControl required>
              <InputLabel id="edit-region-label">Region</InputLabel>
              <Select
                labelId="edit-region-label"
                label="Region"
                value={editRegion}
                onChange={e => setEditRegion(e.target.value)}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="Region A">Region A</MenuItem>
                ...
              </Select>
            </FormControl>
            <TextField
              label="Qualification"
              value={editQualification}
              onChange={e => setEditQualification(e.target.value)}
            />
            */}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog}>
            Cancel
          </Button>
          <Button
            onClick={handleEditSubmit}
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SocialWorkerList;
