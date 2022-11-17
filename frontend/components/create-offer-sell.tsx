import { createNewOffer } from '@echo/firebase/admin/mappers/offer'
import { CreateOfferSellBuyOptions } from '@echo/frontend/components/create-offer-sell-buy-options'
import { CreateOfferSummary } from '@echo/frontend/components/create-offer-summary'
import { NftList } from '@echo/frontend/components/nft-list'
import { useUser } from '@echo/frontend/lib/services/firebase/hooks/use-user'
import { toggle } from '@echo/frontend/lib/utils/array'
import { Collection } from '@echo/model/collection'
import { OfferType } from '@echo/model/offer'
import { Erc721 } from '@echo/model/src/erc721'
import clsx from 'clsx'
import { isEmpty } from 'ramda'
import React, { useState } from 'react'
import { useTranslations } from 'use-intl'

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
