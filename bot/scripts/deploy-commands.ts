import { echoCommand } from '@echo/bot/commands/echo'
import { discordSecret } from '@echo/discord/admin/config'
import { discordConfig } from '@echo/discord/config/config'
import { REST, Routes } from 'discord.js'
import { isEmpty, isNil } from 'ramda'

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(discordSecret().clientToken)

// and deploy your commands!
;(async () => {
  try {
    // The put method is used to fully refresh all commands in the guild with the current set
    const { clientId, guildId } = discordConfig()

    if (isNil(guildId) || isEmpty(guildId)) {
      throw Error('guild id is required')
    }

    const data: any = await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      // TODO Add all the commands here
      body: [echoCommand.data.toJSON()]
    })

    console.log(`Successfully reloaded ${data.length} application (/) commands.`)
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error)
  }
})()
