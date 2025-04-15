import { Button, Flex, Pagination, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react'
import useSWR from 'swr';
import CustomDrawer from '../CustomDrawer';
import { fetchMusic } from '../../features/fetcher';
import CreateMusicForm from '../Forms/CreateMusicForm';
import MusicTable from '../Tables/MusicTable';

const MusicTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);

  const { data, error, isLoading, mutate } = useSWR(['music', currentPage], () =>
    fetchMusic(currentPage)
  );

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
        />
      </CustomDrawer>
    </>
  );
}

export default MusicTab
