import { CollapsibleProps } from '../../../types/collapsible-props'
import { DownCaretSvg } from '../svg/down-caret-svg'
import { clsx } from 'clsx'
import { FunctionComponent, PropsWithChildren, ReactNode } from 'react'

interface Props extends PropsWithChildren, CollapsibleProps {
  renderTitle?: () => ReactNode
}

export const BottomSlider: FunctionComponent<Props> = ({ renderTitle, collapsed, onToggleCollapsed, children }) => {
  return (
    <div className={clsx('fixed', 'bottom-0', 'right-2', 'bg-main-gradient', 'rounded-t-md')}>
      <div className={clsx('flex', 'flex-col', 'm-0.5', 'mb-0', 'bg-black', 'rounded-t-md')}>
        <div className={clsx('flex', 'py-3', 'pl-5', 'pr-2.5', 'items-center', 'justify-between', 'gap-72')}>
          <>{renderTitle?.()}</>
          <span
            className={clsx(
              'text-white/50',
              'transition-transform',
              collapsed && 'rotate-180',
              'rounded-full',
              'w-[40px]',
              'h-[40px]',
              'bg-white/10',
              'flex',
              'justify-center',
              'items-center',
              'cursor-pointer'
            )}
            onClick={() => onToggleCollapsed?.(!collapsed)}
          >
            <DownCaretSvg width={22} height={14} className={clsx('[&>path]:fill-opaque')} />
          </span>
        </div>
        {!collapsed && <div>{children}</div>}
      </div>
    </div>
  )
}
