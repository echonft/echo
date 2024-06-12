import type { SerializerFn } from 'pino'

export type LoggerSerializer = Record<string, SerializerFn>
