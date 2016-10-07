export const closest = (el, selector) => {
    var matchesFn;

    // find vendor prefix
    ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
        if (typeof document.body[fn] == 'function') {
            matchesFn = fn;
            return true;
        }
        return false;
    });

    while (el) {
        if (el && el[matchesFn](selector)) {
            return el;
        }
        el = el.parentElement;
    }

    return {};
};