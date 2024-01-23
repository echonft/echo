import { authAppRouteHandler } from '@echo/frontend/lib/request-handlers/auth-app-route-handler'
import { addWalletRequestHandler } from '@echo/frontend/lib/request-handlers/profile/add-wallet-request-handler'
import { removeWalletRequestHandler } from '@echo/frontend/lib/request-handlers/profile/remove-wallet-request-handler'

const PUT = authAppRouteHandler(addWalletRequestHandler)
const DELETE = authAppRouteHandler(removeWalletRequestHandler)

export { DELETE, PUT }
