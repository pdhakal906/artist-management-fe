import * as Yup from "yup";
import { useFormik } from 'formik';
import { Box, Button, Stack, TextInput } from '@mantine/core';
import { useState } from "react";
import { updateUser } from "../../features/user";
import { notifications } from "@mantine/notifications";



const EditUserForm = ({ user, mutate, close }) => {
  const [loading, setLoading] = useState(false);

  const updateUserSchema = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    dob: Yup.string().required('Date of birth is required'),
    phone: Yup.string().required('Phone number is required'),
    gender: Yup.string().required('Gender is required'),
    address: Yup.string().required('Address is required'),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      dob: user.dob,
      phone: user.phone,
      gender: user.gender,
      address: user.address,
    },
    onSubmit: async (val) => {
      setLoading(true);
      await updateUser(val);
      mutate(); // Revalidate the user data
      setLoading(false);
      notifications.show({
        title: 'Success',
        message: 'User updated sucessfully!',
        color: 'green',
        position: 'top-right',
        autoClose: 5000,
      });
      close();

    },
    validationSchema: updateUserSchema
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
            // error={formik.touched.first_name && formik.errors.first_name}
            />
          </Box>
          <Box>
            <TextInput
              name='last_name'
              label="Last Name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            // error={formik.touched.last_name && formik.errors.last_name}
            />
          </Box>
          <Box>
            <TextInput
              name='dob'
              label="Date of Birth"
              value={formik.values.dob}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            // error={formik.touched.dob && formik.errors.dob}
            />
          </Box>

          <Box>
            <TextInput
              name='phone'
              label="Phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            // error={formik.touched.phone && formik.errors.phone}
            />
          </Box>
          <Box>
            <TextInput
              name='gender'
              label="Gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            // error={formik.touched.gender && formik.errors.gender}
            />
          </Box>
          <Box>
            <TextInput
              name='address'
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            // error={formik.touched.address && formik.errors.address}
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

export default EditUserForm
