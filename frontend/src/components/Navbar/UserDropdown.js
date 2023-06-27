import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useSnackbar } from 'notistack'
import {logoutUser} from "../../actions/userAction.js"
import LoginIcon from '@mui/icons-material/Login';

const admin =  { name: 'Admin Dashboard', href: '/admin/dashboard', icons: <DashboardIcon sx={{ fontSize: "18px" }} /> };
const signout ={ name: 'Sign out', icons: <LogoutIcon sx={{ fontSize: "18px" }} /> };
const signIn ={ name: 'Sign In', icons: <LoginIcon sx={{ fontSize: "18px" }} /> };
const nouser = {url:"https://w7.pngwing.com/pngs/683/60/png-transparent-man-s-profile-illustration-computer-icons-user-profile-profile-ico-photography-silhouette-desktop-wallpaper-thumbnail.png"};

const userNavigation = [
  { name: 'Your Profile', href: '/account', icons: <AccountCircleIcon sx={{ fontSize: "18px" }} /> },
  { name: 'Orders',       href: "/orders",   icons: <ShoppingBagIcon sx={{ fontSize: "18px" }} /> },
  { name: 'Wishlist',     href: '/wishlist', icons: <FavoriteIcon sx={{ fontSize: "18px" }} /> },
  { name: 'Settings',     href: '#', icons: <SettingsIcon sx={{ fontSize: "18px" }} /> },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function UserDropdown() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { isAuthenticated, user } = useSelector((state) => state.user);
    
    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
        enqueueSnackbar("Logout Successfully", { variant: "success" });
    }
    

    // if(!isAuthenticated || !user) return <>loading...</>

  return (
    <Menu as="div" className="relative ml-3">
    <div>
      <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm ">
        <span className="sr-only">Open user menu</span>
        <img className="h-9 w-9 rounded-full" src={isAuthenticated ? user.avatar.url : nouser.url} alt="" />
        </Menu.Button>
    </div>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {
           user && user.role === 'admin' && 
            <Menu.Item key={admin.name}>
            {({ active }) => (
              <Link
                to={admin.href}
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700'
                )}
              >
                <div className='p-1 ps-0 font-medium flex '>
                  <div className=' pe-2'>    
                      {admin.icons}
                  </div>
                <div className='w-100'>
                  {admin.name}
                </div>
                </div>
              </Link>
            )}
          </Menu.Item>
        }


        {userNavigation.map((item) => (
          <Menu.Item key={item.name}>
            {({ active }) => (
              <Link
                to={item.href}
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700'
                )}
              >
                <div className='p-1 ps-0 font-medium flex '>
                <div className=' pe-2'>    
                    {item.icons}
                </div>
                <div className='w-100'>
                {item.name}
                </div>
                </div>
              </Link>
            )}
          </Menu.Item>
        ))}


        {
            isAuthenticated === true ?
            <Menu.Item key={signout.name}>
            {({ active }) => (
              <div
                onClick={handleLogout}
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700'
                )}
              >
                <div className='p-1 ps-0 font-medium flex '>
                <div className=' pe-2'>    
                    {signout.icons}
                </div>
                <div className='w-100'>
                {signout.name}
                </div>
                </div>              </div>
            )}
          </Menu.Item>
          :
          <Menu.Item key={signout.name}>
            {({ active }) => (
              <Link
                to='/login'
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700'
                )}
              >
                <div className='p-1 ps-0 font-medium flex '>
                <div className=' pe-2'>    
                    {signIn.icons}
                </div>
                <div className='w-100'>
                  {signIn.name}
                </div>
                </div>
              </Link>
            )}
          </Menu.Item>
        }
      </Menu.Items>
    </Transition>
  </Menu>

  )
}
