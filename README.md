# Prérequis
Node JS  
MySQL  

# Usage
npm install  
node app.js

### Adresse
localhost:1337  

# Base de données
host: localhost  
user: sails  
password: sails  
database: iwish  

# SDK Angular
Pour pouvoir utiliser le web service et les modèles

- Copier/coller le répertoire "shared/" de la racine du projet back vers le répertoire "src/" du projet Angular.
- Ajouter `SDKBrowserModule.forRoot()` dans l'entrée `imports` de `@NgModule`, dans le fichier "app.module.ts".
(nécessite l'import `import { SDKBrowserModule } from 'src/shared/sdk';`).
- Pour tester, ajouter dans le `NgOnInit` d'un composant tel que "app.component.ts":  
    ``` 
    this.itemApi.findAll().subscribe((data: Item[]) => {  
    	console.log("data:",data);  
    });
    ```  
Nécessite d'ajouter `import { ItemApi, Item } from 'src/shared/sdk';` et `private itemApi: ItemApi` dans le constructeur.  

## API et méthodes disponibles

Pour chaque API de modèle sont présentes les méthodes suivantes (avec T le modèle correspondant):
- `findAll<T>(): Observable<T>`
- `findById<T>(id: number): Observable<T>`
- `create<T>(data: T): Observable<T>`
- `update<T>(id: number, data: T): Observable<T>`
- `delete<T>(id: number): Observable<T>`

### UserApi
- `findByIdWishlists<Wishlist>(id: number): Observable<Wishlist[]>`
- `createWishlist<Wishlist>(id: number, data: Wishlist): Observable<Wishlist>`

### WishlistApi
- `findByIdItems<Item>(id: number): Observable<Item[]>`
- `createItem<Item>(id: number, data: Item): Observable<Item>`
- `findByIdJackpots<Jackpot>(id: number): Observable<Jackpot[]>`
- `createJackpot<Jackpot>(id: number, data: Jackpot): Observable<Jackpot>`

### JackpotApi
- `findByIdItems<Item>(id: number): Observable<Item[]>`
- `createItem<Item>(id: number, data: Item): Observable<Item>`

### Exemple avec une création d'un item pour la wishlist 1
```
let item = new Item();
item.name = "TV";
item.price = 299.99;
this.wishlistApi.createItem(1, item).subscribe((data: Item) => {
    console.log("created via wishlist item:",data);
});
```