import { DashboardApiRoutes } from '@echo/alchemy/constants/dashboard-api-routes'
import { getDashboardApiRoute } from '@echo/alchemy/helpers/get-dashboard-api-route'
import { isTestnet } from '@echo/utils/constants/is-testnet'
import { errorMessage } from '@echo/utils/helpers/error-message'
import axios from 'axios'
import { pipe, prop, tap } from 'ramda'

interface Args {
  query: string
  path: string
  url?: string
}

export async function createAlchemyWebhook(args: Args) {
  const network = isTestnet ? 'ETH_SEPOLIA' : 'ETH_MAINNET'
  const url = args.url ?? isTestnet ? 'https://testnet.echonft.xyz/api/webhook' : 'https://dev.echonft.xyz/api/webhook'
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
