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

Sont aussi disponibles les méthodes GET pour chaque relation ; exemple pour récupérer les items d'une wishlist:
- `findByIdItems<Item>(id: number): Observable<Item[]>`

## Authentification
Module : AuthenticationApi (shared/sdk/services/custom/authentication.ts)  

Méthodes :  
- `public login(credentials: any): Observable<LoginResponse>`
- `public logout(): Observable<any>`
- `public storeInfo(loginResponse: LoginResponse): void`
- `public removeInfo(): void`
- `public getToken(): string`
- `public getCurrentUserId(): number`
- `public getCurrentUserEmail(): string`
- `public isAuthenticated(): boolean`
- `public getCurrentUser(): Observable<User>`

Remarque : Pour l'instant, il faut exécuter `storeInfo()` dans le "subscribe" de l'appel à "login()".  

Pour tester l'authentification :  
```
this.authApi.login({email: 'toto2@yopmail.com', password: 'toto'}).subscribe((loginResponse: LoginResponse) => {
      this.authApi.storeInfo(loginResponse); // Mettre le token (avec id et email de l'user) dans le localStorage

      console.log("is auth ? ", this.authApi.isAuthenticated()); // true

      if ( this.authApi.isAuthenticated() ) { // true
        this.authApi.getCurrentUser().subscribe( (user: User) => {
          console.log("current user = ", user); // affichage de toutes les infos de l'user
        })
      }

      this.authApi.logout().subscribe( () => {
        this.authApi.removeInfo(); // supprime le token (avec id et email de l'user) du localStorage
        console.log("logout ok");
        console.log("current user id = ", this.authApi.getCurrentUserId()); // répond 0 je ne sais pas encore pourquoi...
        console.log("is auth ? ", this.authApi.isAuthenticated()); // false
      })
    });
```