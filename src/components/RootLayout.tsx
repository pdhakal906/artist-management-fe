import { AppShell, Text } from '@mantine/core';
import { Outlet } from 'react-router'
import SideBar from './SideBar';

const RootLayout = () => {
  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: { base: 100 },
          breakpoint: 0
        }}

      >
        <AppShell.Header
          withBorder
        >
          <Text
            px={10}
            fz={"h1"}
            fw={700}
            component="h1"
          >ArtistFlow</Text>


        </AppShell.Header>
        <AppShell.Navbar
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