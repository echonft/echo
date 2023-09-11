import { authOptions } from '@constants/auth-options'
import type { AddWalletRequest, ApiRequest, RemoveWalletRequest } from '@echo/api/types'
import { handleRestrictedRequest } from '@server/request-handlers/handle-restricted-request'
import { addWalletRequestHandler } from '@server/request-handlers/user/add-wallet-request-handler'
import { removeWalletRequestHandler } from '@server/request-handlers/user/remove-wallet-request-handler'

async function PUT(request: ApiRequest<AddWalletRequest>) {
  return await handleRestrictedRequest(request, authOptions, addWalletRequestHandler)
}

async function DELETE(request: ApiRequest<RemoveWalletRequest>) {
  return await handleRestrictedRequest(request, authOptions, removeWalletRequestHandler)
}

export { DELETE, PUT }
