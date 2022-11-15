import { CreateOfferSellBuyOptions } from '@echo/frontend/components/create-offer-sell-buy-options'
import { NftList } from '@echo/frontend/components/nft-list'
import { toggle } from '@echo/frontend/lib/utils/array'
import { Erc721 } from '@echo/model/src/erc721'
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
