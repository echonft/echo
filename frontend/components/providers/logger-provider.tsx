import { AppEnvironment, config } from '@echo/frontend/lib/config/config'
import pino from 'pino'
import { isNil } from 'ramda'
import React, { PropsWithChildren } from 'react'

abstract class LoggerWrapper {
  protected _instance: any
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

const loggerContext = React.createContext<LoggerWrapper | undefined>(undefined)

interface Props {
  value: LoggerWrapper
}

export const LoggerProvider: React.FunctionComponent<PropsWithChildren<Props>> = ({ value, children }) => {
  return <loggerContext.Provider value={value}>{children}</loggerContext.Provider>
}

export const useLogger = (): pino.BaseLogger => {
  const loggerWrapper = React.useContext(loggerContext)
  if (!loggerWrapper) {
    throw new Error('useLogger must be used within LoggerProvider.')
  }
  return loggerWrapper.getInstance()
}
