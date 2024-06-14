import { isCI } from '@echo/utils/constants/is-ci'
import { isProd } from '@echo/utils/constants/is-prod'
import { isTest } from '@echo/utils/constants/is-test'

import type { LoggerSerializer } from '@echo/utils/types/logger-serializer'
import pino from 'pino'
import { always, assoc, equals, is, isNil, mergeAll, mergeLeft, pipe, unless } from 'ramda'

interface LoggerOptions {
  baseMergeObject?: Record<string, unknown>
  serializers?: LoggerSerializer | LoggerSerializer[]
  override?: {
    enabled?: boolean
    level?: string
  }
}

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

export function getBaseLogger(name: string, options?: LoggerOptions) {
  return pino({
    enabled: options?.override?.enabled ?? (!isCI && !isTest),
    level: options?.override?.level ?? isProd ? 'info' : 'trace',
    name,
    formatters: {
      level(label, _number) {
        return { level: label }
      }
    },
    mixin(mergeObject: object, _level: number) {
      return pipe(
        assoc('env', process.env.ENV),
        assoc('node_env', process.env.NODE_ENV),
        assoc('network', equals(process.env.NEXT_PUBLIC_IS_TESTNET, '1') ? 'testnet' : 'mainnet'),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        unless(always(isNil(options?.baseMergeObject)), mergeLeft(options?.baseMergeObject))
      )(mergeObject) as object
    },
    serializers: getSerializers(options?.serializers),
    base: undefined,
    timestamp: false
  })
}
