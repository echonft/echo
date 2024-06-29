import { getNftsByAccountResponseSchema } from '@echo/opensea/validators/get-nfts-by-account-response-schema'

export type GetNftsByAccountResponse = ReturnType<typeof getNftsByAccountResponseSchema.parse>
