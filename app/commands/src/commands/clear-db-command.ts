import type { Command } from '@echo/commands/types/command'
import { clearDb } from '@echo/firestore/utils/clear-db'

export const clearDbCommand: Command = {
  name: 'clear-db',
  execute: async function () {
    await clearDb()
  }
}
