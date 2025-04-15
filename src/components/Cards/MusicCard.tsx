import React, { useState } from 'react'
import useSWR from 'swr';
import { getMusicById } from '../../features/music';
import { Card, Divider, Stack, Text, Title } from '@mantine/core';
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
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="xs">
        <Title order={4}>Song Details</Title>
        <Divider my="sm" />

        <Text><strong>Title:</strong> {data.title}</Text>
        <Text><strong>Album Name:</strong> {data.album_name}</Text>
        <Text><strong>Genre:</strong> {data.genre}</Text>
        <Text><strong>Artist ID:</strong> {data.artist_id}</Text>
      </Stack>
    </Card>
  );
}

export default MusicCard
