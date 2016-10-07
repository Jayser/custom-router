export const random = () => {
    return String(Math.random()).slice(2);
};

export const randomRange = (min, max) => {
    return (~~Math.random() * max) + min;
};