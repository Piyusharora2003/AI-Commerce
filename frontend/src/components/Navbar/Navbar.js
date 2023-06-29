import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import UserDropdown from './UserDropdown';
import Searchbar from './Searchbar';
import { useSnackbar } from 'notistack';
import { logoutUser } from '../../actions/userAction';
import CartIcon from './CartIcon';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const LogoUrl = "https://github.com/Piyusharora2003/blog/assets/74443858/053e2178-888d-4d81-879f-ae7b1d9b586f";

const navigation = {
  categories: [
    {
      id: 'Categories',
      name: 'Categories',
      featured: [
        {
          name: 'New Arrivals1',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'New Arrivals2',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'New Arrivals3',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'New Arrivals4',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'New Arrivals5',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'New Arrivals6',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
    },
  ],
  

}


export default function Navbar(){
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { isAuthenticated } = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    
    const handleLogout = () => {
      dispatch(logoutUser());
      setOpen(false);
      enqueueSnackbar("Logout Successfully", { variant: "success" });
    }
    return (
      <div className="bg-white">

      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full  flex-col overflow-y-auto bg-white pb-12 shadow-xl" style={{"maxWidth":"75%"}}>
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 pe-5 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                  </button>
                  <Link to={'/login'} className='w-full h-full'>
                    <img src={LogoUrl} className='w-8/12 ms-1 me-auto max-h-full	' alt='AI Commerce'/>
                  </Link>
                </div>

                {/* Links  square boxes on opening dialog box mobile view*/}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                        <div className="grid grid-cols-2 gap-x-4 ">
                          {category.featured.map((item) => (
                            <div key={item.name} className="group mb-6 relative text-center text-sm">
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                              </div>
                                <div>
                                  {item.name}  
                                </div>
                            </div>
                          ))}
                        </div>
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>


                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    {
                      isAuthenticated ? 
                      <button className="-m-2 block p-2 font-medium text-gray-900" onClick={()=>handleLogout()}>
                          Log Out
                      </button>
                      :                     
                        <Link to={'/login'} onClick={()=>setOpen(false)} className="-m-2 block p-2 font-medium text-gray-900">
                            Sign In
                        </Link>
                    }
                  </div>
                </div>


              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Big Screen Menu */}
      <header className="relative bg-white z-40">
        <nav aria-label="Top" className="mx-auto max-w-7xl sm:px-6 lg:px-1">
          <div className="border-b border-gray-200">
            <div className="flex h-16 mx-2 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6 " aria-hidden="true" />
              </button>

              <div className=" flex lg:ml-0 h-full hidden lg:block">
                <Link to="/">
                  <span className="sr-only">Company's Logo</span>
                  <img
                    className="h-full  w-auto"
                    src={LogoUrl}
                    alt=""
                  />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-4 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex ">
                            <Popover.Button
                              className={`${classNames(
                                open
                                  ? 'border-indigo-600 text-indigo-600 '
                                  : ' text-gray-700 hover:text-gray-800',
                                'relative z-10 -mb-px flex  items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                              )}`}
                            >                              
                              <span className='font-bold font-sans text-lg	'>
                                {category.name}
                              </span>
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-1 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-1 grid grid-cols-5 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div key={item.name} className="group relative text-base sm:text-sm mb-4 mt-2">
                                          <div className="aspect-h-1 aspect-w-1 h-44 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover  object-center"
                                            />
                                          </div>
                                          <Link href={item.href} className=" block font-medium text-gray-900">
                                            <span className="absolute inset-0 z-10" aria-hidden="true" />
                                            {item.name}
                                          </Link>
                                        </div>
                                      ))}
                                    </div>
                        
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                </div>
              </Popover.Group>
              <div className="ms-auto flex items-center">
                <Searchbar/>
              
                <UserDropdown/>
                <CartIcon/>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}


//  Notes:
// Types of states :
//  1. open, isAuthenticated : boolean ; 
//  2. user : object;