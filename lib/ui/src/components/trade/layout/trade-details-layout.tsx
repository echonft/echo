import { PICTURE_SIZE_XXL } from '@echo/ui/constants/picture-size'
import { addPictureSize } from '@echo/ui/helpers/add-picture-size'
import { themeExtension } from '@echo/ui/helpers/theme/theme'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  backgroundPictureUrl?: Nullable<string>
}

export const TradeDetailsLayout: FunctionComponent<PropsWithChildren<Props>> = ({ backgroundPictureUrl, children }) => {
  const url = addPictureSize({ src: backgroundPictureUrl, width: PICTURE_SIZE_XXL })
  function getStyle() {
    if (isNil(backgroundPictureUrl)) {
      return
    }
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
