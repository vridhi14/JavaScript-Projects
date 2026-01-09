const counter = document.getElementById("counter")
const incrementBtn = document.getElementById("incrementBtn")
const decrementBtn = document.getElementById("decrementBtn")
const resetBtn = document.getElementById("resetBtn")

let count = 0 ; 


function updateCounter(){
    counter.textContent = count ; 
    if (count < 0) {
    counter.style.color = "red";
    } else if (count > 0) {
    counter.style.color = "green"; 
    } else if ( count === 0 ){
    counter.style.color = "black"; 
  }
}

incrementBtn.addEventListener("click" , 
    ()=>{ count++ ;
          updateCounter () ;
    })

decrementBtn.addEventListener("click" , 
    ()=>{ count-- ;
          updateCounter () ;
    })

resetBtn.addEventListener("click" , 
    ()=>{ count = 0 ;
          updateCounter () ;
    })
