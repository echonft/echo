import { ConditionalRender } from './conditional-render'
import { and, either, identity, is, isEmpty, isNil, reduce, useWith } from 'ramda'
import { FunctionComponent, PropsWithChildren } from 'react'

export interface HideIfNilOrEmptyProps {
  checks: unknown
}

export const HideIfNilOrEmpty: FunctionComponent<PropsWithChildren<HideIfNilOrEmptyProps>> = ({ checks, children }) => {
  if (is(Array, checks)) {
    return (
      <ConditionalRender
        // eslint is confused here...
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line react-hooks/rules-of-hooks
        hideIf={reduce(useWith(and<boolean, boolean>, [identity, either(isNil, isEmpty)]), false, checks)}
      >
        {children}
      </ConditionalRender>
    )
  }
  return <ConditionalRender hideIf={either(isNil, isEmpty)(checks)}>{children}</ConditionalRender>
}
