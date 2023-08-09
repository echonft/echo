export enum NftThumbnailSize {
  LARGE = 'Large',
  MEDIUM = 'Medium'
}

export const nftThumbnailSize = (size: NftThumbnailSize) => {
  switch (size) {
    case NftThumbnailSize.LARGE:
      return 208
    case NftThumbnailSize.MEDIUM:
      return 128
  }
}
