export const baseUrl = "http://localhost:8080/api";

export const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const securityConfig = (token?: string) => ({
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    }
});
