import React, { useEffect, useState } from "react";

export default function Post() {
  const [sem, setSem] = useState("0"); //use state for sem
  const [sub_code, setSubCode] = useState(""); //use state for subject code
  const [sub_names, setSubNames] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [program, setProgram] = useState("");

  // fetchin semester subjects
  //The code below, fetches the specific subjects for a given semester
  const semSubject = async () => {
    try {
      const semfetch = await fetch(`http://localhost:5000/sem_subject/${sem}`);
      const jsonData = await semfetch.json();

      setSubNames(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  // form submission function
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      // const body = { description, code_data };
      const response = await fetch("http://localhost:5000/codepace", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        // body: JSON.stringify(body),
        body: JSON.stringify({
          sub_code: sub_code,
          title: title,
          description: description,
          program: program,
        }),
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  // use effect for Updating subject names when changes
  useEffect(() => {}, [sub_names]);

  // use effect for Updating subject code when changes
  useEffect(() => {}, [sub_code]);

  // use effect for Updating subject semester value when changes
  useEffect(() => {
    semSubject();
  }, [sem]);

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
              value={title}
              onChange={(e) => setTitle(e.target.value)} //to preventing change in the description
            />
          </div>

          {/* selecting semester value */}
          <label for="sem">Sem</label>
          <select
            id="sem"
            class="ml-4 mb-5 p-2"
            onChange={(e) => {
              setSem(e.target.value);
            }}
          >
            <option value=""></option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>

          {/* selecting subject  */}
          <label for="subjects" class="ml-10">
            Subject
          </label>
          <select
            id="subjects"
            class="ml-4 mb-5 p-2"
            onChange={(e) => setSubCode(e.target.value)}
          >
            <option value="">-- select --</option>
            {/*Mapping the sub_names array fetched and assigning into a new select element */}
            {sub_names.map((sub) => (
              <option key={sub.sub_code} value={sub.sub_code}>
                {sub.sub_name}
              </option>
            ))}
          </select>

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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            onChange={(e) => setProgram(e.target.value)}
          ></textarea>

          {/* <div class="flex items-start mb-6">
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
          </div> */}

          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>

          {/* temp */}
          <button
            onClick={semSubject}
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            fetch
          </button>
        </form>
      </div>
    </>
  );
}
