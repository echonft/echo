import { ShowIf } from './show-if'
import { isNil } from 'ramda'
import { FunctionComponent, PropsWithChildren, ReactNode } from 'react'

export interface ShowIfNilProp {
  checks: unknown
  render?: () => ReactNode
}

export const ShowIfNil: FunctionComponent<PropsWithChildren<ShowIfNilProp>> = ({ checks, render, children }) => {
  return (
    <ShowIf condition={isNil(checks)} render={render}>
      {children}
    </ShowIf>
  )
}
