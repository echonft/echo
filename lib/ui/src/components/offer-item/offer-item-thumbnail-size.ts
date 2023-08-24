import { SizeLG, SizeMD } from '@echo/ui-model'

export const offerItemThumbnailSizes = [SizeMD, SizeLG] as const
export type OfferItemThumbnailSize = (typeof offerItemThumbnailSizes)[number]
export const getOfferItemThumbnailSize = (size: OfferItemThumbnailSize) => {
  switch (size) {
    case SizeLG:
      return 208
    case SizeMD:
      return 128
  }
}
