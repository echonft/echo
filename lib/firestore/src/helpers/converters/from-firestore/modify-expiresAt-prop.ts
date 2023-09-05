import { dateIsPast } from './date-is-past'
import { modifyNumberPropToDate, propIsNotNil } from '@echo/utils'
import { Dayjs } from 'dayjs'
import { assoc, ifElse, isNil, lens, over, pipe, prop, when } from 'ramda'

/**
 * Converts the expiresAt prop to date and set the right expired prop
 * @param documentData
 */
export const modifyExpiresAtProp = <
  T extends Record<'expiresAt', number>,
  U extends Record<'expiresAt', Dayjs> & Record<'expired', boolean>
>(
  documentData: T
): U =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  pipe(
    modifyNumberPropToDate<'expiresAt', T>('expiresAt'),
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
