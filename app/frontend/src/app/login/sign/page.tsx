import { LoginSignStep } from '@echo/ui/components/base/auth/login-sign-step'

interface Props {
  searchParams?: {
    code?: string
  }
}

export default function render({ searchParams }: Props) {
  return <LoginSignStep code={searchParams?.code} />
}
