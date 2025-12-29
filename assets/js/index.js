document.getElementById("display-header").style.display ="none"
document.getElementById("vocabularies").style.display ="none"
document.getElementById("frequently").style.display ="none"
document.getElementById("btn-get-start").addEventListener("click",function (event){
    event.preventDefault();
    const inputName = document.getElementById("input-name").value
    const inputPassword = document.getElementById("input-password").value
    const pin = parseInt(inputPassword)

    if(inputName){
        if(pin === 123456){
            document.getElementById("display-header").style.display ="block"
            document.getElementById("vocabularies").style.display ="block"
            document.getElementById("frequently").style.display ="block"
        }
        else{
            alert("Pin Not Vali")
        }
    }
    else{
        alert("Input Your Name")
    }
    
})

document.getElementById("log-Out").addEventListener("click",function(){
    document.getElementById("vocabularies").style.display ="none"
    document.getElementById("frequently").style.display ="none"
    document.getElementById("display-header").style.display ="none"
})
document.getElementById("btn-faq").addEventListener("click", function() {
    document.getElementById("frequently").scrollIntoView({ behavior: "smooth" });
});
document.getElementById("btn-learn").addEventListener("click", function() {
    document.getElementById("vocabularies").scrollIntoView({ behavior: "smooth" });
});

const loadAllbuttonData = ()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(respnse => respnse.json())
    .then(data =>{
        displayallButtonData(data.data)
    })
}

const loadAllCard = ()=>{
    fetch("https://openapi.programming-hero.com/api/level/5")
    .then(response => response.json())
    .then(data =>{
        displayAllcard(data.data)
    })
}

const displayallButtonData = (btns)=>{
    const buttonDisplay = document.getElementById("button-display");
    for(let btn of btns){
        console.log(btn)
        const newDiv = document.createElement("div");
        newDiv.innerHTML = `
            <button class="btn text-[#422AD5] w-[121px] md:w-[225px] h-[40px] border border-[#422AD5] rounded-md">
            <i class="fa-solid fa-book-open"></i>${btn.lessonName}</button>
        `
        buttonDisplay.appendChild(newDiv)
    }
}

const displayAllcard = (cards)=>{
    const cardContainer = document.getElementById("card-container");
    cards.forEach((card) => {
        console.log(card)
        const cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
            <div class="card md:w-96 bg-base-100 card-xl shadow-sm h-[400px]">
                <div class="card-body">
                    <h1 class="text-center inter text-4xl font-bold">${card.word}</h1>
                    <h2 class="text-center inter font-medium text-xl">Meaning /Pronounciation</h2>
                    <h1 class="text-center text-[32px] hind font-semibold text-[#464649]">"${card.meaning} ${card.pronunciation}"</h1>
                    <div class="flex justify-between mt-16">
                        <button class="w-[56px] h-[56px] bg-[#E9F4FF] rounded-lg flex items-center justify-center"> <i class="fa-solid fa-circle-info" style="color: #374957;"></i></button>
                        <button class="w-[56px] h-[56px] bg-[#E9F4FF] rounded-lg flex items-center justify-center"><i class="fa-solid fa-volume-low" style="color: #374957;"></i></button>
                    </div>
                </div>
            </div>
        `
        cardContainer.appendChild(cardDiv)
    });
}

 loadAllbuttonData()
loadAllCard()

