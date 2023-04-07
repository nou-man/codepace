import React, { useState } from "react";

export default function Modal({ code }) {

    //use state htmlFor modal visiblity
    const [showMyModal, setShowMyModal] = useState(false);

    return (
        <>
            <a
                href="#"
                class="inline-flex float-right items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => setShowMyModal(true)}
            >
                Code
                <svg
                    aria-hidden="true"
                    class="w-4 h-4 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
            </a>

            {/* MODAL VIEW SECTION */}

            {showMyModal ?
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
                    <div className="bg-white p-4 rounded w-3/5">

                        <label htmlFor="message" class="inline mb-2 text-sm mb-5 font-medium text-gray-900 dark:text-white">{code.description}</label>

                        <button type="button" class="float-right text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">copy</button>
                        <textarea id="message" rows="20" class="block sm:rows-10 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..." value={code.whole_code}></textarea>
                        <button type="button" onClick={() => setShowMyModal(false)} class="text-red-700 mt-5 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">close</button>
                    </div>
                    {/* {console.log(code.description)} */}
                </div>
                : null}

        </>
    );
}

//htmlFor reference
{/* <div className="bg-white p-4 rounded"> my Modal</div>
      <button onClick={onClose} >X</button> */}