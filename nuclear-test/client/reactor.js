'use strict';

import Nuclear from 'nuclear-js';

import {ContactStore, CurrentContactStore, MessageStore} from './stores/';


const reactor = new Nuclear.Reactor({debug: true});

reactor.registerStores({
  contacts: new ContactStore(),
  currentContact: new CurrentContactStore(),
  message: new MessageStore()
});

export default reactor;
