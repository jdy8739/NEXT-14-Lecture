'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  HomeIcon as SolidHomeIcon,
  NewspaperIcon as SolidNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon,
  VideoCameraIcon as SolidVideoCameraIcon,
  UserIcon as SolidUserIcon,
} from '@heroicons/react/24/solid';
import {
  HomeIcon as OutlineHomeIcon,
  NewspaperIcon as OutlineNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
  VideoCameraIcon as OutlineVideoCameraIcon,
  UserIcon as OutlineUserIcon,
} from '@heroicons/react/24/outline';

const TabBar = () => {
  const pathname = usePathname();

  return (
    <nav className="h-16 p-2 grid grid-cols-5 border-neutral-600 border-t-2">
      <span className="text-center">
        <Link href="/products">
          {pathname === '/products' ? (
            <SolidHomeIcon className="size-6 w-full" />
          ) : (
            <OutlineHomeIcon className="size-6 w-full" />
          )}
          <span>홈</span>
        </Link>
      </span>
      <span className="text-center">
        <Link href="/life">
          {pathname === '/life' ? (
            <SolidNewspaperIcon className="size-6 w-full" />
          ) : (
            <OutlineNewspaperIcon className="size-6 w-full" />
          )}
          <span>동네생활</span>
        </Link>
      </span>
      <span className="text-center">
        <Link href="/chats">
          {pathname === '/chats' ? (
            <SolidChatIcon className="size-6 w-full" />
          ) : (
            <OutlineChatIcon className="size-6 w-full" />
          )}
          <span>채팅</span>
        </Link>
      </span>
      <span className="text-center">
        <Link href="/live">
          {pathname === '/live' ? (
            <SolidVideoCameraIcon className="size-6 w-full" />
          ) : (
            <OutlineVideoCameraIcon className="size-6 w-full" />
          )}
          <span>쇼핑</span>
        </Link>
      </span>
      <span className="text-center">
        <Link href="/profile">
          {pathname === '/profile' ? (
            <SolidUserIcon className="size-6 w-full" />
          ) : (
            <OutlineUserIcon className="size-6 w-full" />
          )}
          <span>나의 당근</span>
        </Link>
      </span>
    </nav>
  );
};

export default TabBar;
