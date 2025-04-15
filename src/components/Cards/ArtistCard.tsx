import { Stack, Text } from "@mantine/core"

import useSWR from "swr"
import { getArtistById } from "../../features/artist"


interface ArtistCardPropsType {
  artistId: number | null
}

const ArtistCard = (props: ArtistCardPropsType) => {
  const { artistId } = props;

  const { data, error, isLoading } = useSWR(['artist', artistId], () => getArtistById(artistId));

  if (error) {
    return <div>Error loading artists</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <Stack>

        <Text>{data.first_name}</Text>
        <Text>{data.last_name}</Text>
        <Text>{data.email}</Text>
        <Text>{data.phone}</Text>
        <Text>{data.dob}</Text>
        <Text>{data.gender}</Text>
        <Text>{data.address}</Text>
        <Text>{data.first_release_year}</Text>
        <Text>{data.no_of_albums_released}</Text>
        <Text>{data.created_at}</Text>
        <Text>{data.updated_at}</Text>
      </Stack>
    </div>
  )
}

export default ArtistCard
