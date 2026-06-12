let notes = JSON.parse(localStorage.getItem("notes")) || [];
let currentNoteId = null;

function saveToStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function addNote() {

    const titleInput =
        document.getElementById("note-title");

    const contentInput =
        document.getElementById("note-content");

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title && !content) {
        return;
    }

    if (currentNoteId !== null) {

        const note =
            notes.find(n => n.id === currentNoteId);

        if (note) {
            note.title = title;
            note.content = content;
        }

    } else {

        notes.unshift({
            id: Date.now(),
            title: title || "Untitled Note",
            content: content,
            createdAt: new Date().toLocaleString()
        });

    }

    saveToStorage();
    renderNotes();

    currentNoteId = null;

    titleInput.value = "";
    contentInput.value = "";
}

function openNote(id) {

    const note =
        notes.find(n => n.id === id);

    if (!note) return;

    currentNoteId = id;

    document.getElementById("note-title").value =
        note.title;

    document.getElementById("note-content").value =
        note.content;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function deleteNote(id) {

    notes =
        notes.filter(note => note.id !== id);

    if (currentNoteId === id) {

        currentNoteId = null;

        document.getElementById("note-title").value = "";
        document.getElementById("note-content").value = "";
    }

    saveToStorage();
    renderNotes();
}

function clearAllNotes() {

    if (!confirm(
        "Delete all notes? This cannot be undone."
    )) {
        return;
    }

    notes = [];
    currentNoteId = null;

    localStorage.removeItem("notes");

    document.getElementById("note-title").value = "";
    document.getElementById("note-content").value = "";

    renderNotes();
}

function renderNotes() {

    const notesList =
        document.getElementById("notes-list");

    notesList.innerHTML = "";

    if (notes.length === 0) {

        notesList.innerHTML = `
            <div class="note-card">
                <div class="note-content">
                    No notes yet.
                </div>
            </div>
        `;

        return;
    }

    notes.forEach(note => {

        notesList.innerHTML += `
            <div class="note-card">

                <div class="note-title">
                    ${note.title}
                </div>

                <div class="note-date">
                    ${note.createdAt}
                </div>

                <div class="note-content">
                    ${note.content.replace(/\n/g, "<br>")}
                </div>

                <div class="note-actions">

                    <button onclick="openNote(${note.id})">
                        Open
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteNote(${note.id})">
                        Delete
                    </button>

                </div>

            </div>
        `;
    });
}

renderNotes();