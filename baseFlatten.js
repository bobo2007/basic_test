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

let arr = [1,2,[3,4,[5,6,[7,8]]],[9,[10,[11]]]];
// console.log(baseFlatten(arr, 2));

// Flattens `array` a single level deep.
// flatten([1, [2, [3, [4]], 5]]) => [1, 2, [3, [4]], 5]
function flatten(array){
    const length = array.length == null ? 0 : array.length;
    return length ? baseFlatten(array, 1) : 0;
}
// console.log(flatten(arr));



// Recursively flattens `array`.
// flattenDeep([1, [2, [3, [4]], 5]])  => [1, 2, 3, 4, 5]   
const INFINITY = 1/0;
function flattenDeep(array){
    const length = array == null ? 0 : array.length;
    return length ? baseFlatten(array, INFINITY) : [];
}
// console.log(flattenDeep(arr));


// Recursively flatten `array` up to `depth` times.
function flattenDepth(array, depth){
    const length = array == null ? 0 : array.length;
    if(!length){
        return [];
    }
    depth = depth === undefined ? 1 : +depth;
    return baseFlatten(array, depth);
}
console.log(flattenDepth(arr, 3));



