import { FunctionComponent, PropsWithChildren } from 'react'

export interface ExternalLinkProps {
  href: string
}

export const ExternalLink: FunctionComponent<PropsWithChildren<ExternalLinkProps>> = ({ href, children }) => {
  return (
    <a href={href} target={'_blank'} rel={'noopener noreferrer nofollow'}>
      {children}
    </a>
  )
}
