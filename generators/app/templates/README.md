
# <%= product %>

## 目录结构

```src/```里含有示例```npm start```后在[http://localhost:3000/](http://localhost:3000/)可查看Demo    

```
.
├── bin                      # Build/Start scripts
├── config                   # Project and build configurations
├── public                   # Static public assets (not imported anywhere in source code)
├── server                   # Express application that provides webpack middleware
│   └── main.js              # Server application entry point
├── src                      # Application source code
│   ├── index.html           # Main HTML page container for app
│   ├── main.js              # Application bootstrap and rendering
│   ├── components           # Global Reusable Presentational Components
│   ├── containers           # Global Reusable Container Components
│   ├── layouts              # Components that dictate major page structure
│   │   └── CoreLayout.js    # CoreLayout which receives children for each route
│   │   └── CoreLayout.scss  # Styles related to the CoreLayout
│   │   └── index.js         # Main file for layout
│   ├── routes               # Main route definitions and async split points
│   │   ├── index.js         # Bootstrap main application routes with store
│   │   ├── Home             # Fractal route
│   │   │   ├── index.js     # Route definitions and async split points
│   │   │   ├── assets       # Assets required to render components
│   │   │   ├── components   # Presentational React Components
│   │   │   └── routes **    # Fractal sub-routes (** optional)
│   │   └── Counter          # Fractal route
│   │       ├── index.js     # Counter route definition
│   │       ├── container    # Connect components to actions and store
│   │       ├── modules      # Collections of reducers/constants/actions
│   │       └── routes **    # Fractal sub-routes (** optional)
│   ├── store                # Redux-specific pieces
│   │   ├── createStore.js   # Create and instrument redux store
│   │   └── reducers.js      # Reducer registry and injection
│   └── styles               # Application-wide styles (generally settings)
└── tests                    # Unit tests
```

## 涉及技术栈 

- [x] [React](https://facebook.github.io/react/)
- [x] [Redux](https://github.com/reactjs/redux)
- [x] [React Router Redux](https://github.com/reactjs/react-router-redux)
- [x] [Webpack](https://webpack.github.io)
- [x] [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
- [x] [Babel](https://babeljs.io/)
- [x] [Autoprefixer](https://github.com/postcss/autoprefixer)
- [x] [PostCSS](https://github.com/postcss/postcss)
- [ ] 还有哪些你认为有价值的优化点？随时联系@大海

## 安装(如果还需要的话)

```
$ npm install
```

## Watch & Hot Module Replace

```
$ npm start
```

## 生产环境构建

```
$ npm run build
```

## 项目负责前端

<%= fe %>

## 项目合作角色

产品：<%= pd %>
后端：<%= rd %>
设计：<%= ue %>
