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
          // collapsed: { mobile: !opened, desktop: !opened }
        }}

      >
        <AppShell.Header
          // zIndex={300}
          withBorder
        >


          <Text
            fz={"h1"}
            fw={700}
            component="h1"
          >Artist App</Text>


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