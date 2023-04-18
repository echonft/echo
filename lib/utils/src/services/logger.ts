import { isProd } from '../constants/is-prod'
// eslint-disable-next-line import/no-named-as-default
import pino from 'pino'

export const logger = pino({
  level: isProd ? 'info' : 'debug'
})
