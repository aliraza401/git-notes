const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Octokit } = require("@octokit/core");
require("dotenv").config();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITUB_CLIENT_SECRET = process.env.GITUB_CLIENT_SECRET;
const GITHUB_TOKEN_URL = process.env.GITHUB_TOKEN_URL;
const PORT = process.env.PORT || 5000; // Fallback port

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/getToken", (req, res) => {
  const { code } = req.query;
  const url = `${GITHUB_TOKEN_URL}?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITUB_CLIENT_SECRET}&code=${code}`;
  fetch(url, { method: "POST", headers: { Accept: "application/json" } })
    .then((res) => res.json())
    .then((data) => {
      res.json({ access_token: data });
    });
});

app.get("/user", async (req, res) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) return res.status(401).json({ error: "Not authenticated" });
  const octokit = new Octokit({ auth: accessToken });

  try {
    const response = await octokit.request("GET /user");
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/gists", async (req, res) => {
  const { page, per_page, query } = req.query;
  const octokit = new Octokit();

  try {
    const requestPath = query ? "GET /gists/public" : "GET /gists";
    const response = await octokit.request(requestPath, {
      page,
      per_page,
      q: query,
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/users/:username/gists", async (req, res) => {
  const { username } = req.params;
  const { page, per_page } = req.query;
  const octokit = new Octokit();

  try {
    const response = await octokit.request("GET /users/{username}/gists", {
      username,
      page,
      per_page,
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/gists", async (req, res) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) return res.status(401).json({ error: "Not authenticated" });
  const octokit = new Octokit({ auth: accessToken });

  try {
    const { description, files, public } = req.body;
    const response = await octokit.request("POST /gists", {
      description,
      files,
      public,
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/gists/:id", async (req, res) => {
  const { id: gist_id } = req.params;
  const octokit = new Octokit();

  try {
    const response = await octokit.request("GET /gists/{gist_id}", {
      gist_id,
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.patch("/gists/:gist_id", async (req, res) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) return res.status(401).json({ error: "Not authenticated" });
  const octokit = new Octokit({ auth: accessToken });
  const { gist_id } = req.params;

  try {
    const { description, files } = req.body;
    const response = await octokit.request("PATCH /gists/{gist_id}", {
      gist_id,
      description,
      files,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.put("/gists/:gist_id/star", async (req, res) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) return res.status(401).json({ error: "Not authenticated" });
  const octokit = new Octokit({ auth: accessToken });
  const gist_id = req.params.gist_id;

  try {
    await octokit.request("PUT /gists/{gist_id}/star", {
      gist_id: gist_id,
    });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/gists/:gist_id/star", async (req, res) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) return res.status(401).json({ error: "Not authenticated" });
  const octokit = new Octokit({ auth: accessToken });
  const gist_id = req.params.gist_id;

  try {
    await octokit.request("GET /gists/{gist_id}/star", {
      gist_id,
    });
    res.json(true);
  } catch (error) {
    if (error.status === 404) {
      res.json(false);
    } else {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
});

app.delete("/gists/:gist_id/star", async (req, res) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) return res.status(401).json({ error: "Not authenticated" });
  const octokit = new Octokit({ auth: accessToken });
  const gist_id = req.params.gist_id;

  try {
    await octokit.request(`DELETE /gists/${gist_id}/star`);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.delete("/gists/:gist_id", async (req, res) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) return res.status(401).json({ error: "Not authenticated" });
  const octokit = new Octokit({ auth: accessToken });
  const gist_id = req.params.gist_id;

  try {
    await octokit.request("DELETE /gists/{gist_id}", {
      gist_id,
    });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/gists/:gist_id/fork", async (req, res) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) return res.status(401).json({ error: "Not authenticated" });
  const octokit = new Octokit({ auth: accessToken });
  const gist_id = req.params.gist_id;

  try {
    const response = await octokit.request(`POST /gists/${gist_id}/forks`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server on PORT :: ${PORT}`));
