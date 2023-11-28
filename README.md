# Skaffold 101 - scenario 3
This is a simple webapp to demonstrate some Skaffold features - Sync feature

## To run the application in your local machine
1. Go to your `nodejs` folder and run:
```bash
skaffold dev
```

2. To eneable the sync feature, please check the [File Sync docs](https://skaffold.dev/docs/filesync/). For this example, we'll use the [Manual sync mode](https://skaffold.dev/docs/filesync/#manual-sync-mode): 
    
    Edit your `skaffold.yaml` to replace the `build` stanza with:
```yaml
...
build:
    artifacts:
    - image: webapp
    context: ./backend
    sync:
        manual:
        - src: 'src/data/**/*.html'
        dest: .
...
```
    
3. Run the application
```bash
skaffold dev
```

4. Open the web page in your web browser, use the URL specified in the Skaffold logs

5. Do a change in the `nodejs/backend/src/data/index.html` file, and save the it

6. Check Skaffold logs, it will indicate the sync of your file, and no rebuild will be trigered

7. Reload the web page to see the change