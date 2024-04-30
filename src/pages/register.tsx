// ** Next
import { NextPage } from 'next'

// ** React
import { ReactNode } from 'react'

// ** Page
import RegisterPage from 'src/views/pages/register'

// ** Layout
import BlankLayout from 'src/views/layout/BlankLayout'

type TProps = {}

const Register: NextPage<TProps> = () => {
  return <RegisterPage />
}

export default Register

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
