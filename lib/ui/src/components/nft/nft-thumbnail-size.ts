import { SizeLG, SizeMD } from '../../types/size'

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
