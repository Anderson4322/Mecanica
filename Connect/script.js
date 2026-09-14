//realizar login
const form = document.querySelector("form")
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#nome").value
  const password = document.querySelector("#senha").value

  const resposta = await fetch(`${api}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password
    }),
  });
if (resposta.status == 200) {
    const usuarios = await resposta.json();

      localStorage.setItem('id', usuarios.id_clients);
      localStorage.setItem('nome', usuarios.nome_user);
      localStorage.setItem('cargo', usuarios.cargo);
    
    
    console.log(usuarios);


    window.location.href = "../home/index.html";
} 
   return alert("Usuario ou senha incorretos");


});

