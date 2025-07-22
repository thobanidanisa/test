/* RoomAllocation.tsx */
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Chip,
  Snackbar,
  Alert,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';

interface Room {
  id: string;
  name: string;
  available: boolean;
  capacity: number;
  type: 'Single' | 'Double' | 'Family';
}
interface House {
  id: string;
  name: string;
  rooms: Room[];
}

const housesData: House[] = [
  {
    id: 'house1',
    name: 'House A',
    rooms: [
      { id: 'r1', name: 'Room 1', available: true, capacity: 1, type: 'Single' },
      { id: 'r2', name: 'Room 2', available: false, capacity: 4, type: 'Family' },
      { id: 'r3', name: 'Room 3', available: true, capacity: 2, type: 'Double' },
    ],
  },
  {
    id: 'house2',
    name: 'House B',
    rooms: [
      { id: 'r4', name: 'Room 1', available: true, capacity: 1, type: 'Single' },
      { id: 'r5', name: 'Room 2', available: true, capacity: 2, type: 'Double' },
    ],
  },
];

export default function RoomAllocation() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>('All');

  const handleComplete = () => {
    setSnackbarOpen(true);
    setTimeout(() => {
      navigate('/authentication/applicationmanagement', { state: { approvedId: id } });
    }, 500);
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilterType(event.target.value);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Allocate Room for Application <strong>{id}</strong>
      </Typography>

      {!selectedHouse ? (
        <>
          <Typography variant="h6" mb={2}>
            Select a House
          </Typography>
          <Grid container spacing={3}>
            {housesData.map((h) => {
              
              return (
                <Grid item xs={12} sm={6} md={4} key={h.id}>
                  <Card
                    variant="outlined"
                   
                    
                  >
                    <CardHeader title={h.name} />
                    <CardContent>
                      <Typography variant="body2">
                        {h.rooms.filter((r) => r.available).length} available rooms
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        fullWidth
                        size="small"
                        
                        color="primary"
                        onClick={() => setSelectedHouse(h)}
                      >
                    
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </>
      ) : (
        <>
          <Button
            onClick={() => {
              setSelectedHouse(null);
              setSelectedRoom(null);
              setFilterType('All');
            }}
            sx={{ mb: 2 }}
          >
            ← Back to Houses
          </Button>

          <Typography variant="h6" mb={2}>
            Rooms in <strong>{selectedHouse.name}</strong>
          </Typography>

          <FormControl fullWidth sx={{ maxWidth: 300, mb: 3 }}>
            <InputLabel>Filter by Room Type</InputLabel>
            <Select value={filterType} label="Filter by Room Type" onChange={handleFilterChange}>
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Single">Single</MenuItem>
              <MenuItem value="Double">Double</MenuItem>
              <MenuItem value="Family">Family</MenuItem>
            </Select>
          </FormControl>

          <Grid container spacing={3}>
            {selectedHouse.rooms
              .filter((room) => filterType === 'All' || room.type === filterType)
              .map((r) => {
                const isSelected = selectedRoom?.id === r.id;
                return (
                  <Grid item xs={12} sm={6} md={4} key={r.id}>
                    <Card
                      variant="outlined"
                      raised={isSelected}
                      sx={{
                        borderColor: isSelected ? 'primary.main' : 'grey.300',
                        opacity: r.available ? 1 : 0.4,
                      }}
                    >
                      <CardHeader
                        title={r.name}
                        subheader={`🛏️ ${r.capacity} ${r.capacity === 1 ? 'person' : 'people'}`}
                      />
                      <CardContent>
                        <Chip
                          label={r.available ? 'Available' : 'Occupied'}
                          size="small"
                          color={r.available ? 'success' : 'default'}
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="body2">Type: {r.type}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          fullWidth
                          size="small"
                          variant={isSelected ? 'contained' : 'outlined'}
                          color="primary"
                          disabled={!r.available || isSelected}
                          onClick={() => setSelectedRoom(r)}
                        >
                          {isSelected ? 'Selected' : 'Select'}
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </>
      )}

      <Box textAlign="center" mt={4}>
        <Button
          variant="contained"
          size="large"
          disabled={!selectedHouse || !selectedRoom}
          onClick={handleComplete}
        >
          Complete Allocation
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          <strong>{selectedRoom?.type}</strong> room <strong>{selectedRoom?.name}</strong>{' '}
          (🛏️ {selectedRoom?.capacity}) in <strong>{selectedHouse?.name}</strong> allocated!
        </Alert>
      </Snackbar>
    </Box>
  );
}
