
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
    document.getElementById("display-header").style.display ="none"
    document.getElementById("vocabularies").style.display ="none"
    document.getElementById("frequently").style.display ="none"
})
document.getElementById("btn-faq").addEventListener("click", function() {
    document.getElementById("frequently").scrollIntoView({ behavior: "smooth" });
});
document.getElementById("btn-learn").addEventListener("click", function() {
    document.getElementById("vocabularies").scrollIntoView({ behavior: "smooth" });
});