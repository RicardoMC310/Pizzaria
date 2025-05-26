const express = require("express");
const sql = require("./connection/connection");

const router = express.Router();

const parseIgredientes = (igredientes) => {
    return igredientes
        .slice(1, -1)                       // remove as chaves { }
        .split(/","|","|","|",/)           // divide nos itens
        .map(s => s.replace(/^"|"$/g, '')); // remove aspas

}

router.get("/getAll", async (_req, res) => {
    const { rows } = await sql.query("SELECT * FROM cardapio");
    
    const format = rows.map(item => {
        return {
            id: item.id,
            name: item.name,
            igredientes: parseIgredientes(item.igredientes)
        };
    });

    res.status(200).json({
        "message": "Dados Recuperados!",
        "status": 200,
        "rows": format
    });

});

router.get("/getById/:id", async (req, res) => {
    const { rows } = await sql.query(`SELECT * FROM cardapio WHERE id = ${req.params.id}`);

    res.status(200).json({
        "message": "Dados Recuperados!",
        "status": 200,
        "rows": rows
    });
});

router.post("/create", async (req, res) => {
    const { name, igredientes } = req.body;

    const { rows } = await sql.query(`INSERT INTO cardapio (name, igredientes) VALUES ($1, $2)`,
        [name, igredientes]
    );

    res.status(200).json({
        "message": "Dados Recuperados!",
        "status": 200,
        "rows": rows
    });

});

router.delete("/delete/:id", async (req, res) => {
    const { rows } = await sql.query(`DELETE FROM cardapio WHERE id = ${req.params.id}`);

    res.status(204).json({
        "message": "Dados Recuperados!",
        "status": 204,
        "rows": rows
    });
});

router.put("/update/:id", async (req, res) => {
    const { name, igredientes } = req.body;

    const {rows} = await sql.query("UPDATE cardapio SET name = $1, igredientes = $2 WHERE id = $3", 
        [name, igredientes, req.params.id]
    );

    res.status(204).json({
        "message": "Dados Recuperados!",
        "status": 204,
        "rows": rows
    });
});

module.exports = router;