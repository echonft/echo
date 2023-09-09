import { SizeLG, SizeMD } from '../../constants/size'
import { NftThumbnailSize } from '../../types/nft-thumbnail-size'

export const getNftThumbnailSize = (size: NftThumbnailSize) => {
  switch (size) {
    case SizeLG:
      return 208
    case SizeMD:
      return 128
  }
}
