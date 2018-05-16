function type(value){
    return value === null ? 'Null' : value === undefined ? 'Undefined' : Object.prototype.toString.call(value).slice(8, -1);
}

function clone(value, refFrom, refTo, deep){
    var copy = function(copiedValue){
        // var len = refFrom.length;
        // var idx = 0;
        // console.log('idx', idx);
        // while(idx < len){
        //     if(value === refFrom[idx]){
        //         return refTo[idx];
        //     }
        //     idx += 1;
        // }
        // refFrom[idx + 1] = value;
        // refTo[idx + 1] = copiedValue;
        // console.log('refFrom',refFrom, 'refTo',refTo);
        for(var key in value){
            copiedValue[key] = deep ? clone(value[key], refFrom, refTo, deep) : value[key];
        }
        return copiedValue;
    }
    
    switch(type(value)){
        case 'Object':  return copy({});
        case 'Array': return copy([]);
        case 'Date': return new Date(value.valueOf());
        default : return value;
    }
}

var obj = {
    a : { b: 1},
    c : [2,3],
    d : {e: {f : 4}}
};

console.log(clone(obj, [], [], true)== obj);