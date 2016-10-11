const REMOVE_ONE = 1;

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

    //start listening for history change
    _addHandleOnPopState() {
        addEventListener('popstate', ({ state = {} }) => this.go(state.url), false);
    }

    _match(str, regexp) {
        return str.match(regexp);
    }

    _findRouteIndex(url) {
        return this._routers.findIndex(({ pattern }) => {
            return this._isRegExp(url) ? String(pattern) === String(url) : this._match(url, pattern);
        });
    }

    _findRoute(url) {
        return this._routers.find(({ pattern }) => this._match(url, pattern));
    }

    _toPattern(url) {
        return new RegExp(`^${url.replace(/:\w+/g, '(\\w+)')}$`);
    }

    _pushState({ handles, pattern }, url) {
        const args = this._match(url, pattern);
        const parsedRouterArgs = args && args.slice(1);

        history.pushState({ pattern }, null, url);
        handles.forEach(handle => handle(parsedRouterArgs));
    }

    _getUrl(url) {
        return this._isRegExp(url) ? url : this._toPattern(url)
    }

    // Public
    add(url, handle) {
        if ((this._isString(url) || this._isRegExp(url)) && this._isFunction(handle)) {
            const pattern = this._getUrl(url);
            const idx = this._findRouteIndex(pattern);
            const hasRoute = idx !== -1;

            if (!hasRoute) {
                this._routers.push({ pattern, handles: [handle] });
                return;
            }

            this._routers[idx].handles.push(handle);
        }
    }

    remove(url) {
        if ((this._isString(url) || this._isRegExp(url))) {
            const idx = this._findRouteIndex(url);
            this._routers = this._routers.splice(idx, REMOVE_ONE);
        }
    }

    go(url) {
        const route = this._findRoute(url);

        if(route) {
            return this._pushState(route, url);
        }

        this._notFound && this._notFound();
    }

    removeAllRoutes() {
        this._routers = [];
    }

    routed() {
        return this._routers;
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

// after before middleware
// allows add local path
// thinking about functionality way
// TypeScript

export default new Router();
