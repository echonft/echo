import { always, either, equals, ifElse, is, isNil, pipe } from 'ramda'

export const isCi: boolean = pipe(
  ifElse(isNil, always(false), ifElse(is(Number), equals(1), either(equals('1'), equals('true'))))
)(process.env.CI)
