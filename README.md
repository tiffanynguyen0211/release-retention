
# Release Retention Exercise

Base on the requirements of the project, I have decided to use [tsdx](https://tsdx.io/) to build a simple headless React component
Assumption:
- All data are available at the beginning when component did mount
- Name of deployment is auto incremental with formatting (Deployment-[Number])

## Commands

### Setup project
```
yarn install
```
### Start up a dev build

```
yarn start
```

### Run test
** Project is set up with Enzyme and Axe-core for unit test and accessibility test ** 
```
yarn test
```

## Run example
** Example when using the component with mockData and without any styling ** 
```
cd example && yarn
yarn start
```
