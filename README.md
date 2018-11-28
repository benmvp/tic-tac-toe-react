# Tic-Tac-Toe React

[![Greenkeeper badge](https://badges.greenkeeper.io/benmvp/tic-tac-toe-react.svg)](https://greenkeeper.io/)

A client-side tic-tac-toe app written with React (and lodash).

## Features

- Multiple boards on a page
- A board of configurable _NxN_ size
- Restart of a board
- Grid is actually a list of squares made into a grid using flexbox
- 100% inline styles

## Data flow

The data flow is uni-directional without actually using Flux, Redux, etc. It accomplishes this by having the top-level Board components serving as application state containers. And instead of transforming the state themselves, they use _action-reducers_.

In this case, _action-reducers_ are a combination of actions and reducers found in Redux. The Board container component, calls a function (as an action) passing in the current state as well as additional action-related data. Then that function returns the transformation of the state just like a reducer.

These _action-reducers_ should make it easy to transition the app to using Redux in the future.

## Running the app

```bash
# install dependencies
npm install

# start simple server
npm start

# bundle dependencies
npm run build
```

Visit http://localhost:3000/
