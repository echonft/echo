import { ConfirmationIconSvg } from '../base/svg/confirmation-icon-svg'
import { CopyIconSvg } from '../base/svg/copy-icon-svg'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

interface Props {
  onConfirm?: () => void
}

export const NewOfferConfirmedModalInnerContainer: FunctionComponent<Props> = ({ onConfirm }) => {
  const t = useTranslations('offer.new.confirmedModal')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <span className={clsx('text-white/50', 'text-center', 'prose-header-xs')}>{t('subtitle')}</span>
      <div className={clsx('flex', 'items-center', 'justify-center')}>
        <ConfirmationIconSvg />
      </div>
      <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center', 'justify-center')}>
        <button className={clsx('btn-gradient', 'group', 'rounded-lg', 'w-40', 'py-1.5', '!h-10')} onClick={onConfirm}>
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('confirmButton')}</span>
        </button>
        <CopyToClipboard text={'TODO'} onCopy={onConfirm}>
          <button className={clsx('btn-action', 'group', 'rounded-lg', 'w-40', 'py-1.5', '!h-10', 'gap-2.5')}>
            <span>
              <CopyIconSvg className={clsx('[&>path]:fill-purple-900', 'group-hover:[&>path]:fill-white')} />
            </span>
            <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('copyLinkButton')}</span>
          </button>
        </CopyToClipboard>
      </div>
    </div>
  )
}
