
const version = 1
const DB_NAME = 'todos'
const STORE_NAME = 'todo'

export function openDb(callback){
    const request = indexedDB.open(DB_NAME, version)

    request.onupgradeneeded = function(e){
        const db = e.target.result

        e.target.transaction.onerror = onDberror

        // Delete old datastore
        if(db.objectStoreNames.contains(STORE_NAME)){
            db.deleteObjectStore(STORE_NAME)
        }
        // Create new datastore
        db.createObjectStore(STORE_NAME, {
            keypath: 'timestamp', // PK
        })
        // Handle success
        request.onsuccess = function(e){
            datastore = e.target.request
            //Execute callback() which is refreshTodos()
            callback()
        }
    }
}