import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeContent } from '../_app';

export default function Pricing() {
  return (
    <motion.div variants={fadeContent} className='flex justify-center' initial='hidden' animate='show'>
      <div className='grid grid-cols-2 gap-12'>
        <div className='bg-white rounded-xl w-auto p-12 flex flex-col gap-y-4'>
          <p className='text-6xl'>Free</p>
          <p className='opacity-50 text-3xl'>No payment information needed</p>
          <ul className='text-xl gap-y-2 flex flex-col mt-12'>
            <li className='flex gap-x-2'>
              <Image src={'/checkmark.svg'} alt={''} width={20} height={20} />
              <span>Coming soon</span>
            </li>
            <li className='flex gap-x-2'>
              <Image src={'/checkmark.svg'} alt={''} width={20} height={20} />
              <span>Coming soon</span>
            </li>
            <li className='flex gap-x-2'>
              <Image src={'/checkmark.svg'} alt={''} width={20} height={20} />
              <span>Coming soon</span>
            </li>
            <li className='flex gap-x-2'>
              <Image src={'/checkmark.svg'} alt={''} width={20} height={20} />
              <span>Coming soon</span>
            </li>
          </ul>
          <button className='bg-blue-500 w-auto self-center p-3 rounded-2xl mt-24'> Sign up for free </button>
        </div>
        <div className='bg-white rounded-xl w-auto  p-12 flex flex-col gap-y-4'>
          <p className='text-6xl'>Premium</p>
          <p className='opacity-50 text-3xl'>Coming soon</p>
          <ul className='text-xl gap-y-2 flex flex-col mt-12'>
            <li className='flex gap-x-2'>
              <Image src={'/checkmark.svg'} alt={''} width={20} height={20} />
              <span>Coming soon</span>
            </li>
            <li className='flex gap-x-2'>
              <Image src={'/checkmark.svg'} alt={''} width={20} height={20} />
              <span>Coming soon</span>
            </li>
            <li className='flex gap-x-2'>
              <Image src={'/checkmark.svg'} alt={''} width={20} height={20} />
              <span>Coming soon</span>
            </li>
            <li className='flex gap-x-2'>
              <Image src={'/checkmark.svg'} alt={''} width={20} height={20} />
              <span>Coming soon</span>
            </li>
          </ul>
          <button className='bg-blue-400 w-auto self-center p-3 rounded-2xl mt-24' disabled>
            Sign up for premium
          </button>
        </div>
      </div>
    </motion.div>
  );
}
