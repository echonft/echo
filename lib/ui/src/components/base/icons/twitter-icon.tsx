import { Icon } from '@echo/ui/components/base/icons/icon'
import { TwitterIconSvg } from '@echo/ui/components/base/svg/twitter-icon-svg'
import { type FunctionComponent } from 'react'

export const TwitterIcon: FunctionComponent = () => {
  return (
    <Icon>
      <TwitterIconSvg width={22} height={18} />
    </Icon>
  )
}
