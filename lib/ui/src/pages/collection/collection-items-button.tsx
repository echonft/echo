import { SelectableNftsActionButton } from '@echo/ui/components/nft/selectable/selectable-nfts-action-button'
import { NftAction } from '@echo/ui/constants/nft-actions'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent, MouseEventHandler } from 'react'

interface Props {
  action: NftAction
  count: number
  onClick?: MouseEventHandler
}

export const CollectionItemsButton: FunctionComponent<Props> = ({ action, count, onClick }) => {
  const t = useTranslations('nft.action')
  if (action === NftAction.Listing) {
    return (
      <button
        onClick={onClick}
        className={clsx('btn-gradient', 'group', 'w-full', 'p-2.5', 'h-[2.875rem]', 'justify-start')}
      >
        <span className={clsx('prose-label-sm-semi', 'btn-label-gradient')}>{t('listing')}</span>
      </button>
    )
  }
  return <SelectableNftsActionButton action={action} count={count} onClick={onClick} />
}
