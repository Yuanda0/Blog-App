import Image from 'next/image'
import React from 'react'
import { CONTENTS } from './Constants';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="z-10 border-t-2 flex md:flex flex-col w-full h-full md:mt-40 mt-20 p-10 items-center">
      <div className="flex">
        {CONTENTS.map((content) => (
          <div
            className={`flex flex-col gap-4 md:w-[200px] text-center md:p-0 p-4 items-center md:border-l-2 md:${
              content.id === 3 && "border-r-2"
            }`}
            key={content.id}
          >
            <h1>{content.text}</h1>
            <Link href={content.link} target="_blank">
              <Image
                src={content.img}
                width={60}
                height={60}
                alt={content.alt}
                className={
                    content.id === 1
                    ? "white-shadow"
                    : content.id === 2
                    ? "yellow-shadow"
                    : content.id === 3
                    ? "blue-shadow mt-5 md:mt-0"
                    : ""
                }
              />
            </Link>
          </div>
        ))}
      </div>
      <div className="flex gap-5 items-center justify-center">
        <div className="flex flex-col items-center mt-8 gap-2">
          <h1 className="font-bold mt-1">Made By Yuanda</h1>
          <Link href="https://github.com/Yuanda0" target="_blank">
            <Image
              src="https://developer.sas.com/github-resources/_jcr_content/par/styledcontainer_480618029/par/image.img.png/1558449533927.png"
              width={50}
              height={50}
              className="mt-2"
              alt="Github"
            />
          </Link>
        </div>
        <div className="mt-10 md:flex md:flex-col items-center gap-5 py-4 hidden">
          <h1 className="font-bold">Join To Our Discord Server!</h1>
          <Link href="https://discord.gg/MJEZkbh9gp" target="_blank">
            <Image
              src="https://cdn.discordapp.com/icons/919560606657413190/190b8504e8f665f29bbfb024a3d9c4f3.png?size=240"
              width={50}
              height={50}
              className="rounded-lg "
              alt="KuzeyKose"
            />
          </Link>
        </div>
      </div>
      <div className="mt-10 flex flex-col items-center gap-5 w-full border-t-2 py-4 md:hidden">
        <h1 className="font-bold">Join Our Discord Server!</h1>
        <Link href="https://discord.gg/MJEZkbh9gp" target="_blank">
          <Image
            src="https://cdn.discordapp.com/icons/919560606657413190/190b8504e8f665f29bbfb024a3d9c4f3.png?size=240"
            width={40}
            height={40}
            className="rounded-lg"
            alt="KuzeyKose"
          />
        </Link>
      </div>
    </div>
  );
}
