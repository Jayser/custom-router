import router from './utils/router';

[].slice.call(document.querySelectorAll('.navigation')).map(item => {
    item.addEventListener('click', function (e) {
        console.log(e.target.getAttribute('href'));
        router.go(e.target.getAttribute('href'));
        e.preventDefault();
    }, false)
});
router.add('/', () => {
    document.getElementById('center').innerHTML = 'home';
});

router.add('/page/:num', (num) => {
    document.getElementById('center').innerHTML = 'page ' + num;
});

router.go('/');




