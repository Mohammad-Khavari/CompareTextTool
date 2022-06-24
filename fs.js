
const inputL = document.querySelector('#filePickerL');
const inputR  = document.querySelector("#filePickerR")
const textareaL = document.querySelector('.leftText');
const textareaR = document.querySelector('.rightText');
const compare = document.getElementById("compare");


//==========================================================================================
//   LEFT TEXT
//==========================================================================================
inputL.addEventListener('change',()=>{
    const files = inputL.files;
    
    if(files.length === 0) return;
    const file = files[0];
    
    const reader = new FileReader();
    
    reader.onload = (e)=>{
        const file = e.target.result;
        const lines = file.split(/\r\n|\n/);
        
        lines.forEach(element => {
            const p = document.createElement("p")
            p.setAttribute("class","Ltext");
            p.textContent = element;

            textareaL.append(p)
            
        });
       
    }
    reader.onerror = (e)=> alert(e.target.error.name);

    reader.readAsText(file,"ISO-8859-15");

})

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
    let length;
    const Ltext = document.querySelectorAll(".Ltext").length;
    const Rtext = document.querySelectorAll(".Rtext").length;
    if (Ltext < Rtext){
        length = Rtext -2;
    }else{
        length = Ltext -2;
    }
    console.log("length: ", length,"/\n/","Ltext: ",Ltext,"/\n/","Rtext: ",Rtext)
    let leftId = 0;
    let rightId = 0;

    
    for (let i = 0 ; i < length ; i++){
        
        let fileL  = document.querySelector(".leftText").childNodes[leftId]?.textContent;
        let fileR = document.querySelector(".rightText").childNodes[rightId]?.textContent;

        if (fileR === undefined){
            fileR = 'DELETED';

            showDifference(fileL,fileR,leftId,rightId);
        
        
            const rightLines = document.querySelectorAll(".rightLine");
            const leftLines = document.querySelectorAll(".leftLine");
            
            let L = leftLines[i].textContent;
            let R = rightLines[i].textContent;
    
            let result = L.localeCompare(R);

            let resultL = R.localeCompare(L);
            
            if (result === 1 || result === -1){
                rightLines[i].classList.add("double");
                
            }
            if (resultL === 1 || resultL === -1){
                leftLines[i].classList.add("original")
            }

            //*****************************************************/
            //  THIS METHOD IS ALTERNATIVE TO localeCompare()     //
            //*****************************************************/
            
            // const rightLines = document.querySelectorAll(".rightLine");
            // const leftLines = document.querySelectorAll(".leftLine");
            // rightLines.forEach((elm,index)=>{
            //     if (elm.textContent !== leftLines[index].textContent){
            //         elm.classList.add("double")
            //     }
            // })
            
        }
        else if (fileL === undefined){
            fileL = 'DELETED';

            showDifference(fileL,fileR,leftId,rightId);
        
        
            const rightLines = document.querySelectorAll(".rightLine");
            const leftLines = document.querySelectorAll(".leftLine");
            
            let L = leftLines[i].textContent;
            let R = rightLines[i].textContent;
    
            let resultR = L.localeCompare(R)
            let resultL = R.localeCompare(L);
            console.log(resultL, L)
            if (resultR === 1 || resultR === -1){
                rightLines[i].classList.add("double");
                
            };
            if (resultL === 1 || resultL === -1){
                leftLines[i].classList.add("lFile")
            }
        }
        else{
            showDifference(fileL,fileR,leftId,rightId);
        
        
            const rightLines = document.querySelectorAll(".rightLine");
            const leftLines = document.querySelectorAll(".leftLine");
            
            let L = leftLines[i].textContent;
            let R = rightLines[i].textContent;
    
            let resultR = L.localeCompare(R);
            
            if (resultR === 1 || resultR === -1){
                rightLines[i].classList.add("double");
                
            }
        }
       
        
        leftId++
        rightId++

       
    }
    

})

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
