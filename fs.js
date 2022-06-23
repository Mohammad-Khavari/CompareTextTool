
const inputL = document.querySelector('#filePickerL');
const inputR  = document.querySelector("#filePickerR")
const textareaL = document.querySelector('.leftText');
const textareaR = document.querySelector('.rightText');
const compare = document.getElementById("compare");



inputL.addEventListener('change',()=>{
    const files = inputL.files;
    
    if(files.length === 0) return;
    const file = files[0];
    //console.log("Value in reader", file)
    
    const reader = new FileReader();
    
    reader.onload = (e)=>{
        const file = e.target.result;
        const lines = file.split(/\r\n|\n/);
        //console.log(lines)
        const htmlData = ``
        
        lines.forEach(element => {
            const p = document.createElement("p")
            p.setAttribute("class","Ltext");
            p.textContent = element;

            textareaL.append(p)
            //textareaL.textContent = element
            
        });
       
    }
    reader.onerror = (e)=> alert(e.target.error.name);

    reader.readAsText(file,"ISO-8859-15");

    //console.log( reader)
    
})

// inputL.addEventListener('change',()=>{
//     const lines = inputL.files;

//     if (lines.length === 0) return;
//     file = lines[0];
//     const readerByLine = new FileReader();

//     readerByLine.onload = (e)=>{
//          const fileContentArray = e.target.result.split(/\r\n|\n/);
//           for (var line = 0; line < fileContentArray.length -1; line++) {
//              //console.log(line + "-->" + fileContentArray[line]);
//              //textarea2.value = fileContentArray.join("\r\n");
//             }
//         }
//         readerByLine.readAsText(file, "ISO-8859-15")
    
// });
// const textArea = document.getElementById("textareaDifferences");
// const pos = "beforeend";
// const tableDiff = `  <table class="diff">
// <thead>
//     <tr>
//         <th></th>
//         <th class="texttitle">First File</th>
//         <th></th>
//         <th class="texttitle">Second File</th>
//     </tr> 
// </thead>

// <tbody id="diffData"></tbody>

// </table>`;
// tableDiff.insertAdjacentHTML(pos, tableDiff)

// function loadDiffData(diffs){
// const tbody = document.getElementById("diffData");
// let dataTable = '';

// for (let diff of diffs){
//    dataTable += ` <tr>
//    <th>1</th>
//    <td class="equal">My Table</td>
//    <th>1</th>
//    <td class="equal">My Table</td>
// </tr>
// <tr>
//    <th>2</th>
//    <td class="replace">My Table</td>
//    <th>2</th>
//    <td class="replace">My Table</td>
// </tr>`;
// }
// tbody.innerHTML = dataTable;
// }
const diff = document.getElementById("textareaDifferences");
const pos = "beforeend";
    
const table = `  <table class="diff">
<thead>
<tr>
<th></th>
<th class="texttitle">First File</th>
<th></th>
<th class="texttitle">Second File</th>
</tr> 
</thead>
<tbody id="tb"></tbody>

</table>`
diff.insertAdjacentHTML(pos, table);

function showDifference(L,R,LN,RN){
   
    const tb = document.querySelector("#tb")
    const po = "beforeend";
    const td = ` 
                <tr>
                    <th>${LN +1}</th>
                    <td class="leftLine">${L}</td>
                    <th>${RN +1}</th>
                    <td class="rightLine">${R}</td>
                </tr>
                `;
        
        tb.insertAdjacentHTML(po,td);

}

