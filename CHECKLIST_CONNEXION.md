# ✅ Checklist - Connexion Frontend ↔️ Backend

Utilise cette checklist pour t'assurer que tout est bien configuré.

## 📋 Avant de commencer

- [ ] J'ai Node.js installé (version 18+)
- [ ] J'ai npm installé
- [ ] Mon backend est dans un autre dossier/projet
- [ ] Je connais l'URL où tourne mon backend (ex: `http://localhost:3000`)

---

## 🔧 Configuration Frontend

### 1. Installation
```bash
cd about-us-web-client
npm install
```
- [ ] Dépendances installées sans erreur

### 2. Configuration de l'URL du backend

Ouvre `src/environments/environment.ts` et vérifie/modifie :

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:3000"  // ← URL de ton backend
};
```

- [ ] L'URL correspond à celle de mon backend
- [ ] Le fichier est sauvegardé

---

## 🖥️ Configuration Backend

### 1. CORS configuré

Mon backend doit autoriser les requêtes depuis `http://localhost:4200`

**Node.js/Express :**
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
```

**NestJS :**
```typescript
app.enableCors({
  origin: 'http://localhost:4200',
  credentials: true,
});
```

- [ ] CORS configuré dans mon backend
- [ ] Origin autorisé : `http://localhost:4200`
- [ ] Credentials autorisé : `true`

### 2. Endpoints disponibles

Mon backend doit avoir ces endpoints :

- [ ] `POST /schools` - Créer une école
- [ ] `GET /schools` - Lister les écoles
- [ ] `GET /schools/:id` - Récupérer une école
- [ ] `PATCH /schools/:id` - Modifier une école
- [ ] `DELETE /schools/:id` - Supprimer une école

### 3. Format des données

**Requête attendue (POST /schools) :**
```json
{
  "name": "string",
  "code": "string",
  "address": "string",
  "city": "string",
  "postalCode": "string",
  "country": "string",
  "phone": "string",
  "email": "string",
  "principalAdminId": "string (optionnel)"
}
```

**Réponse attendue (201 Created) :**
```json
{
  "id": "string",
  "name": "string",
  "code": "string",
  "address": "string",
  "city": "string",
  "postalCode": "string",
  "country": "string",
  "phone": "string",
  "email": "string",
  "status": "PENDING | ACTIVE | INACTIVE",
  "principalAdminId": "string?",
  "createdAt": "ISO 8601 date string",
  "updatedAt": "ISO 8601 date string"
}
```

- [ ] Mon backend renvoie ces données
- [ ] Les noms de champs correspondent (sinon voir [ADAPTER_EXAMPLES.md](./src/app/features/school/infrastructure/ADAPTER_EXAMPLES.md))

---

## 🧪 Tests

### 1. Backend accessible

```bash
# Dans le dossier backend
npm start  # ou node server.js, python manage.py runserver, etc.
```

- [ ] Backend lancé sans erreur
- [ ] Port correct (ex: 3000)
- [ ] Pas d'erreur dans les logs

**Test dans un navigateur ou avec curl :**
```bash
curl http://localhost:3000
```

- [ ] Le backend répond (même si 404, c'est OK, ça prouve qu'il est lancé)

### 2. Test avec fichier HTML

Ouvre `test-backend-connection.html` dans un navigateur :

- [ ] Entre l'URL de ton backend
- [ ] Clique sur "Tester la connexion"
- [ ] ✅ Message de succès
- [ ] Si erreur CORS → Retour à la section Configuration Backend

### 3. Test avec l'application

```bash
# Dans le dossier frontend
npm start
```

- [ ] Frontend lancé sur `http://localhost:4200`
- [ ] Pas d'erreur de compilation

**Ouvre la console du navigateur (F12) :**

- [ ] Pas d'erreur CORS dans la console
- [ ] Pas d'erreur de connexion

---

## 🎯 Test de création d'école

### 1. Ajoute la route (optionnel pour test)

Dans `src/app/app.routes.ts` :

```typescript
import { CreateSchoolPage } from './features/school/presentation/pages/create-school-page/create-school-page';

export const routes: Routes = [
  // ... autres routes
  {
    path: 'schools/create',
    component: CreateSchoolPage
  }
];
```

- [ ] Route ajoutée
- [ ] Fichier sauvegardé

### 2. Accède à la page

Va sur : `http://localhost:4200/schools/create`

- [ ] Page affichée sans erreur
- [ ] Formulaire visible

### 3. Teste le formulaire

1. Remplis les champs obligatoires
2. Ouvre la console Network (F12 → Network)
3. Clique sur "Enregistrer l'école"

**Vérifie :**
- [ ] Une requête POST apparaît dans Network
- [ ] URL : `http://localhost:3000/schools`
- [ ] Status : 201 (Created) ou 200 (OK)
- [ ] Message de succès affiché

**Si erreur :**
- [ ] 400 → Données invalides (vérifie le format)
- [ ] 401 → Non authentifié (connecte-toi d'abord)
- [ ] 404 → Endpoint n'existe pas (vérifie ton backend)
- [ ] 500 → Erreur serveur (vérifie les logs backend)
- [ ] CORS → Retour à Configuration Backend

---

## 🚨 Dépannage

### Erreur CORS
```
Access to fetch has been blocked by CORS policy
```
→ Configure CORS sur ton backend (voir section Configuration Backend)

### Connection Refused
```
ERR_CONNECTION_REFUSED
```
→ Ton backend n'est pas lancé ou l'URL est incorrecte

### 404 Not Found
```
POST http://localhost:3000/schools 404
```
→ L'endpoint n'existe pas sur ton backend

### 401 Unauthorized
```
POST http://localhost:3000/schools 401
```
→ Tu dois être authentifié (connecte-toi d'abord)

### Le formulaire ne se soumet pas
→ Vérifie les validations du formulaire (tous les champs obligatoires remplis ?)

---

## ✅ Tout fonctionne !

Si tous les tests passent :

- [x] Backend lancé et accessible
- [x] CORS configuré
- [x] Frontend lancé
- [x] Connexion établie
- [x] Création d'école fonctionne

🎉 **Félicitations ! Ton frontend est connecté au backend.**

---

## 📚 Prochaines étapes

1. **Ajouter l'authentification** pour protéger les routes
2. **Créer la liste des écoles** (GET /schools)
3. **Créer la page de détail** (GET /schools/:id)
4. **Ajouter la modification** (PATCH /schools/:id)
5. **Ajouter la suppression** (DELETE /schools/:id)

Voir [src/app/features/school/README.md](./src/app/features/school/README.md) pour plus de détails.

---

## 🆘 Besoin d'aide ?

1. Vérifie les logs du backend
2. Vérifie la console Network du navigateur (F12)
3. Teste avec Postman pour isoler le problème
4. Lis [BACKEND_CONNECTION.md](./BACKEND_CONNECTION.md) pour plus de détails
5. Consulte [ADAPTER_EXAMPLES.md](./src/app/features/school/infrastructure/ADAPTER_EXAMPLES.md) si la structure est différente
