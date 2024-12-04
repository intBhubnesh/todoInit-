export const loadState = (key, defaultValue) => {
    try {
        const serializedState = sessionStorage.getItem(key);
        if (!serializedState) {
            return defaultValue;  // Return the default value if nothing is stored
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.error("Could not load state:", error);
        return defaultValue;  // Return the default value if there's an error
    }
};

export const saveState = (key, state) => {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem(key, serializedState);
    } catch (error) {
        console.error("Could not save state:", error);
    }
};
