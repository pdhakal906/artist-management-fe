import { Button, Group, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import React, { useEffect, useState } from 'react'
import ConfirmModal from '../ConfirmModal';
import CustomDrawer from '../CustomDrawer';
import MusicCard from '../Cards/MusicCard';
import EditMusicForm from '../Forms/EditMusicForm';
import { deleteMusic } from '../../features/music';
import useAuthStore from '../../features/store';
interface RowDataType {
  id: number;
  artist_id: number;
  title: string;
  album_name: string;
  genre: string;
  created_at: string;
  updated_at: number;
}
interface MusicTablePropsType {
  rowData: RowDataType[];
  mutate: VoidFunction;
}

const MusicTable = (props: MusicTablePropsType) => {
  const { rowData, mutate } = props;

  const [action, setAction] = useState<string>('view')
  const [artistId, setArtistId] = useState<number | null>(null);
  const [viewMusicId, setViewMusicId] = useState<number | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const { user } = useAuthStore();

  const [openedConfirm, { open: openConfirm, close: closeConfirm }] = useDisclosure(false);


  useEffect(() => {
    if (user?.role === 'artist') {
      setArtistId(user?.id);
    }
  }, [])



  const handleViewClick = (id: number) => () => {
    setAction('view');
    setViewMusicId(id);
    open();

  }
  const handleEditClick = (id: number) => () => {
    setAction('edit');
    setViewMusicId(id);
    open();

  }

  const handleClickDelete = (id: number) => () => {
    openConfirm();
    setAction('delete');
    setViewMusicId(id);
  }

  const handleConfirmDelete = async () => {
    if (!viewMusicId) return;
    await deleteMusic(viewMusicId);
    notifications.show({
      title: 'Success',
      message: 'Music deleted sucessfully!',
      color: 'green',
      position: 'top-right',
      autoClose: 5000,
    });
    mutate();
    closeConfirm();
  }

  const rows = rowData.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.title}</Table.Td>
      <Table.Td>{element.album_name}</Table.Td>
      <Table.Td>{element.genre}</Table.Td>
      <Table.Td>{element.artist_id}</Table.Td>
      <Table.Td>
        <Group>
          <Button onClick={handleViewClick(element.id)} size='xs'>View</Button>
          <Button onClick={handleEditClick(element.id)} size='xs'>Edit</Button>
          <Button onClick={handleClickDelete(element.id)} size='xs'>Delete</Button>
        </Group>
      </Table.Td>

    </Table.Tr>
  ));



  return (
    <>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Album Name</Table.Th>
            <Table.Th>Genre</Table.Th>
            <Table.Th>Artist</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      <ConfirmModal close={closeConfirm} opened={openedConfirm} title='Delete Music?'>
        <>
          <Group >
            <Button onClick={closeConfirm} variant='outline'>Cancel</Button>
            <Button onClick={handleConfirmDelete} variant='outline' color='red'>Delete</Button>
          </Group>
        </>
      </ConfirmModal>
      <CustomDrawer onClose={close} opened={opened} title='View/Edit Music'>
        {action === 'view' ? (
          <MusicCard musicId={viewMusicId} />
        ) : action === 'edit' ? (
          <EditMusicForm
            mutate={mutate}
            music={rowData.find((item) => item.id === viewMusicId)}
            artistId={artistId}
            close={close}
          />
        ) : null}
      </CustomDrawer>

    </>
  )
}

export default MusicTable
