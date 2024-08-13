import { z } from 'zod'

export const nftTokenTypeSchema = z.enum(['erc721', 'erc1155'])
