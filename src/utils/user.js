import {
    loginURL,
    createUserURL,
    forYou,
    logoutURL,
    userProfileInfo
} from "@/constants/user";

export const login = async (user) => {
    try {
        const response = await fetch(loginURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(response.status);
        }
    } catch (error) {
        console.error('Error en la solicitud', error.message);
    }
};

export const loguot = async (token) => {
    try {
        const response = await fetch(logoutURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(response.status);
        }
    } catch (error) {
        console.error('Error en la solicitud', error.message);
    }
};

export const create = async (user) => {
    try {
        const response = await fetch(createUserURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(response.status);
        }
    } catch (error) {
        console.error('Error en la solicitud', error.message);
        return error.message;
    }
};

export const getFeed = async (token, page) => {
    try {
        const response = await fetch(forYou + page, {
            method: 'GET',
            headers: {
                "Authorization": token,
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(response.status);
        }
    } catch (error) {
        console.error('Error en la solicitud', error.message);
        return error.message;
    }
}

export const userProfile = async (token, userID) => {
    try {
        const response = await fetch(userProfileInfo + userID, {
            headers: {
                method: 'GET',
                'Authorization': token,
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const error = await response.json();
            console.log(error);
            throw new Error(response.status);
        }
    } catch (error) {
        console.error('Error en la solicitud', error.message);
        return error.message;
    }
}