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

### Base
Pour chaque API de modèle sont présentes les méthodes suivantes (avec T le modèle correspondant):
- `findAll<T>(): Observable<T>`
- `findById<T>(id: number): Observable<T>`
- `create<T>(data: T): Observable<T>`
- `update<T>(id: number, data: T): Observable<T>`
- `delete<T>(id: number): Observable<T>`

## Relations GET
Sont aussi disponibles les méthodes GET pour chaque relation ; exemple pour récupérer les items d'une wishlist :
- `findByIdItems<Item>(id: number): Observable<Item[]>`

## Créer item avec image

```
// Component

uploadedFiles: Array < File > ;

fileChange(element) {
    this.uploadedFiles = element.target.files;
}

createItemWithThisImage() {
    let item = new Item();
    item.wishlist = 2;
    item.name = 'itemtestfile';
    item.position = 1;
    item.amount = 8.21;
    item.description = 'une description';

    this.itemApi.createWithImageFile(item, this.uploadedFiles[0]).subscribe( (item: any) => {
      console.log("item stored with image = ", item);
    }, err => {
      console.log('err=',err);
    }, () => {
      console.log('complete')
    });
}

// pour juste uploader l'image
public saveImageFile(imageFile: File): Observable<FileResponse> {
      let formData: FormData = new FormData();
      formData.append('file', imageFile, imageFile.name);

      return this.http.post<FileResponse>(this.createImageFileUrl, formData);
  }

// HTML (juste pour avoir un input file, qui puisse appeler les méthodes)

<input  (change)="fileChange($event)"  type="file"  class="custom-file-input"  id="inputGroupFile01"  aria-describedby="inputGroupFileAddon01">
<span  class="input-group-text upload"  (click)="createItemWithThisImage()"  id="btnUpload">Upload</span>
```

### Autres
D'autres méthodes supplémentaires pour les PUT et POST de relations (demander si d'autres sont nécessaires) :  
UserApi :
- `public updateByIdCategories(id: number, fk: number): Observable<User>` (exemple : `this.userApi.updateByIdCategories(1,3) ajoute la catégorie 3 à l'utilisateur 1`)
- `public createWishlist<Wishlist>(id: number, data: Wishlist): Observable<Wishlist>` (exemple: `this.userApi.createWishlist(2, wishlist_sans_attribut_user) crée une wishlist avec pour owner l'utilisateur 2`))
WishlistApi :
- `public createItem<Item>(id: number, data: Item): Observable<Item>`
- `public createPrizePool<PrizePool>(id: number, data: PrizePool): Observable<PrizePool>` (si une PrizePool existe déjà la wishlist, alors l'erreur est: {status: 409, message "..."}, 409=Conflict)
- `public updateByIdParticipants(id: number, fk: number): Observable<Wishlist>`
- `public updateByIdItems(id: number, fk: number): Observable<Wishlist>`

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


Pour tester l'authentification :  
```
this.authApi.login({email: 'toto2@yopmail.com', password: 'toto'}).subscribe((loginResponse: LoginResponse) => {
    console.log("is auth ? ", this.authApi.isAuthenticated()); // true

    if ( this.authApi.isAuthenticated() ) { // true
        this.authApi.getCurrentUser().subscribe( (user: User) => {
            console.log("current user = ", user); // affichage de toutes les infos de l'user
        })
    }

    this.authApi.logout().subscribe( () => {
        console.log("logout ok");
        console.log("current user id = ", this.authApi.getCurrentUserId()); // répond 0 je ne sais pas encore pourquoi...
        console.log("is auth ? ", this.authApi.isAuthenticated()); // false
    })
});
```

# Paypal

## Recevoir les dons à la date de fin de la wishlist

POST localhost:1337/receive-donations
data:
{
	"wishlistId": <wishlist_id>
}
Le propriétaire de la wishlist reçoit la somme des dons
l'attribut 'collected' de la BD passe à true

### API Angular
```
1 => id de la wishlist
this.wishlistApi.collectDonations(1).subscribe(res => {
  console.log('res=',res);
}, err => {
  console.log('err=',err)
})
```

### API Androïd
```
WishlistApi wishlistApi = new WishlistApi();
JSONObject jsonResult = null;
try {
    Log.i("TAGTAG", "collect...");
    jsonResult = wishlistApi.collectDonations(1);
} catch (UnsupportedEncodingException e) {
    e.printStackTrace();
} catch (JSONException e) {
    e.printStackTrace();
} catch (ExecutionException e) {
    e.printStackTrace();
} catch (InterruptedException e) {
    e.printStackTrace();
}
Log.i("TAGTAG", "jsonresult="+jsonResult);
```

## Front web

### Code HTML et Javascript
```
<!-- Set up a container element for the button -->
<div id="paypal-button-container"></div>

<!-- Include the PayPal JavaScript SDK 
  client-id est l'id de l'application créée dans developer.paypal (via mon compte jeremieroland@orange.fr)-->
<script src="https://www.paypal.com/sdk/js?client-id=AU0bWy_C3EBJ0NTTtf_FlfKdPA1sTreLyJ-9S5bycKqgu6W69l_vQWQlfldWkMdFd7ycMa3sEV6aaksC&currency=EUR"></script>

<script>
    var donationAmount = 9.99;

    paypal.Buttons({
      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: donationAmount
            }
          }]
        });
      },
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          // Code à exécuté une fois la transaction terminée
          alert('Transaction completed by ' + details.payer.name.given_name);
          //Sauvegarder le don en base
          return fetch('http://localhost:1337/save-donation', {
            method: 'post',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              amount: donationAmount,
              donorId: 4, // this.authApi.getCurrentUserId()
              prizePoolId: 1 // à définir
            })
          });
        });
      }
  }).render('#paypal-button-container'); <!-- id de la div contenant le bouton -->
</script>
```
### Comptes fakes PayPal

Deux comptes sont créés pour les tests : destinataire et un client qui lui se connectera lors du don.
Ils sont enregistrés sur https://www.sandbox.paypal.com.

## Compte professionnel

- Email : wishit-business@gmail.com
- Mdp : azerty123
- Prénom : Jean
- Nom: Dupont
- Sole : ~1000€

## Compte client

Se connecter avec lui lors du don.

- Email : wishit-personal@gmail.com
- Mdp : azerty123
- Prénom : Philippe
- Nom: Durand
- Sole : ~600€
