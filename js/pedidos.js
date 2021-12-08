window.addEventListener('load', () => {
    var btnPedido = document.getElementById('verPedido');
    var dialog = document.getElementById('dialogPedido');
    var btnAddPedido = document.getElementById('addPedido');
    var btnFecharPedido = document.getElementById('fecharPedido');
    var dialogPedido = document.getElementById('dialogAddPedido');;
    var db = firebase.firestore();
    var btnAnotar = document.getElementById('anotarPedido');
    var nome = document.getElementById('txtNome');
    var telefone = document.getElementById('txtTelefone');
    var data = document.getElementById('txtData');
    var local = document.getElementById('txtLocal');

    btnAnotar.addEventListener('click', () => {
      var pizzas = verificarPizzas();
      var id = fazerid(10);
      var info = {
        nome: nome.value,
        telefone: telefone.value,
        data: data.value,
        local: local.value,
        sabores: pizzas
      };

     db.collection('db/pedidos/anotados').doc(id).set(info).then(() => {
       dialogPedido.close();
       window.alert('Pedido feito')
       });

    });
     
     btnAddPedido.addEventListener('click', () => {
       dialogPedido.showModal();
     });
     btnFecharPedido.addEventListener('click', () => {
      dialogPedido.close();
      
    });

    // btnPedido.addEventListener('click', () => {
    //   dialog.showModal();
    // });

      dialog.querySelector('.close').addEventListener('click', () => {
          dialog.close();
      });


     db.collection('db/pedidos/anotados').get().then((info) =>{
       info.forEach((document) => {
         criarPedido(document);
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
       ///////////////////////////////////////////////
       //textcontent = insere um texto na coluna
       colunaSabor.textContent = info.data().sabor;
       colunaDescricao.textContent = info.data().descricao;
       colunaPreco.textContent = info.data().preco;
       colunaSabor.textContent = info.data().sabor;
     ////////////////////////////////
     var colunaCaixa = document.createElement('td');
     var label = document.createElement('label');
     label.className = "switch";
     var input = document.createElement('input');
     input.type = "checkbox";
     input.id = info.id
     var span = document.createElement('span');
     span.className = "slider";

     label.appendChild(input);
     label.appendChild(span);
     colunaCaixa.appendChild(label);

     //appenchild = inseri um elemanto em outro elemento
     linha.appendChild(colunaCaixa);
     linha.appendChild(colunaSabor);
     linha.appendChild(colunaDescricao);
     linha.appendChild(colunaPreco);
     tabela.appendChild(linha);
  };

  function criarLinha2(info){
    //Variaveis
     var tabela = document.getElementById('tabelaPedido')
     var linha = document.createElement('tr'); //linha da tabela tr
     linha.id = info.id
     var colunaSabor = document.createElement('td'); //linha da tabela td
     colunaSabor.className = "mdl-data-table__cell--non-numeric";
     var colunaDescricao = document.createElement('td');
     var colunaPreco = document.createElement('td');
     ///////////////////////////////////////////////
     //textcontent = insere um texto na coluna
     colunaSabor.textContent = info.data().sabor;
     colunaDescricao.textContent = info.data().descricao;
     colunaPreco.textContent = info.data().preco;
     colunaSabor.textContent = info.data().sabor;
   ////////////////////////////////
   //appenchild = inseri um elemanto em outro elemento
   linha.appendChild(colunaSabor);
   linha.appendChild(colunaDescricao);
   linha.appendChild(colunaPreco);
   tabela.appendChild(linha);
};

  function criarPedido(info){
    var pedidos = document.getElementById('listaPedidos');
   var divgeral = document.createElement('div');
   divgeral.id = info.id;
   divgeral.className = "pedido";
   var titulo = document.createElement('h5');
   titulo.innerHTML = "Pedido #" + info.id //Pedido #777
   var nome = document.createElement('p');
   nome.innerHTML = "Nome: " + info.data().nome;
   var telefone = document.createElement('p');
   telefone.innerHTML = "Tel: " + info.data().telefone;
   var data = document.createElement('p');
   data.innerHTML = "Data: " + info.data().data;
   var local = document.createElement('p');
   local.innerHTML = "Local: " + info.data().local;
   
   var iconeVer = document.createElement('i');
   iconeVer.id = "verPedido";
   iconeVer.style.cursor = "pointer";
   iconeVer.className = "material-icons";
   iconeVer.innerHTML = "assignment";

   var iconeApagar = document.createElement('i');
   iconeApagar.id = info.id;
   iconeApagar.style.cursor = "pointer";
   iconeApagar.className = "material-icons";
   iconeApagar.innerHTML = "done";
 
   iconeVer.addEventListener('click', (e) => {
     var tabela = document.getElementById('tabelaPedido');
     tabela.textContent = " ";
    db.collection('db/pedidos/anotados').doc(e.path[1].id).get().then((info) => {
        var pizzas = info.data().sabores;
        var caixa = document.getElementById('dialogPedido');
        var nome = document.getElementById('nomePedido');
        nome.innerHTML = "Nome " + info.data().nome;
        var telefone = document.getElementById('telefonePedido');
        telefone.innerHTML = "Telefone " + info.data().telefone;
        var data = document.getElementById('dataPedido');
        data.innerHTML = "Data " + info.data().data;
        var local = document.getElementById('localPedido');
        local.innerHTML = "Local " + info.data().local;
        pizzas.forEach((id) => {//Passar item por item na lista de pizzas
          db.collection('db/cardapio/sabores').doc(id).get().then((info) => {
            console.log(info.data());
            criarLinha2(info);
          });
        });
        caixa.showModal();
    });
});

   iconeApagar.addEventListener('click',(e) => {
    var elemento = document.getElementById(e.path[1] .id);
    db.collection('db/pedidos/anotados').doc(e.path[1].id).delete().then(() =>{
        elemento.remove();
    });
   });


   divgeral.appendChild(titulo);
   divgeral.appendChild(document.createElement('hr'));
   divgeral.appendChild(nome);
   divgeral.appendChild(document.createElement('hr'));
   divgeral.appendChild(telefone);
   divgeral.appendChild(document.createElement('hr'));
   divgeral.appendChild(data);
   divgeral.appendChild(document.createElement('hr'));
   divgeral.appendChild(local);
   divgeral.appendChild(document.createElement('hr'));
   divgeral.appendChild(iconeVer);
   divgeral.appendChild(iconeApagar);
   pedidos.appendChild(divgeral);






  };

   function verificarPizzas(){
     //Agrupar todos os inputs com o id - checkbox
     //Vereficar se esta checked - verificado 
     //Se verificado adicionar o id da pizza em uma lista
     //Lista - var lista = []
     //quando teminar a vereficação, puxar os dados das pizzas no banco de dados e enviar 
     //a lista com todas as informações
     //getElemtById = selecina o elemento pelo id 
     //querySelectorAll = seleciona todos os elementos com aquele nome 
     var caixas = document.querySelectorAll('input');
     var pizzas = []; // [] = lista
     caixas.forEach((caixa) => { // Laço d3 repetição que executa com a quantidade de itens 
       if(caixa.type == "checkbox" && caixa.checked == true){
        pizzas.push(caixa.id); //adiciona a lista o item desejado (Push)
        //push = puxar 
        //pull = empurrar
       };
     });
     return pizzas;
   }

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
