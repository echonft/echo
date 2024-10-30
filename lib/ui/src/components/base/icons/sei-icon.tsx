import { Icon } from '@echo/ui/components/base/icons/icon'
import { IconColor } from '@echo/ui/components/base/icons/icon-color'
import { SeiIconSvg } from '@echo/ui/components/base/svg/sei-icon-svg'
import { Size } from '@echo/ui/constants/size'
import { getIconSizeInPx } from '@echo/ui/helpers/get-icon-size-in-px'
import { type FunctionComponent } from 'react'

interface Props {
  size?: Size
}

export const SeiIcon: FunctionComponent<Props> = ({ size = Size.MD }) => {
  const sizeInPx = Math.floor(getIconSizeInPx(size) * 0.9)
  return (
    <Icon size={size}>
      <IconColor className={'!bg-dark-500'}>
        <SeiIconSvg width={sizeInPx} height={sizeInPx} />
      </IconColor>
    </Icon>
  )
}
