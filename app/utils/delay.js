export default ((timer) => {
    return (callback, ms) => {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    }
})(0);