export const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];

export const getDayOfWeekByOffset = (num) => {
    const d = new Date();
    const nextDate = d.setDate(d.getDate() + num);
    const nextDay = new Date(nextDate).getDay();

    return dayOfWeek[nextDay];
};

export const nextDateFormat = (num) => {
    const d = new Date();
    const nd = new Date(d.setDate(d.getDate() + num));

    return `${nd.getFullYear()}/${('0' + (nd.getMonth() + 1)).slice(-2)}/${('0' + nd.getDate()).slice(-2)}`;
};

