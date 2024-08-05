/* eslint-disable no-var */
// noinspection JSUnusedGlobalSymbols,ES6ConvertVarToLetConst

import type { messages } from '@echo/bot/messages/en'
import type { Logger } from '@echo/utils/types/logger'
import type { Client } from 'discord.js'

declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom resources type
    resources: {
      translation: typeof messages
    }
  }
}

declare global {
  var client: Readonly<Client>
  var logger: Readonly<Logger>
  var keepAliveTimer: Readonly<ReturnType<typeof setInterval>>
}

export {}
