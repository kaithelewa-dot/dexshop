// Подключение к Firebase. Этот файл менять не нужно — настройки вставляются в firebase-config.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, collection, query, where, orderBy, limit, onSnapshot, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
const cfg = window.FIREBASE_CONFIG || {};
export const configured = !!(cfg.apiKey && cfg.projectId && !/ВСТАВЬТЕ/.test(cfg.apiKey));
export const app = configured ? initializeApp(cfg) : null;
export const db = configured ? getFirestore(app) : null;
export { doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, collection, query, where, orderBy, limit, onSnapshot, serverTimestamp };
