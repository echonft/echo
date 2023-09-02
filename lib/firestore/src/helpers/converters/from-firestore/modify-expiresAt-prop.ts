import { modifyNumberPropToDate, propIsNotNil } from '@echo/utils'
import { Dayjs } from 'dayjs'
import { assoc, ifElse, isNil, lens, over, pipe, prop, when } from 'ramda'
import { dateIsPast } from './date-is-past'

/**
 * Converts the expiresAt prop to date and set the right expired prop
 * @param documentData
 */
export const modifyExpiresAtProp = <T, U extends Record<'expiresAt', Dayjs> & Record<'expired', boolean>>(
  documentData: T
): U =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  pipe(
    modifyNumberPropToDate('expiresAt'),
    when(
      propIsNotNil('expiresAt'),
      over(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        lens(prop('expiresAt'), assoc('expired')),
        ifElse(
          isNil,
          () => {
            throw Error(`prop expiresAt is undefined`)
          },
          dateIsPast
        )
      )
    )
  )(documentData)
