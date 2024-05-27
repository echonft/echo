import { apiUrlProvider } from '@echo/api/routing/api-url-provider'
import { createAlchemyWebhook } from '@echo/commands/tasks/create-alchemy-webhook'
import { deleteAlchemyWebhook } from '@echo/commands/tasks/delete-alchemy-webhook'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { CHAIN_ETHEREUM, CHAIN_NAMES } from '@echo/utils/constants/chain-names'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { ChainName } from '@echo/utils/types/chain-name'
import { echoAddressByChain } from '@echo/web3/constants/echo-address'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

/**
 * Arguments:
 *  -c    chain name (defaults to 'ethereum')
 *  -d?   will delete the previous hook with id defined in
 *        env var ALCHEMY_WEBHOOK_SWAPS is set to true
 *  -u?   will override the default webhook URL with the provided one
 */
void (async function () {
  const { c, d, u } = await yargs(hideBin(process.argv))
    .options({
      c: {
        alias: 'chain',
        describe: 'chain name',
        type: 'string',
        choices: CHAIN_NAMES,
        default: CHAIN_ETHEREUM,
        coerce: (arg) => arg as ChainName
      },
      d: {
        alias: 'deletePrevious',
        describe: 'delete previous',
        type: 'boolean'
      },
      u: {
        alias: 'url',
        describe: 'override the default webhook URL',
        type: 'string'
      }
    })
    .parse()
  const address = echoAddressByChain(c)
  await createAlchemyWebhook({
    query: `{ block { logs(filter: {addresses: ${JSON.stringify([
      address
    ])}, topics: ["0x716fc2beb340c020954671f86fb23241fc9850cf6ab02f6d5d700386e34c2000"]}) { data transaction { hash } } }}`,
    path: apiUrlProvider.webhooks.swap.get(),
    url: u
  })
  if (d) {
    const webhookId = process.env.ALCHEMY_WEBHOOK_SWAPS
    if (isNilOrEmpty(webhookId)) {
      console.error('Cannot delete previous hooks because env var ALCHEMY_WEBHOOK_SWAPS is not set')
    } else {
      await deleteAlchemyWebhook(webhookId)
    }
  }
  await terminateFirestore()
  process.exit()
})()
