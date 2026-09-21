const userName = document.querySelector("h2")
const btnlogin = document.querySelector(".login")
const btnCadastro = document.querySelector(".cadastro")
const cargo = localStorage.getItem("cargo")
const nome = localStorage.getItem("nome")

if (!nome) {
    userName.textContent = " Visitante"
} else if (cargo == 2) {
    userName.textContent = `Bem vindo funcionario: ${nome}`
} else {
    userName.textContent = `Bem vindo ${nome}`
}

const openButton = document.querySelector("#open")


if (cargo == 1) {
    openButton.style.display = "none"
}
const modal = document.querySelector("#modal")
openButton.addEventListener('click', () => {
    modal.showModal()
})

document.querySelector("#close").addEventListener('click', () => {
    modal.close()
})

const modalCar = document.querySelector("#modalCar")

document.querySelector("#MaisCarro").addEventListener('click', () => {
    modalCar.showModal()
})
const MaisCarro = document.querySelector("#MaisCarro")
if (cargo == 2) {
    MaisCarro.style.display = "none"
}

document.querySelector("#closeModalCar").addEventListener('click', () => {
    modalCar.close()
})

const form = document.querySelector("form")
const corpo = document.querySelector("tbody")
const quantidade = document.querySelector("#nProdutos")

let total = 0;
if (total == 0) {
    quantidade.textContent = "Nenhum treino foi listado"
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const descricao = document.querySelector("#descricao").value;
    const tipo_servico = document.querySelector("#tipo_servico").value;
    const situacao = document.querySelector("#situacao").value;
    const valor = document.querySelector("#valor").value;
    const id_veiculo = document.querySelector("#id_usuario").value;

    const resposta = await fetch(`${api}cad_services`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            descricao,
            tipo_servico,
            situacao,
            valor,
            id_veiculo
        }),
    });

    if (resposta.status == 201) {
        const Produto = await resposta.json();
        alert("Serviço adicionado")
        window.location.reload()
    } else {
        alert("Erro");

    }
});

const disconnect = document.querySelector("#disconnect")
disconnect.addEventListener('click', () => {
    localStorage.clear()
    alert("System from disconnect..")
    window.location.replace("../Connect/index.html")
})

const id_fabric = document.querySelector("#id_usuario")
let prods = [];

const id_clients = localStorage.getItem("id")
window.addEventListener("load", async () => {
    const resposta = await fetch(`${api}manutencao/${cargo}/${id_clients}`);
    const usuarios = await fetch(`${api}carrosUsers`);

    prods = await resposta.json();

    const users = await usuarios.json();
    users.forEach((prod) => {
        id_fabric.innerHTML += `
      <option value="${prod.id_clients}">${prod.modelo} de ${prod.nome_user}</option>
      `;
    })


    renderizar(prods);
});


function renderizar(prods) {
    prods.forEach((element) => {
        corpo.innerHTML += `     <tr>
                <td>${element.id_service}</td>
                <td>${element.nome_user}</td>
                <td>${element.modelo}</td>
                <td>${element.marca}</td>
                <td>${element.cor}</td>
                <td>${element.descricao}</td>
                <td>${element.situacao}</td>
                <td>${element.dat_entrada}</td>
                <td>${element.dat_saida}</td>
                <td>${element.tipo_servico}</td>
                <td>${element.valor}</td>
                <td>
                <div id="buttonMove">
                ${cargo != 1 ? `<button id="deletar" onclick="deletar(${element.id_service})">🗑️</button>` : '<div></div>'}
                ${cargo != 1 ? `<button id="edita" onclick="editar(${element.id_service})">✏️</button>` : '<div></div>'}                
                ${cargo != 1 ? `<button id="ficha" onclick="ficha(${element.id_clients})">🗃️</button>` : '<div></div>'}                
                </div>
                </td>
            </tr>`;
        console.log(prods)
        total++;
        quantidade.textContent = "Total de serviços:" + total;
    });
}

async function ficha(id) {
    console.log(id)
    const closeDetalhes = document.querySelector("#closeDetalhes")
    closeDetalhes.addEventListener('click', () => {
        const modalDetalhes = document.querySelector("#DetalhesModal")
        modalDetalhes.close()
    })

    const usuario = await fetch(`${api}usuario_especif/${id}`);
    const user = await usuario.json();
    const modalDetalhes = document.querySelector("#DetalhesModal")
    const Nome_aluno = document.querySelector("#Nome_aluno")
    const Detalhes_modelo = document.querySelector("#Detalhes_modelo")
    const Detalhes_marca = document.querySelector("#Detalhes_marca")
    const Detalhes_placa = document.querySelector("#Detalhes_placa")
    const Detalhes_cor = document.querySelector("#Detalhes_cor")
    Nome_aluno.textContent = `Ficha do Proprietario: ${user.nome_user}`
    Nome_aluno.style.fontSize = "20px"
    Detalhes_modelo.textContent = `${user.modelo}`
    Detalhes_marca.textContent = ` ${user.marca}`
    Detalhes_placa.textContent = `${user.placa_veiculo}`
    Detalhes_cor.textContent = `${user.cor}`

    modalDetalhes.showModal()
}
document.querySelector("#formCar").addEventListener('submit', async (e) => {
    e.preventDefault();

    const modelo = document.querySelector("#modeloCar").value;
    const marca = document.querySelector("#marcaCar").value;
    const placa = document.querySelector("#placaCar").value;
    const cor = document.querySelector("#corCar").value;
    const id_proprietario = localStorage.getItem("id")
    const resposta = await fetch(`${api}cadastroCar`, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            modelo,
            marca,
            placa,
            cor,
            id_proprietario
        })
    })
    if (resposta.status === 201) {
        alert("Veiculo cadastrado com sucesso")
        return window.location.reload()
    }
    else {
        console.log(resposta.error)
        return alert("Error ao cadastro de veiculo")
    }
})

async function deletar(id) {
    const resposta = await fetch(`${api}deleta/${id}`, {
        method: "DELETE",
    });
    if (resposta.status == 200) {
        return window.location.reload();
    }
    return alert("erro ao deletar");
}

const modalEditar = document.querySelector("#modalEditar")

async function editar(id) {
   const produto = await fetch(`${api}servicos_especif/${id}`);
    const prod = await produto.json();
    const datas = {
        dat_saida: prompt("Nome do Data de saida", prod.dat_saida),
        tipo_servico: prompt("Tipo de serviço", prod.tipo_servico),
        valor: prompt("Valor", prod.valor),
        situacao: prompt("Situacao", prod.situacao),

    };

    const resposta = await fetch(`${api}editar/${id}`, {
        method: "put",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(datas),
    });
    if (resposta.status == 201) {
        window.location.reload()
    }
    else {
        return alert("erro ao editar");
    }
}