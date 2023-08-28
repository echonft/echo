import { HideIf } from './hide-if'
import { isNilOrEmpty } from '@echo/utils'
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
  <HideIf condition={isNilOrEmpty(checks)} render={render}>
    {children}
  </HideIf>
)
