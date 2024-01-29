'use client'
import { linkProvider } from '@echo/api/services/routing/link-provider'
import { type ListingItem } from '@echo/model/types/listing-item'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import type { Target } from '@echo/ui/types/target'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isEmpty, isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  target: Target | undefined
  items: ListingItem[]
  isMutating?: boolean
  onContinue?: VoidFunction
  onConfirm?: VoidFunction
}

export const CreateListingModalButton: FunctionComponent<Props> = ({
  target,
  items,
  isMutating,
  onContinue,
  onConfirm
}) => {
  const t = useTranslations('listing.new.confirmationModal')
  if (isNil(target) && isEmpty(items)) {
    return null
  }
  if (isNilOrEmpty(items)) {
    return (
      <InternalLink path={linkProvider.profile.items.get()}>
        <button className={clsx('btn-gradient', 'btn-size-alt', 'group')} onClick={onContinue}>
          <span className={clsx('prose-label-lg', 'btn-label-action')}>{t('continueBtn')}</span>
        </button>
      </InternalLink>
    )
  }
  return (
    <button
      className={clsx('btn-gradient', 'btn-size-alt', 'group', isMutating && 'animate-pulse')}
      onClick={onConfirm}
      disabled={isMutating}
    >
      <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('confirmBtn')}</span>
    </button>
  )
}
