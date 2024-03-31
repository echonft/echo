import { deleteAlchemyWebhook } from '@echo/commands/tasks/delete-alchemy-webhook'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

/**
 * Arguments:
 *  -i    hook id
 */
void (async function () {
  const { i } = await yargs(hideBin(process.argv))
    .options({
      i: {
        alias: 'id',
        describe: 'webhook id',
        type: 'string'
      }
    })
    .demandOption('i', 'hook id is required')
    .parse()
  await deleteAlchemyWebhook(i)
  process.exit()
})()
