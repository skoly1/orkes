const axios = require("axios");
const express = require("express");
const cors = require("cors");
const API_URL = require("./constants");

const app = express();
app.use(cors());

// Parse JSON request bodies.
app.use(express.json());

const getNews = async (req, res) => {
  let url = API_URL;

  try {
    if (req.query.page) {
      url = `${API_URL}${req.query.page}`;
    }
    const data = await axios.get(url);
    res.status(200).json({
      data: data.data,
    });
  } catch (error) {
    res.status(500).json({
      error: "Unknown Error",
    });
  }
};

app.use("/", getNews);

const port = 9000;
const server = app.listen(port, () => {
  console.log(`App running on ${port}`);
});
