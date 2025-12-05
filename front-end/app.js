const lista = document.getElementById("listaTarefas");
const API_URL = "https://helptask.onrender.com";
var criarTarefa = document.getElementById("criar_tarefa_tela");
var btnAbrirCriarCriarTarefa = document.getElementById("criar_tarefa");
var btnCriarATarefa = document.getElementById("concluir_criar_tarefa");
var spanFechar = document.getElementById("fechar");

listarTarefas();

let todasAsTarefas = [];

async function listarTarefas() {
    lista.innerHTML = "";

    const resposta = await fetch(`${API_URL}/tarefas`);
    todasAsTarefas = await resposta.json();

    renderizarLista(todasAsTarefas);

}

function renderizarLista(tarefas) {
    tarefas.forEach((tarefa) => {
        lista.innerHTML += `
            <div class="tarefa">
                <div>
                    <strong>${tarefa.titulo}</strong><br>
                    Prioridade: ${tarefa.prioridade}<br>
                    Prazo: ${tarefa.prazo}
                </div>
                <div class="espaco_botao_tarefa">
                    <button class="botoes_tarefa concluir" data-id="${tarefa._id}">Concluir</button>
                    <button class="botoes_tarefa excluir" data-id="${tarefa._id}">Excluir</button>
                </div>
            </div>
        `;
    });
    
}

ativarEventos()

function ativarEventos() {

    document.addEventListener("click", async (btn) => {

        if (btn.target.classList.contains("concluir")) {
            const id = btn.target.dataset.id;
            await concluirTarefa(id);
            listarTarefas();
        }

        if (btn.target.classList.contains("excluir")) {
            const id = btn.target.dataset.id;
            await excluirTarefa(id);
        }

        if (btn.target.classList.contains("btn_filtrar_tarefa_tela")) {
            salvarTarefaFiltrada();
        }

    });
}



function abrirTelaCriarTarefa() {
    criarTarefa.style.display = "block";
    document.querySelector(".box").classList.add("fundo_desfocado");
    document.querySelector(".box").style.pointerEvents = "none"; 
    document.body.style.overflow = "hidden";
}

function abrirTelaFiltrarTarefa() {
    filtrar_tela.style.display = "block";
    document.querySelector(".box").classList.add("fundo_desfocado");
    document.querySelector(".box").style.pointerEvents = "none";
    document.body.style.overflow = "hidden";
}

function fecharTelaCriarTarefa() {
    criarTarefa.style.display = "none";
    document.querySelector(".box").classList.remove("fundo_desfocado");
    document.querySelector(".box").style.pointerEvents = "auto";
    document.body.style.overflow = "auto";
}

function fecharTelaFiltrarTarefa() {
    filtrar_tela.style.display = "none";
    document.querySelector(".box").classList.remove("fundo_desfocado");
    document.querySelector(".box").style.pointerEvents = "auto";
    document.body.style.overflow = "auto";
}

async function salvarTarefaCraida() {
    var titulo = document.getElementById("titulo").value;
    var prioridade = document.getElementById("prioridade_criar_tarefa").value;
    var descricao = document.getElementById("descricao").value;
    var prazo = document.getElementById("prazo").value;

    if (!titulo.trim()) {
        alert("O título é obrigatório!");
        return;
    }

    const resposta = await fetch(`${API_URL}/tarefas`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            titulo: titulo,
            descricao: descricao,
            prioridade: prioridade,
            prazo: prazo
        })
    })
    
    fecharTelaCriarTarefa();
    listarTarefas();
    return resposta.json();
}

function salvarTarefaFiltrada() {

    const filtros = {
        adicaoInicio: document.getElementById("adicao_data_inicio").value,
        adicaoFim: document.getElementById("adicao_data_fim").value,
        prazoInicio: document.getElementById("prazo_data_inicio").value,
        prazoFim: document.getElementById("prazo_data_fim").value,
        prioridade: document.getElementById("prioridade_filtrar_tarefa").value
    };

    if(validarDatas() !== true) return;
    filtrarTarefas(filtros);
    fecharTelaFiltrarTarefa();
}



function filtrarTarefas(filtros) {

    let filtradas = [...todasAsTarefas];

    function parseDataBR(str) {
        if (!str || typeof str !== 'string') return null;
        
        if (str.includes('-') && str.match(/^\d{4}-\d{2}-\d{2}$/)) {
            const [ano, mes, dia] = str.split('-');
            return new Date(Number(ano), Number(mes) - 1, Number(dia));
        }
        
        if (str.includes('/')) {
            const [dia, mes, ano] = str.split('/');
            return  new Date(Number(ano), Number(mes) - 1, Number(dia));
        }
        return null;
    }
    
    if(filtros.adicaoInicio) {
        filtradas = filtradas.filter(t => {
            if (!t.dataCriacao) return false;
            return parseDataBR(t.dataCriacao) >= parseDataBR(filtros.adicaoInicio)
        });
    }

    if(filtros.adicaoFim) {
        filtradas = filtradas.filter(t => {
            if (!t.dataCriacao) return false;
            return parseDataBR(t.dataCriacao) <= parseDataBR(filtros.adicaoFim)
        });
    }

    if(filtros.prazoInicio) {
        filtradas = filtradas.filter(t => {
            if (!t.prazo) return false;
            return parseDataBR(t.prazo) >= parseDataBR(filtros.prazoInicio)
        });
    }

    if(filtros.prazoFim) {
        filtradas = filtradas.filter(t => {
            if (!t.prazo) return false;
            return parseDataBR(t.prazo) <= parseDataBR(filtros.prazoFim)
        });
    }

    if (filtros.prioridade !== "Prioridade") {
        filtradas = filtradas.filter(t => t.prioridade === filtros.prioridade);
    }

    lista.innerHTML = "";
    renderizarLista(filtradas);
}

async function concluirTarefa(id) {
    const resposta = await fetch(`${API_URL}/tarefas/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"}
    });
    return resposta.json();
}

async function excluirTarefa(id) {
    const resposta = await fetch(`${API_URL}/tarefas/${id}`, {
        method: "DELETE"
    });
    listarTarefas();
}

function validarDatas(event) {
    var dataAdicaoDataInicio = document.getElementById("adicao_data_inicio").value;
    var dataAdicaoDataFim = document.getElementById("adicao_data_fim").value;
    var dataPrazoDataInicio = document.getElementById("prazo_data_inicio").value;
    var dataPrazoDataFim = document.getElementById("prazo_data_fim").value;
    var mensagemErro = document.getElementById("mensagem_erro");

    if (dataAdicaoDataFim < dataAdicaoDataInicio || dataPrazoDataFim < dataPrazoDataInicio) {
        mensagemErro.textContent = "A data Fim não pode ser anterior que a data de inicio!";
        event.preventDefault();
        return false;
    } else {
        mensagemErro.textContent = '';
        return true;
    }
}
