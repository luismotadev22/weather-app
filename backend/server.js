import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());

app.get('/weather/:id', async (req, res) => {
    const { id } = req.params;

    // 1. CORREÇÃO CRÍTICA: Remove tudo o que não for número (resolve o erro :1)
    const cleanId = id.toString().replace(/[^0-9]/g, '');

    const url = `https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/${cleanId}.json`;

    console.log(`>>> ---------------------------------------------------`);
    console.log(`>>> Pedido Original: "${id}"`);
    console.log(`>>> ID Limpo:        "${cleanId}"`);
    console.log(`>>> URL Gerado:      ${url}`);

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            console.log(`❌ Erro IPMA: ${response.status} Not Found`);
            // Dá uma dica visual no terminal se o ID parecer suspeito
            if (response.status === 404) {
                console.log(`⚠️  DICA: O ID ${cleanId} pode não existir. Tenta confirmar na lista oficial.`);
            }
            return res.status(response.status).json({ error: "ID não encontrado no IPMA" });
        }

        const data = await response.json();
        console.log(`✅ Sucesso! Dados recebidos.`);
        res.json(data);

    } catch (error) {
        console.error("❌ Erro de Rede Interno:", error.message);
        res.status(500).json({ error: "Falha ao contactar o IPMA" });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`✅ Servidor ligado em http://localhost:${PORT}`);
});