import { CreateOfferSell } from '@echo/frontend/components/create-offer-sell'
import { useGetCollectionNftsForOwner } from '@echo/frontend/lib/services/alchemy/hooks/use-get-collection-nfts-for-owner'
import { Collection } from '@echo/model/collection'
import { OfferType } from '@echo/model/src/offer'
import { Listbox } from '@headlessui/react'
import clsx from 'clsx'
import { head, isEmpty, isNil } from 'ramda'
import React, { useState } from 'react'
import { useTranslations } from 'use-intl'

interface Props {
  collection: Collection
}

// TODO use translations
function titleForOfferType(type: OfferType) {
  switch (type) {
    case OfferType.BUY:
      return 'Buy an NFT'
    case OfferType.SELL:
      return 'Sell an NFT'
  }
}

export const CreateOffer: React.FunctionComponent<Props> = ({ collection }) => {
  const t = useTranslations('CreateOffer')
  const nfts = useGetCollectionNftsForOwner(collection.contractAddresses)
  const choices = Object.values(OfferType)
  const [selectedChoice, setSelectedChoice] = useState<OfferType>(head(choices)!)
  return (
    // TODO Design
    <div className={clsx('flex', 'flex-col', 'gap-2')}>
      <span>{t('select-title')}</span>
      <Listbox value={selectedChoice} onChange={setSelectedChoice} disabled={isNil(nfts)}>
        <Listbox.Button>{titleForOfferType(selectedChoice)}</Listbox.Button>
        <Listbox.Options>
          {choices
            .filter((choice) => !(choice === OfferType.SELL && nfts?.successful && isEmpty(nfts.data)))
            .map((choice) => (
              <Listbox.Option key={choice} value={choice}>
                {titleForOfferType(choice)}
              </Listbox.Option>
            ))}
        </Listbox.Options>
      </Listbox>
      {!isNil(nfts) && !isNil(nfts.data) && selectedChoice === OfferType.SELL && (
        <CreateOfferSell nfts={nfts.data} collection={collection} />
      )}
    </div>
  )
}
