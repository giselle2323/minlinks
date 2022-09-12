import { useTheme } from "next-themes";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import Footer from "../components/Footer";
import Hero from "../components/Hero";
import LandingNavbar from "../components/Navbars/LandingNavbar";

export default function Landing({ pageTitle, description }) {
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
        <meta property="og:title" content="Minlinks Homepage" key="ogtitle" />
        <meta property="og:description" content="Public bookmark with unique resource thats cuts across different subjects" key="ogdesc" />
        <title>Minlinks Homepage</title>
      </Head>
      <div className="flex flex-col w-full bg-white dark:bg-dark-700">
        <header>
          <LandingNavbar switchTheme={switchTheme} />
          <div className="container mx-auto h-full">
            <Hero />
          </div>
        </header>
        <section className="container mx-auto text-gray-600 body-font mt-4">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full flex-col items-center text-center mb-4">
              <h1 className="sm:text-3xl text-2xl font-medium title-font py-4 font-ibm text-dark-700 dark:text-white">
                Features of Minotes
              </h1>
            </div>
            <div className="relative py-4 overflow-hidden">
              <div className="relative container px-4 mx-auto">
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 -m-6">
                    <div className="w-full p-6">
                      <div className="p-8 border border-blue-light_700 rounded-lg h-[400px]">
                        <span className="flex mb-14 justify-center items-center w-20 h-20 bg-blue-500 rounded-lg">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            strokeWidth="1.5"
                            fill="none"
                            strokeLinejoin="arcs"
                            strokeLinecap="square"
                            viewBox="0 0 24 24"
                          >
                            {" "}
                            <g fill="none" fillRule="evenodd">
                              <rect
                                width="24"
                                height="24"
                              ></rect>
                              <path
                                d="M2 12c0 5.523 4.414 10 9.936 10S19.704 18.436 22 15.684h0M22 12c0-5.523-4.455-10-9.968-10-5.035 0-7.304 2.892-9.427 5.562l-.303.38L2 8.316m20 12.632v-5.263h-5.263M2 3.053v5.263h5.263"
                                stroke="#ffffff"
                              ></path>
                            </g>
                          </svg>
                        </span>
                        <h3 className="mt-12 mb-6 text-2xl font-normal font-heading dark:text-white text-dark-700">
                          Frequently updated resources
                        </h3>
                        <p className="text-lg dark:text-white dark:text-opacity-70 text-opacity-70 text-dark-700">
                         Minotes is updated weekly with unique and amazing resources all over the internet.
                        </p>
                      </div>
                    </div>
                    <div className="w-full p-6">
                      <div className="p-8  border border-blue-light_700 rounded-lg h-[400px]">
                        <span className="flex mb-14 justify-center items-center w-20 h-20 bg-purple-500 rounded-lg">
                          <svg
                            className="w-8 h-8"
                            width="35"
                            height="35"
                            viewBox="0 0 35 35"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0)">
                              <path
                                d="M24.0625 18.9583C23.7402 18.9583 23.431 18.8927 23.1467 18.7615L17.5 16.1175L11.8592 18.7585C11.569 18.8927 11.2598 18.9583 10.9375 18.9583C9.73146 18.9583 8.75 17.9769 8.75 16.7708C8.75 16.4529 8.81417 16.1583 8.94833 15.8681L15.5079 1.28917C15.8419 0.510417 16.6265 0 17.5 0C18.3735 0 19.1581 0.510417 19.4965 1.30083L26.0546 15.874C26.1858 16.1583 26.25 16.4529 26.25 16.7708C26.25 17.9769 25.2685 18.9583 24.0625 18.9583ZM17.5 14.5833C17.605 14.5833 17.7115 14.6067 17.8092 14.6519L23.7592 17.4373C24.166 17.6225 24.7917 17.2856 24.7917 16.7708C24.7917 16.6629 24.7712 16.5754 24.7275 16.4763L18.1621 1.88854C17.9346 1.35771 17.061 1.36792 16.8423 1.87833L10.2754 16.4719C10.2287 16.5754 10.2083 16.6629 10.2083 16.7708C10.2083 17.2856 10.8092 17.6327 11.2467 17.4358L17.1908 14.6533C17.2885 14.6067 17.395 14.5833 17.5 14.5833Z"
                                fill="white"
                              ></path>
                              <path
                                d="M17.4997 35C8.65488 35 1.45801 27.8031 1.45801 18.9583C1.45801 12.9194 4.7903 7.46227 10.154 4.71769C10.507 4.53685 10.9518 4.6754 11.1355 5.0356C11.3193 5.3929 11.1763 5.83331 10.8176 6.0156C5.94384 8.50936 2.91634 13.4691 2.91634 18.9583C2.91634 26.9996 9.45842 33.5417 17.4997 33.5417C25.5409 33.5417 32.083 26.9996 32.083 18.9583C32.083 13.4794 29.0613 8.51956 24.1963 6.0156C23.8376 5.83185 23.6961 5.39144 23.8813 5.03414C24.0665 4.67539 24.507 4.53539 24.8628 4.7206C30.2163 7.47394 33.5413 12.931 33.5413 18.9583C33.5413 27.8031 26.3445 35 17.4997 35Z"
                                fill="white"
                              ></path>
                            </g>
                          </svg>
                        </span>
                        <h3 className="mt-12 mb-6 text-2xl font-normal font-heading dark:text-white text-dark-700">
                          Categorized resources
                        </h3>
                        <p className="text-lg dark:text-white dark:text-opacity-70 text-opacity-70 text-dark-700">
                        Each resource has a tag to help you identify it&apos;s category easily.
                        </p>
                      </div>
                    </div>
                    <div className="w-full p-6">
                      <div className="p-8 border border-blue-light_700 rounded-lg h-[400px]">
                        <span className="flex mb-14 justify-center items-center w-20 h-20 bg-green-500 rounded-lg">
                          <svg
                            className="w-8 h-8"
                            width="36"
                            height="35"
                            viewBox="0 0 36 35"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0)">
                              <path
                                d="M32.25 35H5.25C3.183 35 1.5 33.3638 1.5 31.3542V3.64588C1.5 3.24338 1.836 2.91672 2.25 2.91672C2.664 2.91672 3 3.24338 3 3.64588V31.3542C3 32.5603 4.0095 33.5417 5.25 33.5417H31.5V6.56255C31.5 6.16005 31.836 5.83338 32.25 5.83338C32.664 5.83338 33 6.16005 33 6.56255V34.2709C33 34.6734 32.664 35 32.25 35Z"
                                fill="white"
                              ></path>
                              <path
                                d="M32.25 7.29167H5.25C3.183 7.29167 1.5 5.65542 1.5 3.64583C1.5 1.63625 3.183 0 5.25 0H29.25C29.664 0 30 0.326667 30 0.729167V5.83333H32.25C32.664 5.83333 33 6.16 33 6.5625C33 6.965 32.664 7.29167 32.25 7.29167ZM5.25 1.45833C4.0095 1.45833 3 2.43979 3 3.64583C3 4.85187 4.0095 5.83333 5.25 5.83333H28.5V1.45833H5.25Z"
                                fill="white"
                              ></path>
                              <path
                                d="M12.9868 27.7055C12.2338 27.7055 11.6158 27.4897 11.1718 27.0566C10.2898 26.1991 10.2808 24.6838 11.1478 22.7866C11.9158 21.1051 13.3018 19.2443 15.0478 17.5482C16.7938 15.8507 18.7063 14.5047 20.4358 13.7565C22.3858 12.9122 23.9443 12.9209 24.8278 13.7799C25.7098 14.6374 25.7188 16.154 24.8518 18.0499C24.0838 19.7313 22.6978 21.5922 20.9518 23.2882C19.2058 24.9857 17.2933 26.3318 15.5638 27.0799C14.5963 27.4955 13.7263 27.7055 12.9868 27.7055ZM23.0143 14.582C22.5043 14.582 21.8188 14.754 21.0448 15.088C19.4803 15.7647 17.7268 17.0043 16.1068 18.5778C14.4868 20.1513 13.2148 21.8561 12.5188 23.3772C11.9488 24.627 11.8378 25.6405 12.2323 26.024C12.6268 26.4076 13.6693 26.2997 14.9548 25.7455C16.5193 25.0688 18.2728 23.8293 19.8928 22.2557C21.5128 20.6822 22.7863 18.9774 23.4823 17.4549C24.0523 16.2051 24.1633 15.1916 23.7688 14.808C23.6113 14.6563 23.3503 14.582 23.0143 14.582Z"
                                fill="white"
                              ></path>
                              <path
                                d="M23.0128 27.7054C22.2733 27.7054 21.4033 27.4969 20.4358 27.0784C18.7063 26.3317 16.7923 24.9842 15.0478 23.2867C13.3018 21.5892 11.9173 19.7298 11.1478 18.0484C10.2808 16.1525 10.2898 14.6359 11.1718 13.7784C12.0523 12.9209 13.6138 12.9121 15.5638 13.755C17.2933 14.5017 19.2073 15.8492 20.9518 17.5467C22.6978 19.2442 24.0823 21.1036 24.8518 22.785C25.7188 24.6823 25.7098 26.1975 24.8278 27.055C24.3838 27.4882 23.7658 27.7054 23.0128 27.7054ZM12.9853 14.5819C12.6478 14.5819 12.3898 14.6563 12.2323 14.8094C11.8378 15.1929 11.9488 16.2065 12.5188 17.4563C13.2148 18.9773 14.4898 20.6821 16.1083 22.2571C17.7268 23.8321 19.4803 25.0702 21.0463 25.7469C22.3318 26.3025 23.3743 26.4075 23.7688 26.0254C24.1633 25.6419 24.0523 24.6284 23.4823 23.3786C22.7863 21.8575 21.5113 20.1527 19.8928 18.5777C18.2743 17.0027 16.5208 15.7646 14.9548 15.0879C14.1808 14.754 13.4953 14.5819 12.9853 14.5819ZM11.7013 14.2932H11.7163H11.7013Z"
                                fill="white"
                              ></path>
                            </g>
                          </svg>
                        </span>
                        <h3 className="mt-12 mb-6 text-2xl font-normal font-heading dark:text-white text-dark-700">
                          Open Source
                        </h3>
                        <p className="text-lg dark:text-white dark:text-opacity-70 text-opacity-70 text-dark-700">
                          Everyone can contribute to minotes, to contribute please visit the github repo.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="my-5">
          <div className="container mx-auto">
            <div className="text-center mx-4 lg:mx-24 rounded-lg flex px-5 py-12 items-center justify-center flex-col bg-transparent border border-dark-700 dark:border-0 dark:bg-blue-light_700">
              <h1 className="title-font mb-4 sm:text-4xl text-3xl py-4 mb-4 font-medium text-dark-700 dark:text-white">
                Got suggestions on how to make this project better ?
              </h1>

              <div className="flex justify-center">
                <Link href="https://twitter.com/yakubu_jumoke">
                  <a className="inline-flex text-white bg-gradient-to-r from-green-grad-one to-green-grad-two border-0 py-2 px-6 focus:outline-none rounded text-lg">
                    {" "}
                    Say Hi
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
