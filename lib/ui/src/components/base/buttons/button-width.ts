import { SizeMD } from '../../../types/size'

export const buttonWidths = [SizeMD] as const
export type ButtonWidth = (typeof buttonWidths)[number]
