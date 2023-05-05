const charFromNum = (x) => String.fromCharCode(x+55);
const numFromChar = (x) => x.charCodeAt(0)-55;

const getAllowedSymbols = (radix) => {
    var arr = [];
    for(let i=0;i<radix;i++){
        if(i>=10) arr.push(charFromNum(i));
        else arr.push(i.toString());
    } 
    arr.push('.');
    return arr;
}

const isValidNum = (str, radix) => {
    var isValid = str.split('.').length <= 2;
    if(!isValid) return false;
    let arr = getAllowedSymbols(radix);
    for(let i=0;i<str.length;i++){
        isValid = arr.includes(str.charAt(i));
        if(!isValid) break;
    } 
    return isValid;
}

const convertToDecimal = (str, radix) => {
    var sum1 = 0, sum2 = 0;
    let parts = str.split('.');
    for(let i=0;i<parts[0].length;i++){
        let power = Math.pow(radix, parts[0].length-i-1);
        let num = parseInt(parts[0].charAt(i));
        if(isNaN(num)) num = numFromChar(str.charAt(i));
        sum1 += num*power;
    }
    if(parts[1]) for(let i=0;i<parts[1].length;i++){
        let power = Math.pow(radix, -i-1);
        let num = parseInt(parts[1].charAt(i));
        if(isNaN(num)) num = numFromChar(parts[1].charAt(i));
        sum2 += num*power;
    }   return sum1+sum2;
}

const convertToBase = (str, baseRadix, convertRadix, decimals) => {
    let baseStr = (baseRadix == 10)?str:convertToDecimal(str,baseRadix).toString();
    let parts = baseStr.split('.');
    let num = parseInt(parts[0]);
    let dec = parseFloat(`0.${parts[1]}`);
    var str1 = [], str2 = [];
    while(num > 0){
        let rem = num % convertRadix;
        if(rem >= 10) str1.push(charFromNum(rem));
        else str1.push(rem.toString());
        num = parseInt(num/convertRadix);
    } 
    str1 = str1.reverse().join("");
    while(str2.length < decimals){
        dec *= convertRadix;
        let n = parseInt(dec);
        str2.push((n>=10)?charFromNum(n):n.toString());
        dec -= Math.floor(dec);
    }
    str2 = str2.join("");
    return `${str1}.${str2}`;
}

export default {isValidNum, convertToDecimal, convertToBase}