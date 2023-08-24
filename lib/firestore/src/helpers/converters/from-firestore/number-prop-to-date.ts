import dayjs from 'dayjs'
import { isNil, pipe, prop, unless } from 'ramda'

export const numberPropToDate = <K extends string>(propKey: K) => pipe(prop(propKey), unless(isNil, dayjs.unix))
