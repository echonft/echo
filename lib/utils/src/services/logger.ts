import { isCi } from '@echo/utils/constants/is-ci'
import { isProd } from '@echo/utils/constants/is-prod'
import { isTest } from '@echo/utils/constants/is-test'
import pino from 'pino'

export const logger = pino({
  level: isCi || isTest ? 'silent' : isProd ? 'info' : 'debug'
})
