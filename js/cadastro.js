window.addEventListener('load', () =>{
 //Todo o codigo

    //Variaveis
    var nome = document.getElementById('txtNome');
    var sobrenome = document.getElementById('txtSobrenome');
    var cpf = document.getElementById('txtCPF');
    var dataNacimento = document.getElementById('txtData');
    var email = document.getElementById('txtEmail');
    var senha = document.getElementById('txtSenha');
    //////////////////////////////////////////
    //Botões
     var voltar = document.getElementById('btnVoltar');
     var cadastrar = document.getElementById('btnCadastrar');
    //////////////////////////////////////////
    //Variavel de Informação-JSON

    voltar.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

   cadastrar.addEventListener('click', () => {
    var info = {
        primeiroNome: nome.value,
        segundoNome: sobrenome.value,
        informacao: {
            cpf: cpf.value,
            dataNacimento:dataNacimento.value
        },
        email: email.value
    };
       console.log(info);
    firebase.auth().createUserWithEmailAndPassword(email.value, senha.value)
            .then((userCredential) => { ///Qunado esta correto
            // Signed in
            var user = userCredential.user;
            var db = firebase.firestore();
            db.collection('users').doc(user.uid).set(info).then(() => {
                window.alert("deu certo")
            });
            
            })
            .catch((error) => { //Quando ocorre erro
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            });
        });



});