import { Icon } from '@echo/ui/components/base/icons/icon'
import { IconColor } from '@echo/ui/components/base/icons/icon-color'
import { EthereumIconSvg } from '@echo/ui/components/base/svg/ethereum-icon-svg'
import { SIZE_MD } from '@echo/ui/constants/size'
import { getIconSizeInPx } from '@echo/ui/helpers/get-icon-size-in-px'
import { type IconSize } from '@echo/ui/types/icon-size'
import { type FunctionComponent } from 'react'

interface Props {
  size?: IconSize
}

export const EthereumIcon: FunctionComponent<Props> = ({ size = SIZE_MD }) => {
  const sizeInPx = Math.floor(getIconSizeInPx(size) * 0.9)
  return (
    <Icon size={size}>
      <IconColor className={'!bg-dark-500'}>
        <EthereumIconSvg width={sizeInPx} height={sizeInPx} />
      </IconColor>
    </Icon>
  )
}
