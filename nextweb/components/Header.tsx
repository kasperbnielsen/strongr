import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  let [currentPage, setCurrentPage] = useState(0);

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
    <motion.div className='p-12'>
      <motion.div>
        <Link href='/' className='flex my-auto gap-4 items-center'>
          <Image src='logo.svg' width={50} height={50} alt={'logo'} className=''></Image>
          <p className='text-slate-200 text-4xl font-medium'>
            STRON<span className='text-blue-500'>GR</span>
          </p>
        </Link>
      </motion.div>
      <motion.div className='flex flex-row gap-8 justify-center '>
        <Link href='/' className={currentPage === 0 ? 'text-blue-600' : 'text-black'} onClick={() => setCurrentPage(0)}>
          <p>Home</p>
        </Link>
        <Link
          href='/features'
          className={currentPage === 1 ? 'text-blue-600' : 'text-black'}
          onClick={() => setCurrentPage(1)}
        >
          <p>Features</p>
        </Link>
        <Link
          href='/about'
          className={currentPage === 2 ? 'text-blue-600' : 'text-black'}
          onClick={() => setCurrentPage(2)}
        >
          <p>About</p>
        </Link>
        <Link
          href='/pricing'
          className={currentPage === 3 ? 'text-blue-600' : 'text-black'}
          onClick={() => setCurrentPage(3)}
        >
          <p>Pricing</p>
        </Link>
        <Link
          href='/contact'
          className={currentPage === 4 ? 'text-blue-600' : 'text-black'}
          onClick={() => setCurrentPage(4)}
        >
          <p>Contact</p>
        </Link>
      </motion.div>
    </motion.div>
  );
}
