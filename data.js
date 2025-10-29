/*

    ===== Arquivo de Manipulação de dados do sistema =====

    - Responsável pelo armazenamento de dados, cadastro e validação dos dados informados.

*/


// Variáveis que servem como memória temporária para o sistema (sem persistência de dados)
var routes = []
var vehicles = []
var cost = 0;
var results = [];
var finalResult = {}


// função que retorna todos os inputs de um formulario a partir do pai do botao clickado
function getCamposByParent(button){
    let form = button.parentNode;

    return Array.from(form.getElementsByTagName('input'));
}

// função de validação dos preenchimento dos campos
function validaCampos(listaCampos){
    let camposInvalidos = []

    listaCampos.map((campo) => {
        switch (campo.type) {
            case 'text':
                if (!validaCampoText(campo)){
                    camposInvalidos.push(campo)
                };     
                break;   
            case 'number':
                if (!validaCampoNumber(campo)){
                    camposInvalidos.push(campo)
                };
                break;
            default:
                camposInvalidos.push(campo)
                break;
        }
    })
    
    if (camposInvalidos.length > 0){
        console.log(camposInvalidos);
        RetornaCampoInválido(camposInvalidos);
        return false;
    }
    return true;
}

// Validação de campos do tipo Text
function validaCampoText(campo){
    if (campo.value.trim().length <= 0){
        return false;
    }
    return true;
}


// Validação de campos do tipo number
function validaCampoNumber(campo){
    if (typeof parseFloat(campo.value) != 'number' 
    || Number.isNaN(parseFloat(campo.value)) 
    || campo.value < 0){
        return false;
    }
    return true;   
}

// Função responsavel por cadastrar as rotas na memória caso validados os campos.
function cadastrarRota(button){
    let campos = getCamposByParent(button)
    let rota = {}

    if (validaCampos(campos)){
        rota['id'] = routes.length; // campo padrão 
        campos.map((campo) => {
            rota[campo.name] = campo.value; // pega os campos dinâmicos baseados nos inputs do front
        })
        rota['checked'] = false; // campo padrão
        routes.push(rota);
        updateRoutesTable(routes);
    }

}

// Função responsável por cadastrar os veículos na memoria, caso validado os campos
function CadastrarVeiculo(button){
    let campos = getCamposByParent(button)
    let veiculo = {}

    if (validaCampos(campos)){
        veiculo['id'] = vehicles.length;
        campos.map((campo) => {
            veiculo[campo.name] = campo.value;
        })
        veiculo['checked'] = false;
        vehicles.push(veiculo);
        updateVehiclesTable(vehicles)
    }
}

// Função responsável por cadastrar o gasto na memória, caso validado o campo
function cadastrarGasto(button){
    let campos = getCamposByParent(button);
    if (validaCampos(campos)){
        cost = campos[0].value;
        updateCosts(cost);
    }
}

// Função que altera o campo selecionado das rotas, permitindo selecionar mais de uma rota 
function selectThis(id_route){
    routes[id_route].checked = !routes[id_route].checked;
}

// Função que altera o campo selecionado dos veículos, permitindo apenas uma seleção.
function selectOnlyThis(id_vehicle){
    vehicles.map((vehicle) => {
        vehicle.checked = false;
    })

    vehicles[id_vehicle].checked = !vehicles[id_vehicle].checked; 
    updateVehiclesTable(vehicles);
}

// Verifica se uma array de campos possui algum valor selecionado e caso contrario retorna erro.
function validaCamposChecked(array, title){
    let ArrayChecked = array.filter((checks) => checks.checked == true);
    
    if (ArrayChecked.length <= 0){
        RetornaCamposNotChecked(title);
        return false;
    }

    return true;
}

// Valida se o gasto possui um valor positivo > 0
function validaGasto(gasto){
    if (gasto <= 0){
        RetornaCamposNotChecked('Gastos');
        return false;
    }
    return true;
}

// Retorna o custo da rota em especifico
function getCustoRota(distancia, consumo, valor){
    return (distancia / consumo) * valor;
}

function getCustoPorDistancia(custo, distancia){
    return (custo / distancia).toFixed(2);
}

function getCustoPorAlunos(custo, alunos){
    return (custo / alunos).toFixed(2);
}

function getEficiencia(distancia, alunos){
    return (distancia / alunos).toFixed(2);
}

//Função que implementa a regra de negócio e salva os resultados em memória.
function calculaRota(){
    if (validaCamposChecked(routes, 'Rotas') && validaCamposChecked(vehicles, 'Veículos') && validaGasto(cost)){
        closePopUp();

        results = [];
        finalResult = {
            "distanciaTotal" : parseFloat(0),
            "alunosTotal" : parseFloat(0),
            "custoTotal" : parseFloat(0),
            "custoPorDistanciaTotal" : parseFloat(0),
            "custoPorAlunoTotal" : parseFloat(0),
            "eficienciaTotal" : parseFloat(0),
        };

        let rotasSelecionadas = routes.filter((rota) => rota.checked == true);
        let veiculo = vehicles.filter((vei) => vei.checked == true)[0];
        let valCombustivel = cost;

        rotasSelecionadas.map((rota) => {  
            let custoRota = getCustoRota(rota.distancia, veiculo.consumo, valCombustivel);

            let resultRota = {
                "titulo" : rota.titulo,
                "custoRota" : (custoRota).toFixed(2),
                "custoPorDistancia" : getCustoPorDistancia(custoRota, rota.distancia),
                "custoPorAluno" : getCustoPorAlunos(custoRota, rota.alunos),
                "eficiencia" : getEficiencia(rota.distancia, rota.alunos)
            };

            finalResult.distanciaTotal += parseFloat(rota.distancia);
            finalResult.alunosTotal += parseFloat(rota.alunos);
            finalResult.custoTotal = parseFloat(finalResult.custoTotal) + parseFloat(resultRota.custoRota);

            results.push(resultRota)
        })

        finalResult.custoPorDistanciaTotal = getCustoPorDistancia(finalResult.custoTotal, finalResult.distanciaTotal);
        finalResult.custoPorAlunoTotal = getCustoPorAlunos(finalResult.custoTotal, finalResult.alunosTotal);
        finalResult.eficienciaTotal = getEficiencia(finalResult.distanciaTotal, finalResult.alunosTotal);

        console.log(finalResult);

        createRoute(rotasSelecionadas.length, results, finalResult);
    }
}