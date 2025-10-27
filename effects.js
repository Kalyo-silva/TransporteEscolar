function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var resultContainerSize = 3;

function updateContainerResultSize(){
    document.getElementById('ResultadosContainer').style.gridColumn = '1 / span '+resultContainerSize;
    document.getElementById('gridContainer').style.gridTemplateColumns = 'repeat('+resultContainerSize+',auto)'
}

function openContainer(containerName){
    let container = document.getElementById(containerName);

    if (container.style.display == 'none'){
        container.style.display = 'block';
        
        if (containerName != 'ResultadosContainer')
            resultContainerSize++;
    }
    else{
        container.style.display = 'none';
        
        if (containerName != 'ResultadosContainer')
            resultContainerSize--;
    }

    updateContainerResultSize();
}


function OpenForm(button){
    form = button.parentNode.parentNode.getElementsByClassName('Form');

    if (form[0].style.display == 'flex'){
        form[0].style.display = 'none';
        button.style.transform = 'rotate(0deg)';
    }
    else{
        form[0].style.display = 'flex';
        button.style.transform = 'rotate(45deg)';
    }
}

var bDarkMode = false;

function darkMode(){
    if (bDarkMode){
        document.documentElement.style.setProperty("--bgColor", "#ffffff");
        document.documentElement.style.setProperty("--fgColor", "#f1f1f1");
        document.documentElement.style.setProperty("--font-color", "#151515");
    }
    else{
        document.documentElement.style.setProperty("--bgColor", "#151515");
        document.documentElement.style.setProperty("--fgColor", "#252525");
        document.documentElement.style.setProperty("--font-color", "#ffffff");
    }

    bDarkMode = !bDarkMode
}

async function createRoute(numNodes){
    container = document.getElementById('resultRoute'); 
    
    container.style.gridTemplateColumns = 'repeat('+((numNodes*2)+1)+', auto)';

    container.innerHTML = "";

    for (let i = 0; i < (numNodes*2); i++) {
        if (i%2 == 0){
            let node = document.createElementNS('http://www.w3.org/2000/svg','svg');
            let path = document.createElementNS('http://www.w3.org/2000/svg','path');

            path.setAttribute('d', "M366.67-440h66.66v-116.67h93.34V-440h66.66v-186.67L480-702l-113.33 75.33V-440ZM480-168q129.33-118 191.33-214.17 62-96.16 62-169.83 0-115-73.5-188.17-73.5-73.16-179.83-73.16-106.33 0-179.83 73.16Q226.67-667 226.67-552q0 73.67 63 169.83Q352.67-286 480-168Zm0 88Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z");
            node.appendChild(path);

            node.setAttribute('xmlns', "http://www.w3.org/2000/svg");
            node.setAttribute('height', "42px");
            node.setAttribute('width', "42px");
            node.setAttribute('fill', "green");
            node.setAttribute('viewBox', "0 -960 960 960");

            node.style.opacity = '0';

            container.appendChild(node)

            await sleep(200);

            node.style.opacity = '1';
        }
        else{

            let arrow = document.createElementNS('http://www.w3.org/2000/svg','svg');
            let path = document.createElementNS('http://www.w3.org/2000/svg','path');
            
            path.setAttribute('d', "M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z");
            arrow.appendChild(path);

            arrow.setAttribute('xmlns', "http://www.w3.org/2000/svg");
            arrow.setAttribute('height', "24px");
            arrow.setAttribute('width', "24px");
            arrow.setAttribute('fill', "var(--font-color)");
            arrow.setAttribute('viewBox', "0 -960 960 960");
            
            arrow.style.opacity = '0';

            container.appendChild(arrow)

            await sleep(200);

            arrow.style.opacity = '1';
        }

    }

    let check = document.createElementNS('http://www.w3.org/2000/svg','svg');
    let path = document.createElementNS('http://www.w3.org/2000/svg','path');
    
    path.setAttribute('d', "M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z");
    check.appendChild(path);

    check.setAttribute('xmlns', "http://www.w3.org/2000/svg");
    check.setAttribute('height', "42px");
    check.setAttribute('width', "42px");
    check.setAttribute('fill', "green");
    check.setAttribute('viewBox', "0 -960 960 960");

    check.style.opacity = '0';

    container.appendChild(check)

    await sleep(200);

    check.style.opacity = '1';

    document.getElementById('ButtonResults').style.opacity = '1';
}

function OpenModalDetails(){
    
}

function updateRoutesTable(contents){
    let table = document.getElementById('routesTable');
    table.innerHTML = '';
    contents.map((rota) => {
        table.innerHTML += 
        '<tr>' 
        +'    <td>'+rota['titulo']+'</td>'
        +'    <td>'+rota['distancia']+'</td>'
        +'    <td>'+rota['alunos']+'</td>'
        +'    <td><input onclick="selectThis('+rota['id']+')" type="checkbox" '+(rota['checked'] == true ? 'checked' : '')+'/></td>'
        +'</tr>'; 
    })
}

function updateVehiclesTable(contents){
    let table = document.getElementById('vehiclesTable');
    table.innerHTML = '';
    contents.map((veiculo) => {
        table.innerHTML += 
        '<tr>' 
        +'    <td>'+veiculo['modelo']+'</td>'
        +'    <td>'+veiculo['consumo']+'</td>'
        +'    <td><input onclick="selectOnlyThis('+veiculo['id']+')" type="checkbox" '+(veiculo['checked'] == true ? 'checked' : '')+'/></td>'
        +'</tr>'; 
    })
}

function updateCosts(cost){
    document.getElementById('valueCosts').innerText = "R$"+Number.parseFloat(cost).toFixed(2);
}