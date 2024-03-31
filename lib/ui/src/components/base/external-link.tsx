import { clsx } from 'clsx'
import { type FunctionComponent, type MouseEventHandler, type PropsWithChildren } from 'react'

interface Props {
  href: string
  style?: {
    inline?: boolean
  }
  onClick?: MouseEventHandler
}

export const ExternalLink: FunctionComponent<PropsWithChildren<Props>> = ({ href, style, onClick, children }) => {
  return (
    <a
      className={clsx(style?.inline ? 'inline' : 'block')}
      href={href}
      target={'_blank'}
      rel={'noopener noreferrer nofollow'}
      onClick={onClick}
    >
      {children}
    </a>
  )
}
