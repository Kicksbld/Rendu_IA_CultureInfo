/**
 * API REST avec Express et authentification Basic Auth
 *
 * COMMENT CA MARCHE - Basic Auth :
 * ================================
 * 1. Le client envoie un header "Authorization" avec la valeur "Basic <credentials>"
 * 2. <credentials> = Base64(username:password)
 * 3. Le serveur decode le Base64 et verifie les identifiants
 * 4. Si OK -> la requete passe, sinon -> erreur 401 Unauthorized
 *
 * Exemple: "admin:secret123" encode en Base64 = "YWRtaW46c2VjcmV0MTIz"
 * Header: "Authorization: Basic YWRtaW46c2VjcmV0MTIz"
 */

const express = require('express');
const app = express();

// Configuration
const PORT = 3000;
const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'secret123';

/**
 * Middleware pour parser le JSON dans le body des requetes
 * Sans ca, req.body serait undefined pour les requetes POST avec du JSON
 */
app.use(express.json());

/**
 * Middleware d'authentification Basic Auth
 *
 * Ce middleware intercepte TOUTES les requetes avant qu'elles n'atteignent les routes
 * Il verifie que le header Authorization contient des identifiants valides
 */
function basicAuthMiddleware(req, res, next) {
  // Recupere le header Authorization
  const authHeader = req.headers.authorization;

  // Verifie que le header existe et commence par "Basic "
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    // Si pas de header ou format incorrect -> 401
    res.setHeader('WWW-Authenticate', 'Basic realm="API"');
    return res.status(401).json({
      error: 'Authentification requise',
      message: 'Vous devez fournir un header Authorization avec Basic Auth'
    });
  }

  // Extrait la partie Base64 (apres "Basic ")
  const base64Credentials = authHeader.substring(6); // "Basic ".length = 6

  // Decode le Base64 en string "username:password"
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');

  // Separe le username et le password (format: "username:password")
  const [username, password] = credentials.split(':');

  // Verifie les identifiants
  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    // Identifiants corrects -> passe a la suite (next middleware ou route)
    next();
  } else {
    // Identifiants incorrects -> 401
    res.setHeader('WWW-Authenticate', 'Basic realm="API"');
    return res.status(401).json({
      error: 'Identifiants invalides',
      message: 'Le username ou le password est incorrect'
    });
  }
}

// Applique le middleware d'auth a TOUTES les routes /api/*
app.use('/api', basicAuthMiddleware);

/**
 * Route GET /api/data
 *
 * Renvoie les parametres de la query string en JSON
 * Exemple: GET /api/data?name=John&age=25
 * Reponse: { "name": "John", "age": "25" }
 *
 * req.query contient automatiquement les parametres de l'URL parses par Express
 */
app.get('/api/data', (req, res) => {
  // req.query contient tous les parametres de la query string
  // Express les parse automatiquement depuis l'URL
  res.json({
    message: 'Parametres recus via GET',
    queryParams: req.query
  });
});

/**
 * Route POST /api/data
 *
 * Renvoie le contenu du body de la requete en JSON
 * Le body doit etre envoye en JSON avec Content-Type: application/json
 *
 * req.body contient le JSON parse grace au middleware express.json()
 */
app.post('/api/data', (req, res) => {
  // req.body contient le JSON envoye dans le body de la requete
  // C'est grace a express.json() qu'il est automatiquement parse
  res.json({
    message: 'Donnees recues via POST',
    body: req.body
  });
});

/**
 * Route racine pour verifier que le serveur fonctionne
 * Cette route n'est PAS protegee par Basic Auth
 */
app.get('/', (req, res) => {
  res.json({
    message: 'API REST avec Basic Auth',
    routes: [
      'GET /api/data?param=value - Renvoie les query params (auth requise)',
      'POST /api/data - Renvoie le body JSON (auth requise)'
    ],
    auth: 'Basic Auth avec username: admin, password: secret123'
  });
});

// Demarre le serveur
app.listen(PORT, () => {
  console.log(`Serveur demarre sur http://localhost:${PORT}`);
  console.log('');
  console.log('Routes disponibles:');
  console.log('  GET  /          - Info (sans auth)');
  console.log('  GET  /api/data  - Renvoie query params (avec auth)');
  console.log('  POST /api/data  - Renvoie body JSON (avec auth)');
  console.log('');
  console.log('Identifiants Basic Auth:');
  console.log('  Username: admin');
  console.log('  Password: secret123');
  console.log('  Base64:   YWRtaW46c2VjcmV0MTIz');
});
