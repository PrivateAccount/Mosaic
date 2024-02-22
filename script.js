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

    const slideNames = [
        'https://images.unsplash.com/photo-1548919973-5cef591cdbc9?q=80&w=1900&h=1000&auto=format&fit=contain&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=1900&h=1000&auto=format&fit=contain&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1547537352-ae90c682877e?q=80&w=1900&h=1000&auto=format&fit=contain&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1507876466758-bc54f384809c?q=80&w=1900&h=1000&auto=format&fit=contain&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1493540447904-49763eecf55f?q=80&w=1900&h=1000&auto=format&fit=contain&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1541423408854-5df732b6f6d1?q=80&w=1900&h=1000&auto=format&fit=contain&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1611416457332-946853cc75d6?q=80&w=1900&h=1000&auto=format&fit=contain&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1492086517200-9393d4eb53bf?q=80&w=1900&h=1000&auto=format&fit=contain&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1513622790541-eaa84d356909?q=80&w=1900&h=1000&auto=format&fit=contain&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?q=80&w=1900&h=1000&auto=format&fit=contain&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1540542134-b61d688f1441?q=80&w=1900&h=1000&auto=format&fit=contain&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1571951103752-53c15cad28e5?q=80&w=1900&h=1000&auto=format&fit=contain&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1569001178320-92c99c3f1a25?q=80&w=1900&h=1000&auto=format&fit=contain&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1500632907344-a073709b2448?q=80&w=1900&h=1000&auto=format&fit=contain&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1609738394507-57348ec4e540?q=80&w=1900&h=1000&auto=format&fit=contain&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1614221330834-9399e5631af3?q=80&w=1900&h=1000&auto=format&fit=contain&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];

    slideName = slideNames[slideId];
    getPiece(slideName, PIECE_SIZE, ROWS, COLUMNS, idx);

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
            const fromX = parseInt(onePiece.style.left);
            const fromY = parseInt(onePiece.style.top);
            const toX = SCREEN_WIDTH - PIECE_SIZE - 2 * idx - 2 * BORDER;
            const toY = SCREEN_HEIGHT - PIECE_SIZE - 2 * idx - 2 * BORDER;
            onePiece.style.zIndex = items.length - idx;
            movePiece(onePiece, fromX, fromY, toX, toY, steps / 10, 0, function() {
                groupToCorner(idx + 1, items);
            });
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
            const fromX = parseInt(onePiece.style.left);
            const fromY = parseInt(onePiece.style.top);
            const toX = positions[items[idx]].fromX;
            const toY = positions[items[idx]].fromY;
            onePiece.style.zIndex = items.length + idx;
            movePiece(onePiece, fromX, fromY, toX, toY, steps / 10, 0, function() {
                restorePicture(idx + 1, items);
            });
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
