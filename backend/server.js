import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

app.get("/weather/:cityId", async (req, res) => {
  const { cityId } = req.params;

  try {
    const ipmaUrl = `https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/${cityId}.json`;
    const response = await fetch(ipmaUrl);

    if (!response.ok) {
      return res.status(500).json({ error: "Erro ao obter dados do IPMA" });
    }

    const data = await response.json();
    res.json(data); // ⬅️ MUITO IMPORTANTE
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log("✅ Backend IPMA ativo em http://localhost:3001");
});