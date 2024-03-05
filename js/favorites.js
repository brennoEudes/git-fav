import { GithubUser } from "./githubUser.js";

// 1º CLASSE: vai conter a lógica dos dados; como os dados serão estruturados.
export class Favorites {
  constructor(root) {
    this.root = document.querySelector("#app");
    this.load();

    // Como usamos o "static" não precisamos do "new" aqui. Como recebemos uma promise, devemos usas o then aqui tb:
    GithubUser.search("diego3g").then((user) => console.log(user));
  }

  // fcn p/ carregamento dos dados:
  load() {
    this.entries = JSON.parse(localStorage.getItem("@github-favorites:")) || []; //A fcn parse transforma um elemento JSON no formato q estiver dentro do parênteses. Sem o parse, os elementos são apenas strings! No exemplo acima, garante q @github-favorites pego no localstorage seja um array vazio.

    // 8º console.log(this.entries);

    // Dados:
    // this.entries = [
    //   {
    //     login: "brennoeudes",
    //     name: "brennoe",
    //     public_repos: 1,
    //     followers: 1000,
    //   },
    //   {
    //     login: "brunno",
    //     name: "brunnoe",
    //     public_repo: 1,
    //     followers: 1000,
    //   },
    //   {
    //     login: "diego3g",
    //     name: "brunnoe",
    //     public_repo: 1,
    //     followers: 1000,
    //   },
    // ];
  }

  delete(user) {
    // Higher-order functions (map, filter, find, reduce)
    const filteredEntries = this.entries.filter(
      (entry) =>
        // 6º console.log(entry);
        entry.login !== user.login
    ); // se o entry NÃO for diferente do user, será deletado! (retorna true ou false. Se falso, exclui do novo array)

    // 7º console.log(filteredEntries);

    this.entries = filteredEntries; // reatribui um novo array, sem acabar com o antigo.
    this.update();
    // this.save(); // tb salva aqui p/ evitar erros
  }
}

// 2º CLASSE: vai criar a visualização e eventos do html
export class FavoritesView extends Favorites {
  constructor(root) {
    super(
      root
    ); /* É a linha que liga as classes! Chama o construtor da 1º classe e passa este root p/ela! */
    // 1º console.log(this.root);

    // Criando o HTML:
    this.tbody = this.root.querySelector("table tbody");
    this.update();
  }

  // remove todos os elementos sempre que carregar a pág;
  update() {
    this.removeAllTr();

    // 3º console.log(entries);

    this.entries.forEach((user) => {
      // 4º console.log(user);
      const row = this.createRow();
      // 5º console.log(row);

      row.querySelector(
        ".user img"
      ).src = `http://github.com/${user.login}.png`;

      row.querySelector(".user img").alt = `Imagem de ${user.name}`;
      row.querySelector(".user a").href = `http://github.com/${user.login}`;
      row.querySelector(".user p").textContent = user.name;
      row.querySelector(".user span").textContent = user.login;
      row.querySelector(".repositories").textContent = user.public_repos;
      row.querySelector(".followers").textContent = user.followers;

      // se não for necessário colocar + de um evento de clique, pode-se usar "onclick":
      row.querySelector(".remove").onclick = () => {
        const isOK = confirm("Tem certeza de que deseja deletar esse perfil?"); // confirm é metodo JS q devolve boolean

        if (isOK) {
          this.delete(user);
        }
      };

      this.tbody.append(row); // append é funcionalidade da DOM q recebe um elemento HTMl criado na DOM!
    });
  }

  createRow() {
    // Criando elemento HTML pela DOM:
    const tr = document.createElement("tr");

    // Inserindo o content no elemento HTML:
    tr.innerHTML = `
            <td class="user">
              <img src="" alt="" />
              <a href="">
                <p></p>
                <span></span>
              </a>
            </td>
            <td class="repositories"></td>
            <td class="followers"></td>
            <td><button class="remove">Remove</button></td>
          `;

    // retorna linha pois será usada p/ cada elemento:
    return tr;
  }

  // fcn remove todos os elementos:
  removeAllTr() {
    // pegando todas as linhas
    // P/ CADA usuário de "entries" damos o console.log;
    this.tbody.querySelectorAll("tr").forEach((tr) => {
      // 2º console.log(tr);
      tr.remove();
    });
  }
}

// PASSO A PASSO:
// 1º Construir e integrar as classes nos arquivos;
// 2º Criar o html na classe de visualização, verificando o acesso a cada linha;
// 3º Separar a funcionalidade de remoção e chamar em outra fcn (Clean Code);
// 4º Recriar cada coluna do html com template literal;
// 5º Criar obj c/ os dados e uma fcn p/ carregá-los;
// 6º Colocar os objs no html (criar HTML com JS);
// 7º Construir a lógica do delete user (Mantém o princípio da imutabilidade)
// 8º Conexão com o localstorage
// 9º Conexão com API GitHub (import) p/ fazer a pesquisa de usuários
