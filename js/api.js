//  API
var url = "https://akicursosapi.herokuapp.com/api/cursos";

// DIVS DAS CATEGORIAS DO INDEX
var cursosProgramacao = document.getElementById("cursos-programacao");
var cursosMarketing = document.getElementById("cursos-marketing");
var cursosGames = document.getElementById("cursos-games");
var cursosInvestimentos = document.getElementById("cursos-investimentos");

//  LISTA DOS CURSOS
var listaCursosProgramacao = [];
var listaCursosMarketing = [];
var listaCursosGames = [];
var listaCursosInvestimentos = [];

//  MODAL
var modalCardTitulo = document.getElementById('modal-card-title');
var modalCardNomeCurso = document.getElementById('modal-titulo');
var modalCardDescricao = document.getElementById('modal-descricao');
var modalImagem = document.getElementById('imagem');
var botaoFechar = document.getElementById('botao-fechar');
var modalBotaoCurso = document.getElementById('botao-curso');

//  PASSANDO RESULTADOS DA API PARA UMA FUNCAO
function main() {
    requestApi().then(res => mostrarCursos(res));
}

//  MOSTRAR CURSOS
async function mostrarCursos(res) {

    $('#loader').hide();

    //  TEMPLATES
    let templateProgramacao = "";
    let templateMarketing = "";
    let templateInvestimentos = "";
    let templateGames = "";

    //  VERIFICANDO A CATEGORIA DO CURSO
    for (var i in res) {
        if (res[i].categoria === "Programação") {
            listaCursosProgramacao.push(res[i]);
        } else if (res[i].categoria === "Marketing") {
            listaCursosMarketing.push(res[i]);
        } else if (res[i].categoria === "Games") {
            listaCursosGames.push(res[i]);
        } else if (res[i].categoria === "Investimentos") {
            listaCursosInvestimentos.push(res[i]);
        }
    }

    // MOSTRANDO A LISTA DE CURSOS
    for (var i in listaCursosProgramacao) {
        templateProgramacao = `
                <div class="column is-3">
                    <div class="card">
                        <div class="card-content">
                            <figure class="image is-4by3">
                                <img src="${listaCursosProgramacao[i].urlImagem}" >
                            </figure>                                                       
                        </div>
                        <div class="card-content">
                            <div class="content">
                                <h5>${listaCursosProgramacao[i].nome}</h5>
                            </div> 
                        </div>
                    </div> <br> <br>
                    <button class="button is-fullwidth is-dark" id="button" onclick="mostrarCursoPorId(${listaCursosProgramacao[i].idCurso})">
                        Ver mais
                    </button>
                </div>                
            `;
        cursosProgramacao.innerHTML += templateProgramacao;
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

    // MOSTRANDO A LISTA DE CURSOS
    for (var i in listaCursosInvestimentos) {
        templateInvestimentos = `
            <div class="column is-3">
                <div class="card">
                    <div class="card-content">
                        <figure class="image is-4by3">
                            <img src="${listaCursosInvestimentos[i].urlImagem}" >
                        </figure>                                                       
                    </div>
                    <div class="card-content">
                        <div class="content">
                            <h5>${listaCursosInvestimentos[i].nome}</h5>
                        </div> 
                    </div>
                </div> <br> <br>
                <button class="button is-fullwidth is-dark" id="button" onclick="mostrarCursoPorId(${listaCursosInvestimentos[i].idCurso})">
                    Ver mais
                </button>
            </div> 
            `;
        cursosInvestimentos.innerHTML += templateInvestimentos;
    }

    // MOSTRANDO A LISTA DE CURSOS
    for (var i in listaCursosGames) {
        templateGames = `
                <div class="column is-3">
                    <div class="card">
                        <div class="card-content">
                            <figure class="image is-4by3">
                                <img src="${listaCursosGames[i].urlImagem}" >
                            </figure>                                                       
                        </div>
                        <div class="card-content">
                            <div class="content">
                                <h5>${listaCursosGames[i].nome}</h5>
                            </div> 
                        </div>
                    </div> <br> <br>
                    <button class="button is-fullwidth is-dark" id="button" onclick="mostrarCursoPorId(${listaCursosGames[i].idCurso})">
                        Ver mais
                    </button>
                </div> 
            `;
        cursosGames.innerHTML += templateGames;
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
            modalImagem.innerHTML = `
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