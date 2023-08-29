import { SizeLG, SizeMD } from '@echo/ui-model'

export const userProfilePictureSizes = [SizeMD, SizeLG] as const
export type UserProfilePictureSize = (typeof userProfilePictureSizes)[number]
