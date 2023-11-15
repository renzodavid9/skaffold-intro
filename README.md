# Skaffold 101 - scenario 1
This is a simple webapp to demonstrate some Skaffold features

## To run the application in your local machine - now with Skaffold
1. Go to your `nodejs` folder and run:
```bash
skaffold run
```

2. That's all! Your app is running :)

3. To know how to portforward, please check the [Port Forwarding docs](https://skaffold.dev/docs/port-forwarding/). Some ways:

    3.1. Run:
   ```bash
    skaffold run --port-forward
    ``` 
    3.2. Edit your `skaffold.yaml` to include the following:
    ```yaml
    apiVersion: skaffold/v4beta7
    kind: Config

    portForward:
    - resourceType: Deployment
        resourceName: webapp
        port: 3000
    ...
    ```
    And run
    ```bash
    skaffold run
    ```

4. To delete your app run
```bash
skaffold delete
```

5. To enter dev mode:
```bash
skaffold dev
```