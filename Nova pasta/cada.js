const url_lis= "https://devup-tmp02-default-rtdb.firebaseio.com/";
let text =[]

btn_cadastro.addEventListener('click',e=>{

    let user={
        'nome':nome.value,
        'telefone':telefone.value,
        'email':email.value
    }
    fetch(url_lis+'usuario.json',{
        method:'POST',
        body: JSON.stringify(user)
    })
    .then(resposta =>resposta.json())
    .then(dados=>{
        listar();
    })

})



function listar(){
    let lista=document.getElementById("lista");
    fetch(url_lis+'usuario.json')
    .then(resposta =>resposta.json())
    .then(dados=>{
        console.log(dados)
        lista.innerHTML="";
        for (const key in dados) {
           lista.innerHTML+=`
           <tr>
                <td>${dados[key].nome}</td>
                <td>${dados[key].telefone}</td>
                <td>${dados[key].email}</td>
                <button type="button" class="btn btn-danger" onclick="deleta(${key})">APAGER</button>
                <button type="button" class="btn btn-warning" onclick="muda(${key})">ALTERAR</button>
           </tr>
           `
           console.log(key)
        }
    })
}
listar();


function deleta(n){
    fetch(url_lis+'usuario/'+n+'.json',{method:'DELETE'})
    listar();
}

function muda(n) {
    console.log(n)
    btn_cadastro.classList.add("btn-secondary");
    btn_cadastro.classList.remove("btn-success");

    fetch(url_lis+'usuario.json')
    .then(resposta =>resposta.json())
    .then(dads=>{

    nome.value=dads[n].nome
    telefone.value=n.telefone
    email.value=n.email
})
}