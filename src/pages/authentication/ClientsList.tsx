// src/pages/clients/ClientsList.tsx

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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  Tooltip,
  Button,
  OutlinedInput,
  ListItemText,
  Checkbox,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Client {
  id: number;
  fileNumber: string;
  clientName: string;
  age: number | '';
  gender: string;
  suburb: string;
  address: string;
  nextOfKinName: string;
  nextOfKinPhone: string;
  assignedWorker: string;
  selectedSubstances: string[];
}

// Hard-coded suburbs and substances arrays (copy from your AddClient form)
const suburbs = [
  "Armadale", "Chiawelo", "Chiawelo Extensions", "Comptonville",
  // ... other suburbs ...
  "Slovoville Ext.1", "Stesa", "Tladi", "Zola", "Zondi"
];

const substances = [
  "alcohol (🧪)", "dagga (🌿)", "benzene (🛢)", "CAT (💊)",
  "cocaine...ecstasy (🎉)", "inhalants (🔥)", "mandrax (💠)", "hookah pipes (🚬)"
];

// Key for localStorage persistence
const STORAGE_KEY = 'clientList';

// Manually enter initial clients here:
const initialClients: Client[] = [
  {
    id: 1,
    fileNumber: 'FILE-1001',
    clientName: 'John Doe',
    age: 30,
    gender: 'male',
    suburb: 'Armadale',
    address: '123 Main St, Armadale',
    nextOfKinName: 'Jane Doe',
    nextOfKinPhone: '0821234567',
    assignedWorker: 'Worker A',
    selectedSubstances: ['alcohol (🧪)'],
  },
  {
    id: 2,
    fileNumber: 'FILE-1002',
    clientName: 'Mary Smith',
    age: 25,
    gender: 'female',
    suburb: 'Chiawelo',
    address: '45 River Rd, Chiawelo',
    nextOfKinName: 'Peter Smith',
    nextOfKinPhone: '0837654321',
    assignedWorker: 'Worker B',
    selectedSubstances: ['dagga (🌿)', 'inhalants (🔥)'],
  },
  {
    id: 3,
    fileNumber: 'FILE-1003',
    clientName: 'Alice Johnson',
    age: 40,
    gender: 'female',
    suburb: 'Zondi',
    address: '78 Elm St, Zondi',
    nextOfKinName: 'Bob Johnson',
    nextOfKinPhone: '0845551234',
    assignedWorker: 'Worker C',
    selectedSubstances: [],
  },
  // Add more entries manually as needed
];

// Load clients from localStorage if present, otherwise use initialClients
const loadClients = (): Client[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: unknown = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        // Validate minimal shape
        const validated = (parsed as any[]).filter((c) =>
          typeof c.id === 'number' &&
          typeof c.fileNumber === 'string' &&
          typeof c.clientName === 'string' &&
          (typeof c.age === 'number' || c.age === '') &&
          typeof c.gender === 'string' &&
          typeof c.suburb === 'string' &&
          typeof c.address === 'string' &&
          typeof c.nextOfKinName === 'string' &&
          typeof c.nextOfKinPhone === 'string' &&
          typeof c.assignedWorker === 'string' &&
          Array.isArray(c.selectedSubstances) &&
          c.selectedSubstances.every((s: any) => typeof s === 'string')
        ) as Client[];
        if (validated.length > 0) {
          return validated;
        }
      }
    }
  } catch {
    // ignore parse errors
  }
  // If no valid stored data, return the hard-coded initialClients
  return initialClients;
};

// Persist clients to localStorage
const saveClients = (clients: Client[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
  } catch {
    // ignore storage errors
  }
};

