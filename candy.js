
// from candies i will be picking tha candy name that will act as a source of image.
const candies = ["blue-candy.png", "red-candy.png", "green-candy.png", "yellow-candy.png", "orange-candy.png", "purple-candy.png"]
//this will give an array type object of all the elements will class name .dd
const obj = document.querySelectorAll(".dd");
let score = 0;
let source;
let temp;
let desti;
//this 6 x 6 matrix is used to store the index no of current candy present in a particular cell
const check = [[1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6]]
function create_the_board() {
    let count = -1;
    for (let candy of obj) {
        count++;
        let i = Math.floor((Math.random() * 10)) % 6;// this will select the random candy
        candy.setAttribute("src", candies[i]);      //this will set the img-src to that indexed candy
        check[Math.floor(count / 6)][count % 6] = i;        //this will set the index(i.e. name of candy) 
    }
}
const total = document.getElementById("sc");
const rest = document.getElementById("btn");
//this will reset the candy score again.
btn.addEventListener("click", () => {
    total.innerText = `Score: ${0}`;
    score = 0;
    create_the_board()
})

total.innerText = `Score: ${score}`;
create_the_board();

/* Updates the board if a match is found horizontally */
function modify_row(i, st, en, cnt) {
    score += cnt;
    total.innerText = `Score: ${score}`;
    if (i === 0) {
        for (let j = st; j <= en; j++) {
            let cal_id = (i * 6) + j + 1;
            let new_id = "" + cal_id;
            console.log("arya");
            let can = document.getElementById(new_id);
            let k = Math.floor((Math.random() * 10)) % 6;
            can.setAttribute("src", candies[k]);
            check[i][j] = k;
        }
    }
    else {
        for (let k = st; k <= en; k++) {
            for (let j = i - 1; j >= 0; j--) {
                let nd = document.getElementById(6 * (j + 1) + k + 1 + "");
                nd.setAttribute("src", candies[check[j][k]]);
                check[j + 1][k] = check[j][k];
            }
            let nd = document.getElementById(k + 1 + "");
            let p = Math.floor((Math.random() * 10)) % 6;
            nd.setAttribute("src", candies[p]);
            check[0][k] = p;
        }
    }
}

/* Updates the board if a match is found vertically */
function modify_col(i, st, en, cnt) {
    score += cnt;
    total.innerText = `Score: ${score}`;
    let n = en;
    for (let j = st - 1; j >= 0; j--) {
        let can = document.getElementById((6 * (j + cnt) + i + 1 + ""));
        can.setAttribute("src", candies[check[j][i]]);
        check[j + cnt][i] = check[j][i];
        n--;
    }
    while (n != -1) {
        let cal_id = (n * 6) + i + 1;
        let new_id = "" + cal_id;
        let van = document.getElementById(new_id);
        let k = Math.floor((Math.random() * 10)) % 6;
        van.setAttribute("src", candies[k]);
        check[n][i] = k;
        n--;
    }

}

/* Check for possibilities of matches across columns */
function let_us_col() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j <= 3;) {
            let k = j;
            let cnt = 1;
            while (k + 1 < 6 && check[k][i] === check[k + 1][i]) {
                k++;
                cnt++;
            }
            if (cnt >= 3) {
                modify_col(i, j, j + cnt - 1, cnt);
            }
            j = k + 1;
        }
    }
}

/* Checks if a swap is a valid move across a column */
function col_check(i) {
    {
        for (let j = 0; j <= 3;) {
            let k = j;
            let cnt = 1;
            while (k + 1 < 6 && check[k][i] === check[k + 1][i]) {
                k++;
                cnt++;
            }
            if (cnt >= 3) {
                // modify_col(i, j, j + cnt - 1, cnt);
                return true;
            }
            j = k + 1;
        }
    }
    return false;
}

/* Check for possibilities of matches across rows */
function let_us() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j <= 3;) {
            let k = j;
            let cnt = 1;
            while (((k + 1) < 6) && (check[i][k] == check[i][k + 1])) {
                k++;
                cnt++;
            }
            // console.log(cnt,"hi")
            if (cnt >= 3) {
                // j to j+cnt-1 to be changed
                modify_row(i, j, j + cnt - 1, cnt);

            }
            j = k + 1;
        }
    }
}


/* Checks if a swap is a valid move across a row */
function row_check(i) {

    for (let j = 0; j <= 3;) {
        let k = j;
        let cnt = 1;
        while (((k + 1) < 6) && (check[i][k] == check[i][k + 1])) {
            k++;
            cnt++;
        }
        if (cnt >= 3) {
            
            return true;

        }
        j = k + 1;
    }
    return false;
}

/***** Check if there's a match *****/
let_us();
let_us_col();

