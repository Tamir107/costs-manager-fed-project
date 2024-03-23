let idb = {};

idb.openCostsDB = function (dbName, versionNumber) {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(dbName, versionNumber);

        request.onerror = function (event) {
            reject("could'nt open the database.");
        }

        request.onsuccess = function (event) {
            idb.db = request.result;
            resolve(idb);
        }

        request.onupgradeneeded = function (event) {
            idb.db = event.target.result;
            const objectStore = idb.db.createObjectStore("costs", { keyPath: "id", autoIncrement: true });

            objectStore.createIndex("sum", "sum", { unique: false });
            objectStore.createIndex("category", "category", { unique: false });
            objectStore.createIndex("description", "description", { unique: false });

        }

    });
};

idb.addCost = function addCost(costItem) {
    return new Promise((resolve, reject) => {
        const tx = idb.db.transaction(["costs"], "readwrite");
        const store = tx.objectStore("costs");

        store.add(costItem);

        tx.oncomplete = resolve;

        tx.onerror = function (event) {
            reject(`error storing note ${event.target.errorCode}`);
        }
    });
}

export default idb;