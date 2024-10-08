import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { fadeContent } from './_app';
import Head from 'next/head';

export default function Landing() {
  return (
    <motion.div className='flex items-center justify-center' variants={fadeContent} initial='hidden' animate='show'>
      <Head>
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ff0000' />
        <title>STRONGR | FITNESS APP | TRACK YOUR JOURNEY TO GET STRONGR |</title>
        <meta name='title' content='STRONGR | FITNESS APP | TRACK YOUR JOURNEY TO GET STRONGR |' />
        <meta name='description' content='Download the strongr fitness app, and track your fitness journey' />

        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://stron.gr/' />
        <meta property='og:title' content='STRONGR | FITNESS APP | TRACK YOUR JOURNEY TO GET STRONGR |' />
        <meta property='og:description' content='Download the strongr fitness app, and track your fitness journey' />
        <meta property='og:image' content='/ogimage.jpg' />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://stron.gr/' />
        <meta property='twitter:title' content='STRONGR | FITNESS APP | TRACK YOUR JOURNEY TO GET STRONGR |' />
        <meta
          property='twitter:description'
          content='Download the strongr fitness app, and track your fitness journey'
        />
        <meta property='twitter:image' content='/ogimage.jpg' />
      </Head>
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
