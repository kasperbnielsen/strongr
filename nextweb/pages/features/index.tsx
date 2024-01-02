import { motion } from 'framer-motion';
import { fadeContent } from '../_app';

export default function Features() {
  return (
    <motion.div
      className='flex justify-center text-center text-white text-4xl'
      variants={fadeContent}
      initial='hidden'
      animate='show'
    >
      <p> Coming soon</p>
    </motion.div>
  );
}
