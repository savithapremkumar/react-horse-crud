# react-horse-crud

react-horse-crud is a SPA that fetches and allows to add and edit horse data from the docker hub at
firstaml/horse-test

## Installation

Use the package manager [npm](https://www.npmjs.com/get-npm) to install dependencies after cloning the repository and navigating to react-posts in your local machine.

```bash
npm install
```

## Usage

Use the below command to spawn a local dev server and run the app.Make sure the horse API is also running on port 3016

```bash
npm start
```

Use the below command to run tests.

```bash
npm run test
```

## Omissions of non-essential features due to time constraint

- Restricting the number of horses displayed in the list to 10 aka  pagination needs to be implemented
- Task 5 / comparison is omitted
- Test coverage for actions and reducers, in-depth component and view testing

## Known issues

- Each horse seems to be added twice
- Some proptype errors in console, [doesn't break functionality]


