/*

    ==== arquivo de effeitos do front-end ====
    
    - Responsável pela criação e manipulação de elementos na tela do usuário

*/

//Função de sleep para animações via js
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Função de Darkmode para o estilo da página
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

//habilita o modo dark automaticamente a partir das 20:00
function setDarkmodeByTime(){
    time = new Date();
    
    if (time.getHours() > 19){
        darkMode();
    }
}

//Ao esconder algum dos paineis, redimensiona o grid para que a aba resultado fique sempre abaixo
var resultContainerSize = 3;
function updateContainerResultSize(){
    document.getElementById('ResultadosContainer').style.gridColumn = '1 / span '+resultContainerSize;
    document.getElementById('gridContainer').style.gridTemplateColumns = 'repeat('+resultContainerSize+',auto)'
}

//Esconde ou mostra cada painel do sistema
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

//Esconde ou abre o formulario de cadastro de cada painel, baseado na herança do botão
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

// Função responsável pela animação das rotas sendo geradas e a apresentação do modal de resultados
async function createRoute(numNodes, resultadosPorRota, resutadosGerais){
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

    OpenModalDetails(resultadosPorRota, resutadosGerais);   
}

// Função que altera a tabela de rotas em tela
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

// Função que altera a tabela de veiculos em tela
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

// Função que altera o campo de custo do combustível na tela
function updateCosts(cost){
    document.getElementById('valueCosts').innerText = "R$"+Number.parseFloat(cost).toFixed(2)+' / Litro';
}

//Função que cria um popup de erro na tela do usuário
function RetornaCampoInválido(listaCamposInvalidos){
    closePopUp();

    let popup = document.createElement('article');
    popup.id = 'errorDialog'

    let text = document.createElement('p')

    if (listaCamposInvalidos.length == 1){
        text.innerText = 'O campo ['+listaCamposInvalidos[0].name+'] do tipo ['+listaCamposInvalidos[0].type+'] está inválido e precisa ser preenchido corretamente para realizar o cadastro, tente novamente.';
    }
    else{
        text.innerText = 'Foram incontrados vários campos inválidos quee precisa ser preenchidos corretamente para realizar o cadastro, tente novamente.';    
    }
    
    let close = document.createElement('p');
    close.className = 'close';
    close.onclick = () => {closePopUp()};
    close.innerText = 'x';

    popup.appendChild(text);
    popup.appendChild(close);

    document.body.appendChild(popup);
    
    //Destaca com vermelho os campos inválidos
    listaCamposInvalidos.map((campo) => {
        campo.className += ' invalid';
        campo.previousElementSibling.style = 'color: red;';

        campo.addEventListener('focus', () => {removeInvalid(campo)});
    })
}

// Função que retorna um popup caso uma das seções não tenha valor selecionado
function RetornaCamposNotChecked(title){
    closePopUp();

    let popup = document.createElement('article');
    popup.id = 'errorDialog'

    let text = document.createElement('p')
    text.innerText = 'A seção de ['+title+'] Não possui um valor selecionado.'
    
    let close = document.createElement('p');
    close.className = 'close';
    close.onclick = () => {closePopUp()};
    close.innerText = 'x';

    popup.appendChild(text);
    popup.appendChild(close);

    document.body.appendChild(popup);
}



// destroi o popup criado
function closePopUp(){
    let popup = document.getElementById('errorDialog');

    if (popup != null)
        popup.remove();
}


//Remove o efeito de inválido dos campos ao focar.
function removeInvalid(campo){
    campo.className = campo.className.replace(' invalid', '');
    campo.previousElementSibling.style = 'color: var(--font-color);';
}

