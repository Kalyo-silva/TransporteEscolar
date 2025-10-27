var routes = []
var vehicles = []
var cost = 0;

function getCamposByParent(button){
    let form = button.parentNode;

    return Array.from(form.getElementsByTagName('input'));
}

function validaCampo(campo){
    return true;
}

function cadastrarRota(button){
    let campos = getCamposByParent(button)
    let rota = {}

    rota['id'] = routes.length;

    campos.map((campo) => {
        if (!validaCampo(campo)){
            return RetornaCampoInválido(campo, campo.value);
        }
        rota[campo.name] = campo.value;
    })

    rota['checked'] = false;

    routes.push(rota);

    updateRoutesTable(routes);
}

function CadastrarVeiculo(button){
    let campos = getCamposByParent(button)

    let veiculo = {}

    veiculo['id'] = vehicles.length;

    campos.map((campo) => {
        if (!validaCampo(campo)){
            return RetornaCampoInválido(campo, campo.value);
        }
        veiculo[campo.name] = campo.value;
    })

    veiculo['checked'] = false;

    vehicles.push(veiculo);

    updateVehiclesTable(vehicles)
}

function cadastrarGasto(button){
    let campos = getCamposByParent(button);

    if (!validaCampo(campos[0])){
        return RetornaCampoInválido(campos[0], campos[0].value);
    }

    cost = campos[0].value;

    updateCosts(cost);
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

function calculaRota(){
    rotasSelecionadas = routes.filter((rota) => rota.checked == true);

    createRoute(rotasSelecionadas.length);
}