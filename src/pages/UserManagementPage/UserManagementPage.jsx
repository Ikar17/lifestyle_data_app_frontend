import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const UserManagementPage = () => {
  // Przykładowe dane użytkowników
  const sampleUsers = [
    { id: 1, name: 'Jan Kowalski', role: 'USER' },
    { id: 2, name: 'Anna Nowak', role: 'ANALYST' },
    { id: 3, name: 'Piotr Wiśniewski', role: 'ADMIN' },
  ];

  const [users, setUsers] = useState(sampleUsers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  // Funkcja do zmiany roli użytkownika
  const handleChangeRole = (role) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === selectedUser.id ? { ...user, role } : user
      )
    );
    handleMenuClose();
  };

  // Funkcja do usuwania użytkownika
  const handleDeleteUser = () => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUser.id));
    handleMenuClose();
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
        Zarządzanie użytkownikami
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Imię i nazwisko</TableCell>
              <TableCell>Rola</TableCell>
              <TableCell>Akcje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <IconButton onClick={(event) => handleMenuOpen(event, user)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleChangeRole('USER')}>Ustaw jako USER</MenuItem>
        <MenuItem onClick={() => handleChangeRole('ANALYST')}>Ustaw jako ANALYST</MenuItem>
        <MenuItem onClick={() => handleChangeRole('ADMIN')}>Ustaw jako ADMIN</MenuItem>
        <MenuItem onClick={handleDeleteUser}>Usuń konto</MenuItem>
      </Menu>
    </Container>
  );
};

export default UserManagementPage;
