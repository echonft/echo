import { CreateOfferSell } from '@components/create-offer-sell'
import { OfferType } from '@echo/model/src/offer'
import { Listbox } from '@headlessui/react'
import { useGetCollectionNftsForOwner } from '@lib/hooks/alchemy/use-get-collection-nfts-for-owner'
import clsx from 'clsx'
import { head, isEmpty, isNil } from 'ramda'
import React, { useState } from 'react'
import { useTranslations } from 'use-intl'

interface Props {
  // TODO We should probably create a model for that for better UX. With name for example
  contractAddresses: string[]
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

export const CreateOffer: React.FunctionComponent<Props> = ({ contractAddresses }) => {
  const t = useTranslations('CreateOffer')
  const nfts = useGetCollectionNftsForOwner(contractAddresses)
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
        <CreateOfferSell nfts={nfts.data} contractAddresses={contractAddresses} />
      )}
    </div>
  )
}
