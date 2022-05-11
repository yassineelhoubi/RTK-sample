import { Box, FormControlLabel, Switch } from '@mui/material'
import { Form } from 'formik'
import React from 'react'
// import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import TextField from '@mui/material/TextField';
// import { IFonction } from 'app/models/IFonction';
import { User } from '../../interfaces';
import AppTextField from '../../core/AppForm/AppTextField';



interface Props {
  values: User,
  setFieldValue: (field: string, value: any) => void
}
const UserForm: React.FC<Props> = ({ values, setFieldValue }) => {
  // console.log( values);

  return (
    <Form noValidate autoComplete='off'>
      <>
        <Box
          sx={{
            p: 5,
            ml: -6,
            mr: -6,
          }}
        >
          <>
            <AppTextField
              sx={{
                width: '100%',
                mb: { xs: 4, xl: 6 },
              }}
              variant='outlined'
              label="First Name"
              name='fName'
            />
            <AppTextField
              sx={{
                width: '100%',
                mb: { xs: 4, xl: 6 },
              }}
              variant='outlined'
              label="Last Name"
              name='lName'
            />
            <AppTextField
              sx={{
                width: '100%',
                mb: { xs: 4, xl: 6 },
              }}
              variant='outlined'
              label="Email"
              name='email'
            />
            <AppTextField
              sx={{
                width: '100%',
                mb: { xs: 4, xl: 6 },
              }}
              variant='outlined'
              label="CIN"
              name='cin'
            />
            <AppTextField
              sx={{
                width: '100%',
                mb: { xs: 4, xl: 6 },
              }}
              variant='outlined'
              label="Phone"
              name='phone'
            />
            <AppTextField
              sx={{
                width: '100%',
                mb: { xs: 4, xl: 6 },
              }}
              variant='outlined'
              label="PIN"
              name='PIN'
            />
            <AppTextField
              sx={{
                width: '100%',
                mb: { xs: 4, xl: 6 },
              }}
              variant='outlined'
              label="CCN"
              name='ccn'
            />

          </>
        </Box>

      </>
    </Form>


  )
}

export default UserForm