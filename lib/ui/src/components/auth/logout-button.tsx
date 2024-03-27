import { LogoutIconSvg } from '@echo/ui/components/base/svg/logout-icon-svg'
import { clsx } from 'clsx'
import type { FunctionComponent, MouseEventHandler } from 'react'

interface Props {
  loading?: boolean
  onClick?: MouseEventHandler
}

export const LogoutButton: FunctionComponent<Props> = ({ loading, onClick }) => {
  return (
    <button className={clsx('btn-auth-alt', loading && 'animate-pulse')} onClick={onClick} disabled={loading}>
      <LogoutIconSvg />
    </button>
  )
}
