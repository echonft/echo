import { Autocomplete } from '@components/autocomplete'
import { CollectionNftsFetcher } from '@components/collection-nfts-fetcher'
import { TagManager } from '@components/tag-manager'
import { Erc721 } from '@echo/model/src/erc721'
import { Combobox } from '@headlessui/react'
import { mapCollectionSearchableObject } from '@lib/mappers/map-collection-searchable-object'
import { addIfNotThere, toggle } from '@lib/utils/array'
import { SearchableObject } from '@lib/view-models/object'
import { shortenAddress } from '@usedapp/core'
import clsx from 'clsx'
import { getAddress, isAddress } from 'ethers/lib/utils'
import { isEmpty, isNil } from 'ramda'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslations } from 'use-intl'

interface Props {
  contractAddresses: string[]
  onSelectContracts?: (contractAddresses: string[]) => void
  onSelectNfts?: (nfts: Erc721[]) => void
}

export const CreateOfferSellBuyOptions: React.FunctionComponent<Props> = ({
  contractAddresses,
  onSelectContracts,
  onSelectNfts
}) => {
  const t = useTranslations('CreateOffer.sell')
  const [selectedContracts, setSelectedContracts] = useState<SearchableObject<string>[]>([])
  const [searchQuery, setSearchQuery] = useState<string>()
  const [selectSpecificNfts, setSelectSpecificNfts] = useState<boolean>(false)
  const [selectedNfts, setSelectedNfts] = useState<Erc721[]>([])
  const [showSummary, setShowSummary] = useState<boolean>(false)

  const autocompleteOptions = useCallback(() => {
    const searchableContracts = mapCollectionSearchableObject(contractAddresses)
    if (isNil(searchQuery) || isEmpty(searchQuery)) {
      return searchableContracts
    }
    return searchableContracts.filter(
      (searchableContract) => searchableContract.value.indexOf(searchQuery.toLowerCase()) > -1
    )
  }, [contractAddresses, searchQuery])

  const updateSearchQuery = useCallback(
    (query: string) => {
      setSearchQuery(query)
    },
    [setSearchQuery]
  )

  useEffect(() => {
    onSelectContracts?.(selectedContracts.map((searchableContract) => searchableContract.value))
  }, [onSelectContracts, selectedContracts])

  useEffect(() => {
    onSelectNfts?.(selectedNfts)
  }, [onSelectNfts, selectedNfts])

  return (
    <div className={clsx('flex', 'flex-col', 'gap-2')}>
      <Autocomplete
        placeholder={t('autocomplete.placeholder')}
        name={'contract-selector'}
        searchQuery={searchQuery}
        options={autocompleteOptions()}
        onSearch={updateSearchQuery}
        onSelected={(selected) => setSelectedContracts((prevState) => addIfNotThere(prevState, selected))}
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
        tags={selectedContracts}
        onRemoveTag={(removedTag) => setSelectedContracts((prevState) => toggle(prevState, removedTag))}
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
          contractAddresses={selectedContracts.map((searchableContract) => searchableContract.value)}
          selected={selectedNfts}
          onSelect={(nft) => setSelectedNfts((prevState) => toggle(prevState, nft))}
        />
      )}
      <button className={clsx('rounded', 'text-white', 'p-2', 'bg-blue-500')} onClick={() => setShowSummary(true)}>
        {t('submit')}
      </button>
    </div>
  )
}
