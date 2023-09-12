import bookmarks from './bookmarks.js';

const app = document.getElementById('app');
const bookmarks_table = document.getElementById('bookmarks_table');
const btn_add_bookmark = document.getElementById('btn_add_bookmark');
const dialog = document.getElementById('dialog-add-bookmark');

console.log(bookmarks);

function generateTable() {
    for (let bookmark in bookmarks.bookmarks) {
        let row = bookmarks_table.insertRow();
        let name = row.insertCell(0);
        let url = row.insertCell(1);
        name.innerHTML = bookmarks.bookmarks[bookmark].name;
        url.innerHTML = bookmarks.bookmarks[bookmark].url;
    }
}


generateTable();