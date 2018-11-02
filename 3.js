

(function main() {
    let str = "aaabbcd", map = {}, freq = {};
    for (let i in str)
        map[str[i]] = map[str[i]] ? map[str[i]] + 1 : 1;

    for (let i in map)
        freq[map[i]] = i;
    console.log(staticHuffman(str, map, freq));
})();


function staticHuffman(map, freq) {
    let codes = {};
    let h = new heap();
    for (let i in map)
        h.insert(map[i]);
    while (h.arr.length != 1) {
        let el1 = h.remove(), el2 = h.remove();
        let val = el1 + el2;
        if (freq[el1]) {
            freq[codes[el1]] = freq[codes[el1]] || "";
            freq[codes[el1]] += 0;
        }
        if (freq[el2]) {
            freq[codes[el2]] = freq[codes[el2]] || "";
            freq[codes[el2]] += 1;
        }
        h.insert(val);
    }
    return codes;
}


function heap(arr) {

    if (arr) {
        build_heap();
    } else {
        arr = [];
    }
    this.arr = arr;

    function build_heap() {
        for (let i = (arr.length - 1) % 2 == 0 ? (((arr.length - 1) >> 1) - 1) : (arr.length - 1) >> 1; i >= 0; i--)
            max_heapify(i);
    }

    function max_heapify(i) {
        let l = (i << 1) + 1, r = l + 1, largest = i;
        if (l < arr.length && arr[l] > arr[i])
            largest = l;
        if (r < arr.length && arr[r] > arr[largest])
            largest = r

        if (i != largest) {
            let temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;
            max_heapify(largest);
        }
    }

    this.up_heapify = function up_heapify(i) {
        let parent = (i % 2 == 0) ? (i >> 2) - 1 : (i >> 2);
        if (this.arr[i] > this.arr[parent]) {
            //swap
            let temp = this.arr[i];
            this.arr[i] = this.arr[parent];
            this.arr[parent] = temp;
            this.up_heapify(parent);
        }
    }

    this.insert = function(el) {
        let arr = this.arr;
        arr.push(el);
        this.up_heapify(arr.length - 1);
    }

    this.remove = function() {
        let arr = this.arr;
        if (arr.length == 1) return arr.pop();

        let root = arr[0];
        arr[0] = arr.pop();
        this.max_heapify(0);
        return root;
    }
    this.max_heapify = max_heapify;
}