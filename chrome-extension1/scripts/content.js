document.addEventListener("mouseover", function(event) {
    if (event.target.classList.contains("sumSRF")) {

        console.log("Hovered over sumSRF element");

        const nearestLink = event.target.closest(".collection-ng__teaser-item").querySelector("a[href]");
        if (nearestLink) {
            console.log(nearestLink.href);
            hidePopupInstant();
            showPopup(event.target.classList.contains("sumSRF"),nearestLink.href);
        }
    }
});

document.addEventListener("mouseout", function(event) {
    if (event.target.classList.contains("sumSRF")) {
        console.log("Mouse out");
        hidePopup();
    }
});



//Get every teaser
const teaser = document.getElementsByClassName("collection-ng__teaser-item");

//Add Span to every teaser
for (let i = 0; i < teaser.length; i++) {
    const metaElement = teaser[i].querySelector(".teaser-meta__ltr");
    if (metaElement) {
        //Create Span 
        const sumButton = document.createElement("span");
        sumButton.classList.add("teaser-info");
        sumButton.classList.add("sumSRF");
        sumButton.textContent = "sumSRF";

        metaElement.insertAdjacentElement("beforeend", sumButton);  
    }
}


function showPopup(isSumSRF, linkHref) {
    if (isSumSRF) {
        const popup = document.createElement("div");
        popup.id = "hover-popup"
        popup.textContent = linkHref;
        popup.style.position = "absolute";
        popup.style.backgroundColor = "white";
        popup.style.border = "1px solid black";
        popup.style.padding = "5px";
        popup.style.zIndex = "1000";

        document.body.appendChild(popup);

        document.addEventListener("mousemove", function movePopup(event) {
            popup.style.left = event.pageX + "px";
            popup.style.top = event.pageY + "px";
        });

        //Send




    }
}


function hidePopup() {
    let popup = document.getElementById('hover-popup');
    if (popup) {
        setTimeout(() => {
            popup.remove();
        }, 3000);
      }
}

function hidePopupInstant() {
    let popup = document.getElementById('hover-popup');
    if (popup) {
            popup.remove();
      }
}