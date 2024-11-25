import type { OfferState } from '@echo/model/constants/offer-state'
import { StackPictureLayout } from '@echo/ui/components/base/stack/layout/stack-picture-layout'
import { StackImage } from '@echo/ui/components/base/stack/stack-image'
import { OfferCardStatus } from '@echo/ui/components/offer/card/offer-card-status'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  pictureUrl: Nullable<string>
  label: string
  state: OfferState
}

export const OfferStackPicture: FunctionComponent<Props> = ({ pictureUrl, label, state }) => {
  return (
    <StackPictureLayout>
      <StackImage src={pictureUrl} alt={label} />
      <div className={clsx('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
        <OfferCardStatus state={state} />
      </div>
    </StackPictureLayout>
  )
}
