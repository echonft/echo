import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent, MouseEventHandler } from 'react'

interface Props {
  onClick?: MouseEventHandler
}

export const NftThumbnailMakeOfferButton: FunctionComponent<Props> = ({ onClick }) => {
  const t = useTranslations('nft.thumbnail')
  return (
    <button onClick={onClick} className={clsx('btn-primary', 'group', 'w-full', 'py-[0.28rem]', 'px-2')}>
      <span className={clsx('prose-label-sm-semi', 'btn-label-primary')}>{t('makeOfferBtn')}</span>
    </button>
  )
}
