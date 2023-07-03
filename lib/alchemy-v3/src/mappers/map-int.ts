import { isNil } from 'ramda'

export const mapInt = (value: string | undefined): number | undefined =>
  isNil(value) ? undefined : Number.parseInt(value)
