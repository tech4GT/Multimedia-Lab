/* LZW compression  */

(function() {

    const dict = {};
    let str = "thisIsString";
    prefill(dict);
    console.log(compress(dict, str.charAt(0), str, 1, "", 256));

})()

function prefill(dict) {
    for (val = 0; val < 256; val++)
        dict[String.fromCharCode(val)] = val;
}


function compress(dict, pre, str, index, out, count) {
    if (index >= str.length) return out;
    if (dict[pre]) {
        return compress(dict, pre + str.charAt(index), str, index + 1, out + dict[pre], count);
    } else {
        dict[pre] = count;
        return compress(dict, str.charAt(index), str, index + 1, out + dict[pre], count + 1);
    }
}
