import type { WithClassNameProps } from '@echo/ui/types/props/with-class-name-props'
import { clsx } from 'clsx'
import { type FunctionComponent, type MouseEventHandler, type PropsWithChildren } from 'react'

interface Props extends WithClassNameProps {
  href: string
  options?: {
    inline?: boolean
  }
  onClick?: MouseEventHandler
}

export const ExternalLink: FunctionComponent<PropsWithChildren<Props>> = ({
  href,
  options,
  className,
  onClick,
  children
}) => {
  return (
    <a
      className={clsx(options?.inline ? 'inline' : 'block', className)}
      href={href}
      target={'_blank'}
      rel={'noopener noreferrer nofollow'}
      onClick={onClick}
    >
      {children}
    </a>
  )
}
