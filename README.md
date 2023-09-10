# [2048](https://pradeexsu.github.io/2048/)

![image](https://github.com/pradeexsu/2048/assets/49487927/35c8ddba-bede-47bf-87f1-b1e4e581fa3c)

transform board with roatation.

## Test case

```js
[2,0,2,0] -> [0,0,0,4]
[2,2,2,0] -> [0,0,2,4]
[2,2,2,4] -> [0,2,4,4]
[4,4,4,4] -> [0,0,8,8]
[8,4,2,0] -> [0,8,4,2]
```

## Transform Logic

```js
function swipe(row) {
    let n = row.length
    let last_merge = -1
    let score = 0
    for (let left = 1; left < n; left++) {

        if (row[left] === 0)
            continue
        else {
            // non zero value in iteration ...
            for (let i = left - 1; i > last_merge; i--) {
                if (row[i] === row[left]) {
                    row[i] *= 2;
                    row[left] = 0
                    score += row[i]
                    last_merge = i
                    break
                } else if (i === 0 && row[i] === 0) {
                    row[i] = row[left]
                    row[left] = 0;
                } else if (row[i] !== 0) {
                    row[i + 1] = row[left];
                    if (i + 1 != left) {
                        row[left] = 0
                    }
                    break
                } else if (last_merge + 1 == i) {
                    row[i] = row[left];
                    row[left] = 0
                    break
                }
            }
        }
    }
    return score
}
```