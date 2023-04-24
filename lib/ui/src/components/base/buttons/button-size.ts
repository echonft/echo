import { SizeLG, SizeMD, SizeSM, SizeXS } from '../../../types/size'

export const buttonSizes = [SizeXS, SizeSM, SizeMD, SizeLG] as const
export type ButtonSize = (typeof buttonSizes)[number]
