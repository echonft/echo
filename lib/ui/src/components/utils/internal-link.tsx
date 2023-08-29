import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import { FunctionComponent, PropsWithChildren } from 'react'

export interface InternalLinkProps {
  link: Url
}

export const InternalLink: FunctionComponent<PropsWithChildren<InternalLinkProps>> = ({ link, children }) => {
  return (
    <Link
      href={link}
      onClick={
        link === '#'
          ? (event) => {
              event.preventDefault()
            }
          : undefined
      }
    >
      {children}
    </Link>
  )
}
