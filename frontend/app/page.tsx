"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Welcome() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section>
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
              Building Digital <br />
              Cancer Detection
            </h1>
            <p className="max-w-2xl mb-6 font-semibold text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              This is a web app created to share the AI model developed with the dataset{' '}
              <a href="https://www.kaggle.com/datasets/kmader/skin-cancer-mnist-ham10000" className="hover:underline font-bold">
                Skin Cancer MNIST: HAM10000
              </a>{' '}
              which is capable of classifying skin lesions.
            </p>
            <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <Link href="/detection" legacyBehavior>
                <a className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                  Make a Diagnosis
                </a>
              </Link>
              <a
                href="https://www.kaggle.com/code/sl0whand/proyectomelanoma"
                className="inline-flex items-center justify-center w-full px-5 py-3 mb-2 mr-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:w-auto focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                View on
                <img src="https://www.kaggle.com/static/images/site-logo.svg" alt="Kaggle Logo" className="ml-2 h-6" />
              </a>
            </div>
          </div>
          {isClient && (
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <Image
                src="https://smart.servier.com/wp-content/uploads/2016/10/Melanome_2.png"
                alt="Melanoma Image"
                className="w-full h-auto rounded-lg shadow-lg"
                width={500}
                height={500}
                style={{ height: '60vh', width: '60vh' }}
              />
            </div>
          )}
        </div>
      </section>
    </section>
  );
}
