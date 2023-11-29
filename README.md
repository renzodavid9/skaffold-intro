# Skaffold with Tekton
In this example we'll see how to configure Skaffold with the [Tekton Pipeline repo](https://github.com/tektoncd/pipeline) to enable a continues dev loop, and have a faster feedback during development as a [Tekton Developer]() 

We'll see how to configure Skaffold to be used with the controller logic and the entrypoint logic

## Environment setup

1. This example uses [Tekton Pipeline repo](https://github.com/tektoncd/pipeline), so you'll need to download a copy of it in your machine

2. Install a copy of Tekton Pipeline in your local machine. Here we'll show you how to do it with minikube. Install minikube following the instructions in https://minikube.sigs.k8s.io/docs/start/

3. Create a cluster for Tekton:
```bash
minikube start --profile=tekton
```

4. To point your terminal's docker-cli to the Docker Engine inside minikube, run:
```bash
eval $(minikube -p tekton docker-env)
```

5. Deploy Tekton Pipeline:
```bash
ko apply -R -f config/
```

## Skaffold setup
The folder structure in this project follows the same structure of the Tekton Pipeline repo, that means, you should find the same folders in your copy of pipelines for the files we need to add/modify in the Tekton repo.

Copy the files from this repo to your local copy of Tekton:

* `config/controller.yaml`: it contains a couple of changes to make Skaffold work
* `examples/v1/taskruns/skaffold-dev`: copy all the folder. It contains a simple TaskRun to use for tests
* `resource-selector.json`: file for Skaffold to be able to track TaskRun status
* `skaffold.yaml`: Skaffold config file

Build all the images to put them in minikube
```bash
skaffold build -p setup
```

### Dev mode for Tekton Pipeline controller
Here we'll trigger a devloop for the controller logic

1. To trigger the controller with Skaffold run:
```bash
skaffold dev -p controller
```

2. Deploy a TaskRun and see the logs from Skaffold:
```bash
kubectl apply -f examples/v1/taskruns/skaffold-dev/manifests/plain-task-run.yaml
```

3. Make a change in the reconciler, e.g, add a couple of print statements in:
* https://github.com/tektoncd/pipeline/blob/532591101c08d7f6103c3dd7cd005ef1a5c3f8cb/pkg/reconciler/taskrun/taskrun.go#L126
* https://github.com/tektoncd/pipeline/blob/532591101c08d7f6103c3dd7cd005ef1a5c3f8cb/pkg/reconciler/taskrun/taskrun.go#L143
* https://github.com/tektoncd/pipeline/blob/532591101c08d7f6103c3dd7cd005ef1a5c3f8cb/pkg/reconciler/taskrun/taskrun.go#L158
* https://github.com/tektoncd/pipeline/blob/532591101c08d7f6103c3dd7cd005ef1a5c3f8cb/pkg/reconciler/taskrun/taskrun.go#L166

4. Save the file and see how Skaffold will deploy your controller again