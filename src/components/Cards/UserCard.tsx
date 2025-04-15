import { Card, Divider, Stack, Text, Title } from "@mantine/core"
import { getUserById } from "../../features/user"
import useSWR from "swr"

interface UserType {
  id: number
  first_name: string
  last_name: string
  dob: string
  role: string
  phone: string
  gender: string
  address: string
  created_at: string
  updated_at: string
}

interface UserCardPropsType {
  userId: number | null
}

const UserCard = (props: UserCardPropsType) => {
  const { userId } = props;

  const { data, error, isLoading } = useSWR(['user', userId], () => getUserById(userId));

  if (error) {
    return <div>Error loading user</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="xs">
        <Title order={4}>User Details</Title>
        <Divider my="sm" />
        <Text><strong>First Name:</strong> {data.first_name}</Text>
        <Text><strong>Last Name:</strong> {data.last_name}</Text>
        <Text><strong>Date of Birth:</strong> {data.dob}</Text>
        <Text><strong>Role:</strong> {data.role}</Text>
        <Text><strong>Phone:</strong> {data.phone}</Text>
        <Text><strong>Gender:</strong> {data.gender}</Text>
        <Text><strong>Address:</strong> {data.address}</Text>
        <Text><strong>Created At:</strong> {data.created_at}</Text>
        <Text><strong>Updated At:</strong> {data.updated_at}</Text>
      </Stack>
    </Card>
  )
}

export default UserCard
