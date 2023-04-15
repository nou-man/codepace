import React, { Fragment, useEffect, useState } from "react";
import Modal from "./Modal";

const Card = () => {
  //use state
  const [codes, setCodes] = useState([]); //using use state to keep empty inputs by default

  //fetching data from codebase database
  const getCodes = async () => {
    try {
      const response = await fetch("http://localhost:5000/codepace"); //fetchin from db
      const jsonData = await response.json(); //you should know ;)

      setCodes(jsonData); //setting the code default json to custom json named codes, for accessibilty
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getCodes();
  }, []);

  return (
    <Fragment>
      <div class="flex-wrap  items-center justify-center my-5 ml-5">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* // THE MAP FUNTION FOR RENDERING */}
          {codes.map((code) => (
            <div key={code.code_id}class=" max-w-sm p-6 bg-white border items-center border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              {/* the title  */}
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {code.title}
                </h5>
              </a>

              {/* the description */}
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {code.description}
              </p>

              {/* subject name span  */}
              <span class="border border-gray-400 px-2 py-0.5 rounded font-mono text-gray-400 dark:text-white dark:border-gray-400">{code.sub_name}</span>
              
              {/* Button and Modal component */}
              <Modal code={code}/> {/*prop code sent for cards*/}

              {/* {console.log(code)} */}
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Card;
