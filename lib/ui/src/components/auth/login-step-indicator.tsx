import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import { map, range } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  currentStep: number
  totalSteps: number
}

export const LoginStepIndicator: FunctionComponent<Props> = ({ totalSteps, currentStep }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-x-4')}>
      {map(
        (step) => (
          <div key={step} className={clsx('h-[0.4375rem]', 'w-[5.5625rem]', 'rounded-sm', 'bg-white/5')}>
            {
              <Transition
                className={clsx('transition-all', 'duration-500', 'ease-in-out', 'overflow-hidden')}
                show={currentStep >= step}
                enterFrom="transform scale-95 opacity-0 max-w-0"
                enterTo="transform scale-100 opacity-100 max-w-full"
                leaveFrom="transform scale-100 opacity-100 max-w-full"
                leaveTo="transform scale-95 opacity-0 max-w-0"
              >
                <div key={step} className={clsx('h-[0.4375rem]', 'w-[5.5625rem]', 'rounded-sm', 'bg-yellow-500')} />
              </Transition>
            }
          </div>
        ),
        range(0, totalSteps)
      )}
    </div>
  )
}
