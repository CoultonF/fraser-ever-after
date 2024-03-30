import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
export const ImageModal = ({modalImage, astroImage}:any) => {
  let [open, setOpen] = useState(false)
  return (
    <>
    <button type='button' className='' onClick={()=>{
      setOpen(true);
    }}>
    {astroImage}
    </button>
    <Transition.Root show={open} as={Fragment}>

      <Dialog as="div" className="relative z-10"  onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen h-[calc(100svh)]">
          <div className=" min-h-full h-full items-end justify-center p-4 md:p-10 text-center sm:items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="bg-white w-full h-full p-4">
              <button type='button' className='outline-none outline-rosette-300 font-bold absolute border flex items-center text-center align-middle justify-center border-black rounded-md px-2 z-50 top-4 right-4' onClick={()=>{setOpen(false)}}>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className='h-4 w-4'><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                <span className='h-full'>Close</span></button>
              {modalImage}
              </Dialog.Panel>
        </Transition.Child>
          </div>
          </div>

      </Dialog>

    </Transition.Root>
    </>
  )
}