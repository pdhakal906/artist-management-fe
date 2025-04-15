import { Button, Flex, Pagination, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react'
import useSWR from 'swr';
import CustomDrawer from '../CustomDrawer';
import { fetchMusic } from '../../features/fetcher';
import CreateMusicForm from '../Forms/CreateMusicForm';
import MusicTable from '../Tables/MusicTable';
import useAuthStore from '../../features/store';

const MusicTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);
  const [artistId, setArtistId] = useState(null);

  const { data, error, isLoading, mutate } = useSWR(['music', currentPage], () =>
    fetchMusic(currentPage)
  );

  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.role === 'artist') {
      setArtistId(user?.id);
    }
  }, [])


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading music.</div>;

  return (
    <>
      <Stack p="xs" gap={0}>
        <Flex justify="flex-end">
          <Button size="xs" onClick={open}>Add</Button>
        </Flex>
        <MusicTable rowData={data?.music} mutate={mutate} />
      </Stack>

      <Pagination
        total={data?.total_pages}
        value={currentPage}
        onChange={setCurrentPage}
      />

      <CustomDrawer onClose={close} opened={opened} title='Add Music'>
        <CreateMusicForm
          close={close} mutate={mutate}
          artistId={artistId}
        />
      </CustomDrawer>
    </>
  );
}

export default MusicTab
