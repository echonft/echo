import type { ListingState } from '@echo/model/constants/listing-state'
import { StackPictureLayout } from '@echo/ui/components/base/stack/layout/stack-picture-layout'
import { StackImage } from '@echo/ui/components/base/stack/stack-image'
import { ListingCardStatus } from '@echo/ui/components/listing/card/listing-card-status'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  pictureUrl: Nullable<string>
  label: string
  state: ListingState
  scaleDisabled?: boolean
}

export const ListingStackPicture: FunctionComponent<Props> = ({ pictureUrl, label, state, scaleDisabled }) => {
  return (
    <StackPictureLayout>
      <StackImage src={pictureUrl} alt={label} scaleDisabled={scaleDisabled} />
      <div className={clsx('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
        <ListingCardStatus state={state} />
      </div>
    </StackPictureLayout>
  )
}