// Cria um modal que contem os resultados das rotas
function OpenModalDetails(resultadosPorRota, resultadosGerais){
    let modalBg = document.createElement('div');
    modalBg.id = 'modalBg';
    let modal = document.createElement('div')
    modal.id = 'modal';

    let modalHeader = document.createElement('header');
    modal.appendChild(modalHeader);

    let title = document.createElement('p');
    title.innerText = 'Resultados Gerais';
    title.style.fontWeight = 'Bold';
    modalHeader.appendChild(title)
    let close = document.createElement('p');
    close.className = 'close';
    close.innerText = 'x';
    close.onclick = () => {modalBg.remove()};
    modalHeader.appendChild(close)

    let container = document.createElement('section');
    container.style = 'display: flex; justify-content: space-between; gap: 1rem;';
    modal.appendChild(container);

    let routeResultsContainer = document.createElement('section');
    routeResultsContainer.style = 'display:flex; gap:1rem; flex-direction:column; width: 100%;'
    container.appendChild(routeResultsContainer);

    resultadosPorRota.map((result) => {
        let resultcontainer = document.createElement('article');
        resultcontainer.style = 'border: 1px solid gray; padding: 1rem;';
        routeResultsContainer.appendChild(resultcontainer);

        let resultTitle = document.createElement('p');
        resultTitle.style = 'font-weight: Bold; border-bottom: 1px solid gray; margin-bottom: 1rem;';
        resultTitle.innerText = result.titulo;

        let custo = document.createElement('p');
        custo.innerText = 'Custo: R$'+result.custoRota;
        let custoPorDistancia = document.createElement('p');
        custoPorDistancia.innerText = 'Custo/Km: R$'+result.custoPorDistancia;
        let custoPorAluno = document.createElement('p');
        custoPorAluno.innerText = 'Custo/Alunos: R$'+result.custoPorAluno;
        let eficiencia = document.createElement('p');
        eficiencia.innerText = 'Eficiencia: '+result.eficiencia+' (Km/Aluno)';

        resultcontainer.appendChild(resultTitle);
        resultcontainer.appendChild(custo);
        resultcontainer.appendChild(custoPorDistancia);
        resultcontainer.appendChild(custoPorAluno);
        resultcontainer.appendChild(eficiencia);
    });

    ResultGeralContainer = document.createElement('article');
    ResultGeralContainer.style = 'border: 1px solid gray; padding: 1rem; width: 100%;';
    container.appendChild(ResultGeralContainer);
    
    let resultGeralTitle = document.createElement('p');
    resultGeralTitle.style = 'font-weight: Bold; border-bottom: 1px solid gray; margin-bottom: 1rem;';
    resultGeralTitle.innerText = 'Resultado Total';

    ResultGeralContainer.appendChild(resultGeralTitle);

    let distanciaTotal = document.createElement('p');
    distanciaTotal.innerText = 'Distância Total: '+resultadosGerais.distanciaTotal+' Km';
    let alunosTotal = document.createElement('p');
    alunosTotal.innerText = 'Quantidade de Alunos Total: '+resultadosGerais.alunosTotal+' Alunos';
    let custoTotal = document.createElement('p');
    custoTotal.innerText = 'Custo Total: R$'+resultadosGerais.custoTotal;
    let custoPorDistanciaTotal = document.createElement('p');
    custoPorDistanciaTotal.innerText = 'Custo/Km: R$'+resultadosGerais.custoPorDistanciaTotal;
    let custoPorAlunoTotal = document.createElement('p');
    custoPorAlunoTotal.innerText = 'Custo/Alunos: R$'+resultadosGerais.custoPorAlunoTotal;
    let eficienciaTotal = document.createElement('p');
    eficienciaTotal.innerText = 'Eficiencia: '+resultadosGerais.eficienciaTotal+' (Km/Aluno)';

    ResultGeralContainer.appendChild(distanciaTotal);
    ResultGeralContainer.appendChild(alunosTotal);
    ResultGeralContainer.appendChild(custoTotal);
    ResultGeralContainer.appendChild(custoPorDistanciaTotal);
    ResultGeralContainer.appendChild(custoPorAlunoTotal);
    ResultGeralContainer.appendChild(eficienciaTotal);

    modalBg.appendChild(modal);
    document.body.appendChild(modalBg);
}