import { Autocomplete } from '@components/autocomplete'
import { CollectionNftsFetcher } from '@components/collection-nfts-fetcher'
import { TagManager } from '@components/tag-manager'
import { Nft } from '@echo/model'
import { Combobox } from '@headlessui/react'
import { mapCollectionSearchableObject } from '@lib/mappers/map-collection-searchable-object'
import { addIfNotThere, toggle } from '@lib/utils/array'
import { shortenAddress } from '@usedapp/core'
import { clsx } from 'clsx'
import { getAddress, isAddress } from 'ethers/lib/utils'
import { useTranslations } from 'next-intl'
import { isEmpty, isNil } from 'ramda'
import { FunctionComponent, useCallback, useState } from 'react'

interface Props {
  contractAddresses: string[]
  selectedContracts: string[]
  selectedNfts: Nft[]
  onSelectContracts?: (contractAddresses: string[]) => void
  onSelectNfts?: (nfts: Nft[]) => void
}

export const CreateOfferSellBuyOptions: FunctionComponent<Props> = ({
  contractAddresses,
  selectedContracts,
  selectedNfts,
  onSelectContracts,
  onSelectNfts
}) => {
  const t = useTranslations('CreateOffer.sell')
  const [searchQuery, setSearchQuery] = useState<string>()
  const [selectSpecificNfts, setSelectSpecificNfts] = useState<boolean>(false)
  const searchableContracts = mapCollectionSearchableObject(contractAddresses)
  const autocompleteOptions = useCallback(() => {
    if (isNil(searchQuery) || isEmpty(searchQuery)) {
      return searchableContracts
    }
    return searchableContracts.filter(
      (searchableContract) => searchableContract.value.indexOf(searchQuery.toLowerCase()) > -1
    )
  }, [searchQuery, searchableContracts])

  const updateSearchQuery = useCallback(
    (query: string) => {
      setSearchQuery(query)
    },
    [setSearchQuery]
  )

  return (
    <div className={clsx('flex', 'flex-col', 'gap-2')}>
      <Autocomplete
        placeholder={t('autocomplete.placeholder')}
        name={'contract-selector'}
        searchQuery={searchQuery}
        options={autocompleteOptions()}
        onSearch={updateSearchQuery}
        onSelected={(selected) => onSelectContracts?.(addIfNotThere(selectedContracts, selected.value))}
        renderNewOption={(query) =>
          isAddress(query) ? (
            <Combobox.Option
              value={{ id: getAddress(query), label: shortenAddress(query), value: getAddress(query) }}
              className={'option'}
            >
              {t('autocomplete.new-option', { collection: shortenAddress(query) })}
            </Combobox.Option>
          ) : (
            <li className={'option cursor-none bg-transparent hover:bg-transparent focus:ring-0'}>
              {t('autocomplete.invalid-option')}
            </li>
          )
        }
      />
      <TagManager
        tags={mapCollectionSearchableObject(selectedContracts)}
        onRemoveTag={(removedTag) => onSelectContracts?.(toggle(selectedContracts, removedTag.value))}
      />
      {!isEmpty(selectedContracts) && (
        <button
          className={clsx('rounded', 'text-white', 'p-2', 'bg-green-500')}
          onClick={() => setSelectSpecificNfts((prevState) => !prevState)}
        >
          {t('show-nft-button')}
        </button>
      )}
      {/*  TODO We should probably exclude the owners NFTs here */}
      {selectSpecificNfts && (
        <CollectionNftsFetcher
          contractAddresses={selectedContracts}
          selected={selectedNfts}
          onSelect={(nft) => onSelectNfts?.(toggle(selectedNfts, nft))}
        />
      )}
    </div>
  )
}
