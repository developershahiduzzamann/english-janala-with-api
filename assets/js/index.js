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


function removeActive() {
    document.querySelectorAll("#btn-faq, #btn-learn").forEach(btn => {
        btn.classList.remove("active");
    });
}

document.querySelectorAll("#btn-faq").forEach(btn => {
    btn.addEventListener("click", () => {
        removeActive();
        btn.classList.add("active");

        document.getElementById("frequently")
            .scrollIntoView({ behavior: "smooth" });
    });
});

document.querySelectorAll("#btn-learn").forEach(btn => {
    btn.addEventListener("click", () => {
        removeActive();
        btn.classList.add("active");

        document.getElementById("vocabularies")
            .scrollIntoView({ behavior: "smooth" });
    });
});

document.getElementById("log-Out")?.addEventListener("click", () => {
    alert("Logged out successfully");
    location.reload();
});

document.getElementById("log-Out-mobile")?.addEventListener("click", () => {
    alert("Logged out successfully");
    location.reload();
});


const removeActiveClass =()=>{
    const activeButtos =document.getElementsByClassName("active")
    for(let btns of activeButtos){
        btns.classList.remove("active");
    }
}

const loadAllbuttonData = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(response => response.json())
        .then(data => {
            displayallButtonData(data.data);
        });
};

const informationButton =(infoId)=>{
    const url =`https://openapi.programming-hero.com/api/word/${infoId}`
    fetch(url)
    .then(res => res.json())
    .then(data =>{
        inforButton(data.data)
    })

}

const loadAllCard = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            removeActiveClass()
            const clickedButton = document.getElementById(`btn-${id}`);
            clickedButton.classList.add("active");
            const cardContainer = document.getElementById("card-container");
            cardContainer.innerHTML = "";
            displayAllcard(data.data);
        });
};

const displayallButtonData = (btns) => {
    const buttonDisplay = document.getElementById("button-display");
    buttonDisplay.innerHTML = "";

    for (let btn of btns) {
        console.log(btn);

        const newDiv = document.createElement("div");
        newDiv.innerHTML = `
            <button id="btn-${btn.level_no}"
                onclick="loadAllCard(${btn.level_no})"
                class="btn text-[#422AD5] w-[121px] md:w-[225px] h-[40px]
                       border border-[#422AD5] rounded-md hover:bg-[#422AD5] hover:text-white">
                <i class="fa-solid fa-book-open mr-2"></i>
                ${btn.lessonName}
            </button>
        `;
        buttonDisplay.appendChild(newDiv);
    }
};

const displayAllcard = (cards) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML =""
    if(cards.length == 0){
        cardContainer.innerHTML =`
            <div class="col-span-full flex flex-col text-center">
                <span class="text-[100px]"><i class="fa-solid fa-triangle-exclamation" style="color: #a4abb7;"></i></span>
                <h3 class="text-base hind text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h3>
                <h1 class="text-[34px] hind font-medium">নেক্সট Lesson এ যান</h1>
            </div>
        `
        return;
    }
    cards.forEach(card => {
        const cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
            <div class="card md:w-75 xl:w-96 bg-base-100 shadow-sm h-[400px]">
                <div class="card-body">
                    <h1 class="text-center text-4xl font-bold">${card.word}</h1>
                    <h2 class="text-center text-xl mt-2">
                        Meaning / Pronunciation
                    </h2>
                    <h1 class="text-center text-[32px] text-[#464649] mt-2">
                        "${card.meaning}/ ${card.pronunciation}"
                    </h1>

                    <div class="flex justify-between mt-16">
                        <button onclick=informationButton(${card.id}) class="btn w-[56px] h-[56px] bg-[#E9F4FF] rounded-lg flex items-center justify-center">
                            <i class="fa-solid fa-circle-info"></i>
                        </button>
                        <button class="w-[56px] h-[56px] bg-[#E9F4FF] rounded-lg flex items-center justify-center">
                            <i class="fa-solid fa-volume-low"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        cardContainer.appendChild(cardDiv);
    });
};
const inforButton = (info)=>{
    console.log(info)
    document.getElementById("info_modal").showModal()
    const infoContainer = document.getElementById("info-container");
    infoContainer.innerHTML =`
        <h1 class="card-title poppins font-semibold text-[24px]">${info.word} (<i class="fa-solid fa-microphone-lines"></i>: ${info.pronunciation})</h1>
        <h2 class="poppins font-semibold text-[24px] mt-3">Meaning</h2>
        <h2 class="hind font-medium text-[24px] mt-3">${info.meaning}</h2>
        <h2 class="poppins font-semibold text-[24px] mt-3">Example</h2>
        <p class="poppins text-[24px] mt-3">${info.sentence}</p>

        <h2 class="hind font-medium text-[24px] mt-3">সমার্থক শব্দ গুলো</h2>
        <div class=" card-actions mt-3">
            <div class="w-[160px] h-[50px] rounded-md bg-[#EDF7FF] flex justify-center items-center"><h2 class="poppins text-20px">Enthusiastic</h2></div>
            <div class="w-[113px] h-[50px] rounded-md bg-[#EDF7FF] flex justify-center items-center"><h2 class="poppins text-20px">excited</h2></div>
            <div class="w-[88px] h-[50px] rounded-md bg-[#EDF7FF] flex justify-center items-center"><h2 class="poppins text-20px">keen</h2></div>
        </div>                   
    `
}


loadAllbuttonData();