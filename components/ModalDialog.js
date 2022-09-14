import { Dialog } from "@headlessui/react";
import Button from "./Button";

export default function ModalDialog({ open, onClose, title, description, children, actionTitle, actionOnClick, cancel }) {
    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            {/* <div className="fixed inset-0 bg-black/30" aria-hidden="true" /> */}
            <div className="fixed inset-0 flex items-center justify-center">
                <Dialog.Panel className="mx-auto max-w-sm bg-orange-50 border-2 border-black p-8 flex flex-col gap-3 shadow-brick-to-r">
                    <Dialog.Title
                        className="text-2xl font-bold leading-6 text-gray-900">{title}</Dialog.Title>
                    {description && <div>{description}</div>}
                    {children && children}
                    <Button onClick={actionOnClick}>{actionTitle}</Button>
                    <Button onClick={cancel}>Cancel</Button>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}