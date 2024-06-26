'use client'
// **  Next
import { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'

// ** React
import { useState } from 'react'

// **  Mui
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Typography,
  useTheme
} from '@mui/material'

// ** Component
import CustomTextField from 'src/components/text-field'
import CustomIcon from 'src/components/Icon'

// ** form
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// ** Regex
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'

// ** Image
import loginDark from '/public/images/login-dark.png'
import loginLight from '/public/images/login-light.png'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

type TProps = {}

type TDefaultValues = {
  email: string
  password: string
}

const RegisterPage: NextPage<TProps> = () => {
  //state
  const [showPassword, setShowPassword] = useState(false)
  const [isRemember, setIsRemember] = useState(false)

  // ** context
  const { login } = useAuth()

  //theme
  const theme = useTheme()

  const schema = yup.object().shape({
    email: yup.string().required('This field is required').matches(EMAIL_REG, 'Email field is must email type'),
    password: yup
      .string()
      .required('This field is required')
      .matches(PASSWORD_REG, 'Password must contain at least 8 character, includes special key, number')
  })

  const defaultValues: TDefaultValues = {
    email: '',
    password: ''
  }

  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  function onSubmit(data: { email: string; password: string }) {
    if (!Object.keys(errors).length) {
      login({ ...data, rememberMe: isRemember })
    }
  }

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        alignItems: 'center',
        padding: '40px'
      }}
    >
      <Box
        display={{
          sm: 'flex',
          xs: 'none'
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20px',
          backgroundColor: theme.palette.customColors.bodyBg,
          height: '100%',
          minWidth: '50vw'
        }}
      >
        <Image
          src={theme.palette.mode === 'light' ? loginLight : loginDark}
          alt='Login image'
          style={{
            width: 'auto',
            height: '80%'
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete='off'>
            <Box sx={{ mt: 2, width: '300px' }}>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    margin='normal'
                    required
                    fullWidth
                    label='Email'
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={Boolean(errors?.email)}
                    helperText={errors?.email?.message}
                    placeholder='Enter email'
                  />
                )}
                name='email'
              />
            </Box>
            <Box sx={{ mt: 2, width: '300px' }}>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    margin='normal'
                    required
                    fullWidth
                    label='Password'
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={Boolean(errors?.password)}
                    helperText={errors?.password?.message}
                    placeholder='Enter password'
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton edge='end' onClick={() => setShowPassword(on => !on)}>
                            {showPassword ? (
                              <CustomIcon icon='material-symbols:visibility-outline' />
                            ) : (
                              <CustomIcon icon='ic:outline-visibility-off' />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
                name='password'
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name='rememberMe'
                    checked={isRemember}
                    onChange={e => setIsRemember(e.target.checked)}
                    color='primary'
                  />
                }
                label='Remember me'
              />
              <Link href='#'>Forgot password?</Link>
            </Box>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '4px'
              }}
            >
              <Typography>Don't have an account?</Typography>
              <Link
                href='/register'
                style={{
                  color: theme.palette.primary.main
                }}
              >
                Sign Up
              </Link>
            </Box>
            <Typography sx={{ textAlign: 'center', mt: 2, mb: 2 }}>Or</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <IconButton sx={{ color: '#497ce2' }}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  role='img'
                  fontSize='1.375rem'
                  className='iconify iconify--mdi'
                  width='1em'
                  height='1em'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z'
                  ></path>
                </svg>
              </IconButton>
              <IconButton
                sx={{
                  color: theme.palette.error.main
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  role='img'
                  fontSize='1.375rem'
                  className='iconify iconify--mdi'
                  width='1em'
                  height='1em'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z'
                  ></path>
                </svg>
              </IconButton>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  )
}

export default RegisterPage
