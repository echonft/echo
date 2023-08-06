import { HideIf } from './hide-if'
import { and, identity, is, isNil, reduce, useWith } from 'ramda'
import { FunctionComponent, PropsWithChildren, ReactNode } from 'react'

export interface HideIfNilProps {
  checks: unknown
  render?: () => ReactNode
}

export const HideIfNil: FunctionComponent<PropsWithChildren<HideIfNilProps>> = ({ checks, render, children }) => {
  if (is(Array, checks)) {
    return (
      // eslint is confused here...
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line react-hooks/rules-of-hooks
      <HideIf condition={reduce(useWith(and<boolean, boolean>, [identity, isNil]), false, checks)} render={render}>
        {children}
      </HideIf>
    )
  }
  return (
    <HideIf condition={isNil(checks)} render={render}>
      {children}
    </HideIf>
  )
}
