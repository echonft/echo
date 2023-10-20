import { propIsNotNil } from '@echo/utils/fp/prop-is-not-nil'
import { dateNumberIsPast } from '@echo/utils/helpers/date-number-is-past'
import { assoc, ifElse, isNil, lens, over, pipe, prop, when } from 'ramda'

/**
 * Converts the expiresAt prop to date and set the right expired prop
 * @param documentData
 */
export function assocExpiredProp<T>(documentData: T): T & Record<'expired', boolean> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
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
          dateNumberIsPast
        )
      )
    )
  )(documentData)
}
