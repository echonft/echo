import { ShowIf } from './show-if'
import isNilOrEmpty from '@echo/utils/is-nil-or-empty'
import { FunctionComponent, PropsWithChildren, ReactNode } from 'react'

interface Props {
  checks: unknown
  render?: () => ReactNode
}

export const ShowIfNilOrEmpty: FunctionComponent<PropsWithChildren<Props>> = ({ checks, render, children }) => (
  <ShowIf condition={isNilOrEmpty(checks)} render={render}>
    {children}
  </ShowIf>
)
