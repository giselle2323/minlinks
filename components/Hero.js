import Image from "next/image";
import useDarkMode from "../hooks/useDarkMode";
import memoji from "../public/memoji.svg";
import lightMemoji from "../public/light-memoji.svg";
export default function Hero() {
  const [colorTheme, setTheme] = useDarkMode();
  console.log(colorTheme);
  return (
    <section className=" text-dark-700 dark:text-white h-full font-ibm">
      <div className="container mx-auto flex px-5 items-center justify-center flex-col">
        <div className="text-center lg:w-2/3 w-full mb-3">
          <h1 className="title-font text-4xl lg:5xl mb-4 font-medium leading-normal">
            Creating Content for Content Writers
          </h1>
          <p className="mb-8 text-opacity-75 text-dark-700 dark:text-white dark:text-opacity-25 leading-relaxed font-normal  ">
            Plan, Organize, Collaborate, in every platform, for free.
          </p>
          <div className="flex justify-center">
            <button className="inline-flex text-white bg-gradient-to-r from-green-grad-one to-green-grad-two border-0 py-2 px-6 focus:outline-none rounded text-lg">
              Explore
            </button>
          </div>
        </div>
        <div className="flex flex-col relative">
        <div className="block dark:hidden ">
            <Image src={lightMemoji} alt="memoji hero" className="max-w-full" />
          </div>
          <div className="object-contain hidden dark:block">
            <Image src={memoji} alt="memoji hero" className="max-w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
