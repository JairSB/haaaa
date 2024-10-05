const url_lis = "https://devup-tmp02-default-rtdb.firebaseio.com/";

btn_cadastro.addEventListener('click', e => {
    let user = {
        'nome': nome.value,
        'telefone': telefone.value,
        'email': email.value
    }
    if (controle.value == "") {
        fetch(url_lis + 'usuario.json', {
            method: 'POST',
            body: JSON.stringify(user)
        })
            .then(resposta => resposta.json())
            .then(dados => {
                frm.reset();
                listar();
            })
    } else {
        fetch(url_lis + 'usuario/' + controle.value + '.json', {
            method: 'PUT', body: JSON.stringify(user)
        }
        )
            .then(resposta => resposta.json)
            .then(dados => {
                listar();
                frm.reset();
                controle.value = "";
                btn_cadastro.classList.remove("btn-secondary");
                btn_cadastro.classList.add("btn-success");
                btn_cadastro.innerHTML = 'Cadstrar';
            })

    }


})



function listar() {
    let lista = document.getElementById("lista");
    fetch(url_lis + 'usuario.json')
        .then(resposta => resposta.json())
        .then(dados => {
            console.log(dados)
            lista.innerHTML = "";
            for (const key in dados) {
                lista.innerHTML += `
           <tr>
                <td>${dados[key].nome}</td>
                <td>${dados[key].telefone}</td>
                <td>${dados[key].email}</td>
                <td>
                <button type="button" class="btn btn-danger" onclick="deleta('${key}')">APAGER</button>
                </td>
                <td>
                <button type="button" class="btn btn-warning" onclick="muda('${key}')">ALTERAR</button>
                </td>
           </tr>
           `
            }
        })
}


function deleta(n) {
    fetch(url_lis + 'usuario/' + n + '.json', { method: "DELETE" })
    .then(resposta=>resposta.json())    
    .then(dados=>(
            listar()
        )
        )

}

function muda(n) {
    console.log(n)
    btn_cadastro.classList.add("btn-secondary");
    btn_cadastro.classList.remove("btn-success");
    btn_cadastro.innerHTML = 'Modifica';

    fetch(url_lis + 'usuario/' + n + '.json')
        .then(resposta => resposta.json())
        .then(dads => {

            nome.value = dads.nome;
            telefone.value = dads.telefone;
            email.value = dads.email;
            controle.value = n;


        })
}

setInterval(() => {
    listar();
}, 5000);


listar();

function expor(n){
    var nome_arq=`${n}.xlsx`;
    var exportacao=document.getElementById(tbe);
    var plani = XLSX.utils.table_to_book(exportacao);
    XLSX.writeFile(plani,nome_arq);
}