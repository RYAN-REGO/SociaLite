import PostForm from '@/components/shared/PostForm'
import React from 'react'
import { auth } from "@clerk/nextjs";

const page = () => {
  const { userId } : { userId: string | null} = auth();
  console.log({userId});
  return (
    <div className='flex flex-col gap-10'>
      <div className='h5-bold h-[130px] w-full flex justify-center items-center tracking-wider'>Creating a Post..</div>
      <div className="w-full min-h-[50vh] flex justify-center items-center">
        <PostForm userId={userId}/>
      </div>
    </div>
  )
}

export default page
