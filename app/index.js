import React from 'react';
import { render } from 'react-dom';
import router from './utils/router';


window.router = router;

/* this.add('/gallery1/:tag/:perPage/page/:page/', function () {
 console.log(arguments);
 });

 this.add(/^\/gallery2\/(\w+)\/(\w+)\/page\/(\w+)\/$/, function () {
 console.log(arguments);
 });

 this.go('/gallery1/t/tt/page/ttt/');
 this.go('/gallery2/t/tt/page/ttt/');*/

router.add('/gallery', function () {
    console.log('>>> /gallery');
});

router.add('/gallery/:id', function (data) {
    console.log('>>> /gallery/' + data[0]);
});

console.log(router);

router.remove('/gallery');

console.log(router);

/*router.go('/gallery');
router.go('/gallery/id1');
/*router.go('/gallery/id2');*/
//router.back();
//router.go('/notFound');
/*router.notFound(() => {
    console.log('Not Found');
});

router.go('/notFound');

console.log('parse', router.parse('/gallery/id2'));*/

render(
    React.createElement('div', null, 'text'),
    document.getElementById('app')
);

