import { SizeSM } from '../../types/size'
import { ButtonColorScheme } from '../base/buttons/button-color-scheme'
import { TextButton } from '../base/buttons/text-button'
import { useTranslations } from 'next-intl'
import { FunctionComponent, MouseEventHandler } from 'react'

export interface NftThumbnailMakeOfferButtonProps {
  onClick?: MouseEventHandler
}

export const NftThumbnailMakeOfferButton: FunctionComponent<NftThumbnailMakeOfferButtonProps> = ({ onClick }) => {
  const t = useTranslations('nft')
  return (
    <TextButton
      label={t('thumbnail.makeOfferBtn')}
      size={SizeSM}
      colorScheme={ButtonColorScheme.PRIMARY}
      fixedWidth={'Full'}
      onClick={onClick}
    />
  )
}
