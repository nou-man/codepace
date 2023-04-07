import React, { useState } from "react";

export default function Post() {
  const [description, setDescription] = useState("");
  const [code_data, setCodedata] = useState("");
  const [whole_code, setWholeCode] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      // const body = { description, code_data };
      const response = await fetch("http://localhost:5000/codebase", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        // body: JSON.stringify(body),
        body: JSON.stringify({
          description: description,
          code_data: code_data,
          whole_code: whole_code,
        }),
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <div class="constainer p-10">
        <form onSubmit={onSubmitForm}>
          <div class="mb-6">
            <label
              for="title"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="title-id"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Title"
              required
              value={description} //named:title:as description in db
              onChange={(e) => setDescription(e.target.value)} //to preventing change in the description
            />
          </div>

          {/* Description area  */}
          <label
            for="description-id"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            class="block bg-gray-50 w-full px-4 py-2 leading-5 text-gray-900  border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
            rows="4"
            id="description-id"
            placeholder="Explain the program briefly"
            value={code_data}
            onChange={(e) => setCodedata(e.target.value)}
          ></textarea>

          {/* Code area  */}
          <label
            for="codeArea-id"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Paste the code here
          </label>
          <textarea
            class="block bg-gray-50 w-full px-4 py-2 leading-5 text-gray-900  border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
            rows="8"
            id="description-id"
            placeholder="Explain the program briefly"
            onChange={(e) => setWholeCode(e.target.value)}
          ></textarea>

          <div class="flex items-start mb-6">
            <div class="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              for="remember"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Agree to terms and conditions
            </label>
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
