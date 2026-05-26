# Atelier Spring — Voiture Management (Docker + AI + Kubernetes)

Application full-stack : **React** + **Spring Boot** + **MySQL** + **Spring AI (Ollama)**, dockerisée et déployable sur **Kubernetes**.

---

## Architecture

[React (port 3000)] → [Spring Boot (port 8082)] → [MySQL (port 3306)] and [Ollama / Mistral (port 11434)]

## Fonctionnalités

- **CRUD Voitures** — Ajouter, modifier, supprimer et lister des voitures
- **Assistant IA** — Chat intelligent expert automobile propulsé par Ollama (modèle Mistral)
- **Docker Compose** — Lancement de toute la stack en une seule commande
- **Kubernetes** — Manifestes prêts pour le déploiement sur Minikube

---

## Prérequis

- [Docker](https://www.docker.com/) & Docker Compose
- [Minikube](https://minikube.sigs.k8s.io/) (pour le déploiement K8s)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)

---

## Option 1 : Docker Compose

### Lancer l'application

```bash
git clone https://github.com/hamzakeck/Atelier-Spring.git
cd Atelier-Spring
docker-compose up -d --build
```

> **Note :** Le premier lancement peut prendre quelques minutes car Ollama télécharge le modèle Mistral (~4 Go).

Attendez ~30 secondes que MySQL démarre, puis accédez aux services :

| Service            | URL                                    |
|--------------------|----------------------------------------|
| Frontend React     | http://localhost:3000                   |
| API REST           | http://localhost:9090/api               |
| Voitures API       | http://localhost:9090/api/voitures      |
| Assistant IA (API) | http://localhost:9090/api/ai/chat       |
| Ollama             | http://localhost:11434                  |

### Tester l'Assistant IA

```bash
# Via GET
curl "http://localhost:9090/api/ai/chat?prompt=Quelle+voiture+familiale+recommandez-vous"

# Via POST
curl -X POST http://localhost:9090/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Comparez une Toyota Corolla et une Honda CRV"}'
```

### Arrêter l'application

```bash
docker-compose down
```

Pour supprimer aussi les données MySQL et les modèles Ollama :

```bash
docker-compose down -v
```

---

##  Option 2 : Kubernetes (Minikube)

### 1. Démarrer Minikube

```bash
minikube start
```

### 2. Configurer Docker pour Minikube

Construire les images directement dans le Docker daemon de Minikube :

```bash
eval $(minikube docker-env)        # Linux/macOS
# ou
minikube docker-env | Invoke-Expression  # PowerShell Windows
```

### 3. Construire les images

```bash
docker build -t springboot-app:latest "./SpringDataRest back end"
docker build -t react-frontend:latest "./Spring front-end/reactjs"
```

### 4. Déployer sur Kubernetes

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/mysql-deployment.yaml
kubectl apply -f k8s/ollama-deployment.yaml
kubectl apply -f k8s/springboot-deployment.yaml
kubectl apply -f k8s/react-deployment.yaml
```

### 5. Vérifier le déploiement

```bash
kubectl get all -n voiture-app
kubectl get pods -n voiture-app -w   # Watch les pods démarrer
```

### 6. Accéder à l'application

```bash
minikube service react-frontend -n voiture-app
```

Ou accédez directement via : `http://<minikube-ip>:30000`

```bash
minikube ip   # Obtenir l'IP de Minikube
```

### 7. Voir les logs

```bash
kubectl logs -f deployment/springboot-app -n voiture-app
kubectl logs -f deployment/ollama -n voiture-app
```

### 8. Supprimer le déploiement

```bash
kubectl delete namespace voiture-app
```

---

## Structure du Projet

```
Atelier-Spring/
├── SpringDataRest back end/       # Backend Spring Boot
│   ├── src/main/java/org/cours/
│   │   ├── config/                # CORS & Security config
│   │   ├── modele/                # Entités JPA (Voiture, Proprietaire)
│   │   ├── service/               # AiChatService (Spring AI)
│   │   └── web/                   # Controllers (REST + AI Chat)
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── Dockerfile
│   └── pom.xml
├── Spring front-end/reactjs/      # Frontend React
│   ├── src/Components/
│   │   ├── AiChat.js              # Chat IA
│   │   ├── Voiture.js             # Formulaire CRUD
│   │   ├── VoitureListe.js        # Liste des voitures
│   │   └── NavigationBar.js
│   ├── nginx.conf
│   └── Dockerfile
├── k8s/                           # Manifestes Kubernetes
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── mysql-deployment.yaml
│   ├── springboot-deployment.yaml
│   ├── react-deployment.yaml
│   └── ollama-deployment.yaml
├── docker-compose.yml
└── README.md
```

---

## Technologies

| Composant      | Technologie                    |
|----------------|--------------------------------|
| Backend        | Spring Boot 4.0, Spring Data REST, Spring Security |
| AI             | Spring AI + Ollama (Mistral)   |
| Frontend       | React 19, Bootstrap 5          |
| Base de données| MySQL 8                        |
| Conteneurs     | Docker, Docker Compose         |
| Orchestration  | Kubernetes (Minikube)          |
