import { SizeLG, SizeMD, SizeSM } from '@echo/ui-model'

export const iconSizes = [SizeSM, SizeMD, SizeLG] as const
export type IconSize = (typeof iconSizes)[number]
