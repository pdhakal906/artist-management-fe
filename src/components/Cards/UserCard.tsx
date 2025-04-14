import { Stack, Text } from "@mantine/core"
import { useEffect, useState } from "react"
import { getUserById } from "../../features/user"

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
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState<UserType>({
    id: 0,
    first_name: '',
    last_name: '',
    dob: '',
    role: '',
    phone: '',
    gender: '',
    address: '',
    created_at: '',
    updated_at: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (!userId) return;
      const response = await getUserById(userId);
      setUser(response.data);
      setLoading(false);
    }
    fetchData();
  }, [userId])

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <Stack>
        <Text>{user.first_name}</Text>
        <Text>{user.last_name}</Text>
        <Text>{user.dob}</Text>
        <Text>{user.role}</Text>
        <Text>{user.phone}</Text>
        <Text>{user.gender}</Text>
        <Text>{user.address}</Text>
        <Text>{user.created_at}</Text>
        <Text>{user.updated_at}</Text>
      </Stack>
    </div>
  )
}

export default UserCard
