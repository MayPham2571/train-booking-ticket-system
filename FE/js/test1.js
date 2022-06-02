var str = "Hello"
var arrStr= str.split("")
var newStr =[]
for (let i = 0; i<arrStr.length; i++ ){
    newStr += arrStr[arrStr.length -i-1];
}
var ReverseStr = newStr.join("");
console.log (ReverseStr)
