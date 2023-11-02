import { dateNumberIsPast } from '@echo/utils/helpers/date-number-is-past'
import { assoc, lens, over, prop } from 'ramda'

/**
 * Converts the expiresAt prop to date and set the right expired prop
 * @param documentData
 */
export function assocExpiredProp<T extends Record<'expiresAt', number>>(
  documentData: T
): T & Record<'expired', boolean> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return over(lens(prop('expiresAt'), assoc('expired')), dateNumberIsPast)(documentData)
}
