import type { HexString } from '@echo/model/types/hex-string'
import { PalletApiRoute } from '@echo/pallet/routing/pallet-api-route'

export const palletApiRoutes = {
  nfts: {
    fetchByAccount: new PalletApiRoute<Record<'address', HexString>>('/v3/user/:address/tokens?network=mainnet')
  }
}
