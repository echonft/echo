'use client'
import { isMockEnvironment } from '../../helpers/is-mock-environment'
import { clsx } from 'clsx'
import Link from 'next/link'
import { FunctionComponent, MouseEventHandler, PropsWithChildren } from 'react'

interface Props {
  path: string
  disabled?: boolean
  className?: string
  onClick?: MouseEventHandler
}

export const InternalLink: FunctionComponent<PropsWithChildren<Props>> = ({
  path,
  disabled,
  className,
  onClick,
  children
}) => {
  return (
    <Link
      className={clsx(disabled && 'cursor-default', className)}
      href={path}
      onClick={(event) => {
        if (isMockEnvironment() || disabled) {
          event.preventDefault()
        }
        onClick?.(event)
      }}
    >
      {children}
    </Link>
  )
}
