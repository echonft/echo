import { isMockEnvironment } from '../../helpers/is-mock-environment'
import { clsx } from 'clsx'
import Link from 'next/link'
import { FunctionComponent, PropsWithChildren } from 'react'

export interface InternalLinkProps {
  path: string
  disabled?: boolean
  className?: string
}

export const InternalLink: FunctionComponent<PropsWithChildren<InternalLinkProps>> = ({
  path,
  disabled,
  className,
  children
}) => {
  return (
    <Link
      className={clsx(disabled && 'cursor-default', className)}
      href={path}
      onClick={
        isMockEnvironment() || disabled
          ? (event) => {
              event.preventDefault()
            }
          : undefined
      }
    >
      {children}
    </Link>
  )
}
