import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-900 py-12">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">About Our AI Model</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                    Our AI model is designed to assist in the early detection and classification of skin lesions, including identifying potential skin cancers such as melanoma. By leveraging cutting-edge machine learning techniques and dermatological expertise, our model aims to support healthcare professionals in providing accurate and timely diagnoses.
                </p>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Dataset Behind the Model</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                    To achieve this, our model is trained on the <strong>Skin Cancer MNIST: HAM10000</strong> dataset, a highly regarded collection of over 10,000 dermoscopic images. These images represent a wide range of skin lesion types and are expertly labeled by dermatologists, ensuring the highest data quality.
                </p>
                
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">What Makes the HAM10000 Dataset Special?</h4>
                <ul className="list-disc list-inside text-lg text-gray-700 dark:text-gray-300 mb-8">
                    <li>
                        <strong>Diversity:</strong> The dataset includes images from patients of different ages, skin types, and conditions, making it robust and reflective of real-world scenarios.
                    </li>
                    <li>
                        <strong>Comprehensive Coverage:</strong> It categorizes lesions into seven diagnostic classes, including common conditions like benign moles (melanocytic nevi) and serious skin cancers like melanoma.
                    </li>
                    <li>
                        <strong>Expert Annotations:</strong> Each image is labeled by dermatologists, ensuring reliable data for model training.
                    </li>
                </ul>
            
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Why Use This AI Model?</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                    Skin cancer is one of the most common and potentially life-threatening conditions. Early detection can significantly improve outcomes. Our AI model can:
                </p>
                <ul className="list-disc list-inside text-lg text-gray-700 dark:text-gray-300 mb-8">
                    <li>Analyze dermoscopic images and provide accurate lesion classifications.</li>
                    <li>Assist dermatologists in making more informed decisions.</li>
                    <li>Help reduce diagnostic errors by serving as a second opinion.</li>
                </ul>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Credits</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                    We would like to thank the creators of the Skin Cancer MNIST: HAM10000 dataset and all the contributors who made this project possible.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                    You can find more information about the dataset on <a href="https://www.kaggle.com/datasets/kmader/skin-cancer-mnist-ham10000" className="text-blue-500 hover:underline">Kaggle</a>.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;