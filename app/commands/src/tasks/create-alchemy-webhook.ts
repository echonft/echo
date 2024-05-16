import { DashboardApiRoutes } from '@echo/alchemy/constants/dashboard-api-routes'
import { getDashboardApiRoute } from '@echo/alchemy/helpers/get-dashboard-api-route'
import { MAINNET_CHAIN_ID } from '@echo/utils/constants/chain-ids'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { getCurrentChainId } from '@echo/utils/helpers/get-current-chain-id'
import axios from 'axios'
import { pipe, prop, tap } from 'ramda'

interface Args {
  query: string
  path: string
  url?: string
}

function getCallbackUrl() {
  switch (process.env.ENV) {
    case 'dev':
      return 'https://dev.echonft.xyz/api/webhook'
    case 'testnet':
      return 'https://testnet.echonft.xyz/api/webhook'
    case 'test':
      throw Error('test ENV not supported')
  }
}

export async function createAlchemyWebhook(args: Args) {
  const network = getCurrentChainId() === MAINNET_CHAIN_ID ? 'ETH_MAINNET' : 'ETH_SEPOLIA'
  const url = args.url ?? getCallbackUrl()
  await axios
    .post(
      getDashboardApiRoute(DashboardApiRoutes.CREATE_WEBHOOK),
      {
        network,
        webhook_type: 'GRAPHQL',
        webhook_url: `${url}${args.path}`,
        graphql_query: {
          skip_empty_messages: true,
          query: args.query
        }
      },
      { headers: { 'X-Alchemy-Token': process.env.ALCHEMY_AUTH_TOKEN } }
    )
    .then(
      pipe(
        prop('data'),
        tap((response) => {
          console.log(`Successfully created Alchemy webhook ${JSON.stringify(response)}`)
        })
      )
    )
    .catch((err) => {
      console.error(`Error creating Alchemy webhook: ${errorMessage(err)}`)
    })
}
