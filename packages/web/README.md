## Introduction

- using tailwindcss for positioning and styling
- using layouts -> pages -> componets structure
  - explained in more details below

## Folder structure

- `layouts` contain layouts which are parent component defining general overal structure but leaving central (or otherwise) place for main content of the page
- `pages` contains page per folder, which is the main (data-wise and server-comm related) building block
  - each page has `query/` and `mutation/` folders which contain server communications, READ only and other CRUD operation separated (inspired by GraphQL)
  - each page has `state/` and we try to keep implementation details hidden and separate from the page `index.ts` itself for multiple reasons, one being able to change it at a later point, and also to limit which actions can be done from page directly to prevent unintentional mistakes in some cases
  - `components/` is where we keep "dummy" or show only components, or rarely containing small pieces of logic, so basically view only
    - we keep page specific compoents inside pages folder but if it turns out that component is generally useful we extract it to global `components/` folder

## How to start dev

```
yarn
yarn start
```
