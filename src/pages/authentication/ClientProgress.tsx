import { ReactElement, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Snackbar,
  Stack,
  TextField,
  Typography,
  Alert,
  Paper,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Client {
  id: number;
  name: string;
}

interface ProgressEntry {
  date: string;
  comment: string;
}

const mockClients: Client[] = [
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Sarah Johnson' },
  { id: 3, name: 'Michael Brown' },
  { id: 4, name: 'Amanda Lee' },
  { id: 5, name: 'David Green' },
];

const ClientProgress = (): ReactElement => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [progressMap, setProgressMap] = useState<Record<number, ProgressEntry[]>>({});
  const [comment, setComment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAddProgress = () => {
    if (!selectedClient || comment.trim() === '') return;

    const newEntry: ProgressEntry = {
      date: new Date().toLocaleDateString(),
      comment,
    };

    setProgressMap((prev) => ({
      ...prev,
      [selectedClient.id]: [...(prev[selectedClient.id] || []), newEntry],
    }));

    setComment('');
    setSnackbarOpen(true);
  };

  const filteredClients = useMemo(() => {
    return mockClients.filter((client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <Stack direction="row" height="100vh" spacing={3} p={4} bgcolor="#f9f9f9">
      {/* Sidebar */}
      <Paper
        elevation={2}
        sx={{
          width: 280,
          borderRadius: 3,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Clients
        </Typography>

        <TextField
          placeholder="Search clients..."
          size="small"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        <Divider />

        <List dense sx={{ overflowY: 'auto', flex: 1 }}>
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <ListItem key={client.id} disablePadding>
                <ListItemButton
                  selected={selectedClient?.id === client.id}
                  onClick={() => setSelectedClient(client)}
                  sx={{ borderRadius: 1 }}
                >
                  <ListItemText primary={client.name} />
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              mt={2}
            >
              No clients found
            </Typography>
          )}
        </List>
      </Paper>

      {/* Main Content */}
      <Paper
        elevation={2}
        sx={{
          flex: 1,
          p: 4,
          borderRadius: 3,
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        {selectedClient ? (
          <>
            {/* Header */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5" fontWeight={600}>
                Progress for Client
              </Typography>
              <Typography variant="subtitle1" fontWeight={600} color="primary">
                {selectedClient.name}
              </Typography>
            </Stack>

            <Divider />

            {/* Progress Entries */}
            <Box>
              <Typography variant="subtitle2" mb={1}>
                Progress History
              </Typography>

              <Stack spacing={2}>
                {(progressMap[selectedClient.id] || []).length === 0 ? (
                  <Typography color="text.secondary">
                    No progress recorded yet.
                  </Typography>
                ) : (
                  (progressMap[selectedClient.id] || []).map((entry, idx) => (
                    <Paper
                      key={idx}
                      elevation={0}
                      sx={{
                        border: '1px solid #e0e0e0',
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: '#fdfdfd',
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        {entry.date}
                      </Typography>
                      <Typography variant="body2">{entry.comment}</Typography>
                    </Paper>
                  ))
                )}
              </Stack>
            </Box>

            {/* Add Progress */}
            <Box mt="auto">
              <Divider sx={{ mb: 2 }} />
              <Typography variant="subtitle2" mb={1}>
                Add New Progress
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Progress Comment"
                  multiline
                  rows={3}
                  fullWidth
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  variant="contained"
                  onClick={handleAddProgress}
                  disabled={!comment.trim()}
                >
                  Add Progress
                </Button>
              </Stack>
            </Box>
          </>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flex={1}
          >
            <Typography variant="h6" color="text.secondary">
              Select a client to view and add progress
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Progress added successfully!
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default ClientProgress;
