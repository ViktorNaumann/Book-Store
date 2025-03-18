

function renderBooks() {
    for (let i = 0; i < books.length; i++) {
        let element = document.getElementById('content');
        element.innerHTML += templateHtmlRender(i);
    
        for (let y = 0; y < books[i].comments.length; y++) {
            let commentSection = document.getElementById(`comments${i}`);
            commentSection.innerHTML += templateHtmlCommentRender(i, y);
        }
    }
}

function addComment(i) {
    let inputField = document.getElementById(`comment_input${i}`);
    let commentText = inputField.value;

    if (commentText === "") return;

    books[i].comments.push({
        name: 'Viktor',
        comment: commentText
    });

    let commentSection = document.getElementById(`comments${i}`);

    commentSection.innerHTML = templateHtmlCommentRender(i, books[i].comments.length - 1) + commentSection.innerHTML;

    inputField.value = "";
}

function likeUnlike(i) {
    let likedBook = books[i].liked;
    let likeButton = document.getElementById(`likeButton${i}`);

    if (likedBook) {
        books[i].liked = false;
        books[i].likes += -1;
        likeButton.src = "./img/heart-off.png";
    } else {
        books[i].liked = true;
        books[i].likes += 1;
        likeButton.src = "./img/heart-on.png";
    }

    document.getElementById(`totalLikes${i}`).innerText = books[i].likes;
}




function templateHtmlRender(i) {
    return`
    <div class="book_list">
        <div>
        <h2 class="title_of_book">${books[i].name}</h2>
        </div>

        <div class="book_logo">
            <img src="./img/book.png" alt="">
        </div>

        <div class="price_likes"> 
            <div><h3 class="book_price">${books[i].price.toFixed(2)} €</h3></div>
            <div class="like_div">
                <p>
                    <img id="likeButton${i}" class="like_heart"
                    src="${books[i].liked ? './img/heart-on.png' : './img/heart-off.png'}"
                    alt="like-button" 
                    onclick="likeUnlike(${i})">
                    <span id="totalLikes${i}">${books[i].likes}</span>
                </p></div>
        </div>

        <div class="table">
            <table>
                <tr>
                    <td>Author</td>
                    <td>:${books[i].author}</td>
                </tr>
                <tr>
                    <td>Erscheinungsjahr</td>
                    <td>:${books[i].publishedYear}</td>
                </tr>
                <tr>
                    <td>Genre</td>
                    <td>:${books[i].genre}</td>
                </tr>
            </table>    
        </div>  
        
        <div class="commentary_header">
            <h3>Kommentare:</h3>
        </div>

        <div>
            <div id="comments${i}">
            </div>
        </div>

        <div>
            <input id="comment_input${i}" placeholder="Schreibe dein Kommentar ..." type="text"><button onclick="addComment(${i})">Absenden</button>
        </div>

    </div>`
}

function templateHtmlCommentRender(i, y) {
    return`
        <table>
            <tr>
                <td>${books[i].comments[y].name}</td>
                <td>:${books[i].comments[y].comment}</td>
            </tr>

        </table>
    `;

}

