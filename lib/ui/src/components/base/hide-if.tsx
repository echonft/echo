import { isNil } from 'ramda'
import { FunctionComponent, PropsWithChildren, ReactNode } from 'react'

interface Props {
  condition: boolean
  render?: () => ReactNode
}

export const HideIf: FunctionComponent<PropsWithChildren<Props>> = ({ condition, render, children }) => {
  if (condition) {
    return null
  }
  if (!isNil(render)) {
    return <>{render()}</>
  }
  return <>{children}</>
}
