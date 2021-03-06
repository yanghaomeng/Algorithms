//插入排序
console.log(insertSort([24,12,53,2,123]))
function insertSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (arr[j] > key) {
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = key;
    }
    return arr;
}

//冒泡排序
function bubblingSort(arr) {
    let low = 0;
    let high = arr.length - 1;
    let i;
    while (low < high) {
        for (i = low; i < high; i++) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            }
        }
        high--;
        for (i = high; i > low; i--) {
            if (arr[i - 1] > arr[i]) {
                [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
            }
        }
        low++;
    }
    return arr;
}

//归并算法
function merge(left, right) {
    let result = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    return result.concat(left, right);
}
function mergeSort(arr) {
    if (arr.length === 1) {
        return arr;
    }
    let mid = Math.floor(arr.length / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);
    return merge(mergeSort(left), mergeSort(right));
}
//狄克斯特拉算法
// let graph = {};
// graph["start"] = {};
// graph["start"]["a"] = 5;
// graph["start"]["b"] = 2;
// graph["a"] = {};
// graph["a"]["c"] = 4;
// graph["a"]["d"] = 2;
// graph["b"] = {};
// graph["b"]["a"] = 8;
// graph["b"]["d"] = 7;
// graph["c"] = {};
// graph["c"]["d"] = 6;
// graph["c"]["fin"] = 3;
// graph["d"] = {};
// graph["d"]["fin"] = 1;
// let costs = {};
// costs["a"] = 5;
// costs["b"] = 2;
// costs["c"] = Infinity;
// costs["d"] = Infinity;
// costs["fin"] = Infinity;
// let parents = {};
// parents["a"] = "start";
// parents["b"] = "start";
// parents["c"] = null;
// parents["d"] = null;
// parents["fin"] = null;

// console.log(weightBreadthSearch(graph, costs, parents));

function weightBreadthSearch(graph, costs, parents) {
    let processed = [];
    let node = findLowestNode(costs);
    while (node) {
        let cost = costs[node];
        let neighbors = graph[node];
        for (key in neighbors) {
            newCost = cost + neighbors[key];
            if (costs[key] > newCost) {
                costs[key] = newCost;
                parents[key] = node;
            }
        }
        processed.push(node);
        node = findLowestNode(costs);
    }
    return costs;

    function findLowestNode(costs) {
        let lowest = Infinity;
        let lowestNode = null;
        for (key in costs) {
            let hasCal = false;
            for (let i = 0; i < processed.length; i++) {
                if (key === processed[i]) {
                    hasCal = true;
                    break;
                }
            }
            if (!hasCal && costs[key] < lowest) {
                lowest = costs[key];
                lowestNode = key;
            }
        }
        return lowestNode;
    }
}


//广度优先搜索
// let graph = {};
// graph["you"] = ["alice", "bob", "claire"]
// graph["bob"] = ["anuj", "peggy"]
// graph["alice"] = ["peggy"]
// graph["claire"] = ["thom", "jonny"]
// graph["anuj"] = []
// graph["peggy"] = []
// graph["thom"] = []
// graph["jonny"] = []
// console.log(breadthSearch("you",graph));
function breadthSearch(name, graph) {
    let search_que = [];
    let searched = [];
    search_que = search_que.concat(graph[name]);
    while (search_que.length > 0) {
        let person = search_que.shift();
        let selected = false;
        for (let i = 0; i < searched.length; i++) {
            if (person === searched[i]) {
                selected = true;
                break;
            }
        }
        if (selected) {
            continue;
        } else {
            searched.push(person);
            if (person.indexOf("j") > 0) {
                console.log(person + " is answer");
                return searched;
            } else {
                search_que = search_que.concat(graph[person]);
            }
        }
    }
    return " 没找到";
}

//快速排序(高性能)
function quickSortStrict(array) {
    return quick(array, 0, array.length - 1);

    function quick(array, left, right) {
        let index;
        if (array.length > 1) {
            index = partition(array, left, right);
            if (left < index - 1) {
                quick(array, left, index - 1);
            }
            if (index < right) {
                quick(array, index, right);
            }
        }
        return array;
    }

    function partition(array, left, right) {
        const pivot = array[Math.floor((right + left) / 2)];
        let i = left;
        let j = right;

        while (i <= j) {
            while (compare(array[i], pivot) === -1) {
                i++;
            }
            while (compare(array[j], pivot) === 1) {
                j--;
            }
            if (i <= j) {
                swap(array, i, j);
                i++;
                j--;
            }
        }
        return i;
    }

    function swap(array, a, b) {
        [array[a], array[b]] = [array[b], array[a]];
    }

    function compare(a, b) {
        if (a === b) {
            return 0;
        }
        return a < b ? -1 : 1;
    }
};

//快速排序(常用)
function quickSort(arr) {
    if (arr.length < 2) return arr;
    var less = [];
    var more = [];
    pivotIndex = Math.floor(arr.length / 2)
    var pivot = arr.splice(pivotIndex, 1)[0];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] <= pivot) {
            less.push(arr[i]);
        } else {
            more.push(arr[i]);
        }
    }
    return quickSort(less).concat([pivot], quickSort(more));
}

//递归累加
function sum(arr) {
    if (arr.length === 0) {
        return null;
    } else if (arr.length === 1) {
        return arr[arr.length - 1];
    } else {
        var head = arr[0];
        arr.shift();
        return head + sum(arr);
    }
}

//递归
function factorial(n) {
    if (n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

//尾递归优化
function totalFactorial(n, total) {
    if (n === 1) {
        return total;
    } else {
        return totalFactorial(n - 1, n * total);
    }
}

//选择排序
function selectionSort(arr) {
    var newArr = [];
    var length = arr.length;
    for (var i = 0; i < length; i++) {
        var smallest = arr[0];
        var smallestIndex = 0;
        for (var j = 0; j < arr.length - i; j++) {
            if (arr[j] < smallest) {
                smallest = arr[j];
                smallestIndex = j;
            }
        }
        newArr.push(smallest);
    }
    return newArr;
}

// 二分查找
function binarySearch(list, item) {
    let low = 0,
        high = list.length - 1,
        step = 0;
    while (low <= high) {
        step++;
        mid = Math.floor((low + high) / 2);
        if (list[mid] === item) {
            return {
                "序号": mid,
                "步数": step
            };
        } else if (list[mid] > item) {
            high = mid - 1;
        } else if (list[mid] < item) {
            low = mid + 1;
        }
    }
    return null;
}