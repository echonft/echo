import { NftList } from '@components/nft-list'
import { Nft } from '@echo/model'
import { useGetCollectionNftsForOwner } from '@lib/services/alchemy/hooks/use-get-collection-nfts-for-owner'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  contractAddresses: string[] | undefined
  selected?: Nft[]
  onSelect?: (nft: Nft) => void
}

export const OwnerNftsFetcher: FunctionComponent<Props> = ({ contractAddresses, selected, onSelect }) => {
  const t = useTranslations('Nfts')
  const nfts = useGetCollectionNftsForOwner(contractAddresses)
  if (isNil(nfts)) {
    return <span>{t('loading')}</span>
  }
  if (nfts.successful && nfts.data) {
    return <NftList nfts={nfts.data} selected={selected} onSelect={onSelect} />
  }
  return <span>{t('error')}</span>
}
