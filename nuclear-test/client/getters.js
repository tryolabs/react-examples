'use strict';

const contactsGetter = [
  ['contacts'],
  contacts => contacts.toList()
];

const currentContactGetter = [
  ['contacts'],
  ['currentContact'],
  (contacts, id) => id ? contacts.get(id.toString()) : null
];

const favoritesGetter = [
  ['contacts'],
  contacts => contacts.toList().filter(contact => contact.get('fav'))
];

const messageGetter = [
  ['message'],
  message => message
];


export {
  contactsGetter,
  currentContactGetter,
  favoritesGetter,
  messageGetter
};
