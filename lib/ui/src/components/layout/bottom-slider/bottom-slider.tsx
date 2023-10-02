'use client'
import { DownCaretSvg } from '@echo/ui/components/base/svg/down-caret-svg'
import { Disclosure, Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren, ReactNode } from 'react'

interface Props {
  renderTitle?: () => ReactNode
}

export const BottomSlider: FunctionComponent<PropsWithChildren<Props>> = ({ renderTitle, children }) => (
  <Disclosure defaultOpen>
    <div className={clsx('fixed', 'bottom-0', 'right-2', 'bg-main-gradient', 'rounded-t-md', 'z-30')}>
      <div
        className={clsx('flex', 'flex-col', 'py-3', 'pl-5', 'pr-2.5', 'm-0.5', 'mb-0', 'bg-dark-500', 'rounded-t-md')}
      >
        <Disclosure.Button className={clsx('outline-none')}>
          <div className={clsx('flex', 'items-center', 'justify-between', 'gap-72')}>
            <>{renderTitle?.()}</>
            <span
              className={clsx(
                'text-white',
                'transition-transform',
                'ui-open:rotate-180',
                'rounded-full',
                'w-10',
                'h-10',
                'bg-white/10',
                'flex',
                'justify-center',
                'items-center'
              )}
            >
              <DownCaretSvg width={22} height={14} />
            </span>
          </div>
        </Disclosure.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Disclosure.Panel>{children}</Disclosure.Panel>
        </Transition>
      </div>
    </div>
  </Disclosure>
)
