import { BottomSlider } from './bottom-slider'
import { FunctionComponent, PropsWithChildren, ReactNode, useState } from 'react'

interface Props extends PropsWithChildren {
  renderTitle?: () => ReactNode
}

export const BottomSliderManager: FunctionComponent<Props> = ({ renderTitle, children }) => {
  const [collapsed, setCollapsed] = useState(true)
  return (
    <BottomSlider
      collapsed={collapsed}
      onToggleCollapsed={(collapsed) => setCollapsed(collapsed)}
      renderTitle={renderTitle}
    >
      {children}
    </BottomSlider>
  )
}
