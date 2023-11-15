import { SIZE_LG, SIZE_MD } from '@echo/ui/constants/size'
import { type NftThumbnailSize } from '@echo/ui/types/nft-thumbnail-size'

export const getNftThumbnailSize = (size: NftThumbnailSize) => {
  switch (size) {
    case SIZE_LG:
      return 208
    case SIZE_MD:
      return 128
  }
}
