import { CreateOfferSellBuyOptions } from '@components/create-offer-sell-buy-options'
import { CreateOfferSummary } from '@components/create-offer-summary'
import { NftList } from '@components/nft-list'
import { CreateOfferRequest } from '@echo/api/dist/types'
import { DiscordGuild, Nft, OfferItem, OfferType } from '@echo/model'
import { useCreateOffer } from '@lib/hooks/use-create-offer'
import { toggle } from '@lib/utils/array'
import { clsx } from 'clsx'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { isEmpty, isNil } from 'ramda'
import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

interface Props {
  collection: DiscordGuild
  nfts: Nft[]
}

function createOfferItems(contractAddresses: string[], nfts: Nft[]): OfferItem[] {
  if (isEmpty(contractAddresses) && isEmpty(nfts)) {
    return []
  }
  if (isEmpty(nfts)) {
    return contractAddresses.map((contractAddress) => ({ contractAddress }))
  }
  // In case we have both, filter the contracts that have no ids and add as item with the nfts
  const contractsOnly = contractAddresses.filter(
    (contractAddress) => !nfts.some((nft) => nft.collection.address === contractAddress)
  )
  return contractsOnly
    .map((contractAddress) => ({ contractAddress }))
    .concat(nfts.map((nft) => ({ contractAddress: nft.collection.address, id: nft.id })))
}

export const CreateOfferSell: FunctionComponent<Props> = ({ nfts, collection }) => {
  const t = useTranslations('CreateOffer.sell')
  const router = useRouter()
  const { address } = useAccount()
  const [offerRequest, setOfferRequest] = useState<CreateOfferRequest | undefined>()
  const { offerId: createdOfferId } = useCreateOffer(offerRequest)
  const [selectedNfts, setSelectedNfts] = useState<Nft[]>([])
  const [selectedBuyContracts, setSelectedBuyContracts] = useState<string[]>([])
  const [selectedBuyNfts, setSelectedBuyNfts] = useState<Nft[]>([])
  const [showSummary, setShowSummary] = useState(false)

  const submitButtonDisabled = useCallback(() => {
    return !address || isEmpty(selectedNfts)
  }, [address, selectedNfts])

  useEffect(() => {
    if (!isNil(createdOfferId)) {
      setOfferRequest(undefined)
      // TODO Create routes
      void router.push('success')
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
