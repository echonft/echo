import { PictureSize } from '@echo/utils/constants/picture-size'
import { nativeEnum, object } from 'zod'

export const ipfsProxyQueryParamsSchema = object({
  width: nativeEnum(PictureSize)
})