const ClientsList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(() => loadClients());

  // Whenever clients change, persist them
  useEffect(() => {
    saveClients(clients);
  }, [clients]);

  // State for Edit dialog
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  // Fields in edit form
  const [editFileNumber, setEditFileNumber] = useState<string>('');
  const [editClientName, setEditClientName] = useState<string>('');
  const [editAge, setEditAge] = useState<number | ''>('');
  const [editGender, setEditGender] = useState<string>('');
  const [editSuburb, setEditSuburb] = useState<string>('');
  const [editAddress, setEditAddress] = useState<string>('');
  const [editNextOfKinName, setEditNextOfKinName] = useState<string>('');
  const [editNextOfKinPhone, setEditNextOfKinPhone] = useState<string>('');
  const [editAssignedWorker, setEditAssignedWorker] = useState<string>('');
  const [editSelectedSubstances, setEditSelectedSubstances] = useState<string[]>([]);
  const [editError, setEditError] = useState<string>('');

  // Open Edit dialog and pre-fill fields
  const openEditDialog = (client: Client) => {
    setEditingClient(client);
    setEditFileNumber(client.fileNumber);
    setEditClientName(client.clientName);
    setEditAge(client.age);
    setEditGender(client.gender);
    setEditSuburb(client.suburb);
    setEditAddress(client.address);
    setEditNextOfKinName(client.nextOfKinName);
    setEditNextOfKinPhone(client.nextOfKinPhone);
    setEditAssignedWorker(client.assignedWorker);
    setEditSelectedSubstances(client.selectedSubstances);
    setEditError('');
    setEditOpen(true);
  };

  const closeEditDialog = () => {
    setEditOpen(false);
    setEditingClient(null);
  };

  // Handle Edit submission: update local state
  const handleEditSubmit = () => {
    if (!editingClient) return;
    // Basic validation for required fields
    if (!editClientName.trim() ||
        editAge === '' ||
        !editGender ||
        !editSuburb ||
        !editAddress.trim()) {
      setEditError('Please fill in all required fields: Name, Age, Gender, Suburb, Address.');
      return;
    }
    // Age cannot be negative
    if (typeof editAge === 'number' && editAge < 0) {
      setEditError('Age cannot be negative.');
      return;
    }
    // Construct updated client object
    const updated: Client = {
      id: editingClient.id,
      fileNumber: editFileNumber, // keep same
      clientName: editClientName.trim(),
      age: editAge,
      gender: editGender,
      suburb: editSuburb,
      address: editAddress.trim(),
      nextOfKinName: editNextOfKinName.trim(),
      nextOfKinPhone: editNextOfKinPhone.trim(),
      assignedWorker: editAssignedWorker.trim(),
      selectedSubstances: editSelectedSubstances,
    };
    setClients(prev =>
      prev.map(c => (c.id === updated.id ? updated : c))
    );
    closeEditDialog();
  };

  // Handle Delete: remove from local state
  const handleDelete = (client: Client) => {
    if (!window.confirm(`Delete client "${client.clientName}" (File #: ${client.fileNumber})?`)) {
      return;
    }
    setClients(prev => prev.filter(c => c.id !== client.id));
    if (editingClient && editingClient.id === client.id) {
      closeEditDialog();
    }
  };

  // Helper to render substances as comma-separated
  const renderSubstances = (subs: string[]) => subs.join(', ');

  return (
    <Box sx={{ padding: '1rem' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Clients
      </Typography>

      {clients.length === 0 ? (
        <Typography>No clients available.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>File #</strong></TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Age</strong></TableCell>
                <TableCell><strong>Gender</strong></TableCell>
                <TableCell><strong>Suburb</strong></TableCell>
                <TableCell><strong>Next of Kin</strong></TableCell>
                <TableCell><strong>Next of Kin Phone</strong></TableCell>
                <TableCell><strong>Assigned Worker</strong></TableCell>
                <TableCell><strong>Substances</strong></TableCell>
                <TableCell align="right"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map(client => (
                <TableRow key={client.id} hover>
                  <TableCell>{client.fileNumber}</TableCell>
                  <TableCell>{client.clientName}</TableCell>
                  <TableCell>{client.age}</TableCell>
                  <TableCell>{client.gender}</TableCell>
                  <TableCell>{client.suburb}</TableCell>
                  <TableCell>{client.nextOfKinName}</TableCell>
                  <TableCell>{client.nextOfKinPhone}</TableCell>
                  <TableCell>{client.assignedWorker}</TableCell>
                  <TableCell>{renderSubstances(client.selectedSubstances)}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => openEditDialog(client)}
                        sx={{ mr: 1 }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(client)}
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
        <DialogTitle>Edit Client</DialogTitle>
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
            {/* File Number (read-only) */}
            <TextField
              label="File Number"
              value={editFileNumber}
              InputProps={{
                readOnly: true,
              }}
            />

            {/* Client Name */}
            <TextField
              label="Client Name"
              value={editClientName}
              onChange={e => setEditClientName(e.target.value)}
              required
            />

            {/* Age */}
            <TextField
              label="Age"
              type="number"
              value={editAge}
              onChange={e => {
                const v = e.target.value;
                setEditAge(v === '' ? '' : parseInt(v, 10));
              }}
              required
              inputProps={{ min: 0 }}
            />

            {/* Gender */}
            <FormControl required>
              <InputLabel id="edit-gender-label">Gender</InputLabel>
              <Select
                labelId="edit-gender-label"
                label="Gender"
                value={editGender}
                onChange={e => setEditGender(e.target.value)}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>

            {/* Suburb */}
            <FormControl required>
              <InputLabel id="edit-suburb-label">Suburb</InputLabel>
              <Select
                labelId="edit-suburb-label"
                label="Suburb"
                value={editSuburb}
                onChange={e => setEditSuburb(e.target.value)}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {suburbs.map((s, idx) => (
                  <MenuItem key={idx} value={s}>{s}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Address */}
            <TextField
              label="Address"
              value={editAddress}
              onChange={e => setEditAddress(e.target.value)}
              required
              multiline
              rows={3}
            />

            {/* Next of Kin Name */}
            <TextField
              label="Next of Kin Name"
              value={editNextOfKinName}
              onChange={e => setEditNextOfKinName(e.target.value)}
            />

            {/* Next of Kin Phone */}
            <TextField
              label="Next of Kin Phone"
              value={editNextOfKinPhone}
              onChange={e => setEditNextOfKinPhone(e.target.value)}
            />

            {/* Assigned Worker (free text) */}
            <TextField
              label="Assigned Worker"
              value={editAssignedWorker}
              onChange={e => setEditAssignedWorker(e.target.value)}
              helperText="Enter assigned worker name or ID"
            />

            {/* Substances (multi-select) */}
            <FormControl>
              <InputLabel id="edit-substances-label">Substances</InputLabel>
              <Select
                labelId="edit-substances-label"
                multiple
                value={editSelectedSubstances}
                onChange={e => {
                  const value = e.target.value;
                  if (Array.isArray(value)) {
                    setEditSelectedSubstances(value as string[]);
                  }
                }}
                input={<OutlinedInput label="Substances" />}
                renderValue={(selected) => (selected as string[]).join(', ')}
              >
                {substances.map((sub, idx) => (
                  <MenuItem key={idx} value={sub}>
                    <Checkbox checked={editSelectedSubstances.indexOf(sub) > -1} />
                    <ListItemText primary={sub} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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

export default ClientsList;
