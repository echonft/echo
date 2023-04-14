import { WebsiteIconSvg } from '../svg/website-icon-svg'
import { IconContainer } from './icon-container'
import { getIconMeasure, IconSize } from './icon-size'
import React, { FunctionComponent } from 'react'

export interface WebsiteIconProps {
  size: IconSize
}

export const WebsiteIcon: FunctionComponent<WebsiteIconProps> = ({ size }) => {
  const measurements = Math.floor(getIconMeasure(size) * 0.6)
  return (
    <IconContainer size={size}>
      <WebsiteIconSvg width={measurements} height={measurements} />
    </IconContainer>
  )
}
