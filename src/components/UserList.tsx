import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  CardMedia,
} from '@mui/material';
import { useAppSelector } from '../hooks/hooks';
import { User } from '../store/usersSlice';

interface UserListProps {
  onUserClick: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ onUserClick }) => {
  const users = useAppSelector((state) => state.users);

  return (
    <Grid container spacing={2} p={2}>
      {users.map((user: User) => (
        <Grid item xs={12} sm={6} md={4} key={user.id}>
          <Card
            sx={{
              maxWidth: 345,
              borderRadius: 2,
              boxShadow: 3,
              position: 'relative',
              backgroundColor: '#1c1c1c',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={`https://picsum.photos/seed/${user.id}/345/140`}
              alt="Background image"
            />
            <Avatar
              alt={user.name}
              src={`https://randomuser.me/api/portraits/men/${user.id}.jpg`}
              sx={{
                width: 80,
                height: 80,
                position: 'absolute',
                top: 90,
                left: 16,
                border: '2px solid white',
              }}
            />
            <CardContent sx={{ mt: 6, flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="div">
                {user.name}
              </Typography>
              <Typography variant="body2" color="primary">
                {user.company.bs}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1.5 }}>
                {user.company.catchPhrase}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                sx={{ borderColor: 'white', color: 'white' }}
                onClick={() => onUserClick(user)}
              >
                MORE INFO
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserList;
