import { SizeLG, SizeMD } from '@echo/ui-model'

export const bannerPictureSizes = [SizeMD, SizeLG] as const
export type BannerPictureSize = (typeof bannerPictureSizes)[number]
