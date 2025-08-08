# 🚀 From Docker Compose to Kubernetes
**MongoDB + Mongo Express + Node.js App**

<p align="center">
  <img src="https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png" alt="Docker Logo" height="80"/>
  &nbsp;&nbsp;
  <img src="https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg" alt="Kubernetes Logo" height="80"/>
</p>


---

## 📋 Overview

This project demonstrates how to:
1. **Run MongoDB, Mongo Express, and a Node.js app** with Docker Compose.
2. Migrate the same setup to **Kubernetes** with Deployments, Services, and Persistent Storage.

It’s perfect for **DevOps training** — learners start with containers, then scale their understanding to orchestrated workloads.

---

## 🛠 Prerequisites

### Local Docker (Compose)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) or Docker Engine
- Docker Compose v2+

### Kubernetes
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- A cluster (Minikube, k3s, KIND, or AWS EKS)
- Optional: [Lens](https://k8slens.dev/) or K9s for visual management

---

## 1️⃣ Run with Docker Compose

### **docker-compose.yml**
This file defines **3 services**:
- **mongo** → MongoDB database
- **mongo-express** → Admin UI for MongoDB
- **mongo-simple-app** → Node.js web app with a sleek UI



### Start Everything
```bash
docker compose up --build -d
````

### Access

* App → [http://localhost:3000](http://localhost:3000)
* Mongo Express → [http://localhost:8081](http://localhost:8081)

### Stop

```bash
docker compose down
```

---

## 2️⃣ Why Migrate to Kubernetes?

| Feature            | Docker Compose | Kubernetes                        |
| ------------------ | -------------- | --------------------------------- |
| Single-host only   | ✅              | ❌                                 |
| Scaling            | Manual         | Declarative & automatic           |
| Networking         | Simple bridge  | Service discovery, load balancing |
| Self-healing       | ❌              | ✅                                 |
| Persistent storage | Volumes        | PVCs / StorageClasses             |

> We use the same **images** but define them as **Deployments** and **Services** in YAML.

---

## 3️⃣ Kubernetes Manifests

We split the manifests for teaching clarity:

### **Namespaces**

```yaml
kubectl apply -f namespace.yaml
```

### **MongoDB**

```bash
kubectl apply -f mongo-pvc.yaml
kubectl apply -f mongo-deployment.yaml
kubectl apply -f mongo-service.yaml
```

### **Mongo Express**

```bash
kubectl apply -f mongo-express-deployment.yaml
kubectl apply -f mongo-express-service.yaml
```

### **Node.js App**

```bash
kubectl apply -f app-deployment.yaml
kubectl apply -f app-service.yaml
```

---

## 4️⃣ Check Your Cluster

```bash
kubectl get all -n mongo-demo
```

You should see:

* 3 Deployments
* 3 Services
* 1 PVC

---

## 5️⃣ Access the Services

If you used **NodePort**:

* App → `http://<NODE_IP>:30000`
* Mongo Express → `http://<NODE_IP>:30081`

If on **EKS or any cloud** with `type: LoadBalancer`, Kubernetes will give you external URLs.

---

## 6️⃣ Cleanup

```bash
kubectl delete namespace mongo-demo
```

---

## 📦 Folder Structure

```
.
├── docker-compose.yml
├── Dockerfile
├── server.js
├── index.html
├── package.json
├── k8s/
│   ├── namespace.yaml
│   ├── mongo-pvc.yaml
│   ├── mongo-deployment.yaml
│   ├── mongo-service.yaml
│   ├── mongo-express-deployment.yaml
│   ├── mongo-express-service.yaml
│   ├── app-deployment.yaml
│   ├── app-service.yaml
```

---

## 🧠 Learning Flow

1. **Intro to Docker** → Pull images, run containers manually.
2. **Docker Compose** → Show one-command multi-service deployment.
3. **Kubernetes Basics** → Pods, Deployments, Services, PVC.
4. **Translate Compose to K8s** → Same stack, more scalable.
5. **Scaling Demo**:

   ```bash
   kubectl scale deployment mongo-simple-app --replicas=3 -n mongo-demo
   ```
6. **Show Self-Healing** → Delete a pod and watch it restart.

---

## 🎯 Key Learning Outcomes

* Mapping Docker Compose concepts to Kubernetes objects
* Understanding persistent data in Kubernetes with PVCs
* Exposing services internally and externally
* Deploying multi-container applications on any cluster

---

## 👨‍🏫 DevOps Academy

This repository is part of **DevOps Academy’s** hands-on curriculum.


**Instructor:** Pasima
**Topics Covered:** Docker, Docker Compose, Kubernetes, MongoDB, Node.js

---

