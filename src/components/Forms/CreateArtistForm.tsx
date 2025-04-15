import { useFormik } from 'formik';
import { useState } from 'react'
import * as Yup from "yup";
import { signUp } from '../../features/auth';
import { notifications } from '@mantine/notifications';
import { Box, Button, NumberInput, PasswordInput, Select, Stack, TextInput } from '@mantine/core';
import { createArtist } from '../../features/artist';

const CreateArtistForm = ({ close, mutate }) => {
  const [loading, setLoading] = useState(false);


  const createArtistSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    dob: Yup.string().required('Date of birth is required'),
    phone: Yup.string().required('Phone number is required'),
    gender: Yup.string().required('Gender is required'),
    address: Yup.string().required('Address is required'),
    first_release_year: Yup.number().required('First release year is required'),
    no_of_albums_released: Yup.number().required('Number of albums released is required'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      dob: '',
      role: 'artist',
      phone: '',
      gender: '',
      address: '',
      first_release_year: '',
      no_of_albums_released: '',
    },
    onSubmit: async (val) => {
      setLoading(true);

      try {
        const response = await signUp(
          val
        );

        if (response?.status === 200) {

          const userId = response?.data?.user?.id;
          const artistData = {
            user_id: userId,
            first_release_year: Number(val.first_release_year),
            no_of_albums_released: Number(val.no_of_albums_released),
          };
          await createArtist(artistData);

          notifications.show({
            title: 'Success',
            message: 'Artist created sucessfully!',
            color: 'green',
            position: 'top-right',
            autoClose: 5000,
          });
          await mutate();
          close();
        }
        else {
          notifications.show({
            title: 'Error',
            message: response?.response?.data?.detail,
            color: 'red',
            position: 'top-right',
            autoClose: 5000,
          });
        }

      }
      catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Something went wrong',
          color: 'red',
          position: 'top-right',
          autoClose: 5000,
        });
      }
      finally {
        setLoading(false);
      }


    },
    validationSchema: createArtistSchema
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
              name='email'
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email}
            />

          </Box>
          <Box>
            <PasswordInput
              name='password'
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && formik.errors.password}
            />
          </Box>
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
            >
            </Select>
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
            <NumberInput
              name="first_release_year"
              label="First Release Year"
              value={formik.values.first_release_year}
              onChange={(value) => formik.setFieldValue("first_release_year", value)}
              onBlur={formik.handleBlur}
            />
          </Box>
          <Box>
            <NumberInput
              name="no_of_albums_released"
              label="Number of Albums Released"
              value={formik.values.no_of_albums_released}
              onChange={(value) => formik.setFieldValue("no_of_albums_released", value)}
              onBlur={formik.handleBlur}
            />
          </Box>
          <Button type='submit'
            loaderProps={loading}
            disabled={loading}
          >Create User</Button>
        </Stack>
      </form>
    </Box>

  )
}

export default CreateArtistForm
