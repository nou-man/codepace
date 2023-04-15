const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const pool = require("./db");

//MiddleWare
app.use(cors());
app.use(express.json());

//ROUTES

//create a code data i.e posting data into database

app.post("/codepace", async (req, res) => {
  try {
    const { sub_code, title, description, code_id, program } = req.body; //from req.body 
    //postgres query old version postgresql command to insert into database
    await pool.query("BEGIN;");
    const newCode = await pool.query("INSERT INTO code_description (sub_code, title, description) VALUES ($1, $2, $3) RETURNING code_id;",[sub_code, title, description]);
    const newCode2 = await pool.query("INSERT INTO programs (code_id, program) VALUES (currval('code_description_code_id_seq'), $1); ",[program]);
    await pool.query("COMMIT;");
      // console.log(newCode.rows);
      // console.log(newCode2.rows);
    res.json(newCode.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// //get all code data

app.get("/codepace", async (req, res) => {
  try {
    const allCode = await pool.query(" SELECT cd.code_id, s.sem, s.sub_code, s.sub_name, cd.title, cd.description, p.program FROM subjects s INNER JOIN code_description cd ON s.sub_code = cd.sub_code INNER JOIN programs p ON cd.code_id = p.code_id;");
    res.json(allCode.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// //get semester -> subjects

app.get("/sem_subject/:sem", async (req, res) => {
  try {
    const { sem } = req.params;
    const allCode = await pool.query(" SELECT s.sem, s.sub_code, s.sub_name FROM subjects s WHERE s.sem = $1;",[sem]);
    res.json(allCode.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// //get a specific code
// app.get("/codebase/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const code = await pool.query("SELECT * FROM codebase WHERE code_id = $1", [
//       id,
//     ]);
//     res.json(code.rows);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// //update a code
// app.put("/codebase/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { description } = req.body;
//     const { code_data } = req.body;
//     const updateCode = await pool.query(
//       "UPDATE codebase SET description = $1, code_data = $2 WHERE code_id = $3",
//       [description, code_data, id]
//     );
//   } catch (err) {
//     console.error(err.message);
//   }
//   res.json("Code was updated");
// });

// //delete a Code
// app.delete("/codebase/:id", async(req,res) => {
//     try {
//         const {id} = req.params;
//         const deleteCode = await pool.query("DELETE FROM codebase WHERE code_id = $1", [id]);
//     } catch (err) {
//         console.error(err.message);
//     }
//     res.json("Code was deleted!")
// });

//server start & message
app.listen(port, () => {
  console.log("The server has started on port 5000");
});
