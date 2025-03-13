export const daysPassed = (date) => {
    const currentDate = new Date();
    const creationDate = new Date(date);
    const difference = currentDate - creationDate;


    const differenceInDays = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (differenceInDays > 0) {
        return differenceInDays === 1 ? "1 day ago" : `${differenceInDays} days ago`;
    }

    const differenceInHours = Math.floor(difference / (1000 * 60 * 60));
    if (differenceInHours > 0) {
        return differenceInHours === 1 ? "1 hour ago" : `${differenceInHours} hours ago`;
    }

    const differenceInMinutes = Math.floor(difference / (1000 * 60));
    return differenceInMinutes === 1 ? "1 minute ago" : `${differenceInMinutes} minutes ago`;
};
