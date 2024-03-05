import { apiUrlProvider } from '@echo/api/routing/api-url-provider'
import { createAlchemyWebhook } from '@echo/commands/tasks/create-alchemy-webhook'
import { deleteAlchemyWebhook } from '@echo/commands/tasks/delete-alchemy-webhook'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { ECHO_ADDRESS } from '@echo/web3/constants/echo-address'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

/**
 * Arguments:
 *  -d?   will delete the previous hook with id defined in
 *        env var ALCHEMY_WEBHOOK_SWAPS is set to true
 *  -u?   will override the default webhook URL with the provided one
 */
void (async function () {
  const { d, u } = await yargs(hideBin(process.argv))
    .options({
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
  await createAlchemyWebhook({
    query: `{ block { logs(filter: {addresses: ${JSON.stringify([ECHO_ADDRESS])}, topics: ["0x716fc2beb340c020954671f86fb23241fc9850cf6ab02f6d5d700386e34c2000"]}) { data transaction { hash } } }}`,
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
