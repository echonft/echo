'use client'
import { linkProvider } from '@echo/api/routing/link-provider'
import { type ListingItem } from '@echo/model/types/listing-item'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { classes } from '@echo/ui/helpers/classes'
import type { Target } from '@echo/ui/types/target'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { useTranslations } from 'next-intl'
import { isEmpty, isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  target: Nullable<Target>
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
  const t = useTranslations('listing.create')
  if (isNil(target) && isEmpty(items)) {
    return null
  }
  if (isNilOrEmpty(items)) {
    return (
      <InternalLink path={linkProvider.profile.items.get()}>
        <button className={classes('btn-gradient', 'btn-size-alt', 'group')} onClick={onContinue}>
          <span className={classes('prose-label-lg', 'btn-label-action')}>{t('continueBtn')}</span>
        </button>
      </InternalLink>
    )
  }
  return (
    <button
      className={classes('btn-gradient', 'btn-size-alt', 'group', isMutating && 'animate-pulse')}
      onClick={onConfirm}
      disabled={isMutating ?? (isNil(target) || isEmpty(items))}
    >
      <span className={classes('prose-label-lg', 'btn-label-gradient')}>{t('confirmBtn')}</span>
    </button>
  )
}
