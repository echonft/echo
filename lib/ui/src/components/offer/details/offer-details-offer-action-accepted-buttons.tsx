import { CopyIconSvg } from '@echo/ui/components/base/svg/copy-icon-svg'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

interface Props {
  onClose?: () => unknown
}

export const OfferDetailsOfferActionAcceptedButtons: FunctionComponent<Props> = ({ onClose }) => {
  const t = useTranslations('offer.details.actionModal.ACCEPTED')
  return (
    <>
      <button className={clsx('btn-gradient', 'group', 'rounded-lg', 'w-40', 'py-1.5', '!h-10')} onClick={onClose}>
        <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('confirmBtn')}</span>
      </button>
      <CopyToClipboard text={'TODO'} onCopy={onClose}>
        <button className={clsx('btn-action', 'group', 'rounded-lg', 'w-40', 'py-1.5', '!h-10', 'gap-2.5')}>
          <span className={clsx('text-purple-900', 'group-hover:text-white')}>
            <CopyIconSvg />
          </span>
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('copyLinkBtn')}</span>
        </button>
      </CopyToClipboard>
    </>
  )
}
