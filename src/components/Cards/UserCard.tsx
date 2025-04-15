import { Stack, Text } from "@mantine/core"
import { useEffect, useState } from "react"
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
    <div>
      <Stack>
        <Text>{data.first_name}</Text>
        <Text>{data.last_name}</Text>
        <Text>{data.dob}</Text>
        <Text>{data.role}</Text>
        <Text>{data.phone}</Text>
        <Text>{data.gender}</Text>
        <Text>{data.address}</Text>
        <Text>{data.created_at}</Text>
        <Text>{data.updated_at}</Text>
      </Stack>
    </div>
  )
}

export default UserCard
