import { authRequestHandler } from '@echo/backend/request-handlers/auth-request-handler'
import { addWalletRequestHandler } from '@echo/backend/request-handlers/profile/add-wallet-request-handler'
import { removeWalletRequestHandler } from '@echo/backend/request-handlers/profile/remove-wallet-request-handler'

const PUT = authRequestHandler(addWalletRequestHandler)
const DELETE = authRequestHandler(removeWalletRequestHandler)

export { DELETE, PUT }
