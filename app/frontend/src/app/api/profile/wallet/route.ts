import { authRouteHandler } from '@echo/frontend/lib/request-handlers/auth-route-handler'
import { addWalletRequestHandler } from '@echo/frontend/lib/request-handlers/profile/add-wallet-request-handler'
import { removeWalletRequestHandler } from '@echo/frontend/lib/request-handlers/profile/remove-wallet-request-handler'

const PUT = authRouteHandler(addWalletRequestHandler)
const DELETE = authRouteHandler(removeWalletRequestHandler)

export { DELETE, PUT }
