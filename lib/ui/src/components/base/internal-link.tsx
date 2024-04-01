'use client'
import { clsx } from 'clsx'
import Link from 'next/link'
import { type FunctionComponent, type MouseEventHandler, type PropsWithChildren } from 'react'

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
      className={clsx('block', 'outline-none', disabled && 'cursor-default', className)}
      href={path}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
