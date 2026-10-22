// SELEÇÃO DOS ELEMENTOS DO HTML
const btnAbrirCadastro = document.getElementById('btn-abrir-cadastro');
const areaCadastro = document.getElementById('area-cadastro');
const formulario = document.getElementById('formulario-cadastro');
const campoNome = document.getElementById('nome');
const campoIdade = document.getElementById('idade');
const campoEmail = document.getElementById('email');
const campoSenha = document.getElementById('senha');
const mensagemSucesso = document.getElementById('mensagem-sucesso');

// CARDS E SEÇÕES
const cardExplorar = document.getElementById('card-explorar');
const secaoExplorarLivros = document.getElementById('secao-explorar-livros');

const cardClube = document.getElementById('card-clube');
const secaoClubeLivro = document.getElementById('secao-clube-livro');

const cardEscritores = document.getElementById('card-escritores');
const secaoPequenosEscritores = document.getElementById('secao-pequenos-escritores');

// FÓRUM DE DEBATES
const formComentario = document.getElementById('form-comentario');
const listaComentarios = document.getElementById('lista-comentarios');

// CADASTRO DE NOVOS LIVROS
const formCadastrarLivro = document.getElementById('form-cadastrar-livro');
const blocoLivrosComunidade = document.getElementById('bloco-livros-comunidade');
const gridLivrosComunidade = document.getElementById('grid-livros-comunidade');
const msgLivroCadastrado = document.getElementById('msg-livro-cadastrado');

// PEQUENOS ESCRITORES (PUBLICAÇÃO DE OBRAS)
const formPublicarObra = document.getElementById('form-publicar-obra');
const listaObrasPublicadas = document.getElementById('lista-obras-publicadas');
const msgObraPublicada = document.getElementById('msg-obra-publicada');

// FUNÇÃO AUXILIAR PARA OCULTAR TODAS AS SEÇÕES DINÂMICAS ANTES DE ABRIR UMA NOVA
function esconderTodasSecoes() {
    secaoExplorarLivros.classList.add('escondido');
    secaoClubeLivro.classList.add('escondido');
    secaoPequenosEscritores.classList.add('escondido');
}

// TOGGLE DA ÁREA DE CADASTRO DE USUÁRIO
btnAbrirCadastro.addEventListener('click', function() {
    areaCadastro.classList.toggle('escondido');
    if (!areaCadastro.classList.contains('escondido')) {
        areaCadastro.scrollIntoView({ behavior: 'smooth' });
    }
});

// NAVEGAÇÃO ENTRE AS SEÇÕES PELOS CARDS
cardExplorar.addEventListener('click', function() {
    esconderTodasSecoes();
    secaoExplorarLivros.classList.remove('escondido');
    secaoExplorarLivros.scrollIntoView({ behavior: 'smooth' });
});

cardClube.addEventListener('click', function() {
    esconderTodasSecoes();
    secaoClubeLivro.classList.remove('escondido');
    secaoClubeLivro.scrollIntoView({ behavior: 'smooth' });
});

cardEscritores.addEventListener('click', function() {
    esconderTodasSecoes();
    secaoPequenosEscritores.classList.remove('escondido');
    secaoPequenosEscritores.scrollIntoView({ behavior: 'smooth' });
});

// SUBMIT DO FÓRUM DE DEBATES
formComentario.addEventListener('submit', function(event) {
    event.preventDefault();

    const autor = document.getElementById('autor-comentario').value;
    const texto = document.getElementById('texto-comentario').value;

    const novoComentario = document.createElement('div');
    novoComentario.classList.add('comentario-card');
    novoComentario.innerHTML = `<strong>${autor}:</strong><p>${texto}</p>`;

    listaComentarios.prepend(novoComentario);
    formComentario.reset();
});

// SUBMIT DE CADASTRO DE USUÁRIO
formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const novoUsuario = {
        nome: campoNome.value,
        idade: campoIdade.value,
        email: campoEmail.value,
        senha: campoSenha.value
    };

    let usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios_bookplus')) || [];
    usuariosCadastrados.push(novoUsuario);
    localStorage.setItem('usuarios_bookplus', JSON.stringify(usuariosCadastrados));

    mensagemSucesso.style.display = 'block';
    formulario.reset();

    setTimeout(function() {
        mensagemSucesso.style.display = 'none';
        areaCadastro.classList.add('escondido');
    }, 2000);
});

