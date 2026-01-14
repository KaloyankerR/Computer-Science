//Google Question
//Given an array = [2,5,1,2,3,5,1,2,4]:
//It should return 2

//Given an array = [2,1,1,2,3,5,1,2,4]:
//It should return 1

//Given an array = [2,3,4,5]:
//It should return undefined


function firstRecurringCharacter(input) {
    // should be solved with hashes
    let data = new Map();
    
    for (let i = 0; i < input.length; i++) {
        let number = input[i];
        
        if (data.has(number)) {
            return number;
        }
        
        data.set(number, true)
    }
    
    return undefined;
}

let array1 = [2,5,5,2,3,5,1,2,4]
let array2 = [2,3,4,5]
let array3 = [2,1,1,2,3,5,1,2,4]
let array4 = [2,5,1,2,3,5,1,2,4]

console.log(firstRecurringCharacter(array1));
console.log(firstRecurringCharacter(array2));
console.log(firstRecurringCharacter(array3));
console.log(firstRecurringCharacter(array4));


//Bonus... What if we had this:
// [2,5,5,2,3,5,1,2,4]
// return 5 because the pairs are before 2,2


