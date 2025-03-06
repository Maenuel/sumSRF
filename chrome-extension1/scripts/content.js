document.addEventListener("mouseover", function(event) {
    if (event.target.classList.contains("sumSRF")) {
        console.log("Hovered over sumSRF element");

        const nearestLink = event.target.closest(".collection-ng__teaser-item").querySelector("a[href]");
        if (nearestLink) {
            hidePopup();
            stopSpeech();
            showPopup(nearestLink.href);
        }
    }
});

document.addEventListener("mouseout", function(event) {
    if (event.target.classList.contains("sumSRF")) {
        console.log("Mouse out");
        hidePopup(3000);
        stopSpeech(3000);
    }
});

// Debounce function to limit the rate at which a function can fire.
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Add a single mousemove event listener to the document
document.addEventListener("mousemove", debounce(function(event) {
    const popup = document.getElementById('hover-popup');
    if (popup) {
        popup.style.left = event.pageX + "px";
        popup.style.top = event.pageY + "px";
    }
}, 5));

// Get every teaser
const teasers = document.getElementsByClassName("collection-ng__teaser-item");

// Add Span to every teaser
for (let i = 0; i < teasers.length; i++) {
    const metaElement = teasers[i].querySelector(".teaser-meta__ltr");
    if (metaElement) {
        // Create Span 
        const sumButton = document.createElement("span");
        sumButton.classList.add("teaser-info", "sumSRF");
        sumButton.textContent = "sumSRF";

        metaElement.insertAdjacentElement("beforeend", sumButton);  
    }
}

function showPopup(linkHref) {
    const popup = document.createElement("div");
    popup.id = "hover-popup";
    popup.textContent = "Wait! Don't Move 🤖";
    popup.style.position = "absolute";
    popup.style.backgroundColor = "white";
    popup.style.border = "1px solid black";
    popup.style.padding = "5px";
    popup.style.zIndex = "1000";
    popup.style.maxWidth = "300px";
    popup.style.wordBreak = "break-word";
    popup.style.overflow = "hidden";
    popup.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.1)";

    document.body.appendChild(popup);

    readArticle(linkHref).then(inhalt => {
        fetchOllama(inhalt, popup);
    });

}

function hidePopup(delay = 0) {
    const popup = document.getElementById('hover-popup');
    if (popup) {
        setTimeout(() => {
            popup.remove();
        }, delay);
    }
}
function stopSpeech(delay = 0) {
    setTimeout(() => {
        window.speechSynthesis.cancel();
    }, delay);
}

function readArticle(articleLink){
    console.log(articleLink);
    return fetch(articleLink)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const elements = [
                ...doc.querySelectorAll('.article-title__text'),
                ...doc.querySelectorAll('.article-lead'),
                ...doc.querySelectorAll('.article-paragraph'),
                ...doc.querySelectorAll('.article-heading')
            ];

            elements.sort((a, b) => {
                if (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) {
                    return -1;
                } else {
                    return 1;
                }
            });

            const articleContent = elements.map(element => element.textContent).join(' ');
            console.log(articleContent);
            return articleContent;
        })
        .catch(error => console.error('Error fetching the article:', error));
}

function fetchOllama(text, popup) {
    const urlPost = `http://localhost:3000/sum`;

    const encodedText = JSON.stringify({ articleText: text });

    fetch(urlPost, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: encodedText,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        popup.textContent = data.message;

        const utterance = new SpeechSynthesisUtterance(data.message);
        utterance.lang = 'de-DE'; // Set the language to German
        window.speechSynthesis.speak(utterance);

    })
    .catch((error) => {
        console.error('Error:', error);
        popup.textContent = "Epic Fail :(";
    });
}