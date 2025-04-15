import useSWR from 'swr';
import UserTable from '../Tables/UserTable';
import { Button, Flex, Pagination, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import CustomDrawer from '../CustomDrawer';
import CreateUserForm from '../Forms/CreateUserForm';
import { useState } from 'react';
import { fetchUsers } from '../../features/fetcher';

const UserTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);

  // Use SWR to fetch users
  const { data, error, isLoading, mutate } = useSWR(['users', currentPage], () =>
    fetchUsers(currentPage)
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users.</div>;

  return (
    <>
      <Stack p="xs" gap={0}>
        <Flex justify="flex-end">
          <Button size="xs" onClick={open}>Add</Button>
        </Flex>
        <UserTable rowData={data?.users} mutate={mutate} />
      </Stack>

      <Pagination
        total={data?.total_pages}
        value={currentPage}
        onChange={setCurrentPage}
      />

      <CustomDrawer onClose={close} opened={opened} title='Add User'>
        <CreateUserForm close={close} mutate={mutate} />
      </CustomDrawer>
    </>
  );
};

export default UserTab;
