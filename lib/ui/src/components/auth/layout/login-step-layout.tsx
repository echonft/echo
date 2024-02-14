import { LoginContinueButton } from '@echo/ui/components/auth/login-continue-button'
import { LoginSubtitle } from '@echo/ui/components/auth/login-subtitle'
import { LoginTitle } from '@echo/ui/components/auth/login-title'
import { classes } from '@echo/ui/helpers/classes'
import type { FunctionComponent, MouseEventHandler, PropsWithChildren } from 'react'

interface Props {
  title: string
  subtitle: string
  btnLabel: string
  btnDisabled?: boolean
  onBtnClick?: MouseEventHandler
}

export const LoginStepLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  title,
  subtitle,
  btnLabel,
  btnDisabled,
  onBtnClick,
  children
}) => {
  return (
    <div className={classes('flex', 'flex-col', 'gap-12', 'items-center')}>
      <LoginTitle>{title}</LoginTitle>
      <div className={classes('flex', 'flex-col', 'gap-12', 'items-center')}>
        <LoginSubtitle>{subtitle}</LoginSubtitle>
        {children}
      </div>
      <div className={classes('flex', 'justify-end', 'w-full')}>
        <LoginContinueButton disabled={btnDisabled} onClick={onBtnClick} label={btnLabel} />
      </div>
    </div>
  )
}
