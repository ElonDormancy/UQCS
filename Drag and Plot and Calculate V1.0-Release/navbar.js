document.querySelector('#About').onclick = function () {
    document.querySelector('#content').style.display = 'block';
};

document.querySelector('#content').onclick = function () {
    document.querySelector('#content').style.display = 'none';
};

document.querySelector('#content > div').onclick = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
};