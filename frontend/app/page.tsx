import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  return (
    <section>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-bold mb-4">Welcome to the Diagnosis Page</h1>
            <p className="mb-4">Use our tool to make a diagnosis or view the project on Kaggle.</p>
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <Link href="/detection" className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Make a Diagnosis
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
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Image
              src="https://smart.servier.com/wp-content/uploads/2016/10/Melanome_2.png"
              alt="Melanoma Image"
              className="w-full h-auto rounded-lg shadow-lg"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
