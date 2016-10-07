# Custom Router!

## Installation

```
npm install
```


## Development

```
npm start
```

This will start local development server

```
npm run analyze
```

This will create `reports/webpack-stats.json` file for [analyse](https://webpack.github.io/analyse/) webpack service

## Git config

* git config --global user.name "User Name"
* git config --global user.email "user_email"
* git config --global color.ui true
* git config --global pull.rebase true
* git config core.ignorecase false

## Git hook
> Automatically install pre-commit and commit-msg.

* pre-commit execute eslint
* commit-msg validate message according to: 

```
// pattern
/feature-\d{1,4}\:.+/

// example
feature-36: your own commit message
```

## Style Guide

* [Style Guide](https://github.com/airbnb/javascript/tree/master/react)
* [Best Practice](https://github.com/planningcenter/react-patterns)
 
## API

* `router.on(url/regexp, callback, [{after: fn, before:fn middleware: fn}])` - adding a new route
* `router.to(url, absolute=false || true as default)` - if absolute is false then finds the root path of your app based on the provided routes and go to.
* `router.prev(url, absolute=false || true as default)` - go to prev state
* `router.is(url, absolute=false || true as default)` - return bool if current rout equal url
* `router.destroy(url/regexp || nothing) - removes (target || all)` the registered routes and stops the URL change listening.
* `router.link(absolute=false || true as default)` - it returns a (absolute || local) url of the given path
* `router.notFound(callback)` - adding a handler for not-found URL (404 page)


## Technologies & Tools

* webpack
* TypeScript
* babel
* es2017

## Authors

* [Azizov Sarhan](https://github.com/Jayser/)

## License
MIT - do anything with the code, but don't blame me if it does not work.