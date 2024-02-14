import { classes } from '@echo/ui/helpers/classes'
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
      className={classes(style?.inline ? 'inline' : 'block')}
      href={href}
      target={'_blank'}
      rel={'noopener noreferrer nofollow'}
      onClick={onClick}
    >
      {children}
    </a>
  )
}
