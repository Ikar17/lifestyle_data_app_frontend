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
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
  Avatar,
  Slide,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { deleteUserAccountByUID, getUsers, updateUserRole } from '../../api/user';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [sortOrderEmail, setSortOrderEmail] = useState('asc');
  const [sortOrderRole, setSortOrderRole] = useState(null);
  const [totalElements, setTotalElements] = useState(0);

  const [snackbarStatus, changeSnackbarStatus] = useState(false);
  const [snackbarType, changeSnackbarType] = useState("error");
  const [snackbarInfo, changeSnackbarInfo] = useState("");


  useEffect(() => {
    fetchData();
  }, [sortOrderEmail, sortOrderRole]);

  const fetchData = async () => {
    try{
      const response = await getUsers(page, rowsPerPage, sortOrderEmail,sortOrderRole);
      setUsers(response.content);
      setTotalElements(response.totalElements);
    }catch(error){
      console.log(error);
    }
  }

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChangeRole = async (role) => {
    try{
      await updateUserRole(selectedUser, role);
      fetchData();
      changeSnackbarType("success");
      changeSnackbarInfo("Dane zostały zaktualizowane");
    }catch(error){
      changeSnackbarType("error");
      changeSnackbarInfo("Błąd aktualizacji. Spróbuj ponownie później");
    }finally{
      handleMenuClose();
      changeSnackbarStatus(true);
    }
  };

  const handleDeleteUser = async () => {
    try{
      await deleteUserAccountByUID(selectedUser);
      fetchData();
    }catch(error){
      console.log(error);
    }finally{
      setConfirmOpen(false);
    }
  };

  const handleConfirmOpen = () => {
    setConfirmOpen(true);
    handleMenuClose();
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    fetchData();
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortEmail = () => {
    setSortOrderEmail(sortOrderEmail === 'asc' ? 'desc' : 'asc');
  };

  const handleSortRole = () => {
    setSortOrderRole(sortOrderRole === 'asc' ? 'desc' : 'asc');
  };

  const closeSnackbar = () => {
    changeSnackbarStatus(false);
  }


  const getRoleIcon = (role) => {
    switch (role) {
      case 'ADMIN':
        return <AdminPanelSettingsIcon color="error" />;
      case 'ANALYST':
        return <VerifiedUserIcon color="primary" />;
      default:
        return <PersonIcon />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
          Zarządzanie użytkownikami
        </Typography>

        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>L.p</TableCell>
                <TableCell onClick={handleSortEmail} sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  Email {sortOrderEmail === 'asc' ? '▲' : '▼'}
                </TableCell>
                <TableCell onClick={handleSortRole} sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  Rola {sortOrderRole === 'asc' ? '▲' : '▼'}
                </TableCell>
                <TableCell align="center">Akcje</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar>{user.email[0].toUpperCase()}</Avatar>
                      {user.email}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {getRoleIcon(user.role)} {user.role}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Opcje">
                      <IconButton onClick={(event) => handleMenuOpen(event, user.uid)}>
                        <MoreVertIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={totalElements}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          labelRowsPerPage="Liczba rekordów: "
        />
      </Paper>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleChangeRole('USER')}>Ustaw jako USER</MenuItem>
        <MenuItem onClick={() => handleChangeRole('ANALYST')}>Ustaw jako ANALYST</MenuItem>
        <MenuItem onClick={() => handleChangeRole('ADMIN')}>Ustaw jako ADMIN</MenuItem>
        <MenuItem onClick={handleConfirmOpen}>
          <DeleteIcon sx={{ mr: 1 }} /> Usuń konto
        </MenuItem>
      </Menu>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Potwierdzenie</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Czy na pewno chcesz usunąć użytkownika {selectedUser?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Anuluj</Button>
          <Button onClick={handleDeleteUser} color="error">
            Usuń
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarStatus}
        autoHideDuration={5000}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbarType}
          variant="filled"
          sx={{ width: '100%' }}
        >
            {snackbarInfo}
        </Alert>
      </Snackbar>

    </Container>
  );
};

export default UserManagementPage;