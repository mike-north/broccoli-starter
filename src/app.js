export const foo = (messages) => {
  let li = document.createElement('li');
  li.appendChild(document.createTextNode('app.js was loaded'));
  messages.appendChild(li);
}