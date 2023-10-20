import { SizeLG, SizeMD } from '@echo/ui/constants/size'
import { type NftThumbnailSize } from '@echo/ui/types/nft-thumbnail-size'

export const getNftThumbnailSize = (size: NftThumbnailSize) => {
  switch (size) {
    case SizeLG:
      return 208
    case SizeMD:
      return 128
  }
}
