import { apiUrlProvider } from '@echo/api/routing/api-url-provider'
import { createAlchemyWebhook } from '@echo/commands/tasks/create-alchemy-webhook'
import { deleteAlchemyWebhook } from '@echo/commands/tasks/delete-alchemy-webhook'
import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import type { Collection } from '@echo/model/types/collection'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { andThen, map, path, pipe } from 'ramda'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

/**
 * Arguments:
 *  -d?   will delete the previous hook with id defined in
 *        env var ALCHEMY_WEBHOOK_NFT_TRANSFERS is set to true
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
  initializeFirebase()
  const collectionAddresses = await pipe<[], Promise<Collection[]>, Promise<string[]>>(
    getAllCollections,
    andThen(map(nonNullableReturn(path(['contract', 'address']))))
  )()
  await createAlchemyWebhook({
    query: `{ 
      block { 
        logs(filter: {addresses: ${JSON.stringify(collectionAddresses)}, topics: ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"]}) { 
          transaction { 
            logs { 
              account { address } topics 
            } 
          } 
        }
      }
    }`,
    path: apiUrlProvider.webhooks.nftTransfer.get(),
    url: u
  })
  if (d) {
    const webhookId = process.env.ALCHEMY_WEBHOOK_NFT_TRANSFERS
    if (isNilOrEmpty(webhookId)) {
      console.error('Cannot delete previous hooks because env var ALCHEMY_WEBHOOK_NFT_TRANSFERS is not set')
    } else {
      await deleteAlchemyWebhook(webhookId)
    }
  }
  await terminateFirestore()
  process.exit()
})()
