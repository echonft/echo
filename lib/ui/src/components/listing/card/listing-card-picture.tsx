import type { ListingState } from '@echo/model/constants/listing-state'
import { CardImage } from '@echo/ui/components/base/card/card-image'
import { CardPictureLayout } from '@echo/ui/components/base/card/layout/card-picture-layout'
import { ListingCardStatus } from '@echo/ui/components/listing/card/listing-card-status'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  pictureUrl: Nullable<string>
  label: string
  state: ListingState
}

export const ListingCardPicture: FunctionComponent<Props> = ({ pictureUrl, label, state }) => {
  return (
    <CardPictureLayout>
      <CardImage src={pictureUrl} alt={label} />
      <div className={clsx('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
        <ListingCardStatus state={state} />
      </div>
    </CardPictureLayout>
  )
}
