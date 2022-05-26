import { Fragment } from 'react';
import { Menu, Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { useNotifications } from '@mantine/notifications';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { toggleClassMenu } from '../redux/sharedVariables';
import NextImage from 'next/image';
import SVG from '../assets/eventlyLogo.svg';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Nav() {
  const dispatch = useDispatch();
  const router = useRouter();
  const notifications = useNotifications();

  const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'Events', href: '/events', current: false },
    { name: 'Archives', href: '#', current: false },
    { name: 'Developer', href: '#', current: false },
  ];

  const userNavigation = [
    {
      name: 'Your Profile',
      onClick: () => console.log('clicked'),
      current: true,
    },
    // { name: 'Settings', onClick: () => console.log('clicked'), current: false },
    {
      name: 'Sign out',
      onClick: async () => {
        localStorage.removeItem('userData');
        const success = await fetch('/api/auth/logout').then((res) =>
          res.json()
        );

        if (success.success) {
          notifications.showNotification({
            color: 'green',
            title: 'Logged Out',
            message: 'You are successfully logged out',
            autoClose: false,
          });
          router.push('/auth');
        } else {
          notifications.showNotification({
            color: 'red',
            title: 'Error',
            message: 'Something went wrong',
          });
        }
      },
    },
  ];

  const { userData } = useSelector((state) => state);

  const user = {
    name: `${userData.full_name}`,
    username: `${userData.username}`,
    rollNo: `${userData.roll_no}`,
    imageUrl: `${
      userData.username
        ? `https://avatars.dicebear.com/api/initials/${userData.username}.svg`
        : 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/9/92/Hinokami_Kagura_%28Zenshuchuten%29.png'
    }`,
  };

  return (
    <>
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover
        as="header"
        className={({ open }) =>
          classNames(
            open ? 'fixed text-white inset-0 z-40 overflow-y-auto' : '',
            'bg-blue-800 lg:static lg:overflow-y-visible'
          )
        }
      >
        {({ open }) => (
          <>
            <div className="max-w-screen mx-auto px-6 py-4 shadow-sm shadow-gray-700 z-50 sm:py-4 md:py-8 lg:py-4 md:px-16">
              <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                  <div className="flex-shrink-0 flex items-center">
                    <button
                      className="flex justify-center items-center"
                      onClick={() => dispatch(toggleClassMenu())}
                    >
                      <NextImage
                        width={100}
                        height={30}
                        src={SVG.src}
                        alt="nino"
                      />
                    </button>
                  </div>
                </div>
                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6"></div>
                <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>
                <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                  {/* Profile dropdown */}
                  <Menu as="div" className="flex-shrink-0 relative ml-5">
                    <div className="flex justify-center items-center gap-x-4">
                      <Menu.Button className="bg-white rounded-full flex focus:outline-none">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-9 w-9 rounded-full"
                          src={user.imageUrl}
                          alt="initials"
                        />
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
                      <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <div
                                href={item.href}
                                onClick={item.onClick}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block py-2 px-4 text-sm cursor-pointer text-gray-700'
                                )}
                              >
                                {item.name}
                              </div>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  {/* <button
                    href="#"
                    className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    New Event
                  </button> */}
                </div>
              </div>
            </div>

            <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
              <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current
                        ? 'bg-gray-100 text-gray-900'
                        : 'hover:bg-gray-50 hover:text-gray-900',
                      'block rounded-md py-2 px-3 text-base font-medium'
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.imageUrl}
                      alt="initials"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-300">
                      {`a.k.a. ${user.username} - ${user.rollNo.toUpperCase()}`}
                    </div>
                  </div>
                </div>
                <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
                  {userNavigation.map((item) => (
                    <div
                      key={item.name}
                      onClick={item.onClick}
                      className="block rounded-md cursor-pointer py-2 px-3 text-base font-medium text-white hover:bg-gray-50 hover:text-gray-900"
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </>
  );
}
