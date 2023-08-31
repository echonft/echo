import { HideIf } from './hide-if'
import { isNil } from 'ramda'
import { FunctionComponent, PropsWithChildren, ReactNode } from 'react'

export interface HideIfNilProps {
  checks: unknown
  render?: () => ReactNode
}

export const HideIfNil: FunctionComponent<PropsWithChildren<HideIfNilProps>> = ({ checks, render, children }) => {
  return (
    <HideIf condition={isNil(checks)} render={render}>
      {children}
    </HideIf>
  )
}
