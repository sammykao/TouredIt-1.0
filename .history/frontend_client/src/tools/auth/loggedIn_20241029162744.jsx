export const isAuthenticated = () => {
    const accessToken = localStorageStorage.getItem('accessToken');
    return !!accessToken;
};