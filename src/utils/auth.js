const userSessionId = new Map();


export const setUser = (id, user)=>{
    userSessionId.set(id, user);
}

export const getUser = (id)=>{
    const userData = userSessionId.get(id)
    if (!userData) {
        console.log("No user found for id:", id);
    }
    return userData;
}