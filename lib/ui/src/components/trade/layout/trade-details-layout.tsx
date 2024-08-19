import { PICTURE_SIZE_XXL } from '@echo/ui/constants/picture-size'
import { addPictureSize } from '@echo/ui/helpers/add-picture-size'
import { themeExtension } from '@echo/ui/helpers/theme/theme'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  backgroundPictureUrl?: Nullable<string>
}

export const TradeDetailsLayout: FunctionComponent<PropsWithChildren<Props>> = ({ backgroundPictureUrl, children }) => {
  const url = addPictureSize({ src: backgroundPictureUrl, width: PICTURE_SIZE_XXL })
  const isBackgroundUrlNilOrEmpty = isNilOrEmpty(backgroundPictureUrl)
  function getStyle() {
    if (isBackgroundUrlNilOrEmpty) {
      return
    }
    return {
      backgroundImage: `${themeExtension.backgroundImage.banner}, url('${url}')`,
      backgroundSize: '100% 33%'
    }
  }
  return (
    <div
      className={clsx(
        'w-full',
        'h-full',
        'select-none',
        'overflow-clip',
        !isBackgroundUrlNilOrEmpty && ['bg-no-repeat', 'bg-contain', 'bg-top']
      )}
      style={getStyle()}
    >
      <div className={clsx('flex', 'flex-col', 'gap-24', !isBackgroundUrlNilOrEmpty && 'backdrop-blur-xl')}>
        {children}
      </div>
    </div>
  )
}
