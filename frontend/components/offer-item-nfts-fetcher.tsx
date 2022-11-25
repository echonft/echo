import { NftList } from '@components/nft-list'
import { OfferType } from '@echo/model/offer'
import { OfferItem } from '@echo/model/offer-item'
import { useGetNftsForItems } from '@lib/services/alchemy/hooks/use-get-nfts-for-items'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil, join } from 'rambda'
import { FunctionComponent, useCallback } from 'react'

interface Props {
  items: OfferItem[] | undefined
  type: OfferType
  owner?: boolean
}

export const OfferItemNftsFetcher: FunctionComponent<Props> = ({ items, type, owner = false }) => {
  const t = useTranslations(`CreateOffer.summary.${type === OfferType.BUY ? 'buy' : 'sell'}`)
  const nfts = useGetNftsForItems(items)

  const hasSpecificId = useCallback(() => items?.some((item) => !isNil(item.id)), [items])

  const getTitleKey = useCallback(() => {
    // No item specified, shouldn't happen for owner
    if (isNil(items)) {
      if (owner) {
        return 'owner-title-no-id'
      } else {
        return 'counterparty-title-none'
      }
    }
    // Has items and specific ids
    if (hasSpecificId()) {
      if (owner) {
        return 'owner-title'
      } else {
        return 'counterparty-title'
      }
    }
    // Has only contracts
    if (owner) {
      return 'owner-title-no-id'
    } else {
      return 'counterparty-title-no-id'
    }
  }, [owner, items, hasSpecificId])

  if (isNil(nfts)) {
    return <span>{t('loading')}</span>
  }
  if (nfts.successful && nfts.data) {
    return (
      <div className={clsx('flex', 'flex-col', 'gap-2')}>
        <span>{t(getTitleKey())}</span>
        {items && hasSpecificId() && <NftList nfts={nfts.data} />}
        {items && !hasSpecificId() && (
          <span>
            {join(
              ',',
              items.map((item) => item.contractAddress)
            )}
          </span>
        )}
      </div>
    )
  }
  return <span>{t('error')}</span>
}
