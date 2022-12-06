import { CreateOfferSell } from '@components/create-offer-sell'
import { Collection, OfferType } from '@echo/model'
import { Listbox } from '@headlessui/react'
import { useGetCollectionNftsForOwner } from '@lib/services/alchemy/hooks/use-get-collection-nfts-for-owner'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { head, isEmpty, isNil } from 'ramda'
import { FunctionComponent, useState } from 'react'

interface Props {
  collection: Collection
}

// TODO use translations
function titleForOfferType(type: OfferType) {
  if (type === OfferType.BUY) {
    return 'Buy an NFT'
  }
  return 'Sell an NFT'
}

export const CreateOffer: FunctionComponent<Props> = ({ collection }) => {
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
