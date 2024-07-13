export const isAuthenticated = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    console.log()
    return !!accessToken;
};