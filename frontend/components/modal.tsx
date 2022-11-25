import { Dialog, Transition } from '@headlessui/react'
import { Fragment, FunctionComponent, PropsWithChildren, ReactElement, useState } from 'react'

interface Props {
  open?: boolean
  title?: string
  description?: string
  cancelTitle?: string
  acceptTitle?: string
  onAccept?: VoidFunction
  renderAccept?: () => ReactElement
}

export const Modal: FunctionComponent<PropsWithChildren<Props>> = ({
  open = true,
  title,
  description,
  cancelTitle,
  acceptTitle,
  onAccept,
  renderAccept,
  children
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(open)
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" open={isOpen} onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel>
            {title && <Dialog.Title>{title}</Dialog.Title>}
            {description && <Dialog.Description>{description}</Dialog.Description>}
            {children && children}
            <div className={'flex flex-row gap-2 justify-between'}>
              {cancelTitle && <button onClick={() => setIsOpen(false)}>{cancelTitle}</button>}
              {acceptTitle && (
                <button
                  onClick={() => {
                    onAccept?.()
                  }}
                >
                  {acceptTitle}
                </button>
              )}
              {renderAccept && renderAccept()}
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
