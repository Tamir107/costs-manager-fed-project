window.indexedDB = window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;
if (!window.indexedDB) {
    console.log("The browser doesn't support IndexedDB")
}

window.idb = {};

// window.idb.openCostsDB = async function (db, versionNumber) {
//     const request = window.indexedDB.open("",1);
// }


window.idb.openCostsDB = (db, versionNumber) => {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(db, versionNumber);

        request.onerror = function (event) {
            console.error("An error occurred with IndexedDB");
            console.error(event);
        }

        request.onsuccess = function (event) {
            const db = request.result;
            console.log("Success: " + db);
        }

        request.onupgradeneeded

        resolve("hello");
        // reject("error");
    });
};