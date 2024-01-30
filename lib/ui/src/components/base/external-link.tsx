import clsx from 'clsx'
import { type FunctionComponent, type MouseEventHandler, type PropsWithChildren } from 'react'

interface Props {
  href: string
  onClick?: MouseEventHandler
}

export const ExternalLink: FunctionComponent<PropsWithChildren<Props>> = ({ href, onClick, children }) => {
  return (
    <a className={clsx('block')} href={href} target={'_blank'} rel={'noopener noreferrer nofollow'} onClick={onClick}>
      {children}
    </a>
  )
}
