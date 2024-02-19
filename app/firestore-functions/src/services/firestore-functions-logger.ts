import { debug, error, info, warn } from 'firebase-functions/logger'

export class FirestoreFunctionsLogger {
  public debug(msg: string, ...args: unknown[]): void {
    debug(msg, args)
  }
  public info(msg: string, ...args: unknown[]): void {
    info(msg, args)
  }
  public warn(msg: string, ...args: unknown[]): void {
    warn(msg, args)
  }
  public error(msg: string, ...args: unknown[]): void {
    error(msg, args)
  }
}
