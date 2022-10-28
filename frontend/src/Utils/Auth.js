import {
    dataUrl
} from "./dataUrl";

export let initialAuth = {};

// Expire session
const nbrHours = 3;
let savedAt = localStorage.getItem('savedAt')

if (savedAt && (new Date().getTime() - savedAt > nbrHours * 60 * 60 * 1000)) {
    localStorage.clear()
    initialAuth = {
        token: null,
        //user: null,
        // id: null,
        userId: null,
        isAdmin: false,
        isAuthenticated: false,
    }
} else if (JSON.parse(localStorage.getItem("isAuthenticated")) === true) {
    // Recup données du Back puis conversion en objet JS
    initialAuth = {
        // id: JSON.parse(localStorage.getItem("id")),
        userId: JSON.parse(localStorage.getItem("userId")),
        //user: JSON.parse(localStorage.getItem("user")),
        token: JSON.parse(localStorage.getItem("token")),
        firstName: JSON.parse(localStorage.getItem("firstName")),
        lastName: JSON.parse(localStorage.getItem("lastName")),
        email: JSON.parse(localStorage.getItem("email")),
        imageUrl: JSON.parse(localStorage.getItem("imageUrl")),
        isAdmin: JSON.parse(localStorage.getItem("isAdmin")),
        isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")),
    }
} else {
    // Initial state
    localStorage.clear()
    initialAuth = {
        token: null,
        //id: null,
        userId: null,
        isAdmin: false,
        isAuthenticated: false,
    }
}

export const AuthReducer = (authState, action) => {
    switch (action.type) {
        case "Login":
            // Sauvegarde Data dans LS
            //localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", JSON.stringify(action.payload.token));
            localStorage.setItem("userId", JSON.stringify(action.payload.userId));
            //localStorage.setItem("id", JSON.stringify(action.payload.id));
            localStorage.setItem("firstName", JSON.stringify(action.payload.firstName));
            localStorage.setItem("lastName", JSON.stringify(action.payload.lastName));
            localStorage.setItem("email", JSON.stringify(action.payload.email));
            localStorage.setItem("isAdmin", JSON.stringify(action.payload.isAdmin));
            localStorage.setItem("isAuthenticated", JSON.stringify(action.payload.isAuthenticated));
            localStorage.setItem('savedAt', new Date().getTime());

            // Avatar
            dataUrl(action.payload.imageUrl).then((dataUrl) => {
                localStorage.setItem("imageUrl", JSON.stringify(dataUrl))
            })

            return {
                ...authState,
                userId: action.payload.id,
                    token: action.payload.token,
                    //userId: action.payload.userId,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    email: action.payload.email,
                    imageUrl: action.payload.imageUrl,
                    isAdmin: action.payload.isAdmin,
                    isAuthenticated: action.payload.isAuthenticated,
            }
            case "LogOut":
                localStorage.clear();
                return {
                    isAuthenticated: false,
                        isAdmin: false,
                        // id: null,
                        user: null,
                        userId: null,
                        token: null,
                }
                default:
                    return authState
    }
}