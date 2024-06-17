import { getBackendUrl } from '../EnvironmentVariables';

export const loginUser = async (username, password) => {
    try {
        const response = await fetch(getBackendUrl() + '/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const responseData = await response.json();

        if (response.ok) return { success: true, token: responseData.token, cafeId: responseData.cafeId };
        else return { success: false, token: null };

    } catch (error) {
        console.error('Error occurred while signing up:', error.message);
        return { success: false, token: null };
    }
};

export const getAdmins = async () => {
    try {
        const token = localStorage.getItem("auth");
        const response = await fetch(getBackendUrl() + '/user/get-admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const responseData = await response.json();
        console.log(responseData);
        if (response.ok) return { success: true, responseData };
        else return { success: false };
    } catch (error) {
        console.error('Error occurred while signing up:', error.message);
        return { success: false };
    }
};

export const registerAdmin = async (data) => {
    try {
        const token = localStorage.getItem("auth");
        const response = await fetch(getBackendUrl() + '/user/create-admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                email: data.email,
                username: data.username,
                password: data.password
            })
        });
        const responseData = await response.json();
        console.log(responseData);
        if (response.ok) return { success: true };
        else return { success: false };
    } catch (error) {
        console.error('Error occurred while signing up:', error.message);
        return { success: false };
    }
};

export const getClerks = async (cafeId) => {
    console.log(cafeId)
    try {
        const token = localStorage.getItem("auth");
        const response = await fetch(getBackendUrl() + '/user/get-clerk-by-cafe-id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                cafeId
            })
        });
        const responseData = await response.json();
        console.log(responseData);
        if (response.ok) return { success: true, responseData };
        else return { success: false };
    } catch (error) {
        console.error('Error occurred while signing up:', error.message);
        return { success: false };
    }
};

export const registerClerk = async (data, id) => {
    try {
        console.log(data, id);
        const token = localStorage.getItem("auth");
        const response = await fetch(getBackendUrl() + '/user/create-clerk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                email: data.email,
                username: data.username,
                password: data.password,
                cafeId: id
            })
        });
        const responseData = await response.json();
        console.log(responseData);
        if (response.ok) return { success: true, responseData };
        else return { success: false };
    } catch (error) {
        console.error('Error occurred while signing up:', error.message);
        return { success: false };
    }
};

export const registerUser = async (email, username, password) => {
    try {
        const response = await fetch(getBackendUrl() + '/user/create-guest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const responseData = await response.json();
        console.log(responseData);
        if (response.ok) return { success: true, token: responseData.token };
        else return { success: false, token: null };
    } catch (error) {
        console.error('Error occurred while signing up:', error.message);
        return { success: false, token: null };
    }
};

export const registerUserAsGuest = async () => {
    try {
        const response = await fetch(getBackendUrl() + '/user/create-guest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const responseData = await response.json();

        if (response.ok) return { success: true, token: responseData.token };
        else return { success: false, token: null };
    } catch (error) {
        console.error('Error occurred while signing up:', error.message);
        return { success: false, token: null };
    }
};

export const updateUser = async (email, username, password) => {
    try {
        const token = localStorage.getItem("auth");
        const response = await fetch(getBackendUrl() + '/user/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ email, username, password })
        });
        if (response.ok) {
            // Handle successful update
            console.log('User updated successfully');
            return { success: true };
        } else {
            // Handle failed update here
            console.error('Update failed');
            return { success: false };
        }
    } catch (error) {
        console.error('Error occurred while updating user:', error.message);
        return { success: false };
    }
};
