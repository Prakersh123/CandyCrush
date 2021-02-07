const candies=["blue-candy.png","red-candy.png","green-candy.png","yellow-candy.png","orange-candy.png","purple-candy.png"]
const obj=document.querySelectorAll(".dd");
let source;
let temp;
let desti;
function create_the_board()
{
    for(let candy of obj)
    {
        let i=Math.floor((Math.random()*10))%6;

        candy.setAttribute("src",candies[i]);

    }
}
create_the_board();
for(let candy of obj)
{
        candy.addEventListener('dragstart',(e)=>{
            console.log(e.target.id)
            source=e.target.id;
            temp=candy.getAttribute("src")
        })
      
}
for(let candy of obj)
{
    candy.addEventListener('dragend',(e)=>{
        if(e.target.id!=desti)
        e.target.setAttribute("src",temp);
    })
}
for(let candy of obj)
{
    candy.addEventListener('dragover',(e)=>{
        if(e.target.id!=source){
        e.preventDefault();
        desti=e.target.id;
        console.log("hello");}
    })
}
for(let candy of obj)
{
    candy.addEventListener('drop',(e)=>{
        if(e.target.id!=source)
        {
            let sr=document.getElementById(source).getAttribute("src");
            e.preventDefault();
            temp=e.target.getAttribute("src");
            e.target.setAttribute("src",sr);
        }
    })
}
// const obj1=document.getElementById("one");
// const obj2=document.getElementById("two");

// obj1.addEventListener('dragstart', (e)=>{
//     console.log("drag started");
// });
// obj1.addEventListener('dragend', (e)=>{
//     e.target.setAttribute("src","red-candy.png")
//     console.log("drag ended");
// });
// obj2.addEventListener('dragover',(e)=>{
//     e.preventDefault();
//     console.log("drag over")
// })
// obj2.addEventListener('drop',(e)=>{
//     e.preventDefault();
//    e.target.setAttribute("src","blue-candy.png")
// })
