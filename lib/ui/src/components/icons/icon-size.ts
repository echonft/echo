export enum IconSize {
  CARD = 'Card',
  MD = 'Medium',
  LG = 'Large'
}

export const getIconMeasure = (size: IconSize) => {
  switch (size) {
    case IconSize.CARD:
      return 24
    case IconSize.MD:
      return 30
    case IconSize.LG:
      return 40
  }
}
