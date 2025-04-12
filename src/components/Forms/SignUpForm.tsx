import { Box, Button, PasswordInput, Select, Stack, TextInput } from '@mantine/core';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { signUp } from '../../features/auth';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { useNavigate } from 'react-router';
const SignUpForm = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const roles = [
    'artist_manager',
    'artist'
  ];

  const signUpSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    dob: Yup.string().required('Date of birth is required'),
    role: Yup.string().required('Role is required'),
    phone: Yup.string().required('Phone number is required'),
    gender: Yup.string().required('Gender is required'),
    address: Yup.string().required('Address is required'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      dob: '',
      role: '',
      phone: '',
      gender: '',
      address: '',
    },
    onSubmit: async (val) => {
      setLoading(true);

      try {
        const response = await signUp(
          val
        );
        console.log(response)

        notifications.show({
          title: response.status,
          message: "Signed up  successfully!",
          color: 'green',
          autoClose: 3000,
          position: 'top-right',
        })
        nav('/login')
      } catch (err) {
        notifications.show({
          title: err.status,
          message: err.message,
          color: 'red',
          autoClose: 3000,
          position: 'top-right',
        })
      }
      finally {
        setLoading(false);
      }


    },
    validationSchema: signUpSchema
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
            <Select
              label="Role"
              placeholder="Choose a role"
              data={roles}
              name='role'
              value={formik.values.role}
              onChange={(value) => formik.setFieldValue('role', value)}
              onBlur={formik.handleBlur}
              error={formik.touched.role && formik.errors.role}
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
            <TextInput
              name='gender'
              label="Gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.gender && formik.errors.gender}
            />
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
          <Button type='submit'
            loaderProps={loading}
            disabled={loading}
          >Sign Up</Button>
        </Stack>
      </form>
    </Box>

  )
}

export default SignUpForm
