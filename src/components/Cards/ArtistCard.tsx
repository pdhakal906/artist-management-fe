import { Button, Card, Divider, Flex, Pagination, Stack, Text, Title } from "@mantine/core"

import useSWR, { mutate } from "swr"
import { getArtistById } from "../../features/artist"
import MusicTable from "../Tables/MusicTable"
import { getMusicByArtistId } from "../../features/music"
import { useState } from "react"
import CustomDrawer from "../CustomDrawer"
import CreateMusicForm from "../Forms/CreateMusicForm"
import { useDisclosure } from "@mantine/hooks"


interface ArtistCardPropsType {
  artistId: number | null
}

const ArtistCard = (props: ArtistCardPropsType) => {
  const { artistId } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);


  const { data, error, isLoading } = useSWR(['artist', artistId], () => getArtistById(artistId));

  const { data: musicData, error: musicError, isLoading: musicLoading, mutate: mutateMusic } = useSWR(['music', artistId], () => getMusicByArtistId(artistId));

  if (error || musicError) {
    return <div>Error loading artists</div>
  }

  if (isLoading || musicLoading) {
    return <div>Loading...</div>
  }
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="xs">
          <Title order={4}>Artist Details</Title>
          <Divider my="sm" />

          <Text><strong>First Name:</strong> {data.first_name}</Text>
          <Text><strong>Last Name:</strong> {data.last_name}</Text>
          <Text><strong>Email:</strong> {data.email}</Text>
          <Text><strong>Phone:</strong> {data.phone}</Text>
          <Text><strong>Date of Birth:</strong> {data.dob}</Text>
          <Text><strong>Gender:</strong> {data.gender}</Text>
          <Text><strong>Address:</strong> {data.address}</Text>
          <Text><strong>First Release Year:</strong> {data.first_release_year}</Text>
          <Text><strong>No. of Albums Released:</strong> {data.no_of_albums_released}</Text>

        </Stack>
      </Card>
      <Stack p="xs" gap={0}>
        <Flex justify="flex-end">
          <Button size="xs" onClick={open}>Add</Button>
        </Flex>
        <MusicTable rowData={musicData.music} mutate={mutateMusic}></MusicTable>
      </Stack>
      <Pagination
        total={musicData?.total_pages}
        value={currentPage}
        onChange={setCurrentPage}
      />

      <CustomDrawer onClose={close} opened={opened} title='Add User'>
        <CreateMusicForm
          close={close} mutate={mutateMusic}
          artistId={String(artistId)}
        />
      </CustomDrawer>

    </>
  )
}

export default ArtistCard
