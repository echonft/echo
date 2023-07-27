import { ConditionalRender } from './conditional-render'
import { and, identity, is, isNil, reduce, useWith } from 'ramda'
import { FunctionComponent, PropsWithChildren } from 'react'

export interface HideIfNilProps {
  checks: unknown
}

export const HideIfNil: FunctionComponent<PropsWithChildren<HideIfNilProps>> = ({ checks, children }) => {
  if (is(Array, checks)) {
    return (
      // eslint is confused here...
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line react-hooks/rules-of-hooks
      <ConditionalRender hideIf={reduce(useWith(and<boolean, boolean>, [identity, isNil]), false, checks)}>
        {children}
      </ConditionalRender>
    )
  }
  return <ConditionalRender hideIf={isNil(checks)}>{children}</ConditionalRender>
}
