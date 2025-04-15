import { Box, Button, Select, Stack, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as Yup from "yup";
import { updateArtist } from '../../features/artist';


const EditArtistForm = ({ artist, mutate, close }) => {

  const [loading, setLoading] = useState(false);

  const updateArtistSchema = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    dob: Yup.string()
      .required('Date of birth is required')
      .matches(
        /^\d{4}-\d{2}-\d{2}$/,
        'Date of birth must be in YYYY-MM-DD format'
      ),
    phone: Yup.string().required('Phone number is required'),
    gender: Yup.string().required('Gender is required'),
    address: Yup.string().required('Address is required'),
    first_release_year: Yup.number()
      .typeError('First release year must be a number')
      .required('First release year is required')
      .test(
        'is-after-dob',
        'First release year must be greater than birth year',
        function (value) {
          const { dob } = this.parent;
          const dobYear = dob?.substring(0, 4);
          if (!dobYear || isNaN(dobYear)) return false;
          return value > parseInt(dobYear, 10);
        }
      ),
    no_of_albums_released: Yup.number().required('Number of albums released is required'),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: artist.id,
      user_id: artist.user_id,
      first_name: artist.first_name,
      last_name: artist.last_name,
      dob: artist.dob,
      phone: artist.phone,
      gender: artist.gender,
      address: artist.address,
      first_release_year: artist.first_release_year,
      no_of_albums_released: artist.no_of_albums_released,
    },
    onSubmit: async (val) => {
      setLoading(true);
      await updateArtist(val);
      mutate();
      setLoading(false);
      notifications.show({
        title: 'Success',
        message: 'Artist updated sucessfully!',
        color: 'green',
        position: 'top-right',
        autoClose: 5000,
      });
      close();

    },
    validationSchema: updateArtistSchema
  });

  return (
    <Box
      w={'100%'}
      p={'lg'}
      bg="var(--mantine-color-gray-light)"

    >
      <form onSubmit={formik.handleSubmit}>
        <Stack>
          <Box>
            <TextInput
              name='first_name'
              label="First Name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.first_name && formik.errors.first_name}
            />
          </Box>
          <Box>
            <TextInput
              name='last_name'
              label="Last Name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.last_name && formik.errors.last_name}
            />
          </Box>
          <Box>
            <TextInput
              name='dob'
              label="Date of Birth"
              value={formik.values.dob}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.dob && formik.errors.dob}
            />
          </Box>

          <Box>
            <TextInput
              name='phone'
              label="Phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && formik.errors.phone}
            />
          </Box>
          <Box>
            <Select
              name='gender'
              label="Gender"
              placeholder="Choose a gender"
              data={['male', 'female']}
              value={formik.values.gender}
              onChange={(value) => formik.setFieldValue("gender", value)}
              onBlur={formik.handleBlur}
              error={formik.touched.gender && formik.errors.gender}
            ></Select>
          </Box>
          <Box>
            <TextInput
              name='address'
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && formik.errors.address}
            />
          </Box>
          <Box>
            <TextInput
              name='first_release_year'
              label="First Release Year"
              value={formik.values.first_release_year}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.first_release_year && formik.errors.first_release_year}
            />
          </Box>
          <Box>
            <TextInput
              name='no_of_albums_released'
              label="No of Albums Released"
              value={formik.values.no_of_albums_released}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && formik.errors.address}
            />
          </Box>
          <Button type='submit'
            loading={loading}
          >Update</Button>
        </Stack>
      </form>
    </Box>
  )
}

export default EditArtistForm
