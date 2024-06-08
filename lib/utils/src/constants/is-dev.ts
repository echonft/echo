import { either, equals, isNil } from 'ramda'

export const isDev: boolean = either(
  isNil<string | undefined>,
  equals<string | undefined>('development')
)(process.env.NODE_ENV)
