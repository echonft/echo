import { HideIf } from './hide-if'
import { either, isEmpty, isNil } from 'ramda'
import { FunctionComponent, PropsWithChildren, ReactNode } from 'react'

export interface HideIfNilOrEmptyProps {
  checks: unknown
  render?: () => ReactNode
}

export const HideIfNilOrEmpty: FunctionComponent<PropsWithChildren<HideIfNilOrEmptyProps>> = ({
  checks,
  render,
  children
}) => (
  <HideIf condition={either(isNil, isEmpty)(checks)} render={render}>
    {children}
  </HideIf>
)
