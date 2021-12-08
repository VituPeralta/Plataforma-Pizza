window.addEventListener('load', () => {
    //Vars
    var email = document.getElementById('txtEmail')
    var senha = document.getElementById('txtSenha');
    var btnCadastrar = document.getElementById('cadastrar');
    var btnLogin = document.getElementById('login');
    var erro = document.getElementById('erro')

    btnCadastrar.addEventListener('click', () => {
      window.location.href = "paginas/cadastro.html";
    });

    btnLogin.addEventListener('click', () => {
        firebase.auth().signInWithEmailAndPassword(email.value, senha.value)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            localStorage.setItem('uid', user.uid)
            window.location.href ="paginas/paginaPrincipal.html"
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            erro.style.display = "block"
        });
    });
})