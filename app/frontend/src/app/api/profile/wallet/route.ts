import { type ApiRequest } from '@echo/api/types/api-request'
import { type AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import { type RemoveWalletRequest } from '@echo/api/types/requests/remove-wallet-request'
import { handleRequest } from '@server/request-handlers/handle-request'
import { addWalletRequestHandler } from '@server/request-handlers/user/add-wallet-request-handler'
import { removeWalletRequestHandler } from '@server/request-handlers/user/remove-wallet-request-handler'

async function PUT(request: ApiRequest<AddWalletRequest>) {
  return await handleRequest(request, addWalletRequestHandler)
}

async function DELETE(request: ApiRequest<RemoveWalletRequest>) {
  return await handleRequest(request, removeWalletRequestHandler)
}

export { DELETE, PUT }
