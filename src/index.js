import { foo as bar } from './app';

let messages = document.getElementById('messages');
let li = document.createElement('li');
li.appendChild(document.createTextNode('index.js was loaded'));
messages.appendChild(li);

bar(messages);