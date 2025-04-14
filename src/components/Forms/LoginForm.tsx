import { Box, Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useFormik } from 'formik';
import React from 'react'
import * as Yup from "yup";
import { login } from '../../features/auth';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import useAuthStore from '../../features/store';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const setLogin = useAuthStore((state) => state.setLogin);

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (val) => {
      setLoading(true);

      try {
        const response = await login(
          val.email,
          val.password,
        );
        console.log(response)

        notifications.show({
          title: response.status,
          message: "Logged in successfully!",
          color: 'green',
          autoClose: 3000,
          position: 'top-right',
        })
        setLogin(response.access_token);
        nav('/dashboard')
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
    validationSchema: loginSchema
  });

  return (

    <Box
      //  p={'xl'}
      w={'100%'}
      bg="var(--mantine-color-gray-light)"
      p={'lg'}
    >
      <form onSubmit={formik.handleSubmit}>
        <Stack
        >
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
          <Button
            type='submit'
            loaderProps={loading}
            disabled={loading}
          >Login</Button>
        </Stack>
      </form>
    </Box>

  )
}

export default LoginForm
