import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-900 py-16">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                        AI-Powered Skin Cancer Detection
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        A deep learning solution for early detection and classification of skin lesions
                    </p>
                </div>

                {/* Project Overview */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Project Overview</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                        This project implements a <strong>Convolutional Neural Network (CNN)</strong> to classify skin lesions into seven distinct diagnostic categories. The model assists healthcare professionals in early detection of skin cancer, particularly melanoma, by analyzing dermoscopic images with high accuracy.
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                        Built with modern deep learning frameworks and deployed as a web application, this project demonstrates end-to-end machine learning development—from data preprocessing to model deployment.
                    </p>
                </section>

                {/* Dataset Section */}
                <section className="mb-12 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Dataset: HAM10000</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                        The model is trained on the <strong>Skin Cancer MNIST: HAM10000</strong> dataset, containing over 10,000 dermoscopic images of pigmented skin lesions, collected from diverse patient populations.
                    </p>
                    
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Seven Diagnostic Classes:</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 dark:text-gray-300 mb-6">
                        <li className="flex items-start">
                            <span className="text-purple-600 mr-2">•</span>
                            <span><strong>Melanocytic Nevi (nv)</strong> - Benign moles</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-purple-600 mr-2">•</span>
                            <span><strong>Melanoma (mel)</strong> - Malignant skin cancer</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-purple-600 mr-2">•</span>
                            <span><strong>Benign Keratosis (bkl)</strong> - Benign lesions</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-purple-600 mr-2">•</span>
                            <span><strong>Basal Cell Carcinoma (bcc)</strong> - Common skin cancer</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-purple-600 mr-2">•</span>
                            <span><strong>Actinic Keratoses (akiec)</strong> - Pre-cancerous lesions</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-purple-600 mr-2">•</span>
                            <span><strong>Vascular Lesions (vasc)</strong> - Blood vessel lesions</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-purple-600 mr-2">•</span>
                            <span><strong>Dermatofibroma (df)</strong> - Benign skin growths</span>
                        </li>
                    </ul>

                    <div className="bg-purple-50 dark:bg-gray-700 p-4 rounded border-l-4 border-purple-600">
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Data Preprocessing:</strong> Applied data augmentation techniques including random rotations and horizontal/vertical flips to increase dataset size to over 13,000 training samples, improving model generalization.
                        </p>
                    </div>
                </section>

                {/* Model Architecture */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Model Architecture</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                        The neural network employs a carefully designed architecture optimized for medical image classification:
                    </p>
                    
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">CNN Layers:</h3>
                        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                            <li className="flex items-start">
                                <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm mr-3 mt-1">Layer 1</span>
                                <span><strong>Conv2D (32 filters)</strong> + ReLU activation + MaxPooling (2×2)</span>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm mr-3 mt-1">Layer 2</span>
                                <span><strong>Conv2D (128 filters)</strong> + ReLU activation + MaxPooling (2×2) + Dropout (0.5)</span>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm mr-3 mt-1">Layer 3</span>
                                <span><strong>Flatten</strong> - Convert 2D features to 1D vector</span>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm mr-3 mt-1">Layer 4</span>
                                <span><strong>Dense (128 neurons)</strong> + ReLU activation</span>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm mr-3 mt-1">Layer 5</span>
                                <span><strong>Dense (32 neurons)</strong> + ReLU activation</span>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm mr-3 mt-1">Output</span>
                                <span><strong>Dense (7 neurons)</strong> + Softmax activation - Multi-class classification</span>
                            </li>
                        </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Training Configuration</h4>
                            <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                                <li>• <strong>Optimizer:</strong> Adam</li>
                                <li>• <strong>Loss Function:</strong> Categorical Crossentropy</li>
                                <li>• <strong>Batch Size:</strong> 32</li>
                                <li>• <strong>Image Resolution:</strong> 128×128 pixels</li>
                            </ul>
                        </div>
                        <div className="bg-green-50 dark:bg-gray-800 p-4 rounded">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Performance Metrics</h4>
                            <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                                <li>• <strong>Accuracy</strong> - Overall classification rate</li>
                                <li>• <strong>Precision</strong> - True positive accuracy</li>
                                <li>• <strong>Recall</strong> - Sensitivity to positive cases</li>
                                <li>• <strong>F1-Score</strong> - Harmonic mean of precision/recall</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Technical Stack */}
                <section className="mb-12 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 p-6 rounded-lg">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Technology Stack</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-400 mb-3">Machine Learning</h3>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                <li>• TensorFlow / Keras</li>
                                <li>• NumPy & Pandas</li>
                                <li>• scikit-learn</li>
                                <li>• OpenCV & PIL</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-400 mb-3">Frontend</h3>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                <li>• Next.js 15</li>
                                <li>• React 19</li>
                                <li>• TypeScript</li>
                                <li>• Tailwind CSS</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-400 mb-3">Deployment</h3>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                <li>• ONNX Runtime</li>
                                <li>• Model Optimization</li>
                                <li>• TFLite Conversion</li>
                                <li>• Web Integration</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Model Evaluation */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Model Evaluation & Validation</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                        Rigorous evaluation using multiple metrics ensures model reliability and clinical applicability:
                    </p>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-6">
                        <li className="flex items-start">
                            <span className="text-purple-600 text-2xl mr-3">✓</span>
                            <span><strong>Confusion Matrix Analysis</strong> - Visualizing classification performance across all seven classes</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-purple-600 text-2xl mr-3">✓</span>
                            <span><strong>80/20 Train-Test Split</strong> - Ensuring unbiased evaluation on unseen data</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-purple-600 text-2xl mr-3">✓</span>
                            <span><strong>Macro-averaged F1-Score</strong> - Balanced performance across imbalanced classes</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-purple-600 text-2xl mr-3">✓</span>
                            <span><strong>Visual Prediction Validation</strong> - Manual inspection of model predictions</span>
                        </li>
                    </ul>
                </section>

                {/* Model Performance Metrics */}
                <section className="mb-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 p-6 rounded-lg border-2 border-purple-200 dark:border-purple-700">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Model Performance Metrics</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                        The model was evaluated on a held-out test set (20% of the data), achieving the following metrics:
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow text-center">
                            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">72.6%</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">Accuracy</div>
                        </div>
                        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow text-center">
                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">77.4%</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">Precision</div>
                        </div>
                        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow text-center">
                            <div className="text-3xl font-bold text-green-600 dark:text-green-400">68.3%</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">Recall</div>
                        </div>
                        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow text-center">
                            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">48.6%</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">F1-Score (Macro)</div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg mb-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Confusion Matrix Analysis</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            The confusion matrix reveals the model's classification patterns across all seven diagnostic classes:
                        </p>
                        
                        <div className="overflow-x-auto mb-4">
                            <table className="min-w-full text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                                <thead className="bg-purple-100 dark:bg-purple-900">
                                    <tr>
                                        <th className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-left">True \ Pred</th>
                                        <th className="border border-gray-300 dark:border-gray-600 px-2 py-2">nv</th>
                                        <th className="border border-gray-300 dark:border-gray-600 px-2 py-2">bkl</th>
                                        <th className="border border-gray-300 dark:border-gray-600 px-2 py-2">df</th>
                                        <th className="border border-gray-300 dark:border-gray-600 px-2 py-2">mel</th>
                                        <th className="border border-gray-300 dark:border-gray-600 px-2 py-2">vasc</th>
                                        <th className="border border-gray-300 dark:border-gray-600 px-2 py-2">bcc</th>
                                        <th className="border border-gray-300 dark:border-gray-600 px-2 py-2">akiec</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white dark:bg-gray-800">
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 font-semibold">nv</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center bg-green-100 dark:bg-green-900 font-bold">1192</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">29</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">5</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">99</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">3</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">6</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">4</td>
                                    </tr>
                                    <tr className="bg-gray-50 dark:bg-gray-750">
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 font-semibold">bkl</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">79</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center bg-green-100 dark:bg-green-900 font-bold">104</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">1</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">31</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">0</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">6</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">7</td>
                                    </tr>
                                    <tr className="bg-white dark:bg-gray-800">
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 font-semibold">df</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">12</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">5</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center bg-green-100 dark:bg-green-900 font-bold">3</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">0</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">0</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">6</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">2</td>
                                    </tr>
                                    <tr className="bg-gray-50 dark:bg-gray-750">
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 font-semibold">mel</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center bg-red-100 dark:bg-red-900">89</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">34</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">1</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center bg-green-100 dark:bg-green-900 font-bold">92</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">0</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">3</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">7</td>
                                    </tr>
                                    <tr className="bg-white dark:bg-gray-800">
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 font-semibold">vasc</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">3</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">3</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">0</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">2</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center bg-green-100 dark:bg-green-900 font-bold">12</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">1</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">0</td>
                                    </tr>
                                    <tr className="bg-gray-50 dark:bg-gray-750">
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 font-semibold">bcc</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">22</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">12</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">1</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">6</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">0</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center bg-green-100 dark:bg-green-900 font-bold">43</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">9</td>
                                    </tr>
                                    <tr className="bg-white dark:bg-gray-800">
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 font-semibold">akiec</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">13</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">12</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">0</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">8</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">0</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">16</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center bg-green-100 dark:bg-green-900 font-bold">20</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="space-y-4 text-gray-700 dark:text-gray-300">
                            <div>
                                <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Model Interpretation:</h4>
                                <ul className="space-y-2 ml-4">
                                    <li>• <strong>Strong Performance on Majority Classes:</strong> The model achieves excellent accuracy on Melanocytic Nevi (nv), which represents the most common benign lesion in the dataset.</li>
                                    <li>• <strong>Critical Confusion Pattern:</strong> A significant source of error occurs between benign nevi and melanoma (89 melanoma cases misclassified as nevi), reflecting the known visual similarity in dermoscopic images.</li>
                                    <li>• <strong>Limited Melanoma Recall:</strong> Only 92 out of 226 melanoma cases were correctly identified (40.7% recall), indicating that many malignant cases are misclassified as benign.</li>
                                    <li>• <strong>Class Imbalance Impact:</strong> Minority classes (Dermatofibroma, Vascular Lesions, Actinic Keratoses) show reduced performance due to limited training samples.</li>
                                </ul>
                            </div>

                            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded">
                                <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Clinical Considerations:</h4>
                                <ul className="space-y-2">
                                    <li>• <strong>False Negatives in Melanoma:</strong> From a medical perspective, missing melanoma diagnoses (false negatives) represents the highest clinical risk, as delayed treatment can be life-threatening.</li>
                                    <li>• <strong>Optimization Priority:</strong> The model prioritizes overall accuracy, which benefits frequent benign classes but may under-detect critical malignant cases. Future iterations should optimize for melanoma recall.</li>
                                    <li>• <strong>Decision Support Role:</strong> Despite limitations, the model demonstrates meaningful pattern recognition capabilities suitable for early-stage screening and clinical decision support, not definitive diagnosis.</li>
                                    <li>• <strong>Professional Verification Required:</strong> All predictions should be verified by qualified dermatologists, especially for suspected malignant lesions.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded border border-purple-200 dark:border-purple-700">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Performance Summary:</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                            The model achieves <strong>336ms/step</strong> inference time with a loss of <strong>0.7932</strong>. 
                            While the overall accuracy of 72.6% is reasonable, the macro F1-score of 48.6% highlights challenges 
                            with class imbalance and the need for improved minority class detection, particularly for clinically 
                            critical cases like melanoma.
                        </p>
                    </div>
                </section>

                {/* Key Features */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Key Capabilities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                            <div className="text-3xl mb-3">🎯</div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">High Accuracy Classification</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Multi-class prediction across seven distinct skin lesion types with comprehensive evaluation metrics.
                            </p>
                        </div>
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                            <div className="text-3xl mb-3">⚡</div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Real-Time Inference</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Optimized ONNX model for fast client-side predictions without server dependencies.
                            </p>
                        </div>
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                            <div className="text-3xl mb-3">🔬</div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Clinical Decision Support</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Assists healthcare professionals by providing a second opinion on dermoscopic images.
                            </p>
                        </div>
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                            <div className="text-3xl mb-3">📊</div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Comprehensive Analytics</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Detailed performance metrics including precision, recall, F1-score, and confusion matrices.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Project Impact */}
                <section className="mb-12 bg-purple-100 dark:bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Project Impact</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                        Skin cancer is one of the most common cancers worldwide, with early detection being critical for successful treatment. This AI-powered solution:
                    </p>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li>• Reduces diagnostic time by providing instant preliminary analysis</li>
                        <li>• Serves as a screening tool in areas with limited dermatological resources</li>
                        <li>• Helps minimize false negatives in melanoma detection</li>
                        <li>• Demonstrates practical application of deep learning in healthcare</li>
                    </ul>
                </section>

                {/* Footer Credits */}
                <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Credits & Resources</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                        This project was developed as a demonstration of end-to-end machine learning engineering, from research and development to deployment.
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                        Dataset: <a href="https://www.kaggle.com/datasets/kmader/skin-cancer-mnist-ham10000" className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 underline">Skin Cancer MNIST: HAM10000</a> by Tschandl et al.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default AboutPage;