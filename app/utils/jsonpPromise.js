window.CallbackRegistry = {};

export default (url) => {
    return new Promise((res, rej) => {

        var scriptOk = false;

        var callbackName = 'cb' + String(Math.random()).slice(-6);

        url += ~url.indexOf('?') ? '&' : '?';
        url += 'callback=CallbackRegistry.' + callbackName;

        window.CallbackRegistry[callbackName] = function (data) {
            scriptOk = true;
            delete window.CallbackRegistry[callbackName];
            res(data);
        };

        function checkCallback() {
            if (scriptOk) return;
            delete window.CallbackRegistry[callbackName];
            rej(err => err);
        }

        var script = document.createElement('script');

        script.onreadystatechange = function () {
            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                this.onreadystatechange = null;
                setTimeout(checkCallback, 0);
            }
        };

        script.onload = script.onerror = checkCallback;
        script.src = url;

        document.body.appendChild(script);
    });
}