# Skaffold with Tekton
In this example we'll see how to configure Skaffold with the [Tekton Pipeline repo](https://github.com/tektoncd/pipeline) to enable a continues dev loop, and have a faster feedback during development as a [Tekton Developer]() 

## To run the application in your local machine

1. Run the following command in your terminal
```bash
cd nodejs/backend && npm install && npm run development
```

2. The app should be available in `http://localhost:3000/`

## To run your application in your local minikube

1. Install minikube (or your favorite local cluster) following the instructions in [https://minikube.sigs.k8s.io/docs/start/](https://minikube.sigs.k8s.io/docs/start/)

2. Start your cluster
```bash
minikube start
```

3. Go to the backend folder
```bash
cd nodejs/backend
```

4. Create your docker image
```bash
docker build -t webapp:v1 -f Dockerfile .
```

5.  Load the image into the minikube cluster
```bash
minikube image load webapp:v1
```

6. Update your K8s manifest with the image + tag created. Right now the `nodejs/k8s/deployment.yaml` file has the proper value already

7. Deploy the manifest to K8s
```bash
kubectl apply -f nodejs/k8s/deployment.yaml
```

8. Expose the minikube app
```bash
minikube tunnel
```

7. Get the URL to access the app
```bash
kubectl get svc
```

8. Open the app: `http://127.0.0.1:3000/`