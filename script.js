window.onload = function() {

    var idx = 0;
    var slideId = 0;
    var slideName = null;
    var positions = [];

    const steps = 200;
    const delay = 3000;

    const ROWS = 10;
    const COLUMNS = 19;
    const PIECE_SIZE = 100;
    const SCREEN_WIDTH = window.innerWidth;
    const SCREEN_HEIGHT = window.innerHeight;
    const BORDER = 8;

    var slideNames = [];

    var accessKey, query;

    const count = 10;
    const width = 1900;
    const height = 1000;
    const quality = 'full';
    const fit = 'crop';

    const openParams = document.getElementById('openParams');
    openParams.addEventListener('click', function() {
        document.getElementById('apiParams').classList.remove('invisible');
    });

    const runButton = document.getElementById('run-query');
    runButton.addEventListener('click', function() {
        const apiKey = document.getElementById('api-key').value;
        const apiQuery = document.getElementById('api-query').value;
        accessKey = apiKey;
        query = apiQuery;
        const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}&query=${query}&w=${width}&h=${height}&quality=${quality}&fit=${fit}`;
        fetchImages(apiUrl).then(imageUrls => {
            idx = 0;
            slideId = 0;
            slideNames = [];
            for (var i = 0; i < imageUrls.length; i++) {
                slideNames.push(imageUrls[i]);
            }
            var parentElement = document.getElementById('imagePiece');
            while (parentElement.firstChild) {
                parentElement.removeChild(parentElement.firstChild);
            }
            slideName = slideNames[slideId];
            getPiece(slideName, PIECE_SIZE, ROWS, COLUMNS, idx);
        })
        .catch(error => {
            console.error('Error:', error);
        });    
        document.getElementById('apiParams').classList.add('invisible');
    });

    const cancelButton = document.getElementById('close-box');
    cancelButton.addEventListener('click', function() {
        document.getElementById('apiParams').classList.add('invisible');
    });

    async function fetchImages(apiUrl) {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const landscapeImages = data.filter(photo => photo.width > photo.height);
            const imageUrls = landscapeImages.map(photo => photo.urls.full + '&w=' + width + '&h=' + height);
            document.getElementById('apiParams').classList.remove('error');
            return imageUrls;
        } 
        catch (error) {
            console.error('Error fetching images:', error);
            document.getElementById('apiParams').classList.add('error');
            return [];
        }
    }

    function getImagePiece(imageSrc, id, x, y, width, height, callback) {
        var img = new Image();  
        img.src = imageSrc;        
        img.onload = function() {        
            var pieceDiv = document.createElement('div');
            pieceDiv.id = id;
            pieceDiv.classList.add('image-piece');
            pieceDiv.style.backgroundImage = 'url(' + imageSrc + ')';
            pieceDiv.style.backgroundPosition = '-' + x + 'px -' + y + 'px'; 
            pieceDiv.style.left = x + 'px';
            pieceDiv.style.top = y + 'px';
            pieceDiv.style.width = width + 'px';
            pieceDiv.style.height = height + 'px';
            document.getElementById('imagePiece').appendChild(pieceDiv);
            callback();
        };
    }

    function getPiece(image, size, rows, cols, idx) {
        const x = size * Math.floor(idx % cols);
        const y = size * Math.floor(idx / cols);        
        getImagePiece(image, 'piece-' + idx, x, y, size, size, function() {
            if (idx < rows * cols - 1) {
                getPiece(image, size, rows, cols, idx + 1);
            }
            else {
                setTimeout(function() {
                    for (var i = 0; i < ROWS * COLUMNS; i++) {
                        const x = Math.floor(Math.random() * (SCREEN_WIDTH - PIECE_SIZE - 2 * BORDER)) + BORDER;
                        const y = Math.floor(Math.random() * (SCREEN_HEIGHT - PIECE_SIZE - 2 * BORDER)) + BORDER;
                        initPiece(i, x, y);
                    }
                }, delay);
            }
        });
    }

    function initPiece(idx, toX, toY) {
        const onePiece = document.getElementById('piece-' + idx.toString());
        if (onePiece) {
            const fromX = parseInt(onePiece.style.left);
            const fromY = parseInt(onePiece.style.top);
            onePiece.style.zIndex = idx;
            movePiece(onePiece, fromX, fromY, toX, toY, steps, 0, function() {
                if (idx == ROWS * COLUMNS - 1) {
                    var shuffled = [];
                    for (var i = 0; i < ROWS * COLUMNS; i++) {
                        do {
                            const randomIdx = Math.floor(Math.random() * ROWS * COLUMNS);
                            if (shuffled.indexOf(randomIdx) === -1) {
                                shuffled.push(randomIdx);
                            }
                        }
                        while (shuffled.length < ROWS * COLUMNS);
                    }
                    idx = 0;
                    setTimeout(function() {
                        groupToCorner(idx, shuffled);
                    }, delay);
                }
            });
            positions[idx] = { fromX: fromX, fromY: fromY, toX: toX, toY: toY };    
        }
    }

    function movePiece(element, fromX, fromY, toX, toY, steps, step, callback) {
        const dt = 10;
        const posX = parseInt(element.style.left);
        const posY = parseInt(element.style.top);
        const dx = (toX - posX) / (steps - step);
        const dy = (toY - posY) / (steps - step);
        element.style.left = (posX + dx).toString() + 'px';
        element.style.top = (posY + dy).toString() + 'px';
        if (step < steps) {
            setTimeout(function() {
                movePiece(element, fromX, fromY, toX, toY, steps, step + 1, callback);
            }, dt);
        }
        else {
            callback();
        }
    }

    function groupToCorner(idx, items) {
        if (idx < items.length) {
            const onePiece = document.getElementById('piece-' + items[idx].toString());
            if (onePiece) {
                const fromX = parseInt(onePiece.style.left);
                const fromY = parseInt(onePiece.style.top);
                const toX = SCREEN_WIDTH - PIECE_SIZE - 2 * idx - 2 * BORDER;
                const toY = SCREEN_HEIGHT - PIECE_SIZE - 2 * idx - 2 * BORDER;
                onePiece.style.zIndex = items.length - idx;
                movePiece(onePiece, fromX, fromY, toX, toY, steps / 10, 0, function() {
                    groupToCorner(idx + 1, items);
                });    
            }
        }
        else {
            idx = 0;
            setTimeout(function() {
                restorePicture(idx, items);
            }, delay);
        }
    }

    function restorePicture(idx, items) {
        if (idx < items.length) {
            const onePiece = document.getElementById('piece-' + items[idx].toString());
            if (onePiece) {
                const fromX = parseInt(onePiece.style.left);
                const fromY = parseInt(onePiece.style.top);
                const toX = positions[items[idx]].fromX;
                const toY = positions[items[idx]].fromY;
                onePiece.style.zIndex = items.length + idx;
                movePiece(onePiece, fromX, fromY, toX, toY, steps / 10, 0, function() {
                    restorePicture(idx + 1, items);
                });    
            }
        }
        else {
            setTimeout(function() {
                var parentElement = document.getElementById('imagePiece');
                while (parentElement.firstChild) {
                    parentElement.removeChild(parentElement.firstChild);
                }
                idx = 0;
                slideId = slideId < slideNames.length - 1 ? slideId + 1 : 0;
                slideName = slideNames[slideId];
                getPiece(slideName, PIECE_SIZE, ROWS, COLUMNS, idx);
            }, delay);
        }
    }

};
