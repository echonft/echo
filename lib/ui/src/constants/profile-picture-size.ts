import { SizeLG, SizeMD } from '@echo/ui-model'

export const profilePictureSizes = [SizeMD, SizeLG] as const
export type ProfilePictureSize = (typeof profilePictureSizes)[number]
