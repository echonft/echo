import { Environment, environment } from '@echo/utils/constants/environment'
import { isCI } from '@echo/utils/constants/is-ci'
import { logLevel } from '@echo/utils/constants/log-level'
import { NodeEnvironment, nodeEnvironment } from '@echo/utils/constants/node-environment'
import type { LoggerOptions } from '@echo/utils/types/logger'
import type { LoggerSerializer } from '@echo/utils/types/logger-serializer'
import pino, { type DestinationStream, type LevelWithSilentOrString } from 'pino'
import { assoc, is, isNil, mergeAll, mergeLeft, pipe } from 'ramda'

export type { Logger } from 'pino'

function getSerializers(serializers?: LoggerSerializer | LoggerSerializer[]): LoggerSerializer {
  const baseSerializer: LoggerSerializer = {
    err: pino.stdSerializers.err
  }
  if (isNil(serializers)) {
    return baseSerializer
  }
  if (is(Array, serializers)) {
    return mergeAll<LoggerSerializer>([...serializers, baseSerializer])
  }
  return mergeLeft(baseSerializer, serializers)
}

function getLogLevel(): LevelWithSilentOrString {
  const level = logLevel()
  if (isNil(level)) {
    if (nodeEnvironment() === NodeEnvironment.Production) {
      return 'info'
    }
    if (nodeEnvironment() === NodeEnvironment.Test) {
      return 'silent'
    }
    return 'trace'
  }
  return level
}
export function getBaseLogger(name: string, options?: LoggerOptions, stream?: DestinationStream) {
  return pino(
    {
      enabled: !isCI() && environment() !== Environment.Test,
      level: getLogLevel(),
      name,
      formatters: {
        level(label, _number) {
          return { level: label }
        }
      },
      mixin(mergeObject: object, _level: number) {
        const baseMergeObject = pipe<[object], object, object>(
          assoc('env', process.env.ENV),
          assoc('node_env', process.env.NODE_ENV)
        )(mergeObject)
        if (!isNil(options) && !isNil(options.baseMergeObject)) {
          return mergeLeft(options.baseMergeObject, baseMergeObject)
        }
        return baseMergeObject
      },
      serializers: getSerializers(options?.serializers),
      base: undefined,
      timestamp: false
    },
    stream
  )
}
