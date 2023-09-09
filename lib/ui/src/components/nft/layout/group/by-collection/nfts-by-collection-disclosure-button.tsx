import { CollapsibleProps } from '../../../../../types/collapsible-props'
import { DownCaretSvg } from '../../../../base/svg/down-caret-svg'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props extends CollapsibleProps {
  collectionName: string
}

export const NftsByCollectionDisclosureButton: FunctionComponent<Props> = ({
  collectionName,
  collapsed,
  onToggleCollapsed
}) => {
  return (
    <button
      className={clsx(
        'flex',
        'flex-row',
        'h-max',
        'w-max',
        'items-center',
        'gap-2.5',
        'p-2.5',
        'prose-label-md',
        'outline-none'
      )}
      onClick={() => {
        onToggleCollapsed?.(!collapsed)
      }}
    >
      <span className={clsx('prose-label-md', 'text-white')}>{collectionName}</span>
      <span className={clsx('text-white/50', 'transition-transform', collapsed && 'rotate-180')}>
        <DownCaretSvg />
      </span>
    </button>
  )
}
