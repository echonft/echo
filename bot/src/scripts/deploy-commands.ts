import { echoCommand } from '../commands/echo'
import { discordSecret } from '@echo/discord/admin/config'
import { discordConfig } from '@echo/discord/config/config'
import { logger } from '@echo/utils/logger'
import { REST, Routes } from 'discord.js'
import { isEmpty, isNil } from 'rambda'

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(discordSecret.clientToken)

// and deploy your commands!
void (async () => {
  // The put method is used to fully refresh all commands in the guild with the current set
  const { clientId, guildId } = discordConfig

  if (isNil(guildId) || isEmpty(guildId)) {
    logger.fatal('guild id is required')
    return
  }

  try {
    const data = (await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      // TODO Add all the commands here
      body: [echoCommand.data.toJSON()]
    })) as unknown[]
    logger.info(`Successfully reloaded ${data.length} application (/) commands.`)
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    logger.error(error)
  }
})()
