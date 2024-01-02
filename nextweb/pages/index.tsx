import Image from 'next/image';
import Link from 'next/link';

export default function Landing() {
  return (
    <div className='flex items-center justify-center'>
      <div className='w-1/2'>
        <p className='text-7xl  text-white'>Track your fitness progress and more. With Strongr</p>
        <div className='flex gap-8'>
          <Link href='/'>
            <Image src='appstore.svg' alt='' width={200} height={200} />
          </Link>
          <Link href='/'>
            <Image src='googleplay.svg' alt='' width={200} height={200} />
          </Link>
        </div>
      </div>
      <Image src='phone.svg' alt='' width={350} height={350} className='' />
    </div>
  );
}
