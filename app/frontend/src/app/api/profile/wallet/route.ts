import { authRequestHandler } from '@echo/frontend/lib/request-handlers/auth-request-handler'
import { addWalletRequestHandler } from '@echo/frontend/lib/request-handlers/profile/add-wallet-request-handler'
import { removeWalletRequestHandler } from '@echo/frontend/lib/request-handlers/profile/remove-wallet-request-handler'

const PUT = authRequestHandler(addWalletRequestHandler)
const DELETE = authRequestHandler(removeWalletRequestHandler)

export { DELETE, PUT }
