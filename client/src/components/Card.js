import React, { Fragment, useEffect, useState } from "react";
import Modal from "./Modal";

const Card = () => {
  //use state
  const [codes, setCodes] = useState([]);

  //fetching data from codebase database
  const getCodes = async () => {
    try {
      const response = await fetch("http://localhost:5000/codebase");
      const jsonData = await response.json();

      setCodes(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getCodes();
  }, []);

  return (
    <Fragment>
      <div class=" flex-wrap  items-center justify-center my-5 ml-5">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* // THE MAP FUNTION FOR RENDERING */}
          {codes.map((code) => (
            <div key={code.code_id}class=" max-w-sm p-6 bg-white border items-center border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              {/* the title  */}
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {code.description}
                </h5>
              </a>

              {/* the description */}
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {code.code_data}
              </p>

              {/* the code */}
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {/* {code.whole_code} */}
                {/* {console.log(code.whole_code)} */}
              </p>

              <Modal code={code}/>

              {/* {console.log(code)} */}
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Card;
