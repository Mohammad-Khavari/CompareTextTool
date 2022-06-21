const input = document.querySelector('input');
const textarea = document.querySelector('.leftText');
const textarea2 = document.querySelector('.rightText');

input.addEventListener('change',()=>{
    const files = input.files;
    
    if(files.length === 0) return;
    const file = files[0];
    console.log("Value in reader", file)
    
    const reader = new FileReader();
    
    reader.onload = (e)=>{
        const file = e.target.result;
        const lines = file.split(/\r\n|\n/);
        textarea.value = lines.join('\n');
        //textarea.textContent = lines.join('\n\n');
        console.log(lines[2])
        
    }
    reader.onerror = (e)=> alert(e.target.error.name);

    reader.readAsText(file,"ISO-8859-15");

    console.log( file)
    
})

input.addEventListener('change',()=>{
    const lines = input.files;

    if (lines.length === 0) return;
    file = lines[0];
    const readerByLine = new FileReader();

    readerByLine.onload = (e)=>{
         const fileContentArray = e.target.result.split(/\r\n|\n/);
          for (var line = 0; line < fileContentArray.length -1; line++) {
             //console.log(line + "-->" + fileContentArray[line]);
             textarea2.value = fileContentArray.join("\r\n");
            }
        }
        readerByLine.readAsText(file, "ISO-8859-15")
    
})