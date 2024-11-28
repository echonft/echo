import { LoginTitle } from '@echo/ui/components/base/auth/login-title'
import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  title: string
}

export const LoginStepLayout: FunctionComponent<PropsWithChildren<Props>> = ({ title, children }) => {
  return (
    <div className={clsx('flex', 'flex-col', 'gap-12', 'items-center', 'h-max')}>
      <LoginTitle>{title}</LoginTitle>
      <div className={clsx('flex', 'flex-col', 'gap-12', 'items-center', 'w-full', 'h-max')}>{children}</div>
    </div>
  )
}
