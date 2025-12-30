import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch'; // Garante que tens o node-fetch instalado se usares Node antigo

const app = express();
app.use(cors());

app.get('/weather/:id', async (req, res) => {
    const { id } = req.params;
    
    // Forçamos a URL correta com HTTPS e .json no final
    const url = `https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/${id}.json`;

    console.log(`>>> A tentar ligar ao IPMA: ${url}`);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            console.error(`❌ Erro no IPMA (Status ${response.status}) para o ID ${id}`);
            return res.status(response.status).json({ error: "Cidade não encontrada no IPMA" });
        }

        const data = await response.json();
        console.log(`✅ Dados recebidos para o ID ${id}`);
        res.json(data);

    } catch (error) {
        console.error("❌ Erro de Rede no Node:", error.message);
        res.status(500).json({ error: "Falha de comunicação com o IPMA" });
    }
});