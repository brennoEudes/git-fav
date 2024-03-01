// 1º CLASSE: vai conter a lógica dos dados; como os dados serão estruturados.
export class Favorites {
  constructor(root) {
    this.root = document.querySelector("#app");
  }
  
}


// 2º CLASSE: vai criar a visualização e eventos do html
export class FavoritesView extends Favorites {
    constructor(root) {
        super(root) /* É a linha que liga as classes! Chama o construtor da 1º classe e passe este root p/ela! */
        console.log(this.root);
    }
}
