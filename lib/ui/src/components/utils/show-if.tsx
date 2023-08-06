import { isNil } from 'ramda'
import { FunctionComponent, PropsWithChildren, ReactNode } from 'react'

export interface ShowIfProps {
  condition: boolean
  render?: () => ReactNode
}

export const ShowIf: FunctionComponent<PropsWithChildren<ShowIfProps>> = ({ condition, render, children }) => {
  if (condition) {
    if (!isNil(render)) {
      return <>{render()}</>
    }
    return <>{children}</>
  }
  return null
}
