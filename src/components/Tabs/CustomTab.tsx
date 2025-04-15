import { useEffect, useState } from 'react'
import { Box, Tabs } from '@mantine/core'

import useAuthStore from '../../features/store';
import ArtistTab from './ArtistTab';
import UserTab from './UserTab';
import MusicTab from './MusicTab';


const CustomTab = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const { user } = useAuthStore();
  const userRole = user?.role;

  useEffect(() => {
    if (userRole === 'super_admin') {
      setActiveTab('user');
    } else if (userRole === 'artist_manager') {
      setActiveTab('artist');
    } else if (userRole === 'artist') {
      setActiveTab('song');
    }
  }, [userRole])
  if (userRole === "super_admin") {
    return (
      <Tabs value={activeTab} keepMounted={false} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="user">User Tab</Tabs.Tab>
          <Tabs.Tab value="artist">Artist Tab</Tabs.Tab>
          <Tabs.Tab value="music">Music Tab</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="user"><UserTab /></Tabs.Panel>
        <Tabs.Panel value="artist"><ArtistTab /></Tabs.Panel>
        <Tabs.Panel value="music"><MusicTab /></Tabs.Panel>
      </Tabs>
    );
  } else if (userRole === "artist_manager") {
    return (
      <Tabs value={activeTab} keepMounted={false} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="artist">Artist Tab</Tabs.Tab>
          <Tabs.Tab value="music">Music Tab</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="artist"><ArtistTab /></Tabs.Panel>
        <Tabs.Panel value="music"><MusicTab /></Tabs.Panel>
      </Tabs>
    );
  } else {
    return (
      <Tabs value={activeTab} keepMounted={false} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="music">Music Tab</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="music"><MusicTab /></Tabs.Panel>
      </Tabs>
    );
  }
}

export default CustomTab
