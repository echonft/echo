import { Dialog } from '@headlessui/react'
import React, { PropsWithChildren, ReactElement, useState } from 'react'

interface Props {
  open?: boolean
  title?: string
  description?: string
  cancelTitle?: string
  acceptTitle?: string
  onAccept?: VoidFunction
  renderAccept?: () => ReactElement
}

export const Modal: React.FunctionComponent<PropsWithChildren<Props>> = ({
  open = true,
  title,
  description,
  cancelTitle,
  acceptTitle,
  onAccept,
  renderAccept,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(open)
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
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
    </Dialog>
  )
}
