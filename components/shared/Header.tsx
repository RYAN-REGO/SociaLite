"use client"
import Link from "next/link";
import React from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation"

const Header = () => {
  const router = usePathname();
  
  return (
    <header className="min-h-[100px] w-full flex justify-between items-center border-b">
      <Link href="/">
        <p className=" tracking-wider h5-bold font-sans pl-10">SociaLite</p>
      </Link>
      <ul className="flex flex-row gap-10 font-semibold tracking-wider text-[17px] text-grey-400">
        <Link href='/' className={` ${router === '/' ? 'link-active' : ''}`}>Home</Link>
        <Link href='/posts/create' className={` ${router === '/posts/create' ? 'link-active' : ''}`}>Create</Link>
      </ul>
      <Link href="/posts/create" className={`pr-10 ${router === '/posts/create' ? 'hidden' : ''}`}>
        
        <div className="flex border rounded-full py-2 px-5 bg-primary-10 gap-2 cursor-pointer text-[15px] items-center max-sm:hidden tracking-wide">
        <Image
            src = '../assets/icons/pic.svg'
            width={20}
            height={16}
            alt="add"
        />
          Create a Post
        </div>
      </Link>
      <div className={`flex gap-4 items-center mr-[10vh] ${router === '/posts/create' ? 'mr-[14vh]' : ''}`}>
                    <SignedIn>
                        <UserButton afterSignOutUrl="/"/>
                        {/* <MobileNav/> */}
                    </SignedIn>
                    {/* //render something if signed out */}
                    <SignedOut>
                        <Button asChild className="bg-black hover:bg-grey-600 tracking-wider" size="lg">
                            <Link href='/sign-in'>
                                Login
                            </Link>
                        </Button>
                    </SignedOut>
                </div>
    </header>
  );
};

export default Header;
