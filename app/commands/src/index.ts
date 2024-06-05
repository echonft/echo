import { addCollectionGuildCommand } from '@echo/commands/commands/add-collection-guild-command'
import { checkNftApprovalCommand } from '@echo/commands/commands/check-nft-approval-command'
import { clearDbCommand } from '@echo/commands/commands/clear-db-command'
import { fetchCollectionFromNftscanCommand } from '@echo/commands/commands/fetch-collection-from-nftscan-command'
import { fetchCollectionFromOpenseaCommand } from '@echo/commands/commands/fetch-collection-from-opensea-command'
import { fetchNftFromNftscanCommand } from '@echo/commands/commands/fetch-nft-from-nftscan-command'
import { fetchNftsFromNftscanCommand } from '@echo/commands/commands/fetch-nfts-from-nftscan-command'
import { fetchNftsFromOpenseaCommand } from '@echo/commands/commands/fetch-nfts-from-opensea-command'
import { fetchNftsWithCollectionFromNftscanCommand } from '@echo/commands/commands/fetch-nfts-with-collection-from-nftscan-command'
import { fetchNftsWithPagingFromNftscanCommand } from '@echo/commands/commands/fetch-nfts-with-paging-from-nftscan-command'
import { listCollectionsContractCommand } from '@echo/commands/commands/list-collections-contract-command'
import { updateCollectionCommand } from '@echo/commands/commands/update-collection-command'
import { updateNftCommand } from '@echo/commands/commands/update-nft-command'
import { find, isNil, map, prop, propEq } from 'ramda'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

void (async function () {
  const commands = [
    addCollectionGuildCommand,
    checkNftApprovalCommand,
    clearDbCommand,
    fetchCollectionFromNftscanCommand,
    fetchCollectionFromOpenseaCommand,
    fetchNftFromNftscanCommand,
    fetchNftsFromNftscanCommand,
    fetchNftsFromOpenseaCommand,
    fetchNftsWithCollectionFromNftscanCommand,
    fetchNftsWithPagingFromNftscanCommand,
    listCollectionsContractCommand,
    updateCollectionCommand,
    updateNftCommand
  ]
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
    console.error(`command ${c} does not exist`)
    return
  }
  await command.execute()
  process.exit()
})()
