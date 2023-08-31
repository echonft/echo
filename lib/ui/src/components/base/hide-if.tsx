import { isNil } from 'ramda'
import { FunctionComponent, PropsWithChildren, ReactNode } from 'react'

export interface HideIfProps {
  condition: boolean
  render?: () => ReactNode
}

export const HideIf: FunctionComponent<PropsWithChildren<HideIfProps>> = ({ condition, render, children }) => {
  if (condition) {
    return null
  }
  if (!isNil(render)) {
    return <>{render()}</>
  }
  return <>{children}</>
}
