window.addEventListener('load', () => {
    var dialogo = document.getElementById('caixaFoto');
    var btnfoto = document.getElementById('mudarFoto');
    var fechar = document.getElementById('fechar');
    var alterar = document.getElementById('alterar');
    var foto2 = document.getElementById('foto2');
    var foto1 = document.getElementById('foto');
    var id = localStorage.getItem('uid');
    var db = firebase.firestore();

    btnfoto.addEventListener('click', () =>{
        dialogo.showModal();//Função que mostra a caixa na tela
    });

    fechar.addEventListener('click', () => {
        dialogo.close();//Fechar a caixa da tela 
    });

    alterar.addEventListener('click', () => {
        var link = document.getElementById('txtImagem');
        var info = {
            avatar: link.value
        }
        db.collection('users').doc(id).set(info, {merge: true}).then(() => {
            foto1.style.backgroundImage = 'url('+ link.value+')';
            foto2.style.backgroundImage = 'url('+ link.value+')';
            dialogo.close();
        });
    });

    db.collection('users').doc(id).get().then((info) => {
        var primeiroNome = document.getElementById('primeiroNome');
        var segundoNome = document.getElementById('segundoNome');
        var cpf = document.getElementById('cpf');
        var nascimento = document.getElementById('dataNascimento');
        var dataCriacao = document.getElementById('dataCriacao');
        var email = document.getElementById('email');
        primeiroNome.innerHTML = "Primeiro nome" + info.data().primeiroNome;
        segundoNome.innerHTML = "Segundo nome" + info.data().segundoNome;
        cpf.innerHTML = "CPF: " + info.data().informacoes.cpf;
        nascimento.innerHTML = "Data de nascimento: " + info.data().informacoes.dataNascimento;
        dataCriacao.innerHTML = "Data de criação: 08/11/2021";
        email.innerHTML = "Email: " + info.data().email
    });

});