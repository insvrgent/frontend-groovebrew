import { getBackendUrl } from '../EnvironmentVariables';

export const getMyCafes = async () => {
    try {
        const token = localStorage.getItem("auth");
        const response = await fetch(getBackendUrl() + '/cafe/get-my-cafe', {
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

//for superAdmin
export const getCafeByUserId = async (userId) => {
    console.log(userId)
    try {
        const token = localStorage.getItem("auth");
        const response = await fetch(getBackendUrl() + '/cafe/get-cafe-by-userId', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                userId
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

export const createCafe = async (data) => {
    try {
        const token = localStorage.getItem("auth");
        const response = await fetch(getBackendUrl() + '/cafe/create-cafe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: data.name,
            })
        });
        const responseData = await response.json();
        if (response.ok) return { success: true }; 
        else return { success: false };
    } catch (error) {
        console.error('Error occurred while signing up:', error.message);
        return { success: false };
    }
};
