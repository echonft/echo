import { HideIf } from './hide-if'
import { isNilOrEmpty } from '@echo/utils'
import { FunctionComponent, PropsWithChildren, ReactNode } from 'react'

interface Props {
  checks: unknown
  render?: () => ReactNode
}

export const HideIfNilOrEmpty: FunctionComponent<PropsWithChildren<Props>> = ({ checks, render, children }) => (
  <HideIf condition={isNilOrEmpty(checks)} render={render}>
    {children}
  </HideIf>
)
