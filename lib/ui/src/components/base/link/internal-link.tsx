'use client'
import { isStorybook } from '@echo/ui/helpers/is-storybook'
import { clsx } from 'clsx'
import Link from 'next/link'
import type { FunctionComponent, MouseEventHandler, PropsWithChildren } from 'react'

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
        if (isStorybook() || disabled) {
          event.preventDefault()
        }
        onClick?.(event)
      }}
    >
      {children}
    </Link>
  )
}
