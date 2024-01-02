import Footer from '@/components/Footer';
import Header from '@/components/Header';
import type { AppProps } from 'next/app';
import { motion } from 'framer-motion';
import 'tailwindcss/tailwind.css';
import Image from 'next/image';

import bg from '../public/desktop-bg.svg';

const fadeHeader = {
  hidden: { opacity: 0.1, y: -100 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

const fadeContent = {
  hidden: { opacity: 0, y: -100 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1,
      duration: 1,
    },
  },
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='w-full h-full min-h-screen -z-10'>
      <Image src='/desktop-bg.svg' objectFit='cover' layout='fill' alt='' priority className=' h-screen' />
      <div className=' container mx-auto absolute'>
        <motion.div variants={fadeHeader} initial='hidden' animate='show'>
          <Header />
        </motion.div>
        <motion.div
          className='p-12 h-auto z-10 flex justify-center w-screen'
          variants={fadeContent}
          initial='hidden'
          animate='show'
        >
          <Component {...pageProps} />
        </motion.div>
      </div>
    </div>
  );
}
