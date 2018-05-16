function uniq(list){
    var map = {}, 
    result = [],
    idx = 0,
    item;
    while(idx < list.length){
        item = list[idx];
        if(!map[item]){
            result.push(item);
            map[item] = true;
        }
        idx += 1;
    }
    return result;
}

var arr = [1,2,2,3,3,4,5,2];
console.log(uniq(arr));