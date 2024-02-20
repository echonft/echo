type LogFn = (msg: string, ...args: unknown[]) => void
export interface LoggerInterface {
  debug: LogFn
  info: LogFn
  warn: LogFn
  error: LogFn
}
