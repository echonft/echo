import { isCI } from '@echo/utils/constants/is-ci'
import { isProd } from '@echo/utils/constants/is-prod'
import { isTest } from '@echo/utils/constants/is-test'

import type { LoggerSerializer } from '@echo/utils/types/logger-serializer'
import pino from 'pino'
import { always, assoc, equals, is, isNil, mergeAll, mergeLeft, pipe, unless, when } from 'ramda'

interface LoggerOptions {
  baseMergeObject?: Record<string, unknown>
  includeNetwork?: boolean
  serializers?: LoggerSerializer | LoggerSerializer[]
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

// interface BaseLogObject extends Record<string, unknown> {
//   error?: unknown
// }

export const pinoLogger = pino({
  level: isCI || isTest ? 'silent' : isProd ? 'info' : 'trace'
})

export function getBaseLogger(name: string, options?: LoggerOptions) {
  return pino({
    enabled: !isCI && !isTest,
    level: isProd ? 'info' : 'trace',
    name,
    formatters: {
      level(label, _number) {
        return { level: label }
      }
      // log(obj) {
      //   return when<BaseLogObject, Omit<BaseLogObject, 'error'> & Record<'error', unknown>, Record<string, unknown>>(
      //     propIsNotNil('error'),
      //     (obj: BaseLogObject) => {
      //       return modify<'error', Error, string>(
      //         'error',
      //         prop('message')
      //       )(obj as Omit<BaseLogObject, 'error'> & Record<'error', Error>)
      //     }
      //   )(obj as BaseLogObject)
      // }
    },
    // hooks: {
    //   logMethod(inputArgs, method, _level) {
    //     if (
    //       pipe(
    //         allPass([
    //           pipe<[typeof inputArgs], number, boolean>(length, gte(__, 2)),
    //           pipe(nth(1), hasPath(['error', 'stack']))
    //         ])
    //       )(inputArgs)
    //     ) {
    //       method.apply(this, inputArgs)
    //       method.apply(this, [(inputArgs[1] as Record<'error', Record<'stack', string>>).error.stack])
    //       return
    //     }
    //     method.apply(this, inputArgs)
    //   }
    // },
    mixin(mergeObject: object, _level: number) {
      return pipe(
        assoc('env', process.env.ENV),
        assoc('node_env', process.env.NODE_ENV),
        when<object, object>(
          always<boolean>(Boolean(options?.includeNetwork)),
          assoc('network', equals(process.env.NEXT_PUBLIC_IS_TESTNET, '1') ? 'testnet' : 'mainnet')
        ),
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
