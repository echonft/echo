import { SizeFull, SizeSM } from '../../types/size'
import { ButtonColorScheme } from '../base/buttons/button-color-scheme'
import { TextButton } from '../base/buttons/text-button'
import { useTranslations } from 'next-intl'
import { FunctionComponent, MouseEventHandler } from 'react'

export interface NftThumbnailMakeOfferButtonProps {
  onClick?: MouseEventHandler
}

export const NftThumbnailMakeOfferButton: FunctionComponent<NftThumbnailMakeOfferButtonProps> = ({ onClick }) => {
  const t = useTranslations('nft.thumbnail')
  return (
    <TextButton
      label={t('makeOfferBtn')}
      size={SizeSM}
      colorScheme={ButtonColorScheme.PRIMARY}
      fixedWidth={SizeFull}
      onClick={onClick}
    />
  )
}
