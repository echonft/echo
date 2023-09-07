import { isNil } from 'ramda'
import { FunctionComponent, PropsWithChildren, ReactNode } from 'react'

interface Props {
  condition: boolean
  render?: () => ReactNode
}

export const ShowIf: FunctionComponent<PropsWithChildren<Props>> = ({ condition, render, children }) => {
  if (condition) {
    if (!isNil(render)) {
      return <>{render()}</>
    }
    return <>{children}</>
  }
  return null
}