//here temp will store the name of the candy that is being dragged
for (let candy of obj) {    
    candy.addEventListener('dragstart', (e) => {
        source = e.target.id;                  //the id of the source
        temp = candy.getAttribute("src")        //src is attribute of img tag
    })

}
//this will work when the source candy will get dropped on the destination.
for (let candy of obj) {
    candy.addEventListener('dragend', (e) => {
        if (e.target.id != desti)
            candies.indexOf(temp)
        let x = parseInt(e.target.id) - 1;
        check[Math.floor(x / 6)][x % 6] = candies.indexOf(temp);
        e.target.setAttribute("src", temp);
        let_us();
        let_us_col();
    })
}
//here i am checking that whether is it possible to drop or not at this position.
for (let candy of obj) {
    candy.addEventListener('dragover', (e) => {
        let block = parseInt(e.target.id);           //target id as integer   
        let Source = parseInt(source);                //source id as integer

        if (e.target.id == Source + 1 || e.target.id == Source - 1 || e.target.id == Source - 6 || e.target.id == Source + 6  //used to block other cells
        ) {
            if (Math.abs(Source - block) === 1) {   //swapping row wise.
                let row = Math.floor((Source - 1) / 6);
                console.log(row);
                console.log(check);

                let tp = check[row][(Source - 1) % 6];
                check[row][(Source - 1) % 6] = check[row][(block - 1) % 6]
                check[row][(block - 1) % 6] = tp;
                console.log(check);
                if (row_check(row)) {
                    e.preventDefault();
                    desti = e.target.id;
                }
                else if (col_check((Source - 1) % 6) || col_check((block - 1) % 6)) {
                    e.preventDefault();
                    desti = e.target.id;
                }
                tp = check[row][(Source - 1) % 6];
                check[row][(Source - 1) % 6] = check[row][(block - 1) % 6]
                check[row][(block - 1) % 6] = tp;
            }
            else if (Math.abs(Source - block) === 6) {      //swapping column wise
                let coll = Math.floor((Source - 1) % 6)
                let row1 = Math.floor((Source - 1) / 6);
                let row2 = Math.floor((block - 1) / 6);
                let tp = check[row1][coll];
                check[row1][coll] = check[row2][coll];
                check[row2][coll] = tp;
                console.log(check);
                if (row_check(row1) || row_check(row2)) {
                    e.preventDefault();
                    desti = e.target.id;
                }
                else if (col_check(coll)) {
                    e.preventDefault();
                    desti = e.target.id;
                }
                tp = check[row1][coll];
                check[row1][coll] = check[row2][coll];
                check[row2][coll] = tp;
            }
            // e.preventDefault();
            // desti = e.target.id;
            // console.log("hello");
        }

    })
}
//this function if about what will happen once we dropped the source candy.
for (let candy of obj) {
    candy.addEventListener('drop', (e) => {
        let block = parseInt(e.target.id);
        let Source = parseInt(source);
        if (e.target.id == Source + 1 || e.target.id == Source - 1 || e.target.id == Source - 6 || e.target.id == Source + 6) {
            if (Math.abs(Source - block) === 1) {  //this will check whether you are swapping in row or not
                let row = Math.floor((Source - 1) / 6);
                let tp = check[row][(Source - 1) % 6];
                check[row][(Source - 1) % 6] = check[row][(block - 1) % 6]
                check[row][(block - 1) % 6] = tp;
                if (row_check(row)) {
                    tp = check[row][(Source - 1) % 6];
                    check[row][(Source - 1) % 6] = check[row][(block - 1) % 6]
                    check[row][(block - 1) % 6] = tp;
                    let sr = document.getElementById(source).getAttribute("src");
                    e.preventDefault();
                    temp = e.target.getAttribute("src");
                    let x = parseInt(e.target.id) - 1;
                    check[Math.floor(x / 6)][x % 6] = candies.indexOf(sr);
                    e.target.setAttribute("src", sr);
                }
                else if (col_check((Source - 1) % 6) || col_check((block - 1) % 6)) {
                    tp = check[row][(Source - 1) % 6];
                    check[row][(Source - 1) % 6] = check[row][(block - 1) % 6]
                    check[row][(block - 1) % 6] = tp;
                    let sr = document.getElementById(source).getAttribute("src");
                    e.preventDefault();
                    temp = e.target.getAttribute("src");
                    let x = parseInt(e.target.id) - 1;
                    check[Math.floor(x / 6)][x % 6] = candies.indexOf(sr);
                    e.target.setAttribute("src", sr);
                }
                else {
                    tp = check[row][(Source - 1) % 6];
                    check[row][(Source - 1) % 6] = check[row][(block - 1) % 6]
                    check[row][(block - 1) % 6] = tp;
                }
            }
            else if (Math.abs(Source - block) === 6) {  //this will check whether you are swapping in column or not
                let coll = Math.floor((Source - 1) % 6)
                let row1 = Math.floor((Source - 1) / 6);
                let row2 = Math.floor((block - 1) / 6);
                let tp = check[row1][coll];
                check[row1][coll] = check[row2][coll];
                check[row2][coll] = tp;
                console.log(check);
                if (row_check(row1) || row_check(row2)) {
                    tp = check[row1][coll];
                    check[row1][coll] = check[row2][coll];
                    check[row2][coll] = tp;
                    let sr = document.getElementById(source).getAttribute("src");
                    e.preventDefault();
                    temp = e.target.getAttribute("src");
                    let x = parseInt(e.target.id) - 1;
                    check[Math.floor(x / 6)][x % 6] = candies.indexOf(sr);
                    e.target.setAttribute("src", sr);

                }
                else if (col_check(coll)) {
                    tp = check[row1][coll];
                    check[row1][coll] = check[row2][coll];
                    check[row2][coll] = tp;
                    let sr = document.getElementById(source).getAttribute("src");
                    e.preventDefault();
                    temp = e.target.getAttribute("src");
                    let x = parseInt(e.target.id) - 1;
                    check[Math.floor(x / 6)][x % 6] = candies.indexOf(sr);
                    e.target.setAttribute("src", sr);

                }
                else {
                    tp = check[row1][coll];
                    check[row1][coll] = check[row2][coll];
                    check[row2][coll] = tp;
                }
            }

        }
    })
}





