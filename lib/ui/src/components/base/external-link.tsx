import { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  href: string
}

export const ExternalLink: FunctionComponent<PropsWithChildren<Props>> = ({ href, children }) => {
  return (
    <a href={href} target={'_blank'} rel={'noopener noreferrer nofollow'}>
      {children}
    </a>
  )
}
