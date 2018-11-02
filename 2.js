

(function() {
    console.log(runLengthEncode("aaabbde"))
})();

function runLengthEncode(str) {
    let prevChar = str.charAt(0), count = 1, rv = "";
    for (let i = 1; i < str.length; i++) {
        if (str[i] === prevChar)
            count++;
        else {
            rv += prevChar + count;
            prevChar = str[i];
            count = 1;
        }
    }
    rv += prevChar + count;
    return rv;
}