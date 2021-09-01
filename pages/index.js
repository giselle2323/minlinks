import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useTheme } from "next-themes";
import LandingNavbar from "../components/Navbars/LandingNavbar";
import Hero from "../components/Hero";
import list from "../public/list-svg.svg";
import greenList from "../public/list-green.svg";
import Footer from "../components/Footer";
import Link from "next/link";
export default function Landing({pageTitle, description}) {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta property="og:title" content={pageTitle} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
        <title>{pageTitle}</title>
      </Head>
      <section className="flex flex-col w-full bg-white dark:bg-dark-700 ">
        <LandingNavbar switchTheme={switchTheme} />
        <div className="container mx-auto h-full">
          <Hero />
        </div>
        <section className="container mx-auto text-gray-600 body-font mt-4">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 font-ibm text-dark-700 dark:text-white">
                Engage on Articool
              </h1>
            </div>
            <div className="flex flex-wrap -m-4">
              <div className="xl:w-1/3 md:w-1/2 p-4">
                <div className="p-6 ">
                  <div className="flex  justify-items-start items-center mb-3">
                    <Image src={list} alt="icon" />
                    <h2 className="text-lg text-dark-700 dark:text-opacity-75 dark:text-white font-medium title-font mb-2">
                      Post Idea
                    </h2>
                  </div>
                  <p className="leading-relaxed text-base text-dark-700 dark:text-white dark:text-opacity-30 px-3">
                    Fingerstache flexitarian street art 8-bit waist co, subway
                    tile poke farm.
                  </p>
                </div>
              </div>
              <div className="xl:w-1/3 md:w-1/2 p-4">
                <div className="p-6 ">
                  <div className="flex  justify-items-start items-center mb-3">
                    <Image src={greenList} alt="icon" />
                    <h2 className="text-lg text-dark-700 dark:text-opacity-75 dark:text-white font-medium title-font mb-2">
                      Bookmark Idea
                    </h2>
                  </div>
                  <p className="leading-relaxed text-base text-dark-700 dark:text-white dark:text-opacity-30 px-3">
                    Fingerstache flexitarian street art 8-bit waist co, subway
                    tile poke farm.
                  </p>
                </div>
              </div>
              <div className="xl:w-1/3 md:w-1/2 p-4">
                <div className="p-6 ">
                  <div className="flex  justify-items-start items-center mb-3">
                    <Image src={list} alt="icon" />
                    <h2 className="text-lg text-dark-700 dark:text-opacity-75 dark:text-white font-medium title-font mb-2">
                      Edit Idea
                    </h2>
                  </div>
                  <p className="leading-relaxed text-base text-dark-700 dark:text-white dark:text-opacity-30 px-3">
                    Fingerstache flexitarian street art 8-bit waist co, subway
                    tile poke farm.
                  </p>
                </div>
              </div>
              <div className="xl:w-1/3 md:w-1/2 p-4">
                <div className="p-6 ">
                  <div className="flex  justify-items-start items-center mb-3">
                    <Image src={greenList} alt="icon" />
                    <h2 className="text-lg text-dark-700 dark:text-opacity-75 dark:text-white font-medium title-font mb-2">
                      Like Idea
                    </h2>
                  </div>
                  <p className="leading-relaxed text-base text-dark-700 dark:text-white dark:text-opacity-30 px-3">
                    Fingerstache flexitarian street art 8-bit waist co, subway
                    tile poke farm.
                  </p>
                </div>
              </div>
              <div className="xl:w-1/3 md:w-1/2 p-4">
                <div className="p-6 ">
                  <div className="flex  justify-items-start items-center mb-3">
                    <Image src={list} alt="icon" />
                    <h2 className="text-lg text-dark-700 dark:text-opacity-75 dark:text-white font-medium title-font mb-2">
                      Comment Idea
                    </h2>
                  </div>
                  <p className="leading-relaxed text-base text-dark-700 dark:text-white dark:text-opacity-30 px-3">
                    Fingerstache flexitarian street art 8-bit waist co, subway
                    tile poke farm.
                  </p>
                </div>
              </div>
              <div className="xl:w-1/3 md:w-1/2 p-4">
                <div className="p-6 ">
                  <div className="flex  justify-items-start items-center mb-3">
                    <Image src={greenList} alt="icon" />
                    <h2 className="text-lg text-dark-700 dark:text-opacity-75 dark:text-white font-medium title-font mb-2">
                      Share Idea
                    </h2>
                  </div>
                  <p className="leading-relaxed text-base text-dark-700 dark:text-white dark:text-opacity-30 px-3">
                    Fingerstache flexitarian street art 8-bit waist co, subway
                    tile poke farm.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="my-5">
          <div className="container mx-auto">
            <div className="text-center mx-4 lg:mx-24 rounded-lg flex px-5 py-12 items-center justify-center flex-col bg-transparent border border-dark-700 dark:border-0 dark:bg-dark-500">
              <h1 className="title-font mb-4 sm:text-4xl text-3xl mb-4 font-medium text-dark-700 dark:text-white">
                Got suggestions on how to make the application better ?
              </h1>
              
              <div className="flex justify-center">
                <Link href='https://twitter.com/yakubu_jumoke'>
                  <a className="inline-flex text-white bg-gradient-to-r from-green-grad-one to-green-grad-two border-0 py-2 px-6 focus:outline-none rounded text-lg"> Say Hi</a>
                </Link>
                
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </section>
    </>
  );
}
