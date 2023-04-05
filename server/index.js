const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const pool = require("./db");

//MiddleWare
app.use(cors());
app.use(express.json());

//ROUTES

//create a code data

app.post("/codebase", async (req, res) => {
  try {
    const { description, code_data } = req.body;
    const newCode = await pool.query(
      "INSERT INTO codebase (description, code_data) VALUES($1, $2) RETURNING *",
      [description, code_data]
    );

    res.json(newCode.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get all code data

app.get("/codebase", async (req, res) => {
  try {
    const allCode = await pool.query("SELECT * FROM codebase");
    res.json(allCode.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a specific code
app.get("/codebase/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const code = await pool.query("SELECT * FROM codebase WHERE code_id = $1", [
      id,
    ]);
    res.json(code.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//update a code
app.put("/codebase/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const { code_data } = req.body;
    const updateCode = await pool.query(
      "UPDATE codebase SET description = $1, code_data = $2 WHERE code_id = $3",
      [description, code_data, id]
    );
  } catch (err) {
    console.error(err.message);
  }
  res.json("Code was updated");
});


//delete a Code
app.delete("/codebase/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const deleteCode = await pool.query("DELETE FROM codebase WHERE code_id = $1", [id]);
    } catch (err) {
        console.error(err.message);
    }
    res.json("Code was deleted!")
});


//server start & message
app.listen(port, () => {
  console.log("The server has started on port 5000");
});
