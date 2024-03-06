import { DashboardApiRoutes } from '@echo/alchemy/constants/dashboard-api-routes'
import { getDashboardApiRoute } from '@echo/alchemy/helpers/get-dashboard-api-route'
import { errorMessage } from '@echo/utils/helpers/error-message'
import axios from 'axios'
import { stringify } from 'qs'
import { concat } from 'ramda'

export async function deleteAlchemyWebhook(webhookId: string) {
  const url = concat(
    getDashboardApiRoute(DashboardApiRoutes.DELETE_WEBHOOK),
    stringify({ webhook_id: webhookId }, { addQueryPrefix: true })
  )
  await axios
    .delete(url, { headers: { 'X-Alchemy-Token': process.env.ALCHEMY_AUTH_TOKEN } })
    .then(() => {
      console.log(`Successfully deleted Alchemy webhook ${webhookId}`)
    })
    .catch((err) => {
      console.error(`Error deleting Alchemy webhook ${webhookId}: ${errorMessage(err)}`)
    })
}
