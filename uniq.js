// Creates a duplicate-free version of an array, using
// [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
// for equality comparisons, in which only the first occurrence of each element
// is kept. The order of result values is determined by the order they occur
// in the array.

function uniq(array){
    return (array != null && array.length) ? baseUniq(array) : [];
}