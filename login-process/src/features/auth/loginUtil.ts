export const getErrorMessage = (error: unknown): string => {
    if (!error) {
        return "No Server Response";
    }

    switch (error.status) {
        case 400:
            return "Missing Username or Password";
        case 401:
            return "Unauthorized";
        default:
            return "Login Failed";
    }
};
