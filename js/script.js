document.addEventListener("DOMContentLoaded", function () {
    
    function carregarPagina(page) {
        fetch(page)
            .then(response => {
                if (!response.ok) {
                    throw new Error('A resposta não foi carregada: ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById('conteudo-principal').innerHTML = data;
                addEventListener();
            })
            .catch(error => console.error('Error ao carregar página:', error));
    }
  
    document.querySelectorAll('.navbar-nav a').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const page = this.getAttribute('data-page');
            carregarPagina(page);
        });
    });
  
    carregarPagina('/pages/etanol-ou-gasolina.html');

    const toggleThemeBtn = document.getElementById('toggle-theme');
    toggleThemeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    const preferredTheme = localStorage.getItem('theme');
    if (preferredTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

});

function addEventListener() {

    const btnCalcularCombustivel = document.querySelector('button[onclick="calcularCombustivel()"]');
    if (btnCalcularCombustivel) {
        btnCalcularCombustivel.addEventListener('click', calcularCombustivel);
    }

    const btnConverterMoeda = document.querySelector('button[onclick="converterMoeda()"]');
    if (btnConverterMoeda) {
        btnConverterMoeda.addEventListener('click', converterMoeda);
    }

    const btnConverterBase = document.querySelector('button[onclick="converterBase()"]');
    if (btnConverterBase) {
        btnConverterBase.addEventListener('click', converterBase);
    }

}

function calcularCombustivel() {

    const etanol = parseFloat(document.getElementById('etanol').value);
    const gasolina = parseFloat(document.getElementById('gasolina').value);

    if (isNaN(etanol) || isNaN(gasolina)) {
        alert('Por favor, insira valores válidos.');
        return;
    }

    const resultado = etanol / gasolina;
    const mensagem = resultado <= 0.7 ? 'Compensa abastecer com álcool.' : 'Compensa abastecer com gasolina.';
    
    document.getElementById('resultadoCombustivel').innerText = mensagem;

}

function calcularIMC() {

    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    if (isNaN(peso) || isNaN(altura) || altura <= 0 || peso <= 0) {
        alert('Por favor, insira valores válidos para peso e altura.');
        return;
    }

    const imc = peso / (altura * altura);
    const classificacao = interpretarClassificacaoIMC(imc);
    const mensagem = `Seu IMC é ${imc.toFixed(2)} (${classificacao}).`;

    document.getElementById('resultadoIMC').innerText = mensagem;

}

function interpretarClassificacaoIMC(imc) {
    if (imc < 18.5) {
        return 'Abaixo do peso';
    } else if (imc < 25) {
        return 'Peso normal';
    } else if (imc < 30) {
        return 'Sobrepeso';
    } else {
        return 'Obesidade';
    }
}

function converterBase() {
    
    const numero = document.getElementById('numero').value.trim();

    const baseOrigem = parseInt(document.getElementById('baseOrigem').value);
    const baseAlvo = parseInt(document.getElementById('baseAlvo').value);

    if (!validarNumero(numero, baseOrigem)) {
        alert('Por favor, insira um número válido para a base selecionada.');
        return;
    }

    const decimal = parseInt(numero, baseOrigem);

    const resultado = decimal.toString(baseAlvo);

    document.getElementById('resultadoBase').innerText = `Resultado: ${resultado.toUpperCase()}`;

}

function validarNumero(numero, baseOrigem) {

    for (let i = 0; i < numero.length; i++) {
        const caractere = numero[i].toUpperCase();
        if (isNaN(parseInt(caractere, baseOrigem))) {
            return false;
        }
    }

    return true;
}

