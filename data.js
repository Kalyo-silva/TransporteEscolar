var routes = []
var vehicles = []
var cost = 0;
var results = [];
var finalResult = {}

function getCamposByParent(button){
    let form = button.parentNode;

    return Array.from(form.getElementsByTagName('input'));
}

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

function validaCampoText(campo){
    if (campo.value.trim().length <= 0){
        return false;
    }
    return true;
}

function validaCampoNumber(campo){
    if (typeof parseFloat(campo.value) != 'number' 
    || Number.isNaN(parseFloat(campo.value)) 
    || campo.value < 0){
        return false;
    }
    return true;   
}

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

function cadastrarGasto(button){
    let campos = getCamposByParent(button);
    if (validaCampos(campos)){
        cost = campos[0].value;
        updateCosts(cost);
    }
}

function selectThis(id_route){
    routes[id_route].checked = !routes[id_route].checked;
}

function selectOnlyThis(id_vehicle){
    vehicles.map((vehicle) => {
        vehicle.checked = false;
    })

    vehicles[id_vehicle].checked = !vehicles[id_vehicle].checked; 
    updateVehiclesTable(vehicles);
}

function validaCamposChecked(array, title){
    let ArrayChecked = array.filter((checks) => checks.checked == true);
    
    if (ArrayChecked.length <= 0){
        RetornaCamposNotChecked(title);
        return false;
    }

    return true;
}

function validaGasto(gasto){
    if (gasto <= 0){
        RetornaCamposNotChecked('Gastos');
        return false;
    }
    return true;
}

function getCustoRota(distancia, consumo, valor){
    return (distancia / consumo) * valor;
}

function calculaRota(){
    if (validaCamposChecked(routes, 'Rotas') && validaCamposChecked(vehicles, 'Veículos') && validaGasto(cost)){
        closePopUp();

        results = [];
        finalResult = {
            "distanciaTotal" : 0,
            "alunosTotal" : 0,
            "custoTotal" : 0,
            "custoPorDistanciaTotal" : 0,
            "custoPorAlunoTotal" : 0,
            "eficienciaTotal" : 0,
        };

        let rotasSelecionadas = routes.filter((rota) => rota.checked == true);
        let veiculo = vehicles.filter((vei) => vei.checked == true)[0];
        let valCombustivel = cost;

        rotasSelecionadas.map((rota) => {  
            let custoRota = getCustoRota(rota.distancia, veiculo.consumo, valCombustivel);

            let resultRota = {
                "Titulo" : rota.titulo,
                "custoRota" : (custoRota).toFixed(2),
                "custoPorDistancia" : (custoRota / rota.distancia).toFixed(2),
                "custoPorAluno" : (custoRota / rota.alunos).toFixed(2),
                "eficiencia" : (rota.distancia / rota.alunos).toFixed(2)
            };

            finalResult.distanciaTotal += parseFloat(rota.distancia);
            finalResult.alunosTotal += parseFloat(rota.alunos);
            finalResult.custoTotal += parseFloat(resultRota.custoRota).toFixed(2);

            results.push(resultRota)
        })

        finalResult.custoPorDistanciaTotal += (finalResult.custoTotal / finalResult.distanciaTotal).toFixed(2);
        finalResult.custoPorAlunoTotal += (finalResult.custoTotal / finalResult.alunosTotal).toFixed(2);
        finalResult.eficienciaTotal += (finalResult.distanciaTotal / finalResult.alunosTotal).toFixed(2);

        createRoute(rotasSelecionadas.length, results, finalResult);
    }
}