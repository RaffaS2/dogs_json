page = 1;

let todosCaes = []; // array global para guardar todos os cães de todas as páginas

// Vai buscar TODOS os cães de uma vez ao carregar a página (sem paginação)
fetch('http://localhost:3000/dogs')
  .then(response => response.json())
  .then(data => { todosCaes = data; });

function carregarCaes() {
  
  //vamo buscar o host que queremos usar da api
  let pedidoHttp = fetch(`http://localhost:3000/dogs?_page=${page}&_limit=24`);

  // a variavel que chamamos em cima com o host, chamamos em baixo
    pedidoHttp.then((response) => { // entao, chamamos o resposta
            if (!response.ok) { //(O ! nega o valor booleano da expressão response.ok)
                throw Error(response.statusText); // se for falsa = throw error
            }
            return response.json(); // se a resposta for verdadeira = return  resposta em json
        })
        .then((data) => aparecerCaes(data)) // entao depois de passar para o verdadeira vai buscar os valores da data, e colocamos a função "aparecerCaes" para as divs e os cards serem toas utilizadas com as informações da data
        .catch((error) => { // se der erro irá aparecer este erro
            console.error("Houve um erro ao buscar os dados dos cães:", error);

            let p1 = document.createElement("p")
            p1.className ="p-error"
            p1.innerText = "Nothing to show here :/ ";

            let i = document.createElement("i");
            i.className = "fa-solid fa-shield-dog";

            let p2 = document.createElement("p")
            p2.className = "p-error2"
 
            document.body.appendChild(p1);
            document.body.appendChild(i);
            document.body.appendChild(p2);

            document.querySelector('.pagination').style.display = 'none';

            
        });

}

document.getElementById("nextPage").addEventListener("click", function() {
  if (page < 8) {
      page++;
      cleanBody();
      carregarCaes();
  }     
});



document.getElementById("previousPage").addEventListener("click", function() {
  if(page > 1)
  page--;
  cleanBody();
  carregarCaes();
});

function cleanBody() {
  document.getElementById("row").innerHTML = "";
}

function aparecerCaes(caes) { // criamosa função que vai aparecer os caes ao dar load à PAGINA (colocando o parametro caes)

     let row = document.getElementById("row");

    for (let index = 0; index < 24 ; index++) { // alteramos para que só apareçam 12 imagens
      let cao = caes[index];

      let div = document.createElement("div");
      div.className = "col-lg-3 col-md-4 col-sm-6 col-6";

      let div1 = document.createElement("div");
      div1.className = "card";

      let img = document.createElement("img"); /**/
      img.className = "card-img-top";
      img.setAttribute("src", cao.image.url);
      
      let p = document.createElement("p");
      p.className = "card-text";
      p.innerText = cao.name;

      let i = document.createElement("i");
        i.className = "fa-solid fa-download";

        i.addEventListener("click", function() {
          window.open(cao.image.url, "_blank");
        });

       
      div1.appendChild(img);
      div1.appendChild(p);
      div1.appendChild(i);

      div.appendChild(div1);
      row.appendChild(div);
            
    }
    
}

function procurarCaes() {
    $('#errorModal').modal('hide');
    
    let input = document.getElementById("procurarInput").value;

    if (!input) {
      $('#errorModal').modal('show');
      return;
    }

    // Filtra do array global que tem todos os cães (todas as páginas)
    let resultados = todosCaes.filter(cao =>
      cao.name.toLowerCase().includes(input.toLowerCase())
    );

    // Limpa o que está no ecrã
    document.getElementById("row").innerHTML = "";
    document.querySelector('.pagination').style.display = 'none';

    // Remove mensagens de erro anteriores
    document.querySelectorAll(".p-error, .p-error2, .fa-shield-dog")
      .forEach(el => el.remove());

    if (!resultados.length) {
      let p1 = document.createElement("p")
      p1.className ="p-error"
      p1.innerText = "Nothing to show here :/ ";

      let i = document.createElement("i");
      i.className = "fa-solid fa-shield-dog";

      let p2 = document.createElement("p")
      p2.className = "p-error2"
      p2.innerText = "0 - Results";

      document.body.appendChild(p1);
      document.body.appendChild(i);
      document.body.appendChild(p2);   

    } else {
      // se houver resultados, mostra os cães encontrados usando a nova função
      aparecerCaesFiltrados(resultados);
    }

    event.preventDefault();
}

function aparecerCaesFiltrados(caes) { // função para mostrar os cães filtrados pela pesquisa
  let row = document.getElementById("row");

  caes.forEach(cao => { // percorre todos os resultados encontrados
    let div = document.createElement("div");
    div.className = "col-lg-3 col-md-4 col-sm-6 col-6";

    let div1 = document.createElement("div");
    div1.className = "card";

    let img = document.createElement("img");
    img.className = "card-img-top";
    img.setAttribute("src", cao.image.url);

    let p = document.createElement("p");
    p.className = "card-text";
    p.innerText = cao.name;

    let i = document.createElement("i");
    i.className = "fa-solid fa-download";
    i.addEventListener("click", function () {
      window.open(cao.image.url, "_blank"); // abre a imagem do cão numa nova aba
    });

    div1.appendChild(img);
    div1.appendChild(p);
    div1.appendChild(i);
    div.appendChild(div1);
    row.appendChild(div);
  });
}
  
function backToMenu() {
  const logo = document.getElementById("icon-volta-menu");
  
  logo.addEventListener('click', function() {
    // Vai para o index.html na mesma pasta
    window.location.href = 'index.html';
  });
} 