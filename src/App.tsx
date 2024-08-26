import React, { useState, useEffect } from 'react';
import { Container, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './hooks/hooks';
import { setUsers } from './store/usersSlice';
import axios from 'axios';
import UserList from './components/UserList';
import UserDetailsModal from './components/UserDetailsModal';
import { User } from './store/usersSlice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      );
      dispatch(setUsers(response.data));
    };

    fetchUsers();
  }, [dispatch]);

  const handleOpenModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="md">
        <Routes>
          <Route
            path="/"
            element={<UserList onUserClick={handleOpenModal} />}
          />
        </Routes>
        {selectedUser && (
          <UserDetailsModal
            user={selectedUser}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </Container>
    </Router>
  );
};

export default App;
