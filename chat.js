import {
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  ref,
  onChildAdded,
  push,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { auth, db } from "./firebase-config.js";

const authDiv = document.getElementById("auth");
const chatApp = document.getElementById("chatApp");
const googleBtn = document.getElementById("googleLogin");
const guestBtn = document.getElementById("guestLogin");
const logoutBtn = document.getElementById("logout");
const userNameSpan = document.getElementById("userName");

const groupList = document.getElementById("groups");
const room = document.getElementById("chatRoom");
const messagesDiv = document.getElementById("messages");
const input = document.getElementById("messageInput");
const roomTitle = document.getElementById("roomTitle");

const chatGroups = ["Public", "Football", "Memes", "Gaming", "Study"];
let currentRoom = null;
let currentUser = null;

chatGroups.forEach(name => {
  const li = document.createElement("li");
  li.textContent = name;
  li.onclick = () => joinRoom(name);
  groupList.appendChild(li);
});

googleBtn.onclick = () => {
  signInWithPopup(auth, new GoogleAuthProvider());
};
guestBtn.onclick = () => {
  signInAnonymously(auth);
};
logoutBtn.onclick = () => {
  signOut(auth);
  location.reload();
};

onAuthStateChanged(auth, user => {
  if (user) {
    currentUser = user;
    authDiv.classList.add("hidden");
    chatApp.classList.remove("hidden");
    userNameSpan.textContent = user.displayName || "Guest";
  }
});

function joinRoom(roomName) {
  currentRoom = roomName;
  messagesDiv.innerHTML = "";
  room.classList.remove("hidden");
  roomTitle.textContent = roomName + " Chat";

  const roomRef = ref(db, `rooms/${roomName}/messages`);
  onChildAdded(roomRef, snap => {
    const msg = snap.val();
    const div = document.createElement("div");
    div.textContent = `${msg.name}: ${msg.text}`;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });
}

input.addEventListener("keypress", e => {
  if (e.key === "Enter" && input.value.trim() !== "" && currentRoom) {
    const msg = {
      name: currentUser.displayName || "Guest",
      text: input.value,
      time: serverTimestamp()
    };
    const roomRef = ref(db, `rooms/${currentRoom}/messages`);
    push(roomRef, msg);
    input.value = "";
  }
});