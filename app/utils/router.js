class Router {
    constructor() {
        this._routers = [];
        this._init();
    }

    // Utils
    _isFunction(type) {
        return typeof type === 'function';
    }

    _isString(type) {
        return typeof type === 'string';
    }

    _isRegExp(type) {
        return type instanceof RegExp;
    }

    // Private
    _init() {
        this._addHandleOnPopState();
    }

    _addHandleOnPopState() {
        addEventListener('popstate', ({ state = {} }) => this.go(state.url), false);
    }

    _match(str, regexp) {
        return str.match(regexp);
    }

    _findRoute(url) {
        return this._routers.find(({ pattern }) => this._match(url, pattern));
    }

    _toPattern(url) {
        return new RegExp(`^${url.replace(/:\w+/g, '(\\w+)')}$`);
    }

    _addRoute({ handle, pattern }, url) {
        let result = false;
        const args = this._match(url, pattern);

        if (this._isFunction(handle)) {
            history.pushState({ pattern }, null, url);
            handle(args && args.slice(1));
            result = true;
        }

        return result;
    }

    // Public
    add(url, handle) {
        if ((this._isString(url) || this._isRegExp(url)) && this._isFunction(handle)) {
            const pattern = this._isRegExp(url) ? url : this._toPattern(url);

            this._routers.push({ pattern, handle });
        }
    }

    go(url) {
        const route = this._findRoute(url);

        if(route) {
            return this._addRoute(route, url);
        }

        this._notFound && this._notFound();
    }

    parse(url) {
        return this._routers.filter(route => {
            return this._match(url, route.pattern);
        });
    }

    back() {
        history.back();
    }

    notFound(fn) {
        this._notFound = fn;
    }

}

export default new Router();
