import { AppEnvironment, config } from '@lib/config/config'
import { pino } from 'pino'
import { isNil } from 'ramda'
import React, { createContext, PropsWithChildren, useContext } from 'react'

abstract class LoggerWrapper {
  protected _instance: pino.BaseLogger | undefined
  abstract getInstance(): pino.BaseLogger
}

export class PinoWrapper extends LoggerWrapper {
  public getInstance(): pino.BaseLogger {
    if (isNil(this._instance)) {
      this._instance = pino({
        level: config().appEnvironment !== AppEnvironment.PROD ? 'debug' : 'info'
      })
    }
    return this._instance
  }
}

const loggerContext = createContext<LoggerWrapper | undefined>(undefined)

interface Props {
  value: LoggerWrapper
}

export const LoggerProvider: React.FunctionComponent<PropsWithChildren<Props>> = ({ value, children }) => {
  return <loggerContext.Provider value={value}>{children}</loggerContext.Provider>
}

export const useLogger = (): pino.BaseLogger => {
  const loggerWrapper = useContext(loggerContext)
  if (!loggerWrapper) {
    throw new Error('useLogger must be used within LoggerProvider.')
  }
  return loggerWrapper.getInstance()
}
