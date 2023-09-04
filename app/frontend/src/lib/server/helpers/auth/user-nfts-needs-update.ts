import { USER_NFTS_VALIDITY_TIME } from '../../constants/user-nfts-validity-time'
import dayjs from 'dayjs'

export function userNftsNeedsUpdate(nftsUpdatedAt: dayjs.Dayjs) {
  return nftsUpdatedAt.add(USER_NFTS_VALIDITY_TIME, 'minute').isBefore(dayjs())
}
