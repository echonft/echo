import { PICTURE_SIZE_XXL } from '@echo/ui/constants/picture-size'
import { addPictureSize } from '@echo/ui/helpers/add-picture-size'
import { themeExtension } from '@echo/ui/helpers/theme/theme'
import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  backgroundPictureUrl: string
}

export const OfferDetailsLayout: FunctionComponent<PropsWithChildren<Props>> = ({ backgroundPictureUrl, children }) => {
  const url = addPictureSize({ src: backgroundPictureUrl, width: PICTURE_SIZE_XXL })
  function getStyle() {
    return {
      backgroundImage: `${themeExtension.backgroundImage.banner}, url('${url}')`,
      backgroundSize: '100% 33%'
    }
  }
  return (
    <div
      className={clsx('w-full', 'h-full', 'bg-no-repeat', 'select-none', 'bg-contain', 'bg-top', 'overflow-clip')}
      style={getStyle()}
    >
      <div className={clsx('flex', 'flex-col', 'gap-24', 'backdrop-blur-xl')}>{children}</div>
    </div>
  )
}
