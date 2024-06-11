import { isCI } from '@echo/utils/constants/is-ci'
import { isProd } from '@echo/utils/constants/is-prod'
import { isTest } from '@echo/utils/constants/is-test'
import pino from 'pino'
import { applySpec, has, path, pick, prop } from 'ramda'

export const pinoLogger = pino({
  level: isCI || isTest ? 'silent' : isProd ? 'info' : 'trace'
})

export function getBaseLogger(name: string) {
  return pino({
    level: isCI || isTest ? 'silent' : isProd ? 'info' : 'trace',
    name,
    formatters: {
      level(label, _number) {
        return { level: label }
      }
    },
    mixin(mergeObject) {
      if (has('error', mergeObject)) {
        return applySpec({
          msg: prop('msg'),
          error: path(['error', 'message'])
          // stack: path(['error', 'stack'])
        })(mergeObject)
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return pick(['msg'], mergeObject)
    },
    base: undefined,
    timestamp: false
  })
}