// FUNCIONALIDADE DE CADASTRAR NOVO LIVRO
formCadastrarLivro.addEventListener('submit', function(event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo-livro').value;
    const autor = document.getElementById('autor-livro').value;
    const genero = document.getElementById('genero-livro').value;
    let urlCapa = document.getElementById('url-capa-livro').value;
    const sinopse = document.getElementById('sinopse-livro').value;

    if (!urlCapa.trim()) {
        urlCapa = 'img/livro1.jpg';
    }

    const novoLivro = { titulo, autor, genero, urlCapa, sinopse };

    let livrosSalvos = JSON.parse(localStorage.getItem('livros_comunidade_bookplus')) || [];
    livrosSalvos.push(novoLivro);
    localStorage.setItem('livros_comunidade_bookplus', JSON.stringify(livrosSalvos));

    adicionarLivroNaTela(novoLivro);

    msgLivroCadastrado.style.display = 'block';
    formCadastrarLivro.reset();

    setTimeout(() => {
        msgLivroCadastrado.style.display = 'none';
    }, 2500);
});

function adicionarLivroNaTela(livro) {
    blocoLivrosComunidade.classList.remove('escondido');

    const cardHTML = document.createElement('div');
    cardHTML.classList.add('livro-card');
    cardHTML.innerHTML = `
        <div class="capa-container">
            <img src="${livro.urlCapa}" alt="${livro.titulo}" onerror="this.src='img/livro1.jpg'">
            <div class="sinopse-overlay">
                <p><strong>Autor:</strong> ${livro.autor}<br><br><strong>Sinopse:</strong> ${livro.sinopse}</p>
            </div>
        </div>
        <h4>${livro.titulo}</h4>
    `;

    gridLivrosComunidade.prepend(cardHTML);
}

// FUNCIONALIDADE PEQUENOS ESCRITORES (PUBLICAR HISTÓRIA)
formPublicarObra.addEventListener('submit', function(event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo-obra').value;
    const autor = document.getElementById('autor-obra').value;
    const categoria = document.getElementById('categoria-obra').value;
    const sinopse = document.getElementById('sinopse-obra').value;
    const conteudo = document.getElementById('conteudo-obra').value;

    const novaObra = { titulo, autor, categoria, sinopse, conteudo };

    let obrasSalvas = JSON.parse(localStorage.getItem('obras_escritores_bookplus')) || [];
    obrasSalvas.push(novaObra);
    localStorage.setItem('obras_escritores_bookplus', JSON.stringify(obrasSalvas));

    adicionarObraNaTela(novaObra);

    msgObraPublicada.style.display = 'block';
    formPublicarObra.reset();

    setTimeout(() => {
        msgObraPublicada.style.display = 'none';
    }, 2500);
});

function adicionarObraNaTela(obra) {
    const cardObraHTML = document.createElement('article');
    cardObraHTML.classList.add('obra-card');
    cardObraHTML.innerHTML = `
        <span class="categoria-badge">${obra.categoria}</span>
        <h4>${obra.titulo}</h4>
        <p class="autor-obra-tag">Por <strong>${obra.autor}</strong></p>
        <p class="resumo-obra"><em>"${obra.sinopse}"</em></p>
        <div class="conteudo-completo-obra">
            <p>${obra.conteudo.replace(/\n/g, '<br>')}</p>
        </div>
    `;

    listaObrasPublicadas.prepend(cardObraHTML);
}

// CARREGAR DADOS SALVOS AO ABRIR O SITE
window.addEventListener('DOMContentLoaded', () => {
    let livrosSalvos = JSON.parse(localStorage.getItem('livros_comunidade_bookplus')) || [];
    livrosSalvos.forEach(livro => adicionarLivroNaTela(livro));

    let obrasSalvas = JSON.parse(localStorage.getItem('obras_escritores_bookplus')) || [];
    obrasSalvas.forEach(obra => adicionarObraNaTela(obra));
});