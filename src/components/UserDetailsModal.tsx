import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField, Grid } from '@mui/material';
import { useAppDispatch } from '../hooks/hooks';
import { editUser, User } from '../store/usersSlice';

interface UserDetailsModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(user);

  const handleSave = () => {
    dispatch(editUser(editedUser));
    setEditMode(false);
    onClose();
  };

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#1c1c1c',
    color: 'white',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ ...style, width: 400 }}>
        <Typography variant="h6" component="h2">
          {editMode ? (
            <TextField
              fullWidth
              variant="standard"
              value={editedUser.name}
              onChange={(e) =>
                setEditedUser({
                  ...editedUser,
                  name: e.target.value,
                })
              }
              sx={{
                input: { color: 'white' },
                '& .MuiInput-underline:before': {
                  borderBottomColor: 'white',
                },
              }}
            />
          ) : (
            editedUser.name
          )}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          {editMode ? (
            <TextField
              fullWidth
              variant="standard"
              value={editedUser.email}
              onChange={(e) =>
                setEditedUser({
                  ...editedUser,
                  email: e.target.value,
                })
              }
              sx={{
                input: { color: 'white' },
                '& .MuiInput-underline:before': {
                  borderBottomColor: 'white',
                },
              }}
            />
          ) : (
            editedUser.email
          )}
        </Typography>
        <Grid container justifyContent="flex-end" sx={{ mt: 4 }}>
          {editMode ? (
            <Button
              onClick={handleSave}
              color="primary"
              variant="contained"
              sx={{ color: 'white', borderColor: 'white' }}
            >
              Save
            </Button>
          ) : (
            <Button
              onClick={() => setEditMode(true)}
              color="primary"
              variant="contained"
              sx={{ color: 'white', borderColor: 'white' }}
            >
              Edit
            </Button>
          )}
        </Grid>
      </Box>
    </Modal>
  );
};

export default UserDetailsModal;
