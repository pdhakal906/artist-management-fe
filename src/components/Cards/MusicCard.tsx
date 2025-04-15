import React, { useState } from 'react'
import useSWR from 'swr';
import { getMusicById } from '../../features/music';
import { Stack, Text } from '@mantine/core';
interface MusicCardPropsType {
  musicId: number
}

const MusicCard = (props: MusicCardPropsType) => {
  const { musicId } = props;

  const { data, error, isLoading } = useSWR(['music', musicId], () => getMusicById(musicId));

  if (error) {
    return <div>Error loading music</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }


  return (
    <div>
      <Stack>
        <Text>{data.title}</Text>
        <Text>{data.album_name}</Text>
        <Text>{data.genre}</Text>
        <Text>{data.artist_id}</Text>
      </Stack>
    </div>
  )
}

export default MusicCard
