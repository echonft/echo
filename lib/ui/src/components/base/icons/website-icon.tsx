import { Icon } from '@echo/ui/components/base/icons/icon'
import { WebsiteIconSvg } from '@echo/ui/components/base/svg/website-icon-svg'
import { type FunctionComponent } from 'react'

export const WebsiteIcon: FunctionComponent = () => {
  return (
    <Icon>
      <WebsiteIconSvg width={18} height={18} />
    </Icon>
  )
}
