import { CopyIconSvg } from '@echo/ui/components/base/svg/copy-icon-svg'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

interface Props {
  onClose?: () => unknown
}

export const OfferDetailsOfferActionAcceptedButtons: FunctionComponent<Props> = ({ onClose }) => {
  const t = useTranslations('offer.details.actionModal.ACCEPT')
  return (
    <>
      <button className={clsx('btn-gradient', 'btn-size-alt', 'group')} onClick={onClose}>
        <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('confirmBtn')}</span>
      </button>
      <CopyToClipboard text={'TODO'} onCopy={onClose}>
        <button className={clsx('btn-action', 'btn-size-alt', 'group')}>
          <span className={clsx('btn-label-action')}>
            <CopyIconSvg />
          </span>
          <span className={clsx('prose-label-lg', 'btn-label-action')}>{t('copyLinkBtn')}</span>
        </button>
      </CopyToClipboard>
    </>
  )
}
