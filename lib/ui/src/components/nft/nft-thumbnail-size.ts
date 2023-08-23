import { SizeLG, SizeMD } from '@echo/ui-model'

export const nftThumbnailSizes = [SizeMD, SizeLG] as const
export type NftThumbnailSize = (typeof nftThumbnailSizes)[number]
export const getNftThumbnailSize = (size: NftThumbnailSize) => {
  switch (size) {
    case SizeLG:
      return 208
    case SizeMD:
      return 128
  }
}
