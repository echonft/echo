import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent, MouseEventHandler } from 'react'

export interface NftThumbnailMakeOfferButtonProps {
  onClick?: MouseEventHandler
}

export const NftThumbnailMakeOfferButton: FunctionComponent<NftThumbnailMakeOfferButtonProps> = ({ onClick }) => {
  const t = useTranslations('nft.thumbnail')
  return (
    <button onClick={onClick} className={clsx('btn-primary', 'group', 'rounded-lg', 'w-full', 'py-[0.28rem]', 'px-2')}>
      <span className={clsx('prose-label-sm-semi', 'btn-label-primary')}>{t('makeOfferBtn')}</span>
    </button>
  )
}
