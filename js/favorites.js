// 1º CLASSE: vai conter a lógica dos dados; como os dados serão estruturados.
export class Favorites {
  constructor(root) {
    this.root = document.querySelector("#app");
    this.load();
  }

  // fcn p/ carregamento dos dados:
  load() {
    // Dados:
    this.entries = [
      {
        login: "brenno",
        name: "brennoe",
        repositories: 1,
        followers: 1000,
      },
      {
        login: "brunno",
        name: "brunnoe",
        repositories: 1,
        followers: 1000,
      },
    ];
  }
}

// 2º CLASSE: vai criar a visualização e eventos do html
export class FavoritesView extends Favorites {
  constructor(root) {
    super(
      root
    ); /* É a linha que liga as classes! Chama o construtor da 1º classe e passa este root p/ela! */
    // 1º console.log(this.root);
    this.update();
  }

  // remove todos os elementos sempre que carregar a pág;
  update() {
    this.removeAllTr();

    // 3º console.log(entries);

    this.entries.forEach((user) => {
      // 4º console.log(user);
      const row = this.createRow();
      console.log(row);
    });
  }

  createRow() {
    // Criando elemento HTML pela DOM:
    const tr = document.createElement("tr");

    // Inserindo o content no elemento HTML:
    tr.innerHTML = `
            <td>
              <img src="http://github.com/brennoeudes.png" alt="" />
              <a href="github.com/brennoeudes">
                <p></p>
                <span></span>
              </a>
            </td>
            <td></td>
            <td></td>
            <td><button>Remove</button></td>
          `;

    // retorna linha pois será usada p/ cada elemento:
    return tr;
  }

  // fcn remove todos os elementos:
  removeAllTr() {
    // Criando o HTML:
    const tbody = this.root.querySelector("table tbody");

    // pegando todas as linhas
    // P/ CADA usuário de "entries" damos o console.log;
    tbody.querySelectorAll("tr").forEach((tr) => {
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
// 6º Colocar os objs no html;
