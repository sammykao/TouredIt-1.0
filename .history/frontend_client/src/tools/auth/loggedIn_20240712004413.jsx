export const isAuthenticated = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    console.log(sessionStorage.username);
    return !!accessToken;
};