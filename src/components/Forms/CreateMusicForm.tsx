import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import { useFormik } from 'formik';
import { notifications } from '@mantine/notifications';
import { Box, Button, Select, Stack, TextInput } from '@mantine/core';
import { fetchMusicPageData } from '../../features/fetcher';
import { createMusic } from '../../features/music';

interface CreateMusicFormPropsType {
  close: VoidFunction
  mutate: VoidFunction
  artistId?: string
}

const CreateMusicForm = (props: CreateMusicFormPropsType) => {
  const { close, mutate, artistId } = props;
  const [pageDataLoading, setPageDataLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(false); // you missed defining this before

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
  const musicSchema = Yup.object().shape({
    artist_id: Yup.number().required('Artist is required'),
    title: Yup.string().required('Title is required'),
    album_name: Yup.string().required('Album name is required'),
    genre: Yup.string().required('Genre is required')
  });

  const formik = useFormik({
    initialValues: {
      artist_id: artistId || '',
      title: '',
      album_name: '',
      genre: '',
    },
    onSubmit: async (val) => {
      setLoading(true);
      try {
        await createMusic(val);
        notifications.show({
          title: 'Success',
          message: 'Music created successfully!',
          color: 'green',
          position: 'top-right',
          autoClose: 5000,
        });
        mutate();
        close();
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Something went wrong',
          color: 'red',
          position: 'top-right',
          autoClose: 5000,
        });
      } finally {
        setLoading(false);
      }
    },
    validationSchema: musicSchema,
  });

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
          {!artistId && <Select
            name='artist_id'
            label="Artist"
            placeholder="Choose Artist"
            data={pageData?.artists}
            onBlur={formik.handleBlur}
            onChange={(value) => formik.setFieldValue("artist_id", value)}
            value={formik.values.artist_id}
          />}
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
            Create Music
          </Button>
        </Stack>
      </form>
    </Box>
  );
};


export default CreateMusicForm
