let idb = {};

idb.openCostsDB = function (dbName, versionNumber) {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(dbName, versionNumber);

        request.onerror = function (event) {
            reject("could'nt open the database.");
        };

        request.onsuccess = function (event) {
            idb.db = request.result;
            resolve(idb);
        };

        request.onupgradeneeded = function (event) {
            idb.db = event.target.result;
            const objectStore = idb.db.createObjectStore("costs", { keyPath: "id", autoIncrement: true });

            objectStore.createIndex("month_and_year", ["year", "month"], { unique: false });

        };

    });
};

idb.addCost = function (costItem) {
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
        };
    });
};

idb.getCosts = function (month = null, year = null) {
    return new Promise((resolve, reject) => {
        const transaction = idb.db.transaction(["costs"]);
        const objectStore = transaction.objectStore("costs");
        let allDataFlag = 0;
        const result = [];
        let request;

        if (month === null && year === null) {
            request = objectStore.getAll();
            allDataFlag = 1;
        }
        else {
            let yearTo = year;
            let yearFrom = year;
            let monthFrom = month;
            let monthTo = month;

            if (month == null && year != null) {
                monthFrom = 1;
                const currYear = new Date().getYear % 100;
                if (year === currYear) {
                    monthTo = new Date().getMonth + 1;
                }
                else {
                    monthTo = 12;
                }
            }

            else if (month != null && year != null) {

            }

            else if (month != null && year == null) {
                const current_month = new Date().getMonth() + 1;
                if (current_month < month) {
                    yearFrom = yearTo = new Date().getYear() % 100 - 1;
                }
                else {
                    yearFrom = yearTo = new Date().getYear() % 100;
                }
            }
            else {
                console.log('readCalories():error - The search does not match any result')
                reject('The search does not match any result');
            }
            const keyRange = IDBKeyRange.bound([yearFrom, monthFrom], [yearTo, monthTo]);
            const yearToMonthIndex = objectStore.index('month_and_year');
            request = yearToMonthIndex.openCursor(keyRange);
        }

        request.onerror = function (event) {
            reject("error:" + event);
        };

        request.onsuccess = function (event) {
            if (allDataFlag === 1) {
                //Revisit
                if (request.result) {
                    console.log('readCalories(): success, return the result');
                    resolve(request.result);
                }
            }
            else {
                if (request.result) {
                    const cursor = event.target.result;
                    if (cursor) {
                        result.push(cursor.value);
                        cursor.continue();
                    }
                }
                else {
                    resolve(result);
                }
            }
        };
    });
};

export default idb;