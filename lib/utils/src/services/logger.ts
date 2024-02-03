import pino from 'pino'

export const logger = pino({
  // level: isCi || isTest ? 'silent' : isProd ? 'info' : 'trace'
  level: 'trace'
})
