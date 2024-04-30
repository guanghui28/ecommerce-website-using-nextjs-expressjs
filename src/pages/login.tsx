// ** Next
import { NextPage } from 'next'

// ** React
import { ReactNode } from 'react'

// ** Page
import LoginPage from 'src/views/pages/login'

// ** Layout
import BlankLayout from 'src/views/layout/BlankLayout'

type TProps = {}

const Login: NextPage<TProps> = () => {
  return <LoginPage />
}

export default Login

Login.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
