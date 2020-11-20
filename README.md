# bijiahangqing - 币价行情

view the demo at
https://bijiahangqing.s3-ap-southeast-1.amazonaws.com/index.html

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Testing using Cypress
```
docker run -it --rm -v $PWD:/e2e -w /e2e --network="host" --entrypoint=cypress cypress/included:5.6.0 run --browser chrome --config baseUrl=http://localhost:8080
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
