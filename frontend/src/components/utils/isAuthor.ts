const isAuthor = (auth: any, account: any): boolean => {
    const isLoggedIn = auth !== undefined;
    return isLoggedIn && auth.item.id === account.id;
}


export default isAuthor;