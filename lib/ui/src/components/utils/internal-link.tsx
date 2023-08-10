import { useLink } from '../../dependencies/hooks/use-link'
import { RouteParams, Routes } from '../../types/provider/link-provider'
import Link from 'next/link'
import { FunctionComponent, PropsWithChildren } from 'react'

export interface InternalLinkProps {
  route: Routes
  params?: RouteParams
}

export const InternalLink: FunctionComponent<PropsWithChildren<InternalLinkProps>> = ({ route, params, children }) => {
  const link = useLink(route, params)
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
