import { ConfirmationIconSvg } from '@echo/ui/components/base/svg/confirmation-icon-svg'
import { CopyIconSvg } from '@echo/ui/components/base/svg/copy-icon-svg'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

interface Props {
  onConfirm?: () => unknown
  transactionId: string
}

export const NewOfferConfirmedModalInnerContainer: FunctionComponent<Props> = ({ onConfirm, transactionId }) => {
  const t = useTranslations('offer.new.confirmedModal')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <span className={clsx('text-white/50', 'text-center', 'prose-header-xs')}>{t('subtitle')}</span>
      <div className={clsx('flex', 'items-center', 'justify-center')}>
        <ConfirmationIconSvg />
      </div>
      <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center', 'justify-center')}>
        <button className={clsx('btn-gradient', 'group', 'rounded-lg', 'w-40', 'py-1.5', '!h-10')} onClick={onConfirm}>
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('confirmBtn')}</span>
        </button>

        <CopyToClipboard text={transactionId} onCopy={onConfirm}>
          <button className={clsx('btn-action', 'group', 'rounded-lg', 'w-40', 'py-1.5', '!h-10', 'gap-2.5')}>
            <span className={clsx('text-purple-900', 'group-hover:text-white')}>
              <CopyIconSvg />
            </span>
            <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('copyLinkBtn')}</span>
          </button>
        </CopyToClipboard>
      </div>
    </div>
  )
}
