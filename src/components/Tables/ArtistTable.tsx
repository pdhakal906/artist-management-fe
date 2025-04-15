import { Button, Group, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { deleteArtist } from '../../features/artist';
import { notifications } from '@mantine/notifications';
import ConfirmModal from '../ConfirmModal';
import CustomDrawer from '../CustomDrawer';
import EditArtistForm from '../Forms/EditArtistForm';
import ArtistCard from '../Cards/ArtistCard';
interface RowDataType {
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  phone: string;
  first_release_year: number;
  no_of_albums_released: number;
  user_id: number;
  id: number;
  created_at: string;
  updated_at: string
}

interface ArtistTablePropsType {
  rowData: RowDataType[];
  mutate: VoidFunction;
}


const ArtistTable = (props: ArtistTablePropsType) => {
  const { rowData, mutate } = props;
  const [action, setAction] = useState<string>('view')
  const [viewArtistId, setViewArtistId] = useState<number | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const [openedConfirm, { open: openConfirm, close: closeConfirm }] = useDisclosure(false);

  const handleViewClick = (id: number) => () => {
    setAction('view');
    setViewArtistId(id);
    open();

  }
  const handleEditClick = (id: number) => () => {
    setAction('edit');
    setViewArtistId(id);
    open();

  }

  const handleClickDelete = (id: number) => () => {
    openConfirm();
    setAction('delete');
    setViewArtistId(id);
  }

  const handleConfirmDelete = async () => {
    if (!viewArtistId) return;
    await deleteArtist(viewArtistId)
    notifications.show({
      title: 'Success',
      message: 'Artist deleted sucessfully!',
      color: 'green',
      position: 'top-right',
      autoClose: 5000,
    });
    mutate();
    closeConfirm();
  }

  const rows = rowData.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.first_name}</Table.Td>
      <Table.Td>{element.last_name}</Table.Td>
      <Table.Td>{element.gender}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td>{element.phone}</Table.Td>
      <Table.Td>{element.first_release_year}</Table.Td>
      <Table.Td>{element.no_of_albums_released}</Table.Td>
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
            <Table.Th>First Name</Table.Th>
            <Table.Th>Last Name</Table.Th>
            <Table.Th>Gender</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th>First Release Year</Table.Th>
            <Table.Th>No of Albums Released</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      <ConfirmModal close={closeConfirm} opened={openedConfirm} title='Delete Artist?'>
        <>
          <Group >
            <Button onClick={closeConfirm} variant='outline'>Cancel</Button>
            <Button onClick={handleConfirmDelete} variant='outline' color='red'>Delete</Button>
          </Group>
        </>
      </ConfirmModal>
      <CustomDrawer onClose={close} opened={opened} title='View/Edit Artist'>
        {action === 'view' ? (
          <ArtistCard artistId={viewArtistId} />
        ) : action === 'edit' ? (
          <EditArtistForm
            mutate={mutate}
            artist={rowData.find((item) => item.id === viewArtistId)}
            close={close}
          />
        ) : null}
      </CustomDrawer>

    </>
  );
}

export default ArtistTable
