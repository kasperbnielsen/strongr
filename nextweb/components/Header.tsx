import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function Header() {
  let [currentPage, setCurrentPage] = useState(0);
  let route = useRouter();

  const fade = {
    hidden: { opacity: 0, y: -100 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <motion.div className='p-12 justify-self-center w-screen'>
      <motion.div>
        <Link href='/' className='flex my-auto gap-4 items-center'>
          <Image src='logo.svg' width={50} height={50} alt={'logo'} className=''></Image>
          <p className='text-slate-200 text-4xl font-medium'>
            STRON<span className='text-blue-500'>GR</span>
          </p>
        </Link>
      </motion.div>
      <motion.div className='flex flex-row gap-8 justify-center'>
        <Link href='/' className={route.pathname === '/' ? 'text-blue-600' : 'text-white'}>
          <p>Home</p>
        </Link>
        <Link href='/features' className={route.pathname === '/features' ? 'text-blue-600' : 'text-white'}>
          <p>Features</p>
        </Link>
        <Link href='/about' className={route.pathname === '/about' ? 'text-blue-600' : 'text-white'}>
          <p>About</p>
        </Link>
        <Link href='/pricing' className={route.pathname === '/pricing' ? 'text-blue-600' : 'text-white'}>
          <p>Pricing</p>
        </Link>
        <Link href='/contact' className={route.pathname === '/contact' ? 'text-blue-600' : 'text-white'}>
          <p>Contact</p>
        </Link>
      </motion.div>
    </motion.div>
  );
}
