'use client'
import { ModalTitle } from '@echo/ui/components/base/modal/modal-title'
import type { WithClassNameProps } from '@echo/ui/types/props/with-class-name-props'
import { Description, Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { clsx } from 'clsx'
import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react'

interface Props extends WithClassNameProps {
  open: boolean
  title?: string
  onClose?: VoidFunction
}

export const Modal: FunctionComponent<PropsWithChildren<Props>> = ({ open, title, onClose, className, children }) => {
  return (
    <Dialog onClose={() => onClose?.()} open={open} className={clsx('relative', 'z-30')}>
      <DialogBackdrop
        transition
        className={clsx(
          'fixed',
          'inset-0',
          'bg-black/40',
          'backdrop-blur',
          'duration-300',
          'ease-out',
          'data-[closed]:opacity-0'
        )}
      />
      <div className={clsx('fixed', 'inset-0', 'flex', 'w-screen', 'items-center', 'justify-center')}>
        <DialogPanel
          transition
          className={clsx(
            'flex',
            'flex-col',
            'w-max',
            'h-max',
            'transform',
            'overflow-hidden',
            'border-2',
            'border-white/10',
            'rounded-2xl',
            'bg-dark-500',
            'shadow-modal',
            'duration-300',
            'ease-out',
            'data-[closed]:scale-95',
            'data-[closed]:opacity-0',
            className
          )}
        >
          <ModalTitle title={title} />
          <Description as={Fragment}>{children}</Description>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
