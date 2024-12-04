export function saveToStorage(key, value) {
    const storageData = JSON.parse(localStorage.getItem('reduxState')) || {};
    storageData[key] = value; // Update only the specified key
    localStorage.setItem('reduxState', JSON.stringify(storageData)); // Save the entire object
}

export function getFromStorage(key) {
    const storageData = JSON.parse(localStorage.getItem('reduxState')) || {}
    return storageData[key] || null
}


// export function getFullStateFromStorage() {
//     return JSON.parse(localStorage.getItem('reduxState')) || {};
// }

