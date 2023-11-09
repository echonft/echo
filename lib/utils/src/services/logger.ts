import { isProd } from '@echo/utils/constants/is-prod'
import { isTest } from '@echo/utils/constants/is-test'
// eslint-disable-next-line import/no-named-as-default
import pino from 'pino'

export const logger = pino({
  level: isTest ? 'silent' : isProd ? 'info' : 'debug'
})
