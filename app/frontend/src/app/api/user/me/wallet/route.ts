import { addWalletRouteHandler, removeWalletRouteHandler } from '@echo/api'
import { AddWalletRequest, ApiRequest, RemoveWalletRequest } from '@echo/api-public'
import { authOptions } from '@lib/constants/auth-options'

async function PUT(request: ApiRequest<AddWalletRequest>) {
  return await addWalletRouteHandler(request, authOptions)
}

async function DELETE(request: ApiRequest<RemoveWalletRequest>) {
  return await removeWalletRouteHandler(request, authOptions)
}

export { DELETE, PUT }