compare.addEventListener("pointerdown",()=>{
    const length = document.querySelectorAll(".Ltext").length;
    let leftId = 0;
    let rightId = 0;

    const color ="";
    let span = null;
    const spanArr = [];
       

    for (let i = 0 ; i < length ; i++){
        const fileL  = document.querySelector(".leftText").childNodes[leftId].textContent;
        const fileR = document.querySelector(".rightText").childNodes[rightId].textContent;
        const left = document.querySelectorAll("td.leftLine");
        const right = document.querySelectorAll("td.rightLine");

        const diff = Diff.diffChars(fileL,fileR),
        display = document.querySelector("#tb");
        const fragment = new DocumentFragment();
        //fragment = document.createDocumentFragment();
        const d = `<td class="rightLine" >${fragment}</td>`;
        
        left.forEach((elm,index)=>{
            if (elm.textContent !== right[index].textContent){
               
                //right[index].classList.add("double")
            }
            
        })
        //showDifference(fileL,fileR,leftId,rightId);
        

        
        const po = "beforeend";
        const td = ` 
            <tr>
                <th>${leftId +1}</th>
                <td class="leftLine" style ="color:${color}">${fileL}</td>
                <th>${rightId +1}</th>
                <td class="rightLine" ></td>
            </tr>
            `;
        
        display.insertAdjacentHTML(po,td);
        

        diff.forEach((part,index) =>{
            const color = part.added ? 'green' : part.removed ? 'red' : 'grey';
            span = document.createElement('span');
            span.appendChild(document.createTextNode(part.value));
            span.style.color = color;
            fragment.appendChild(span)
            console.log(part)
            spanArr.push(fragment)
        });
       
        
        leftId++
        rightId++
    }
    const tdElms = document.querySelectorAll(".rightLine");
    for (let i =0; i <tdElms.length; i++){
        
        tdElms[i].appendChild(spanArr[i])
    }
    
    

})



// compare.addEventListener("pointerdown",()=>{
//     const length = document.querySelectorAll(".Ltext").length;
//     let leftId = 0;
//     let rightId = 0;

    
//     for (let i = 0 ; i < length ; i++){
//         const p = document.createElement("p");
//         const fileL  = document.querySelector(".leftText").childNodes[leftId].textContent;
//         const fileL2  = document.querySelector(".leftText").childNodes[leftId]

//         const fileR = document.querySelector(".rightText").childNodes[rightId].textContent;
//         const left = document.querySelectorAll("td.leftLine");
//         const right = document.querySelectorAll("td.rightLine");
       
//         left.forEach((elm,index)=>{
//             if (elm.textContent !== right[index].textContent){
               
//                 right[index].classList.add("double")
//             }
//         })
        
//         //console.log("fileL: ",fileL.textContent);
//         //console.log("fileR: ",fileR.innerText);
        
//         let result = fileL.localeCompare(fileR)
//         if (result === 1 || result === -1){
//             // const fileR2 = document.querySelectorAll(".equal");
//             // fileR2.forEach(replace => {
//             //     replace.classList.remove("equal");

//             //     replace.classList.add("double")
//             // });
            
//         }
        
//         showDifference(fileL,fileR,leftId,rightId);
        
        
//         leftId++
//         rightId++
//     }
    

// })
//==========================================================================================
//   RIGHT TEXT
//==========================================================================================

inputR.addEventListener('change',()=>{
    const files = inputR.files;
    
    if(files.length === 0) return;
    const file = files[0];
    
    const reader = new FileReader();
    
    reader.onload = (e)=>{
        const file = e.target.result;
        const lines = file.split(/\r\n|\n/);
        
        textareaR.value = lines
        lines.forEach(element => {
            const p = document.createElement("p");
            p.setAttribute("class","Rtext");
            //console.log(element)
            p.textContent = element;

            textareaR.append(p)
        });
        
    }
    reader.onerror = (e)=> alert(e.target.error.name);

    reader.readAsText(file,"ISO-8859-15");

    
    
})

// inputR.addEventListener('change',()=>{
//     const lines = inputR.files;

//     if (lines.length === 0) return;
//     file = lines[0];
//     const readerByLine = new FileReader();

//     readerByLine.onload = (e)=>{
//          const fileContentArray = e.target.result.split(/\r\n|\n/);
//           for (var line = 0; line < fileContentArray.length -1; line++) {
//              //console.log(line + "-->" + fileContentArray[line]);
//              //textarea2.value = fileContentArray.join("\r\n");
//             }
//         }
//         readerByLine.readAsText(file, "ISO-8859-15")
    
// })

// const fileL  = inputL.files;
// const fileR = inputR.files;
// const textL = fileL[0];
// const textReaderLeft = new FileReader();
// textReaderLeft.onload = (e)=>{
//     const textL = e.target.result;
//     const Lines = textL.split(/\r\n|\n/);

//     Lines.forEach(e =>{
//         const p = document.createElement("p");
        
//         p.textContent = e
//         textareaR.append(p)
//         //p.classList.add("Ltext")
//     })
// }
// textReaderLeft.readAsText(textL, "ISO-8859-15")
// //console.log("Left: ",fileL.length,"\n","Right: ",fileR.length)     