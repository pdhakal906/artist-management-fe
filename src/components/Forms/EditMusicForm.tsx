import { notifications } from '@mantine/notifications';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import { fetchMusicPageData } from '../../features/fetcher';
import { Box, Button, Select, Stack, TextInput } from '@mantine/core';
import { updateMusic } from '../../features/music';

const EditMusicForm = ({ music, mutate, close }) => {
  const [loading, setLoading] = useState(false);
  const [pageDataLoading, setPageDataLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchMusicPageData();
        setPageData(result);
      } catch (err) {
        setError(err);
      } finally {
        setPageDataLoading(false);
      }
    };
    loadData();
  }, []);



  const updateMusicSchema = Yup.object().shape({
    artist_id: Yup.number().required('Artist is required'),
    title: Yup.string().required('Title is required'),
    album_name: Yup.string().required('Album name is required'),
    genre: Yup.string().required('Genre is required')
  });


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: music.id,
      artist_id: String(music.artist_id),
      title: music.title,
      album_name: music.album_name,
      genre: music.genre,
    },
    onSubmit: async (val) => {
      setLoading(true);
      await updateMusic(val);
      mutate(); // Revalidate the user data
      setLoading(false);
      notifications.show({
        title: 'Success',
        message: 'Music updated sucessfully!',
        color: 'green',
        position: 'top-right',
        autoClose: 5000,
      });
      close();
    },
    validationSchema: updateMusicSchema,

  })

  if (pageDataLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error}</div>;

  return (
    <Box w="100%" p="lg" bg="var(--mantine-color-gray-light)">
      <form onSubmit={formik.handleSubmit}>
        <Stack>
          <TextInput
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && formik.errors.title}
          />
          <TextInput
            name="album_name"
            label="Album Name"
            value={formik.values.album_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.album_name && formik.errors.album_name}
          />
          <Select
            name='artist_id'
            label="Artist"
            placeholder="Choose Artist"
            data={pageData?.artists}
            onBlur={formik.handleBlur}
            onChange={(value) => formik.setFieldValue("artist_id", value)}
            value={formik.values.artist_id}
          />
          <Select
            name="genre"
            label="Genre"
            placeholder="Choose Genre"
            data={pageData?.genre}
            onBlur={formik.handleBlur}
            onChange={(value) => formik.setFieldValue("genre", value)}
            value={formik.values.genre}
          />

          <Button type="submit" loading={loading}>
            Update Music
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

export default EditMusicForm
