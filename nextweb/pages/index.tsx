import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { fadeContent } from './_app';

export default function Landing() {
  return (
    <motion.div className='flex items-center justify-center' variants={fadeContent} initial='hidden' animate='show'>
      <div className='w-1/2 gap-y-24 flex flex-col'>
        <p className='text-7xl  text-white'>Track your fitness progress and more. With Strongr</p>
        <div className='flex gap-x-8'>
          <div className='flex flex-col my-auto'>
            <Link href='/'>
              <Image src='appstore.svg' alt='' width={200} height={200} />
            </Link>
            <p className='text-white justify-center flex'>Coming soon</p>
          </div>
          <div>
            <Link href='/'>
              <Image src='googleplay.svg' alt='' width={200} height={200} />
            </Link>
            <p className='text-white justify-center flex'> Coming soon </p>
          </div>
        </div>
      </div>
      <Image src='phone.svg' alt='' width={350} height={350} className='' />
    </motion.div>
  );
}
