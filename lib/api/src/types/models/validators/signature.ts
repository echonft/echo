import { z } from 'zod'

const signatureRegex = new RegExp('^0x?[0-9a-fA-F]+')
export const signature = z.string().regex(signatureRegex, { message: 'Invalid signature' })
