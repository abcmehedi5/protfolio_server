const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const project = require("./projects.json");
const cors = require("cors");
app.use(cors());
app.use(express.json());

// data base connection

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mbjz2.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db("protfolio");
const projectscollection = db.collection("projects");

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    // api start---------------------

    app.post("/project", (req, res) => {
      console.log(req.body);
    });

    app.get("/project", (req, res) => {
      res.send(project);
    });
    app.get("/project/:id", (req, res) => {
      const id = req.params.id;
      const query = project.find((project) => project._id == id);
      res.send(query);
    });

    // api end-----------------------
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Protfolio app listening on port ${port}`);
});
