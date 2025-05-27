import jwtDecode from 'jwt-decode';

// Check if the token is expired
export const isTokenExpired = (token) => {
    if (!token) return true;

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        return decoded.exp < currentTime; // True if token is expired
    } catch (error) {
        console.error('Error decoding token:', error);
        return true; // Treat invalid tokens as expired
    }
};

// Get the token's expiration time in milliseconds
export const getTokenExpirationTime = (token) => {
    if (!token) return 0;

    try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000; // Convert to milliseconds
    } catch (error) {
        console.error('Error decoding token:', error);
        return 0;
    }
};

// Check if the user is authenticated (token exists and is not expired)
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    return !isTokenExpired(token);
};

// Log the user out (remove token and redirect to login)
export const logout = (navigate) => {
    localStorage.removeItem('token');
    navigate('/login');
};

// Set a timer to log out when the token expires
export const setLogoutTimer = (navigate) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const expirationTime = getTokenExpirationTime(token);
    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;

    if (timeUntilExpiration > 0) {
        setTimeout(() => {
            alert('Your session has expired. Please log in again.');
            logout(navigate);
        }, timeUntilExpiration);
    }
};