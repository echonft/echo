import { CreateOfferSellBuyOptions } from '@components/create-offer-sell-buy-options'
import { NftList } from '@components/nft-list'
import { Erc721 } from '@echo/model/src/erc721'
import { toggle } from '@lib/utils/array'
import clsx from 'clsx'
import { isEmpty } from 'ramda'
import React, { useState } from 'react'
import { useTranslations } from 'use-intl'

interface Props {
  contractAddresses: string[]
  nfts: Erc721[]
}

export const CreateOfferSell: React.FunctionComponent<Props> = ({ nfts, contractAddresses }) => {
  const t = useTranslations('CreateOffer.sell')
  const [selectedNfts, setSelectedNfts] = useState<Erc721[]>([])
  // const [selectedBuyContracts, setSelectedBuyContracts] = useState<string[]>([])
  // const [selectedBuyNfts, setSelectedBuyNfts] = useState<Erc721[]>([])
  return (
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
          <CreateOfferSellBuyOptions contractAddresses={contractAddresses} />
        </div>
      )}
    </div>
  )
}
