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

            objectStore.createIndex("month_and_year", ["year","month"], { unique: false });

        }

    });
};

idb.addCost = function(costItem) {
    return new Promise((resolve, reject) => {
        const tx = idb.db.transaction(["costs"], "readwrite");
        const store = tx.objectStore("costs");

        const date = new Date();
        costItem.day = date.getDate();
        costItem.month = date.getMonth() + 1;
        costItem.year = date.getFullYear();

        store.add(costItem);

        tx.oncomplete = resolve;

        tx.onerror = function (event) {
            reject(`error storing note ${event.target.errorCode}`);
        }
    });
}

idb.getCosts = function() {

}

export default idb;