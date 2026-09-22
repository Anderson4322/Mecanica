import express from "express";
import sql from "./database.js";
const routes = express.Router();
//USUÁRIO
routes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    let resposta = await sql`select * from clients where email = ${email}`;

    if (password == resposta[0].senha) {
      return res.status(200).json(resposta[0]);
    } else {
      return res.status(401).json("erro ao logar");
    }
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

routes.get("/usuario", async (req, res) => {
  const resposta = await sql`select * from clients`;
  return res.status(200).json(resposta);
});

routes.get("/carrosUsers", async (req, res) => {
  const resposta = await sql`select * from carros as c join clients as u on c.id_proprietario = u.id_clients`;
  return res.status(200).json(resposta);
});

routes.get("/usuario", async (req, res) => {
  const resposta = await sql`select * from clients`;
  return res.status(200).json(resposta);
});

routes.get("/usuario_especif/:id", async (req, res) => {
  const { id } = req.params;
  const resposta = await sql` SELECT *
            FROM services AS s
            JOIN carros AS c
                ON s.id_veiculo = c.id_car
            JOIN clients AS u
                ON c.id_proprietario = u.id_clients
            WHERE u.id_clients = ${id}`;
  return res.status(200).json(resposta[0]);
});

routes.post("/cadastro", async (req, res) => {
  try {
    const { user, password, email, cpf, telefone, endereco } = req.body;
    console.log(req.body)
    await sql`INSERT INTO clients(nome_user, senha, email, cpf, telefone, endereco) VALUES (${user},${password},${email},${cpf},${telefone}, ${endereco})`;
    return res.status(201).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Erro interno ao cadastrar usuário",
    });
  }
});

// routes.delete("/deletar/:id", async (req, res) => {
//   const { id } = req.params;
//   await sql`delete from clients where id_clients = ${id}`;
//   return res.status(200).json("Deletado");
// });

// routes.put("/editarUser/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(req.params)
//     const { status } = req.body;
//     const resposta = await sql`UPDATE clients
// 	SET status=${status} WHERE id_user=${id} RETURNING '*;`;
//     return res.status(200).json(resposta[0]);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Erro ao editar Usuario" });
//   }
// });



//manutenção
routes.get("/manutencao/:cargo/:id_clients", async (req, res) => {
  const { cargo, id_clients } = req.params;
  let rows;
  if (cargo == 2) {
    rows = await sql`
       
          SELECT *
            FROM services AS s
            JOIN carros AS c
                ON s.id_veiculo = c.id_car
            JOIN clients AS u
                ON c.id_proprietario = u.id_clients
      `;

  } else {
    rows = await sql`

          SELECT *
            FROM services AS s
            JOIN carros AS c
                ON s.id_veiculo = c.id_car
            JOIN clients AS u
                ON c.id_proprietario = u.id_clients
            WHERE u.id_clients = ${id_clients}
    
      `;

  }
  return res.status(200).json(rows);
});


routes.get("/servicos_especif/:id", async (req, res) => {
  const { id } = req.params;
  const resposta = await sql`select * from services where id_service=${id}`;
  return res.status(200).json(resposta[0]);
});

routes.get("/servicos", async (req, res) => {

  const resposta = await sql`select * from services`;
  return res.status(200).json(resposta);
});

routes.post("/cad_services", async (req, res) => {
  try {
    const { descricao, tipo_servico, situacao, valor, id_veiculo } = req.body;
    console.log(descricao, tipo_servico, situacao, valor, id_veiculo)
    const resposta =
      await sql`INSERT INTO services(descricao, tipo_servico, situacao, valor, id_veiculo) VALUES (${descricao}, ${tipo_servico}, ${situacao}, ${valor}, ${id_veiculo}) RETURNING *`;
    return res.status(201).json(resposta);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Erro interno ao adicionar serviço",
    });
  }
});

routes.post("/cadastroCar", async (req, res) => {
  try {
    const { modelo, marca, placa, cor, id_proprietario } = req.body;
    console.log(req.body)
    const resposta = await sql`insert into carros(modelo,marca, placa_veiculo,cor, id_proprietario)values(${modelo}, ${marca}, ${placa},${cor},${id_proprietario})`
    console.log(resposta)
    return res.status(201).json(resposta)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Falha ao cadastrar o veiculo" })
  }
})

routes.delete("/deleta/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await sql`DELETE FROM services WHERE id_service = ${id}`;
    return res.status(200).json({ message: "Serviço deletado" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao deletar serviço" });
  }
});

routes.put("/editar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { dat_saida, tipo_servico, valor, situacao } = req.body;
    const resposta =
      await sql`update services set dat_saida = ${dat_saida}, tipo_servico = ${tipo_servico}, valor=${valor}, situacao=${situacao} where id_service= ${id} RETURNING *`;
    return res.status(201).json(resposta[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao editar serviço" });
  }
});

export default routes;