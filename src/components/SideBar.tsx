import { Box, Button, Center, Stack, NavLink } from '@mantine/core'
import { useNavigate } from 'react-router'
  ;
import useAuthStore from '../features/store';

const SideBar = () => {
  const setLogout = useAuthStore((state) => state.setLogout);
  const userInfo = useAuthStore((state) => state.user);
  const nav = useNavigate();

  const handleClick = async () => {
    await setLogout();
    nav('/login');


  }
  if (!userInfo) {
    return (
      <Box
        p={'sm'}
      >
        <Center>
          <Stack

          >
            <NavLink href="/" label="Home" />
            <NavLink href="/login" label="Login" />
            <NavLink href="/signup" label="Sign Up" />

          </Stack>
        </Center>
      </Box>

    );
  }
  return (
    <Box
      p={'sm'}
    >
      <Center>
        <Stack

        >
          <NavLink href="/" label="Home" />
          <NavLink href="/dashboard" label="Dashboard" />
          <Button
            variant='outline'
            c={'black'}
            bd={'1px solid black'}
            onClick={handleClick}>Logout</Button>

        </Stack>
      </Center>
    </Box>
  )
}

export default SideBar
