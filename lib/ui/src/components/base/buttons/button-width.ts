import { SizeFull, SizeLG, SizeMD } from '../../../types/size'

export const buttonWidths = [SizeMD, SizeLG, SizeFull] as const
export type ButtonWidth = (typeof buttonWidths)[number]
