# Product Portal

A responsive React demo with a sign-in screen and a product inventory page showing product names, prices, quantities, and stock status.

> **Demo authentication:** There is no authentication server. Any valid email address and non-empty password opens the product page. The sign-in state is held in the browser only.

## Run locally

Requires Node.js 22 or newer.

```sh
npm install
npm run dev
```

Create a production build with `npm run build`.

## Run with Docker

Build the image from this directory:

```sh
docker build -t product-portal:1.0.0 .
docker run --rm -p 8080:8080 product-portal:1.0.0
```

Open [http://localhost:8080](http://localhost:8080). The container serves the static build with unprivileged NGINX; `/healthz` is available for health checks.

## Deploy to Kubernetes

Make the image available to the Kubernetes nodes (for a local cluster, load it into the cluster first), then apply the manifests:

```sh
kubectl apply -f k8s/
kubectl port-forward service/product-portal 8080:80
```

Open [http://localhost:8080](http://localhost:8080). The Deployment runs two replicas and includes readiness/liveness probes. For a remote cluster, push the image to a registry and update `image` in `k8s/deployment.yaml`.
