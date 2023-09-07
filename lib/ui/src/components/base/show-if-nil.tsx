import { ShowIf } from './show-if'
import { isNil } from 'ramda'
import { FunctionComponent, PropsWithChildren, ReactNode } from 'react'

interface Props {
  checks: unknown
  render?: () => ReactNode
}

export const ShowIfNil: FunctionComponent<PropsWithChildren<Props>> = ({ checks, render, children }) => {
  return (
    <ShowIf condition={isNil(checks)} render={render}>
      {children}
    </ShowIf>
  )
}
