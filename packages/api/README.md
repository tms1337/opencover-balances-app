## Intro and guiding principles

- using layered struct with easy way to add cake layers via fastify
- wrapping both connectivity code (apis etc) and functionality code in our interfaces so easy to change implementation
- using TDD as but in specific structure with goal of: more real tests, less tests overall, no trivial testing, yet good **safety net**

## Folder structure and architecture

- app.ts entry point
- we start process off with .e2e.spec.ta tests located in top level tests folder
    - these are realisitic usages of final full code wirh server and services up
- ofc these fail then we drop a level and implemented all outside world connectity code in services/ with .int.spec.ta integration tests
    - in lib/ folder we have special helpers to gracefully handle random drops or failures with configurable pause time and attempt N
- finally in functions/ we combine all of these and call in routes after unpacking parms etc


## How to run all tests

```
yarn
yarn test
```

## How to run integration tests

```
yarn
yarn test:int
```

## How to run e2e tests

```
yarn
yarn test:e2e
```
