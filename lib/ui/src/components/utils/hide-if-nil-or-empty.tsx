import { HideIf } from './hide-if'
import { and, either, identity, is, isEmpty, isNil, reduce, useWith } from 'ramda'
import { FunctionComponent, PropsWithChildren, ReactNode } from 'react'

export interface HideIfNilOrEmptyProps {
  checks: unknown
  render?: () => ReactNode
}

export const HideIfNilOrEmpty: FunctionComponent<PropsWithChildren<HideIfNilOrEmptyProps>> = ({
  checks,
  render,
  children
}) => {
  if (is(Array, checks)) {
    return (
      <HideIf
        // eslint is confused here...
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line react-hooks/rules-of-hooks
        condition={reduce(useWith(and<boolean, boolean>, [identity, either(isNil, isEmpty)]), false, checks)}
        render={render}
      >
        {children}
      </HideIf>
    )
  }
  return (
    <HideIf condition={either(isNil, isEmpty)(checks)} render={render}>
      {children}
    </HideIf>
  )
}
