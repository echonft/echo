import { SizeLG, SizeMD } from '@echo/ui-model'

export const itemThumbnailSizes = [SizeMD, SizeLG] as const
export type ItemThumbnailSize = (typeof itemThumbnailSizes)[number]
