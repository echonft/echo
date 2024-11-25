import type { OfferState } from '@echo/model/constants/offer-state'
import { CardImage } from '@echo/ui/components/base/card/card-image'
import { CardPictureLayout } from '@echo/ui/components/base/card/layout/card-picture-layout'
import { OfferCardStatus } from '@echo/ui/components/offer/card/offer-card-status'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  pictureUrl: Nullable<string>
  label: string
  state: OfferState
}

export const OfferCardPicture: FunctionComponent<Props> = ({ pictureUrl, label, state }) => {
  return (
    <CardPictureLayout>
      <CardImage src={pictureUrl} alt={label} />
      <div className={clsx('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
        <OfferCardStatus state={state} />
      </div>
    </CardPictureLayout>
  )
}
