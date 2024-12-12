import { fetchNftsByAccountResponseSchema } from '@echo/pallet/validators/fetch-nfts-by-account-response-schema'
import { z } from 'zod'

export type FetchNftsByAccountResponse = z.infer<typeof fetchNftsByAccountResponseSchema>
