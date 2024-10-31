import { base64Decode } from '@echo/utils/helpers/base64-decode'
import { string } from 'zod'

export const base64DecodeSchema = string().min(1).base64().transform(base64Decode)
