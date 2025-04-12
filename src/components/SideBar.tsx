import { Box, Button, Center, Stack } from '@mantine/core'
import { NavLink, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext';

const SideBar = () => {
  const { user, role, logout } = useAuth();
  const nav = useNavigate();

  const handleClick = () => {
    logout();
    nav('/login');

  }

  return (
    <Box
      p={'sm'}
    >
      <Center>
        <Stack

        >

          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
          <NavLink to="/admin">Dashboard</NavLink>
          <Button onClick={handleClick}>Logout</Button>

        </Stack>
      </Center>
    </Box>
  )
}

export default SideBar
