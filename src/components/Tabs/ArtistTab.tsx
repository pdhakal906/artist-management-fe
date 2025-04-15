import { useState } from 'react'
import ArtistTable from '../Tables/ArtistTable';
import { useDisclosure } from '@mantine/hooks';
import useSWR from 'swr';
import { fetchArtists } from '../../features/fetcher';
import { Button, FileButton, Flex, Group, Pagination, Stack } from '@mantine/core';
import CustomDrawer from '../CustomDrawer';
import CreateArtistForm from '../Forms/CreateArtistForm';
import { downloadArtistCsv, uploadArtistsCSV } from '../../features/artist';
import { notifications } from '@mantine/notifications';

const ArtistTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);


  const { data, error, isLoading, mutate } = useSWR(['artists', currentPage], () =>
    fetchArtists(currentPage)
  );

  const handleUpload = async () => {
    if (!file) return;

    try {
      setUploading(true);

      const res = await uploadArtistsCSV(file);
      console.log("Artists uploaded:", res);

      notifications.show({
        title: 'Upload successful',
        message: 'Artists CSV was uploaded and processed',
        color: 'green',
        position: 'top-right',
        autoClose: 5000,
      });

      mutate();
    } catch (error: any) {
      console.error("Upload failed:", error.response?.data || error.message);

      notifications.show({
        title: 'Upload failed',
        message: error.response?.data?.detail || 'Something went wrong',
        color: 'red',
        position: 'top-right',
        autoClose: 5000,
      });
    } finally {
      setFile(null);
      setUploading(false);
    }
  };


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading artists.</div>;

  return (
    <>
      <Stack p="xs" gap={0}>
        <Flex justify="flex-end" gap={10}>
          <Button size="xs" onClick={open}>Add</Button>
          <Button size="xs" onClick={downloadArtistCsv} loading={uploading}>Download</Button>

          {!file ? (
            <FileButton
              onChange={setFile}
              accept=".csv"
            >
              {(props) => <Button size='xs' {...props}>Add From CSV</Button>}
            </FileButton>
          ) : (
            <Group gap="xs">
              <Button
                size='xs'
                onClick={() => setFile(null)}
                color="red"
              >
                {file.name.length > 10 ? `${file.name.substring(0, 10)}...` : file.name} (Cancel)
              </Button>
              <Button
                size='xs'
                onClick={handleUpload}
                loading={uploading}
                color="green"
              >
                Upload
              </Button>
            </Group>
          )}

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
