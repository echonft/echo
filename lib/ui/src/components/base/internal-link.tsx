'use client'
import { classes } from '@echo/ui/helpers/classes'
import { isStorybook } from '@echo/utils/constants/is-storybook'
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
      className={classes('block', 'outline-none', disabled && 'cursor-default', className)}
      href={path}
      onClick={(event) => {
        if (isStorybook || disabled) {
          event.preventDefault()
        }
        onClick?.(event)
      }}
    >
      {children}
    </Link>
  )
}
