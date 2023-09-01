import { authOptions } from '../../../../../lib/constants/auth-options'
import { handleRestrictedRequest } from '../../../../../lib/server/request-handlers/handle-restricted-request'
import { addWalletRequestHandler } from '../../../../../lib/server/request-handlers/user/add-wallet-request-handler'
import { removeWalletRequestHandler } from '../../../../../lib/server/request-handlers/user/remove-wallet-request-handler'
import { AddWalletRequest, ApiRequest, RemoveWalletRequest } from '@echo/api-public'

async function PUT(request: ApiRequest<AddWalletRequest>) {
  return await handleRestrictedRequest(request, authOptions, addWalletRequestHandler)
}

async function DELETE(request: ApiRequest<RemoveWalletRequest>) {
  return await handleRestrictedRequest(request, authOptions, removeWalletRequestHandler)
}

export { DELETE, PUT }
