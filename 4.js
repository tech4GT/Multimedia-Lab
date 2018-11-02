(function main() {


    const probs = [{ char: 'A', val: 0.4 },
    { char: 'B', val: 0.3 },
    { char: 'C', val: 0.2 },
    { char: 'D', val: 0.1 }];

    let text = encode("ABCD", probs);
    console.log(text);
    console.log(decode(text, probs))
})();


function encode(str, probs) {

    let rangeL = 0, rangeH = 1;
    for (let i = 0; i < str.length; i++) {
        let val = 0, j = 0;
        for (j = 0; probs[j].char != str.charAt(i); j++)
            val += probs[j].val;
        let numL = rangeL + (rangeH - rangeL) * val, numH = numL + probs[j].val * (rangeH - rangeL);
        rangeL = numL;
        rangeH = numH;
    }
    return rangeH;
}

function decode(num, probs) {
    let rv = "", rangeL = 0, rangeH = 1;
    for (let i = 0; i < (num + "").substr(2).length + 1; i++) {
        let val = 0, j = 0;
        for (j = 0; rangeL + val * (rangeH - rangeL) < num; j++) {
            val += probs[j].val;
        }
        j--;
        let numH = rangeL + (rangeH - rangeL) * val, numL = numH - probs[j].val * (rangeH - rangeL);
        rangeL = numL;
        rangeH = numH;
        rv += probs[j].char;
    }
    return rv;
}