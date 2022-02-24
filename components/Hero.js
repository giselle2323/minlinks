import Image from "next/image";
import Link from "next/link";

import useDarkMode from "../hooks/useDarkMode";
import memoji from "../public/black-hero.svg";
import lightMemoji from "../public/light-hero.png";

export default function Hero() {
  return (
    <section className="text-dark-700 dark:text-white h-full font-ibm mb-4">
      <div className="container mx-auto flex px-5 items-center justify-center flex-col">
        <div className="text-center lg:w-2/3 w-full mb-3">
          <h1 className="title-font text-5xl lg:6xl mb-4 font-medium leading-normal py-4">
            Curating amazing resouces that I have found on the internet for YOU.
          </h1>
          <p className="mb-8 text-opacity-75 text-dark-700 dark:text-white dark:text-opacity-25 leading-relaxed font-normal  ">
            Browse through many cool resources that cuts across web development
          </p>
          <div className="flex justify-center">
            <Link href="/dashboard">
              <a className="inline-flex text-white bg-gradient-to-r from-green-grad-one to-green-grad-two hover:bg-green-900 border-0 py-2 px-6 mb-2 lg:mb-0 focus:outline-none rounded text-lg">
                Browse Resources
              </a>
            </Link>
          </div>
        </div>
        <div className="flex flex-col relative">
          <div className="block dark:hidden ">
            <Image src={lightMemoji} alt="memoji hero" className="max-w-full" />
          </div>
          <div className="hidden dark:block">
            <Image src={memoji} alt="memoji hero" className="max-w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
