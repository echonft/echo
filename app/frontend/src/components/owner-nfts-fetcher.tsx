import { NftList } from '@components/nft-list'
import { Nft } from '@echo/model'
import { useGuildNftsForUser } from '@lib/../../../../lib/alchemy-react/src/hooks/use-guild-nfts-for-user'
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
  const nfts = useGuildNftsForUser(contractAddresses)
  if (isNil(nfts)) {
    return <span>{t('loading')}</span>
  }
  if (nfts.successful && nfts.data) {
    return <NftList nfts={nfts.data} selected={selected} onSelect={onSelect} />
  }
  return <span>{t('error')}</span>
}
