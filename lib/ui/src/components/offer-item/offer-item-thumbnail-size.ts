import { SizeLG, SizeMD } from '@echo/ui-model'

export const offerItemThumbnailSizes = [SizeMD, SizeLG] as const
export type OfferItemThumbnailSize = (typeof offerItemThumbnailSizes)[number]
