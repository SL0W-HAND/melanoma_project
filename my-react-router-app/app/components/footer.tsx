import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white dark:bg-gray-800">
        <div className="max-w-screen-xl p-4 py-6 mx-auto lg:py-16 md:p-8 lg:p-10">
           
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="text-center">
                
                <span className="block text-sm text-center text-gray-500 dark:text-gray-400">
                    Made with 💜 from Chihuahua.
                </span>
               
            </div>
        </div>
    </footer>
    );
};

// Removed unused footerStyle constant

export default Footer;