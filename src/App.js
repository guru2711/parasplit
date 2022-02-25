import { useState } from "react";
import * as rangy from "rangy";
import "./App.css";

function App() {
  const [key, SetKey] = useState(2);

  function getFirstRange() {
    var sel = rangy.getSelection();
    return sel.rangeCount ? sel.getRangeAt(0) : null;
  }

  function keys() {
    let currentCount;
    let AllElements = [];
    ///Sorting ids
    AllElements = document.querySelectorAll("*[id]");
    console.log(AllElements);
    currentCount = 0;
    for (let i = 0; i < AllElements.length; i++) {
      var x = AllElements[i].id.split("");
      if (x[0] === "k" && x[1] === "e" && x[2] === "y") {
        currentCount++;
        AllElements[i].id = "key" + currentCount;
      }
    }
  }



  function setCaret(element) {
    var el = element;
    var range = document.createRange()
    var sel = window.getSelection()
    
    range.setStart(el.childNodes[0], 0)
    range.collapse(true)
    
    sel.removeAllRanges()
    sel.addRange(range)
}



const ElementCheckAfter=(ID)=>{
  let Newelement=true
  let id=ID.split("");
  let currentid=id[id.length-1]
  currentid=parseInt(currentid)
  ++currentid
  let i=0;
  let continous=0
   while(i<2){
     let temp=document.getElementById(`key${currentid}`);
     console.log(temp);
     if(temp !== null){
       let content=temp.textContent
       if(temp.textContent!==""){
          //found div with some content
          console.log("emty");
          break;
       }else{
         //found it's empty div
       
        continous++
        currentid++
       }
      
     }else{
       //div not exist
       break;
     }
   
     i++
   }

   if(continous==2){
    Newelement=false
   }

   return Newelement;
}




const ElementCheckBefore=(ID)=>{
  let Newelement=true
  let id=ID.split("");
  let currentid=id[id.length-1]
  currentid=parseInt(currentid)
  --currentid
  let i=0;
  let continous=0
   while(i<2){
     let temp=document.getElementById(`key${currentid}`);
     console.log(temp);
     if(temp !== null){
       let content=temp.textContent
       if(temp.textContent!==""){
          //found div with some content
          console.log("emty");
          break;
       }else{
         //found it's empty div
       
        continous++
        currentid--
       }
      
     }else{
       //div not exist
       break;
     }
   
     i++
   }

   if(continous==2){
    Newelement=false
   }

   

   return Newelement;
}



  const Enter = (event) => {
    event.preventDefault() 
    let range = getFirstRange();
    let currentdivID = range.commonAncestorContainer.parentNode.id;
    let currentdivClass = range.commonAncestorContainer.parentNode.className;
    console.log(currentdivID, currentdivClass);
    
    let pointer = range.startOffset;
    let currentElement = document.getElementById(currentdivID);
    let ElementLength = currentElement.textContent;
    console.log(ElementLength);
    console.log(ElementLength.length);

    

    if (
      currentdivClass === "para" &&
      pointer === ElementLength.length &&
      pointer !== 0
    ) {
       //To create div after the div
      console.log("Condition 1 runned*******************");

      let ok= ElementCheckAfter(currentdivID);

      if(ok){
        let parentElement = document.getElementById(currentdivID);
      let Newdiv = document.createElement("div");
      Newdiv.className = "para";
      Newdiv.id = `key${key}`;
      // Newdiv.innerHTML = `Enterkeyword`;
      Newdiv.contentEditable = "true";
      let newkey = key + 1;
      SetKey(newkey);
      parentElement.insertAdjacentHTML("afterend", Newdiv.outerHTML);
      keys();
      }else{
        alert("You can only create 2 empty div")
      }
    } else if (
      currentdivClass === "para" &&
      pointer !== ElementLength.length &&
      pointer === 0
    ) {
      console.log("Condition 2 runned*******************");
      //To create div before the div


      let ok=ElementCheckBefore(currentdivID)
      if(ok){
        let parentElement = document.getElementById(currentdivID);
      let Newdiv = document.createElement("div");
      Newdiv.className = "para";
      Newdiv.id = `key${key}`;
      // Newdiv.innerHTML = `Enterkeyword`;
      Newdiv.contentEditable = "true";
      let newkey = key + 1;
      SetKey(newkey);
      parentElement.insertAdjacentHTML("beforebegin", Newdiv.outerHTML);

      keys();
      }else{
        alert("You can only create 2 empty div")
      }
    } else if (
      currentdivClass === "para" &&
      pointer !== ElementLength.length
      &&
      pointer !== 0
    ) {

      console.log("Condition 3 runned*******************");
      console.log(ElementLength.length + " "+ pointer);
      //To separate div and create new div

      let parentElement = document.getElementById(currentdivID);
      let content=parentElement.textContent
      let contentArray=content.split("");
      let check=true;
      console.log(contentArray);
   

      let firstHalf = contentArray.slice(0, pointer);
      let secondHalf=contentArray.slice(pointer,contentArray.length);

      parentElement.innerText=firstHalf.join("");
      
      if(secondHalf==" "){
        check=false;
      }
     

      let Newdiv = document.createElement("div");
      Newdiv.className = "para";
      Newdiv.id = `key${key}`;
      if(check){
        Newdiv.innerText = secondHalf.join("");
      }
      Newdiv.contentEditable = "true";
      Newdiv.style="user-select: auto;"
      let newkey = key + 1;
      SetKey(newkey);
      parentElement.insertAdjacentHTML("afterend", Newdiv.outerHTML);

      // move nextline
      Newdiv=document.getElementById(`key${key}`);
     
      setCaret(Newdiv)

      keys();
    }
  };

  


  return (
    <>
      <section>
        <div
          style={{
            textAlignVertical: "center",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Rangy practice
        </div>
        <div
          className="keywordgroup"
          id="edit"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              Enter(event);
            }
          }}
        >
          <div className="para" contenteditable="true" id="key1">
            Most of us think of people with a legacy as screen stars who had
            exemplary television and or film careers, musicians whose
            compositions touched the souls of billions of people, business
            executives who rose to the top of their prospective industries, and
            inventors and entrepreneurs who forever changed the face of our
            everyday lives.Yes,those people have created legacies on a
            national and, perhaps, global scale
          </div>
        </div>
      </section>
    </>
  );
}

export default App;

