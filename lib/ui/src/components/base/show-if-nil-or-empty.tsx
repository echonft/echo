import { ShowIf } from './show-if'
import { isNilOrEmpty } from '@echo/utils'
import { FunctionComponent, PropsWithChildren, ReactNode } from 'react'

export interface ShowIfNilOrEmptyProps {
  checks: unknown
  render?: () => ReactNode
}

export const ShowIfNilOrEmpty: FunctionComponent<PropsWithChildren<ShowIfNilOrEmptyProps>> = ({
  checks,
  render,
  children
}) => (
  <ShowIf condition={isNilOrEmpty(checks)} render={render}>
    {children}
  </ShowIf>
)
