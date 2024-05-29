import { Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { map, range } from 'ramda'
import type { FunctionComponent } from 'react'

export interface LoginStepIndicatorProps {
  step: 1 | 2 | 3
}

export const LoginStepIndicator: FunctionComponent<LoginStepIndicatorProps> = ({ step }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-x-4')}>
      {map(
        (index) => (
          <div key={index} className={clsx('h-[0.4375rem]', 'w-[5.5625rem]', 'rounded-sm', 'bg-white/5')}>
            {
              <Transition
                className={clsx('transition-all', 'duration-500', 'ease-in-out', 'overflow-x-hidden')}
                as={'div'}
                show={step >= index}
                enterFrom="transform scale-95 opacity-0 max-w-0"
                enterTo="transform scale-100 opacity-100 max-w-full"
                leaveFrom="transform scale-100 opacity-100 max-w-full"
                leaveTo="transform scale-95 opacity-0 max-w-0"
              >
                <div key={index} className={clsx('h-[0.4375rem]', 'w-[5.5625rem]', 'rounded-sm', 'bg-yellow-500')} />
              </Transition>
            }
          </div>
        ),
        range(1, 4)
      )}
    </div>
  )
}
