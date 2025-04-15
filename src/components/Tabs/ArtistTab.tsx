import { useEffect, useState } from 'react'
import ArtistTable from '../Tables/ArtistTable';
import { useDisclosure } from '@mantine/hooks';
import useSWR from 'swr';
import { fetchArtists } from '../../features/fetcher';
import { Button, Flex, Pagination, Stack } from '@mantine/core';
import CustomDrawer from '../CustomDrawer';
import CreateArtistForm from '../Forms/CreateArtistForm';

const ArtistTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);

  // Use SWR to fetch users
  const { data, error, isLoading, mutate } = useSWR(['artists', currentPage], () =>
    fetchArtists(currentPage)
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading artists.</div>;

  return (
    <>
      <Stack p="xs" gap={0}>
        <Flex justify="flex-end">
          <Button size="xs" onClick={open}>Add</Button>
        </Flex>
        <ArtistTable rowData={data?.artists} mutate={mutate} />
      </Stack>
      <Pagination
        total={data?.total_pages}
        value={currentPage}
        onChange={setCurrentPage}
      />
      <CustomDrawer onClose={close} opened={opened} title='Add Artist'>
        <CreateArtistForm close={close} mutate={mutate} />
      </CustomDrawer>
    </>
  )
}

export default ArtistTab
