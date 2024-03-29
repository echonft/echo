import { LongPressButton } from '@echo/ui/components/base/long-press-button'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  readOnly: boolean
  loading?: boolean
  disabled?: boolean
  onCancel?: VoidFunction
  onComplete?: VoidFunction
}

export const CreateOfferButtons: FunctionComponent<Props> = ({ readOnly, loading, disabled, onCancel, onComplete }) => {
  const t = useTranslations('offer.create')

  if (readOnly) {
    return (
      <>
        <button
          className={clsx('btn-gradient', 'btn-size-alt', 'group', loading && 'animate-pulse')}
          disabled={disabled ?? loading}
          onClick={() => {
            onComplete?.()
          }}
        >
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('createBtn')}</span>
        </button>
        <button
          className={clsx('btn-action', 'btn-size-alt', 'group', loading && 'animate-pulse')}
          disabled={disabled ?? loading}
          onClick={() => {
            onCancel?.()
          }}
        >
          <span className={clsx('prose-label-lg', 'btn-label-action')}>{t('editBtn')}</span>
        </button>
      </>
    )
  }
  return (
    <>
      <button
        className={clsx('btn-gradient', 'btn-size-alt', 'group')}
        disabled={disabled}
        onClick={() => {
          onComplete?.()
        }}
      >
        <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('reviewBtn')}</span>
      </button>
      <LongPressButton
        id={'new-offer-cancel-btn'}
        label={t('cancelBtn')}
        message={t('cancelBtnMessage')}
        onFinish={onCancel}
      />
    </>
  )
}
