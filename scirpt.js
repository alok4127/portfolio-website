const btn = document.getElementById("scrollTopBtn");

window.onscroll = function () {

    if (
        document.body.scrollTop > 300 ||
        document.documentElement.scrollTop > 300
    ) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

btn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});