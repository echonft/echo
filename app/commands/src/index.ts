import { addCollectionGuildCommand } from '@echo/commands/commands/add-collection-guild-command'
import { clearDbCommand } from '@echo/commands/commands/clear-db-command'
import { fetchCollectionCommand } from '@echo/commands/commands/fetch-collection-command'
import { fetchNft } from '@echo/commands/commands/fetch-nft'
import { fetchNftsCommand } from '@echo/commands/commands/fetch-nfts-command'
import { updateCollectionCommand } from '@echo/commands/commands/update-collection-command'
import { updateNftCommand } from '@echo/commands/commands/update-nft-command'
import { updateUserNftsCommand } from '@echo/commands/commands/update-user-nfts-command'
import { updateUsersNftsCommand } from '@echo/commands/commands/update-users-nfts-command'
import { updateWalletNftsCommand } from '@echo/commands/commands/update-wallet-nfts-command'
import { getLogger } from '@echo/commands/helpers/get-logger'
import { find, isNil, map, prop, propEq } from 'ramda'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

void (async function () {
  const commands = [
    addCollectionGuildCommand,
    clearDbCommand,
    fetchCollectionCommand,
    fetchNft,
    fetchNftsCommand,
    updateCollectionCommand,
    updateUserNftsCommand,
    updateUsersNftsCommand,
    updateNftCommand,
    updateWalletNftsCommand
  ]
  const logger = getLogger()
  const { c } = await yargs(hideBin(process.argv))
    .options({
      c: {
        alias: 'command',
        describe: 'command to run',
        type: 'string',
        choices: map(prop('name'), commands)
      }
    })
    .demandOption('c', 'command is required')
    .parse()
  const command = find(propEq(c, 'name'), commands)
  if (isNil(command)) {
    logger.error(`command ${c} does not exist`)
    return
  }
  await command.execute()
  process.exit(0)
})()
