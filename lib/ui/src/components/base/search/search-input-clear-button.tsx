import { XIconSvg } from '@echo/ui/components/base/svg/x-icon-svg'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { type FunctionComponent, type MouseEventHandler } from 'react'

interface Props {
  show?: boolean
  onClick?: MouseEventHandler
}

export const SearchInputClearButton: FunctionComponent<Props> = ({ show, onClick }) => {
  if (show) {
    return (
      <motion.div
        className={clsx('absolute', 'right-3', 'top-3', 'z-20')}
        transition={{ ease: 'easeOut', duration: 0.4 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button className={clsx('flex', 'justify-center', 'items-center', 'w-6', 'h-6')} onClick={onClick}>
          <span
            className={clsx(
              'flex',
              'justify-center',
              'items-center',
              'w-4',
              'h-4',
              'rounded-full',
              'border-solid',
              'border-2',
              'border-yellow-500',
              'text-yellow-500'
            )}
          >
            <XIconSvg width={8} height={8} />
          </span>
        </button>
      </motion.div>
    )
  }
  return null
}
