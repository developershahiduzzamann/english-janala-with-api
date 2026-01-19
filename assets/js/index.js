document.getElementById("banner-container").style.display = "block";
document.getElementById("display-header").style.display = "none";
document.getElementById("vocabularies").style.display = "none";
document.getElementById("frequently").style.display = "none";

document.getElementById("btn-get-start").addEventListener("click", function (event) {
    event.preventDefault();

    const inputName = document.getElementById("input-name").value;
    const inputPassword = document.getElementById("input-password").value;
    const pin = parseInt(inputPassword);

    if (inputName) {
        if (pin === 123456) {
            document.getElementById("banner-container").style.display = "none";
            document.getElementById("display-header").style.display = "block";
            document.getElementById("vocabularies").style.display = "block";
            document.getElementById("frequently").style.display = "block";
        } else {
            alert("Pin Not Vali");
        }
    } else {
        alert("Input Your Name");
    }
});

document.getElementById("log-Out").addEventListener("click", function () {
    document.getElementById("vocabularies").style.display = "none";
    document.getElementById("frequently").style.display = "none";
    document.getElementById("display-header").style.display = "none";
});

document.getElementById("btn-faq").addEventListener("click", function () {
    document.getElementById("frequently").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("btn-learn").addEventListener("click", function () {
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
        document.getElementById("frequently").scrollIntoView({ behavior: "smooth" });
    });
});

document.querySelectorAll("#btn-learn").forEach(btn => {
    btn.addEventListener("click", () => {
        removeActive();
        btn.classList.add("active");
        document.getElementById("vocabularies").scrollIntoView({ behavior: "smooth" });
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

const removeActiveClass = () => {
    const activeButtos = document.getElementsByClassName("active");
    for (let btns of activeButtos) {
        btns.classList.remove("active");
    }
};

// ================= LOAD BUTTON DATA =================
const loadAllbuttonData = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(data => displayallButtonData(data.data));
};

// ================= LOAD CARD =================
const loadAllCard = (id) => {
    showLoader()
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            document.getElementById(`btn-${id}`).classList.add("active");
            document.getElementById("card-container").innerHTML = "";
            displayAllcard(data.data);
        });
};

// ================= BUTTON DISPLAY =================
const displayallButtonData = (btns) => {
    const buttonDisplay = document.getElementById("button-display");
    buttonDisplay.innerHTML = "";

    btns.forEach(btn => {
        const div = document.createElement("div");
        div.innerHTML = `
            <button id="btn-${btn.level_no}"
                onclick="loadAllCard(${btn.level_no})"
                class="btn text-[#422AD5] w-[121px] md:w-[225px] h-[40px]
                border border-[#422AD5] rounded-md hover:bg-[#422AD5] hover:text-white">
                <i class="fa-solid fa-book-open mr-2"></i>
                ${btn.lessonName}
            </button>
        `;
        buttonDisplay.appendChild(div);
    });
};

// ================= CARD DISPLAY =================
const displayAllcard = (cards) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    if (cards.length === 0) {
        cardContainer.innerHTML = `
            <div class="col-span-full text-center">
                <span class="text-[100px]"><i class="fa-solid fa-triangle-exclamation text-[#a4abb7]"></i></span>
                <h3 class="hind text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary নেই</h3>
                <h1 class="hind text-[34px]">নেক্সট Lesson এ যান</h1>
            </div>
            
        `
        hideLoader()
        return;
    }

    cards.forEach(card => {
        const div = document.createElement("div");
        div.innerHTML = `
            <div class="card bg-base-100 shadow-sm h-[550px]">
                <div class="card-body">
                    <h1 class="text-center text-4xl font-bold">${card.word}</h1>
                    <h2 class="text-center text-xl mt-2">Meaning / Pronunciation</h2>
                    <h1 class="text-center text-[32px] text-[#464649]">
                        "${card.meaning ? card.meaning : "অর্থ পাওয়া যায়নি"} / ${card.pronunciation}"
                        
                    </h1>

                    <div class="flex justify-between mt-56">
                        <button onclick="informationButton(${card.id})"
                            class="btn w-[56px] h-[56px] bg-[#E9F4FF] hover:bg-[#422AD5] hover:text-white">
                            <i class="fa-solid fa-circle-info"></i>
                        </button>
                        <button class="btn w-[56px] h-[56px] bg-[#E9F4FF] hover:bg-[#422AD5] hover:text-white">
                            <i class="fa-solid fa-volume-low"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        cardContainer.appendChild(div);
    });
    hideLoader()
};

// ================= INFO MODAL =================
const informationButton = (infoId) => {
    fetch(`https://openapi.programming-hero.com/api/word/${infoId}`)
        .then(res => res.json())
        .then(data => inforButton(data.data));
};

const inforButton = (info) => {
    document.getElementById("info_modal").showModal();
    document.getElementById("info-container").innerHTML = `
        <h1 class="text-[24px] font-semibold">
            ${info.word} ( <i class="fa-solid fa-microphone-lines"></i> : ${info.pronunciation})
        </h1>
        <h2 class="mt-3 font-semibold">Meaning</h2>
        <p>${info.meaning}</p>

        <h2 class="mt-3 font-semibold">Example</h2>
        <p>${info.sentence}</p>

        <h2 class="mt-3 font-semibold">সমার্থক শব্দ</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 card-actions mt-3">
            ${info.synonyms
                .filter(word => word)
                .slice(0, 3)            
                .map(word => `
            <div class="w-[110px] h-[40px] rounded-md bg-[#EDF7FF] flex justify-center items-center">
                <h2 class="poppins text-20px capitalize">${word}</h2>
            </div>
            `).join("")}
        </div>

    `;
};

// ================= Loader =================
const showLoader = () => {
    // loader দেখাও
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("card-container").classList.add("hidden");

    // 3 সেকেন্ড পরে loader লুকাও
    setTimeout(() => {
        document.getElementById("loader").classList.add("hidden");
        document.getElementById("card-container").classList.remove("hidden");
    }, 1100); // 3000ms = 3 seconds
};
// ================= INIT =================
loadAllbuttonData();
