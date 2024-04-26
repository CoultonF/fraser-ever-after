import React, { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { inviteAtom } from "@/components/inviteStore.ts";
import { classNames } from '@/functions/classNames.ts';
import {LoadingIcon} from './LoadingIcon.tsx';


export default function Menu({pathname, menuImage}: {pathname:string, menuImage: any}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(true)
  const inviteId = inviteAtom.get()
  const [navigation] = React.useState([
    { name: 'Gallery', href: '/', id: 'gallery-menu-href' },
    { name: 'R.S.V.P.', href: `/invite${inviteId.length>0 ? '/' + inviteId:''}`, id: 'invite-menu-href'},
    { name: 'Schedule', href: `/schedule${inviteId.length > 0 ? '/' + inviteId : ''}`, id: 'schedule-menu-href'},
    { name: 'Registry', href: `/registry${inviteId.length > 0 ? '/' + inviteId : ''}`, id: 'registry-menu-href'},
    { name: 'Trivia', href: `/trivia${inviteId.length>0 ? '/' + inviteId : ''}`, id: 'trivia-menu-href'},
    { name: 'FAQ', href: `/faq${inviteId.length>0 ? '/' + inviteId : ''}`, id: 'faq-menu-href'},
    // { name: 'Save The Date', href: '/save-the-date', id: 'save-the-date-menu-href'},
  ])
  React.useEffect(() => {
    setMobileMenuOpen(false)
  },[])
  const setClicked = (name: string) => {
    setTimeout(() => {
      setClickedState(name)
    }, 100)
  } 
  const [clicked, setClickedState] = React.useState<string | null>(null)

  return (
    <header className="w-full border-b border-slate-500 ">
      <nav className="mx-auto flex-col max-w-7xl items-center justify-center p-2 md:px-8" aria-label="Global">
        {pathname === '/' && <div className='flex w-full justify-center'><h1 className='p-2 font-serif text-4xl'>Stephanie & Coulton</h1></div>}
        <div className="flex md:hidden flex-grow relative">
          <button
            type="button"
            title='Open Menu'
            className="absolute top-0 left-0 h-full text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
            </svg>
          </button>
          <h1 className='w-full font-serif text-3xl tracking-wider text-center'>
      {navigation.find(item => item.href === pathname)?.name}
          </h1>
        </div>
        <div className="hidden md:flex justify-center md:gap-x-12">
          {navigation.map((item) => (
            <div className='relative'>
            <a key={item.name} id={item.id} onClick={()=>setClicked(item.name)} href={item.href} className={classNames("text-sm  leading-6 text-gray-900 hover:bg-rosette-300 hover:bg-opacity-30", pathname === item.href && 'font-bold', clicked === item.name && 'font-bold')}>
              {item.name}
            </a>
            {clicked === item.name && (<div className='border border-rosette-400 absolute inset-y-0 right-0 left-0 bg-rose-300 bg-opacity-30 rounded-lg justify-end items-center pr-2 flex -mr-6 -mx-3'>
              <div className='fill-rosette-500 h-3 w-3'>
                <LoadingIcon/>
              </div>
            </div>)}
            </div>
          ))}
        </div>
      </nav>
      <Dialog as="div" className="md:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <Dialog.Panel className="flex flex-col overflow-none fixed inset-y-0 right-0 z-50 w-full  h-full bg-white px-6 py-6 md:max-w-sm md:ring-1 md:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="h-full mt-6 flow-root">
            <div className="h-full -my-6 divide-y divide-gray-500/10">
              <div className="flex h-full flex-col space-y-2 pt-6">
                {navigation.map((item) => (
                  <div className='relative'>
                  <a
                    key={item.name}
                    id={`${item.id}-mobile`}
                    onClick={()=>setClickedState(item.name)} 
                    href={item.href}
                    className={classNames("-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900",
                      pathname === item.href && ' underline font-bold',
                      item.name === clicked && ' underline font-bold')}
                  >
                    {item.name}
                  </a>
                  {clicked === item.name && (<div className='border border-rosette-400 absolute inset-y-0 right-0 left-0 bg-rose-300 bg-opacity-30 rounded-lg justify-end items-center pr-2 flex -ml-3'>
                    <div className='fill-rosette-500 h-4 w-4'>
                      <LoadingIcon/>
                    </div>
                  </div>
                )}
              </div>
                ))}

                <div className="flex-grow overflow-hidden">
                  <img title='bouquet of flowers' src={menuImage} className='object-contain'/>
                  </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}