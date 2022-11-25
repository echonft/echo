import { CreateOfferSellBuyOptions } from '@components/create-offer-sell-buy-options'
import { CreateOfferSummary } from '@components/create-offer-summary'
import { NftList } from '@components/nft-list'
import { Collection } from '@echo/model/collection'
import { Erc721 } from '@echo/model/erc721'
import { NewOffer, OfferType } from '@echo/model/offer'
import { useCreateOffer } from '@lib/hooks/use-create-offer'
import { toggle } from '@lib/utils/array'
import { createOfferItems } from '@lib/utils/offer-item'
import { clsx } from 'clsx'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { isEmpty, isNil } from 'ramda'
import React, { useCallback, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

interface Props {
  collection: Collection
  nfts: Erc721[]
}

export const CreateOfferSell: React.FunctionComponent<Props> = ({ nfts, collection }) => {
  const t = useTranslations('CreateOffer.sell')
  const router = useRouter()
  const { address } = useAccount()
  const [offerRequest, setOfferRequest] = useState<NewOffer | undefined>()
  const { offerId: createdOfferId } = useCreateOffer(offerRequest)
  const [selectedNfts, setSelectedNfts] = useState<Erc721[]>([])
  const [selectedBuyContracts, setSelectedBuyContracts] = useState<string[]>([])
  const [selectedBuyNfts, setSelectedBuyNfts] = useState<Erc721[]>([])
  const [showSummary, setShowSummary] = useState(false)

  const submitButtonDisabled = useCallback(() => {
    return !address || isEmpty(selectedNfts)
  }, [address, selectedNfts])

  useEffect(() => {
    if (!isNil(createdOfferId)) {
      setOfferRequest(undefined)
      // TODO Create routes
      router.push('success')
    }
  }, [router, createdOfferId])

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
          disabled={submitButtonDisabled()}
        >
          {t('submit')}
        </button>
      </div>
      {showSummary && (
        <CreateOfferSummary
          collection={collection}
          type={OfferType.SELL}
          ownerItems={createOfferItems([], selectedNfts)}
          counterpartyItems={createOfferItems(selectedBuyContracts, selectedBuyNfts)}
          onAccept={(newOffer) => {
            setShowSummary(false)
            setOfferRequest(newOffer)
          }}
          onCancel={() => setShowSummary(false)}
        />
      )}
    </>
  )
}
