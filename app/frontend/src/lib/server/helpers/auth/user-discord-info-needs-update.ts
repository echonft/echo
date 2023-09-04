import { USER_DISCORD_INFO_VALIDITY_TIME } from '../../constants/user-discord-info-validity-time'
import dayjs from 'dayjs'

export function userDiscordInfoNeedsUpdate(updatedAt: dayjs.Dayjs) {
  return updatedAt.add(USER_DISCORD_INFO_VALIDITY_TIME, 'minute').isBefore(dayjs())
}
