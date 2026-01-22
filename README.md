# Rendu IA - Expérimentation de Prompts

## Contexte

Ce projet documente mes expérimentations avec un modèle d'IA (Claude Code - Model: claude-opus ) pour effectuer différentes tâches. L'objectif est d'évaluer la pertinence des réponses générées et de porter un regard critique sur les résultats.

---

## Expérimentation 1 : Recommandations de réalisateurs

### Prompt 1

> "J'adore les films de Christopher Nolan, surtout Inception et Interstellar. Tu pourrais me recommander d'autres réalisateurs qui ont un style similaire ? Genre des réalisateurs qui font des films avec des histoires complexes, des twists, ou des thèmes philosophiques/sci-fi."

### Réponse de l'IA

L'IA m'a proposé une liste de 9 réalisateurs :
- **Denis Villeneuve** - Arrival, Blade Runner 2049, Dune
- **David Fincher** - Fight Club, Gone Girl, Se7en
- **Darren Aronofsky** - Requiem for a Dream, Black Swan, The Fountain
- **Alex Garland** - Ex Machina, Annihilation
- **Ridley Scott** - Blade Runner, Alien, The Martian
- **Stanley Kubrick** - 2001: A Space Odyssey, A Clockwork Orange
- **David Lynch** - Mulholland Drive, Lost Highway
- **Shane Carruth** - Primer, Upstream Color
- **Rian Johnson** - Looper, Knives Out

### Analyse critique

**Points positifs :**
- Les recommandations sont pertinentes et cohérentes avec ma demande
- La diversité des profils est appréciable
- Les films cités correspondent bien au style recherché
- La recommandation de Denis Villeneuve comme "plus proche de Nolan" est justifiée

**Points à nuancer :**
- Ridley Scott est discutable : ses films récents sont moins dans cette veine philosophique
- David Lynch est très différent de Nolan
- Il manque peut-être des réalisateurs comme **Christopher McQuarrie** ou **Neill Blomkamp**

**Verdict :** Réponse globalement satisfaisante et utilisable directement.

---

### Prompt 2

> "Pour un projet de cours, j'aurais besoin d'avoir ces recommandations au format JSON. Tu peux me les donner sous forme d'un tableau d'objets."

### Réponse de l'IA

L'IA a fourni un JSON valide avec la structure suivante pour chaque réalisateur :
- `name` : nom du réalisateur
- `description` : courte description de son style
- `films` : tableau de ses films notables

### Analyse critique

**Points positifs :**
- Le JSON est valide et bien formaté
- La structure est cohérente et directement exploitable
- Aucune erreur de syntaxe

**Points à améliorer :**
- J'aurais pu demander des champs supplémentaires (nationalité, genre principal)
- Les descriptions sont un peu courtes

**Verdict :** Parfait pour mon besoin, aucune modification nécessaire.

---

## Expérimentation 2 : Création d'une API REST Express

### Prompt

> "Crée-moi une API REST en JavaScript avec Express qui :
>
> 1. A toutes les routes protégées par une authentification Basic Auth (username: "admin", password: "secret123")
>
> 2. Contient au minimum :
>    - Une route GET /api/data qui renvoie en JSON les paramètres passés dans la query string
>    - Une route POST /api/data qui renvoie en JSON le contenu du body de la requête
>
> 3. Génère aussi un fichier .http pour tester les routes avec :
>    - Des requêtes qui incluent l'authentification Basic Auth
>    - Des tests après chaque requête pour vérifier les réponses
>    - Au moins un test qui vérifie qu'on obtient une erreur 401 quand l'authentification est mauvaise
>
> Refactorise ensuite le fichier .http pour utiliser une variable {{baseURL}} pour l'hôte des requêtes ? Genre que ça ressemble à POST {{baseURL}}/api/data au lieu de http://localhost:3000/api/data"

### Réponse de l'IA

L'IA a généré deux fichiers complets :
- `index.js` : Le serveur Express avec le middleware Basic Auth
- `api.http` : Fichier de tests avec 8 cas de test

### Analyse critique

**Points positifs :**

1. **Code bien structuré** : Le middleware d'authentification est séparé, ce qui est une bonne pratique
2. **Commentaires pédagogiques** : L'IA a ajouté des explications détaillées sur le fonctionnement de Basic Auth
3. **Tests complets** : 8 cas de test couvrent les scénarios normaux ET les cas d'erreur
4. **Variable `{{baseUrl}}`** : Implémentée comme demandé, facilite le changement d'environnement
5. **Gestion des erreurs** : Messages d'erreur clairs et informatifs

**Points à améliorer / Limites :**

1. **Sécurité en production** : Les credentials sont en dur dans le code - en production, il faudrait utiliser des variables d'environnement
2. **Pas de HTTPS** : Basic Auth envoie les credentials en Base64, donc vulnérable sans HTTPS

**Ce que j'aurais pu demander en plus :**
- Utilisation de variables d'environnement (.env)
- Ajout de CORS
- Logging des requêtes
- Validation du body

**Verdict :** Excellent résultat pour un prototype ou un projet d'apprentissage. Le code fonctionne parfaitement et répond à 100% de ma demande. Les commentaires ajoutés m'ont même appris des choses sur Basic Auth. Pour une mise en production, des améliorations de sécurité seraient nécessaires.

---

## Conclusion générale

**Mon avis sur l'utilisation de l'IA :**

L'IA s'est révélée très efficace pour ces tâches. Les réponses étaient pertinentes, bien structurées et directement utilisables.

Cependant, je pense qu'il reste important de :
- Vérifier la validité des informations
- Ne pas accepter aveuglément les réponses sans comprendre ce qu'elles font
