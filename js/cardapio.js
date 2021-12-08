window.addEventListener('load', () => {
    var botao = document.getElementById('apagarPizza');
    var botaoPizza = document.getElementById('addPizza')
    var dialogo = document.getElementById('caixaEditar');
    var sabor = document.getElementById('txtSabor');
    var descricao = document.getElementById('txtDescricao');
    var preco = document.getElementById('txtPreco');


    var dialog = document.querySelector('dialog');
    var showDialogButton = document.querySelector('#adicionarPizza');

    var db = firebase.firestore();

    var textoSabor = document.getElementById('txtSaborEditar');
    var textoDescricao = document.getElementById('txtDescricaoEditar');
    var textoPreco = document.getElementById('txtPrecoEditar');

    var btnEditar = document.getElementById('editarPizza');

    var idSabor;

    var botaoFechar = document.getElementById('btnFecharEditar')

    var notifcacao = document.getElementById('aviso');

    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
      }
      showDialogButton.addEventListener('click', function() {
        dialog.showModal();
      });
  
      botaoFechar.addEventListener('click', () => {
        dialogo.close();
      });

      dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
      });

      btnEditar.addEventListener('click', () => {
        var info = {
          sabor: textoSabor.value,
          descricao: textoDescricao.value,
          preco: textoPreco.value

        };
        db.collection('db/cardapio/sabores').doc(idSabor).set(info).then(() => {
          dialogo.close();
          window.alert('Edição feita com sucesso(=')
        }); 
      });
      
    botaoPizza.addEventListener('click', () => {
        var pizzaData = {
            sabor: sabor.value,
            descricao: descricao.value,
            preco: "R$" + preco.value,
        };
        var id = fazerid(15);
        db.collection('db/cardapio/sabores').doc(id).set(pizzaData).then(() => {
              dialog.close(); // Fechar a caixa de texto
              notifcacao.style.opacity = 1;
              //Sumir a notifição depois de um tempo
              //setTimeout - Executra uma função apois milesegundos atribudos
              setTimeout(function(){notifcacao.style.opacity = 0}, 4000)
        });
    });

     db.collection('db/cardapio/sabores').get().then( (info) => {
         //forEach - parecido com o For - oassa em todos os documentos que estão na variavel info
         info.forEach((documento) => {
            console.log(documento.data().sabor);
           /* console.log("Sabor:" + documento.data().sabor + "Descriação:"
             + documento.data().descricao + "Preço:" + documento.data().preco)*/
            //data() retorna as informações de dentro do documento
            criarLinha(documento);
         });
     });

     function criarLinha(info){
         //Variaveis
          var tabela = document.getElementById('tabelaCardapio')
          var linha = document.createElement('tr'); //linha da tabela tr
          linha.id = info.id
          var colunaSabor = document.createElement('td'); //linha da tabela td
          colunaSabor.className = "mdl-data-table__cell--non-numeric";
          var colunaDescricao = document.createElement('td');
          var colunaPreco = document.createElement('td');
          var colunaIcones = document.createElement('td');// coluna icones td
          var iconeApagar = document.createElement('i')//icone apagar
          iconeApagar.id = "apagarPizza";
          iconeApagar.className = "material-icons";
          iconeApagar.addEventListener('click', (e) => {
          var elemento = document.getElementById(e.path[2].id);
             db.collection('db/cardapio/sabores').doc(e.path[2].id).delete().then(() => {
               elemento.remove();
             });
          });
          var iconeEditar = document.createElement('i');
          iconeEditar.className = "material-icons";
          iconeEditar.addEventListener('click', (e) => {
            db.collection('db/cardapio/sabores').doc(e.path[2].id).get().then((documento) =>{
              dialogo.showModal();
              var textoSabor = document.getElementById('txtSaborEditar');
              var textoDescricao = document.getElementById('txtDescricaoEditar');
              var textoPreco = document.getElementById('txtPrecoEditar');
              textoSabor.value = documento.data().sabor;
              textoDescricao.value = documento.data().descricao;
              textoPreco.value = documento.data().preco;
              idSabor = e.path[2].id
            });
          });
          ///////////////////////////////////////////////
          //textcontent = insere um texto na coluna
          colunaSabor.textContent = info.data().sabor;
          colunaDescricao.textContent = info.data().descricao;
          colunaPreco.textContent = info.data().preco;
          colunaSabor.textContent = info.data().sabor;
        iconeApagar.textContent = "delete_outline";
        iconeEditar.textContent = "edit";
        ////////////////////////////////
        //appenchild = inseri um elemanto em outro elemento
        colunaIcones.appendChild(iconeApagar);
        colunaIcones.appendChild(iconeEditar);
        linha.appendChild(colunaSabor);
        linha.appendChild(colunaDescricao);
        linha.appendChild(colunaPreco);
        linha.appendChild(colunaIcones);
        tabela.appendChild(linha);
     };

    function fazerid(quantidade){
        var resultado = '';
        var caracteres = 'ABCDEFGHIJKLMNOPQSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var tamanho = caracteres.length//length = tamanho da variavel.


        //laço de reptição
        //Condição, até quando ira executar
        //contador++ = contador+1
        for(var contador = 0; contador < quantidade; contador++){
            resultado += caracteres.charAt(Math.floor(Math.random() * tamanho));
            //+= adiciona nova letra no finalas
        }
        return resultado;
        //Retorna o valor final

    }
}); 