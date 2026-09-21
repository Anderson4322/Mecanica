
document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = document.querySelector("#nome").value;
    const password = document.querySelector("#senha").value;
    const email = document.querySelector("#email").value;
    const cpf = document.querySelector("#cpf").value;
    const telefone = document.querySelector("#telefone").value;
    const endereco = document.querySelector("#endereco").value;

    const resposta = await fetch(`${api}cadastro`, {

        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user,
            password,
            email,
            cpf,
            telefone,
            endereco
        })
    })
    if (resposta.status === 201) {
        alert("Cadastrado com sucesso");
        window.location.replace("../Connect/index.html");
    } else {
        alert("Cadastro inválido! Ou Email já cadastrado");


    }
})