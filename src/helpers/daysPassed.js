

export const daysPassed = (date)=>{

    const currentDate = new Date();
    const creationDate = new Date(date);
    const diffrence = currentDate - creationDate;
    return Math.floor(diffrence / (1000 * 60 * 60 * 24));
}