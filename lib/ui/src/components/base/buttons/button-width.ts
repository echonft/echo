import { SizeLG, SizeMD } from '../../../types/size'

export const buttonWidths = [SizeMD, SizeLG] as const
export type ButtonWidth = (typeof buttonWidths)[number]
