import { NftThumbnailSize } from '../components/nft/nft-thumbnail-picture'
import { SizeLG, SizeMD } from '@echo/ui-model'

export const getNftThumbnailSize = (size: NftThumbnailSize) => {
  switch (size) {
    case SizeLG:
      return 208
    case SizeMD:
      return 128
  }
}
