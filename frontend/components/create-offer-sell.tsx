import { CreateOfferSellBuyOptions } from '@components/create-offer-sell-buy-options'
import { CreateOfferSummary } from '@components/create-offer-summary'
import { NftList } from '@components/nft-list'
import { Collection } from '@echo/model/collection'
import { Erc721 } from '@echo/model/erc721'
import { OfferType } from '@echo/model/offer'
import { useUser } from '@lib/services/firebase/hooks/use-user'
import { toggle } from '@lib/utils/array'
import { createNewOffer } from '@lib/utils/offer'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { isEmpty } from 'ramda'
import React, { useState } from 'react'

interface Props {
  collection: Collection
  nfts: Erc721[]
}

export const CreateOfferSell: React.FunctionComponent<Props> = ({ nfts, collection }) => {
  const t = useTranslations('CreateOffer.sell')
  const userResult = useUser()
  const [selectedNfts, setSelectedNfts] = useState<Erc721[]>([])
  const [selectedBuyContracts, setSelectedBuyContracts] = useState<string[]>([])
  const [selectedBuyNfts, setSelectedBuyNfts] = useState<Erc721[]>([])
  const [showSummary, setShowSummary] = useState(false)
  return (
    <>
      <div className={clsx('flex', 'flex-col', 'gap-2')}>
        <div className={clsx('flex', 'flex-col', 'gap-2')}>
          <span>{t('owner-nfts')}</span>
          <NftList
            nfts={nfts}
            selected={selectedNfts}
            onSelect={(nft) => setSelectedNfts((prevState) => toggle(prevState, nft))}
          />
        </div>
        {!isEmpty(selectedNfts) && (
          <div className={clsx('flex', 'flex-col', 'gap-2')}>
            <span>{t('trade-title')}</span>
            <CreateOfferSellBuyOptions
              contractAddresses={collection.contractAddresses}
              selectedContracts={selectedBuyContracts}
              selectedNfts={selectedBuyNfts}
              onSelectContracts={setSelectedBuyContracts}
              onSelectNfts={setSelectedBuyNfts}
            />
          </div>
        )}
        <button
          className={clsx('rounded', 'text-white', 'p-2', 'bg-blue-500')}
          onClick={() => setShowSummary(true)}
          disabled={!userResult || !userResult.data}
        >
          {t('submit')}
        </button>
      </div>
      {showSummary && (
        <CreateOfferSummary offer={createNewOffer(OfferType.SELL, collection, [], [], userResult!.data!)} />
      )}
    </>
  )
}
