// src/pages/admins/AdminList.tsx

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

interface Admin {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Initial admins: you can adjust these manually as desired.
const initialAdmins: Admin[] = [
  {
    id: 1,
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice@example.com',
    password: 'password123',
  },
  {
    id: 2,
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob@example.com',
    password: 'secret456',
  },
  {
    id: 3,
    firstName: 'Carol',
    lastName: 'Williams',
    email: 'carol@example.com',
    password: 'hunter2',
  },
];

const AdminListNGO: React.FC = () => {
  // Load initial admins from localStorage if present, otherwise use initialAdmins
  const loadInitial = (): Admin[] => {
    try {
      const stored = localStorage.getItem('adminList');
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Validate shape
          const validated = (parsed as any[]).filter(
            (a) =>
              typeof a.id === 'number' &&
              typeof a.firstName === 'string' &&
              typeof a.lastName === 'string' &&
              typeof a.email === 'string' &&
              typeof a.password === 'string'
          ) as Admin[];
          if (validated.length > 0) {
            return validated;
          }
        }
      }
    } catch {
      // ignore parse errors
    }
    return initialAdmins;
  };

  const [admins, setAdmins] = useState<Admin[]>(loadInitial);

  // Persist to localStorage whenever admins change
  useEffect(() => {
    try {
      localStorage.setItem('adminList', JSON.stringify(admins));
    } catch {
      // ignore storage errors
    }
  }, [admins]);

  // State for Edit dialog
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [editFirstName, setEditFirstName] = useState<string>('');
  const [editLastName, setEditLastName] = useState<string>('');
  const [editEmail, setEditEmail] = useState<string>('');
  const [editPassword, setEditPassword] = useState<string>('');
  const [editError, setEditError] = useState<string>('');

  // Open Edit dialog
  const openEditDialog = (admin: Admin) => {
    setEditingAdmin(admin);
    setEditFirstName(admin.firstName);
    setEditLastName(admin.lastName);
    setEditEmail(admin.email);
    setEditPassword(admin.password);
    setEditError('');
    setEditOpen(true);
  };

  const closeEditDialog = () => {
    setEditOpen(false);
    setEditingAdmin(null);
  };

  // Handle Edit submission: update local state
  const handleEditSubmit = () => {
    if (!editingAdmin) return;
    // Validate required fields
    if (!editFirstName.trim() || !editLastName.trim() || !editEmail.trim() || !editPassword) {
      setEditError('First name, surname, email, and password are required.');
      return;
    }
    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editEmail.trim())) {
      setEditError('Enter a valid email address.');
      return;
    }
    // Construct updated admin
    const updatedAdmin: Admin = {
      id: editingAdmin.id,
      firstName: editFirstName.trim(),
      lastName: editLastName.trim(),
      email: editEmail.trim(),
      password: editPassword, // storing plaintext for demo
    };
    setAdmins((prev) =>
      prev.map((a) => (a.id === updatedAdmin.id ? updatedAdmin : a))
    );
    closeEditDialog();
  };

  // Handle Delete: remove from local state
  const handleDelete = (admin: Admin) => {
    if (!window.confirm(`Delete admin "${admin.firstName} ${admin.lastName}"?`)) {
      return;
    }
    setAdmins((prev) => prev.filter((a) => a.id !== admin.id));
    // If editing this admin, close dialog
    if (editingAdmin && editingAdmin.id === admin.id) {
      closeEditDialog();
    }
  };

  return (
    <Box sx={{ padding: '1rem' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Admins
      </Typography>

      {admins.length === 0 ? (
        <Typography>No admins available.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>First Name</strong></TableCell>
                <TableCell><strong>Surname</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Password</strong></TableCell>
                <TableCell align="right"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin.id} hover>
                  <TableCell>{admin.id}</TableCell>
                  <TableCell>{admin.firstName}</TableCell>
                  <TableCell>{admin.lastName}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.password}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => openEditDialog(admin)}
                        sx={{ mr: 1 }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(admin)}
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
        <DialogTitle>Edit Admin</DialogTitle>
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
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
          >
            <TextField
              label="First Name"
              value={editFirstName}
              onChange={(e) => setEditFirstName(e.target.value)}
              required
            />
            <TextField
              label="Surname"
              value={editLastName}
              onChange={(e) => setEditLastName(e.target.value)}
              required
            />
            <TextField
              label="Email"
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="text"
              value={editPassword}
              onChange={(e) => setEditPassword(e.target.value)}
              required
            />
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

export default AdminListNGO;
