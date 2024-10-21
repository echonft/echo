import type { Erc1155Item } from '@echo/model/types/item/erc1155-item'
import type { Erc721Item } from '@echo/model/types/item/erc721-item'
import { SizeableImage } from '@echo/ui/components/base/sizeable-image'
import clsx from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  item: Erc1155Item | Erc721Item
}

export const TradeCardPicture: FunctionComponent<Props> = ({ item }) => (
  <div className={clsx('w-full', 'h-full', 'relative')}>
    <SizeableImage
      className={clsx('select-none', 'w-full', 'h-full', 'object-center', 'object-contain')}
      width={88}
      height={88}
      src={item.token.pictureUrl}
      alt={item.token.tokenId.toString()}
    />
    <div
      className={clsx(
        'absolute',
        'top-0',
        'bg-gradient-to-b',
        'from-transparent',

        'to-black',
        'h-full',
        'w-full'
      )}
    />
  </div>
)
