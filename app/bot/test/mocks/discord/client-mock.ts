import { mockClientUser } from '@echo/bot-mocks/discord/user-mock'
import { Client, type ClientOptions, Options } from 'discord.js'

// Credit: https://github.com/AnswerOverflow/AnswerOverflow
// References: https://dev.to/heymarkkop/how-to-implement-test-and-mock-discordjs-v13-slash-commands-with-typescript-22lc
export async function setupBot(override: Partial<ClientOptions> = {}) {
  const client = mockClient(override)
  await client.login()
  return client
}

export function mockClient(
  override: Partial<ClientOptions> = {
    // Cache everything is used to simulate API responses, removes the limit
    makeCache: Options.cacheEverything()
  }
) {
  // TODO: This is so ugly please fix this
  const client = new Client({
    intents: [],
    ...override
  })
  applyClientMocks(client)
  client.channels.fetch = () => Promise.resolve(null)
  return client
}

/* Seperate this out into its own function to be reused with custom clients */
export function applyClientMocks(client: Client) {
  Client.prototype.login = async () => Promise.resolve('')
  mockClientUser(client)
}
