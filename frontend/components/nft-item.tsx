import { Erc721 } from '@echo/model/erc721'
import { clsx } from 'clsx'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { isNil } from 'rambda'
import { FunctionComponent } from 'react'

interface Props {
  nft: Erc721
  selected?: boolean
  onSelect?: (nft: Erc721) => void
}

// TODO find a placeholder if there is no image
export const NftItem: FunctionComponent<Props> = ({ nft, selected, onSelect }) => {
  const t = useTranslations('Nfts')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-2', 'border', 'rounded', 'items-center', 'shrink', 'p-2')}>
      <div className={clsx('relative', 'w-56', 'h-56')}>
        {!isNil(nft.imageUri) && <Image src={nft.imageUri} alt={nft.name} fill />}
      </div>
      <span>{nft.name}</span>
      <span>{nft.id}</span>
      {!isNil(selected) && (
        <button
          className={clsx('rounded', 'text-white', 'p-2', selected ? 'bg-red-500' : 'bg-green-500')}
          onClick={() => onSelect?.(nft)}
        >
          {selected ? t('unselect') : t('select')}
        </button>
      )}
    </div>
  )
}
