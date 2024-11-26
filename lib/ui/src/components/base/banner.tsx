import { addPictureSize } from '@echo/ui/helpers/add-picture-size'
import { themeExtension } from '@echo/ui/helpers/theme/theme'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  src: Nullable<string>
  width: number
}

export const Banner: FunctionComponent<Props> = ({ src, width }) => {
  const url = useMemo(() => {
    if (isNil(src) || width === 0) {
      return undefined
    }
    return addPictureSize(src, width)
  }, [width, src])

  if (isNilOrEmpty(url)) {
    return null
  }

  return (
    <div
      className={clsx(['absolute', 'inset-0', 'bg-no-repeat', 'bg-cover', 'bg-center', 'blur-md'])}
      style={{ backgroundImage: `${themeExtension.backgroundImage.banner}, url('${url}')` }}
    />
  )
}
