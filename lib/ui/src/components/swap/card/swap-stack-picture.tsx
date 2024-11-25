import { StackPictureLayout } from '@echo/ui/components/base/stack/layout/stack-picture-layout'
import { StackImage } from '@echo/ui/components/base/stack/stack-image'
import type { Nullable } from '@echo/utils/types/nullable'
import { type FunctionComponent } from 'react'

interface Props {
  pictureUrl: Nullable<string>
  label: string
}

export const SwapStackPicture: FunctionComponent<Props> = ({ pictureUrl, label }) => {
  return (
    <StackPictureLayout>
      <StackImage src={pictureUrl} alt={label} />
    </StackPictureLayout>
  )
}
