import styles from './Banner.module.css'
import { LuSettings2 } from "react-icons/lu";
import { FaLaptopCode } from 'react-icons/fa6';
import { IoShareSocialOutline } from "react-icons/io5";
import TagBox from './TagBox';


const Banner = () => {
  return (
    <div className={`${styles.bannerImg} rounded-lg md:rounded-xl py-10 md:py-20 xl:py-36 md:px-10 lg:px-16 text-white  lg:grid grid-cols-12 gap-6 md:gap-10 items-center px-5`}>
      <div className="flex flex-col mx-auto justify-center w-full rounded-3xl space-y-5 col-span-5 mb-6 lg:mb-0 text-center lg:text-left">
        <h2 className='text-4xl font-extrabold leading-snug'>Welcome to the <span className='text-c-primary'>Craze</span><span className='text-c-secondary'>Forum</span></h2>
        <p>This is the place to talk about anything and everything. Start new topics, share your ideas, and chat with others.</p>
        <form className='flex mx-auto lg:m-0 justify-center lg:justify-start bg-white dark:bg-neutral-800 w-full rounded-3xl p-[3px] max-w-sm'>
          <input type="text" placeholder="Search by Tags" className='rounded-l-3xl w-full pl-4 py-2 dark:bg-neutral-800 outline-none text-neutral-800 dark:text-white' />
          <input type="submit" className='px-4 font-medium bg-c-primary rounded-3xl py-2' />
        </form>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 justify-center md:gap-6 gap-3 w-full col-span-7'>
        <TagBox
          Icon={LuSettings2}
          title={'Technology'}>
        </TagBox>

        <TagBox
          Icon={FaLaptopCode}
          title={'Coding'}>
        </TagBox>

        <TagBox
          Icon={IoShareSocialOutline}
          title={'Social'}>
        </TagBox>
        <TagBox
          Icon={LuSettings2}
          title={'Technology'}>
        </TagBox>

        <TagBox
          Icon={FaLaptopCode}
          title={'Coding'}>
        </TagBox>

        <TagBox
          Icon={IoShareSocialOutline}
          title={'Social'}>
        </TagBox>



      </div>
    </div>
  );
};

export default Banner;