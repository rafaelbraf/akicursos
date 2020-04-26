var url = "https://akicursosapi.herokuapp.com/api/cursos";

var cursosMarketing = document.getElementById("cursos-marketing");

var listaCursosMarketing = [];

//  MODAL
var modalCardTitulo = document.getElementById('modal-card-title');
var modalCardNomeCurso = document.getElementById('modal-titulo');
var modalCardDescricao = document.getElementById('modal-descricao');
var modalCardImagem = document.getElementById('imagem');
var modalBotaoCurso = document.getElementById('botao-curso');
var botaoFechar = document.getElementById('botao-fechar');

//  PASSANDO RESULTADOS DA API PARA UMA FUNCAO
function main() {
    requestApi().then(res => mostrarCursos(res));
}

//  MOSTRAR CURSOS
async function mostrarCursos(res) {

    $('#loader').hide();

    //  TEMPLATES
    let templateMarketing = "";

    //  VERIFICANDO A CATEGORIA DO CURSO
    for (var i in res) {
        if (res[i].categoria === "Marketing") {
            listaCursosMarketing.push(res[i]);
        } 
    }

    // MOSTRANDO A LISTA DE CURSOS
    for (var i in listaCursosMarketing) {
        templateMarketing = `
                <div class="column is-3">
                    <div class="card">
                        <div class="card-content">
                            <figure class="image is-4by3">
                                <img src="${listaCursosMarketing[i].urlImagem}" >
                            </figure>                                                       
                        </div>
                        <div class="card-content">
                            <div class="content">
                                <h5>${listaCursosMarketing[i].nome}</h5>
                            </div> 
                        </div>
                    </div> <br> <br>
                    <button class="button is-fullwidth is-dark" id="button" onclick="mostrarCursoPorId(${listaCursosMarketing[i].idCurso})">
                        Ver mais
                    </button>
                </div>                
            `;
        cursosMarketing.innerHTML += templateMarketing;
    }

}

function mostrarCursoPorId(id) {

    document.querySelector('#modal-ter').classList.add("is-active");    

    $.ajax({
        type: "GET",
        url: `https://akicursosapi.herokuapp.com/api/curso/id/${id}`,
        dataType: "json",
        success: function(data) {
            curso = data;
            modalCardTitulo.innerHTML = curso["categoria"];
            modalCardNomeCurso.innerHTML = curso["nome"];
            modalCardDescricao.innerHTML = curso["descricao"];
            modalCardImagem.innerHTML = `
                <img src="${curso["urlImagem"]}" width="250">
            `;
            modalBotaoCurso.innerHTML = `
                <a href="${curso["urlCurso"]}" target="blank">
                    <button class="button is-fullwidth is-dark" id="button">Ir para curso</button>
                </a>
            `;
        }
    });

}

function fecharModal() {    
    document.querySelector('#modal-ter').classList.remove("is-active");
}

//  REQUISITANDO API
async function requestApi() {
    let response = await fetch(url);
    response = await response.json();
    return response;
}

//  FUNCAO PRINCIPAL PARA INICIAR TUDO
main();