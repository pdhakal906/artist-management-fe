import { Button, Group, Table } from '@mantine/core';

import CustomDrawer from '../CustomDrawer';
import UserCard from '../Cards/UserCard';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import EditUserForm from '../Forms/EditUserForm';
import ConfirmModal from '../ConfirmModal';
import { deleteUser } from '../../features/user';
import { notifications } from '@mantine/notifications';
interface RowDataType {
  email: string;
  first_name: string;
  last_name: string;
  dob: string;
  role: string;
  phone: string;
  gender: string;
  address: string;
  id: number;
  created_at: string;
  updated_at: string
}

interface UserTablePropsType {
  rowData: RowDataType[];
  mutate: VoidFunction;

}
const UserTable = (props: UserTablePropsType) => {
  const { rowData, mutate } = props;
  const [action, setAction] = useState<string>('view')
  const [viewUserId, setViewUserId] = useState<number | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [openedConfirm, { open: openConfirm, close: closeConfirm }] = useDisclosure(false);

  const handleViewClick = (id: number) => () => {
    setAction('view');
    setViewUserId(id);
    open();

  }
  const handleEditClick = (id: number) => () => {
    setAction('edit');
    setViewUserId(id);
    open();

  }

  const handleClickDelete = (id: number) => () => {
    openConfirm();
    setAction('delete');
    setViewUserId(id);
  }

  const handleConfirmDelete = async () => {
    if (!viewUserId) return;
    await deleteUser(viewUserId)
    notifications.show({
      title: 'Success',
      message: 'User deleted sucessfully!',
      color: 'green',
      position: 'top-right',
      autoClose: 5000,
    });
    mutate();
    closeConfirm();
  }

  const rows = rowData?.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.first_name}</Table.Td>
      <Table.Td>{element.last_name}</Table.Td>
      <Table.Td>{element.gender}</Table.Td>
      <Table.Td>{element.dob.slice(0, 10)}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td>{element.role}</Table.Td>
      <Table.Td>{element.phone}</Table.Td>
      <Table.Td>{element.address}</Table.Td>
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
            <Table.Th>Dob</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th>Address</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <ConfirmModal close={closeConfirm} opened={openedConfirm} title='Delete User?'>
        <>
          <Group >
            <Button onClick={closeConfirm} variant='outline'>Cancel</Button>
            <Button onClick={handleConfirmDelete} variant='outline' color='red'>Delete</Button>
          </Group>
        </>
      </ConfirmModal>
      <CustomDrawer onClose={close} opened={opened} title='View User'>
        {action === 'view' ? (
          <UserCard userId={viewUserId} />
        ) : action === 'edit' ? (
          <EditUserForm
            mutate={mutate}
            user={rowData.find((item) => item.id === viewUserId)}
            close={close}
          />
        ) : null}
      </CustomDrawer>
    </>
  );
}

export default UserTable
