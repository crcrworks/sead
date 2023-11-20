import { ReactNode } from 'react'
import AuthProvider from './auth-provider'

const Providers = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>
}

export default Providers
