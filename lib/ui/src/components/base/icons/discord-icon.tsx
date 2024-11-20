import { Icon } from '@echo/ui/components/base/icons/icon'
import { DiscordIconSvg } from '@echo/ui/components/base/svg/discord-icon-svg'
import { type FunctionComponent } from 'react'

export const DiscordIcon: FunctionComponent = () => {
  return (
    <Icon>
      <DiscordIconSvg width={19} height={15} />
    </Icon>
  )
}
