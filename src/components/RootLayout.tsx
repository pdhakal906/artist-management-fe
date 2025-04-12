import { AppShell, Burger, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router'
import SideBar from './SideBar';

const RootLayout = () => {

  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: { base: 100 },
          breakpoint: 'sm',
          collapsed: { mobile: !opened, desktop: !opened }
        }}

      >
        <AppShell.Header
          // zIndex={300}
          withBorder
        >
          <Group>
            <Burger opened={opened} onClick={toggle} p={5} mt={4} size="30px" />
            <Text
              fz={"h1"}
              fw={700}
              component="h1"
            >Artist App</Text>
          </Group>

        </AppShell.Header>
        <AppShell.Navbar
          // p="md"
          // zIndex={300}
          className='border-none'
        >
          <SideBar />
        </AppShell.Navbar>


        <AppShell.Main
        >
          <Outlet />
        </AppShell.Main>


      </AppShell>

    </>


  )
}

export default RootLayout