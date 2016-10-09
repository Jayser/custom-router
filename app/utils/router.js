class Router {
    constructor() {
        this.routers = [];
        this._init();
    }

    _init() {
        this.addHandleOnPopState();

        this.on({
            url: 'test.html',
            handle: () => console.log('handle'),
            after: () => console.log('after'),
            before: () => console.log('before'),
            middleware: () => true
        });
    }

    addHandleOnPopState() {
        window.addEventListener('popstate', e => {
            console.log('triggered popstate ', e);
            }, false);
    }

    _findRouteByUrl(val) {
        return this.routers.find(rout => rout.url === val);
    }

    on(opt) {
        const hasRoute = this._findRouteByUrl(opt.url);

        if (!hasRoute) {
            this.routers.push(opt);
            return true;
        }

        return false;
    }

    to(url) {
        const route = this._findRouteByUrl(url);

        if(route && typeof route.handle === 'function') {
            if (typeof route.after === 'function') {
                console.log('after', true);
                route.after();
            }

            if (typeof route.middleware === 'function') {
                if (route.middleware()) {
                    console.log('middleware ', true);
                    history.pushState({ route: route.url }, null, route.url);
                    route.handle();
                } else {
                    console.log('middleware ', false);
                    return false;
                }
            } else {
                console.log('handle', true);
                history.pushState({ route: route.url }, null, route.url);
                route.handle();
            }

            if (typeof route.before === 'function') {
                console.log('before', true);
                route.before();
            }

            return true;
        }
    }
}

/*
* on:

 }

 prev () {

 }

 is () {

 }

 destroy () {

 }

 link () {

 }

 notFound () {

 }
* */

export default new Router();
