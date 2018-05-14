function baseFlatten(array, depth, isFlattenable, isStrict, result){
    result || (result=[]);
    if(array == null){
        return result;
    }
    for(const value of array){
        if(depth > 0 && typeof value == 'object' && value !== null){
            if(depth > 1){
                baseFlatten(value, depth-1, isFlattenable, isStrict, result);
            }else{
                result.push(...value);
            }
        }else if(!isStrict){
            result[result.length] = value;
        }
    }
    return result;
}

// comparison between two values to determine if they are equivalent.
function eq(value, other){
    return value === value || (value !== value && other !== other);
}

// Gets the index at which the `key` is found in `array` of key-value pairs.
function assocIndexOf(array, key){
    let {length} = array;
    while(length--){
        if(eq(array[length][0], key)){ // ???
            return length;
        }
    }
    return -1;
}

// Checks if `value` is array-like. A value is considered array-like if it's
// not a function and has a `value.length` that's an integer greater than or
// equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
function isArrayLike(value){
    return value != null && typeof value != 'function' && isLength(value.length);
}

// Checks if `value` is object-like. A value is object-like if it's not `null`
// and has a `typeof` result of "object".
function isObjectLike(value){
    return typeof value == 'object' && value !== null;
}

// Checks if `value` is a valid array-like length.
const MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value){
    return typeof value == 'number' && value > -1 && value % 1 ==0 && value <= MAX_SAFE_INTEGER;
}

function isArrayLikeObject(value){
    return isObjectLike(value) && isArrayLike(value);
}

function difference(array, ...values){
    return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true)) : [];
}

// Creates an array of values by running each element of `array` thru `iteratee`.The iteratee is invoked with three arguments: (value, index, array).
function map(array, iteratee){
    let index = -1;
    const length = array == null ? 0 : array.length;
    const result = new Array(length);
    while(++index < length){
        result[index] = iteratee(array[index], index, array);
    }
    return result;
}

const HASH_UNDEFINED = '__lodash_hash_undefined__'; // Used to stand-in for `undefined` hash values.
class SetCache {
    //Creates an array cache object to store unique values.
    constructor(values){ // [values] The values to cache.
        let index = -1;
        const length = values == null ? 0 : values.length;
        this.__data__ = new MapCache;
        while(++index < length){
            this.add(values[index]);
        }
    }

    add(value){ // The value to cache.
        this.__data__.set(value, HASH_UNDEFINED);
        return this; // Returns the cache instance.
    }

    has(value){ // value The value to search for.
        return this.__data__.has(value); // Returns `true` if `value` is found, else `false`.
    }
};
SetCache.prototype.push = SetCache.prototype.add;

class Hash {
    // Creates a hash object
    constructor(entries){ // [entries] The key-value pairs to cache.
        let index = -1;
        const length = entries === null ? 0 : entries.length;
        this.clear();
        while(++index < length){
            const entry = entries[index];
            this.set(entry[0], entry[1]);
        }
    }
    // Removes all key-value entries from the hash.
    clear(){
        this.__data__ = Object.create(null);
        this.size = 0;
    }
    // Removes `key` and its value from the hash.
    delete(key){
        const result = this.has(key) && delete this.__data__[key];
        this.size -= result ? 1 : 0;
    }
    // Gets the hash value for `key`.
    get(key){
        const data = this.__data__;
        const result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
    }
    // Checks if a hash value for `key` exists.
    has(key){
        const data = this.__data__;
        return data[key] !== undefined;
    }
    // Sets the hash `key` to `value`.
    set(key, value){
        const data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = value === undefined ? HASH_UNDEFINED : value;
        return this; // Returns the hash instance.
    }
}

// gets the data for map
function getMapData({__data__}, key){
    const data = __data__;
    //return isKeyable(key) ? data
}

// Checks if `value` is suitable for use as unique object key.
function isKeyable(value){
    const type = typeof value;
    return (type == "string" || type == "number" || type == "symbol" || type == "boolean") ? (value !== '__proto__') : (value === null);
}

class MapCache {
    
}