import { clsx } from 'clsx'
import { type FunctionComponent, type MouseEventHandler, type PropsWithChildren } from 'react'

interface Props {
  href: string
  options?: {
    inline?: boolean
  }
  onClick?: MouseEventHandler
}

export const ExternalLink: FunctionComponent<PropsWithChildren<Props>> = ({ href, options, onClick, children }) => {
  return (
    <a
      className={clsx(options?.inline ? 'inline' : 'block')}
      href={href}
      target={'_blank'}
      rel={'noopener noreferrer nofollow'}
      onClick={onClick}
    >
      {children}
    </a>
  )
}
