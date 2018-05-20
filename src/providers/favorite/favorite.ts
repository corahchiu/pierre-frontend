import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
 
const STORAGE_KEY = 'phrase';
 
@Injectable()
export class FavoriteProvider {
 
  constructor(public storage: Storage) {
    console.log(storage);
   }

  addNewPhrase(phrase) {
    this.storage.set(STORAGE_KEY, phrase);
    // return this.getAllPhrases().then(result => {
      // if (result) {
      //   result.push(phrase);
      //   return this.storage.set(STORAGE_KEY, result);
      // }
    // })
  }
 
  retrievePhrases(phraseId) {
    return this.getAllPhrases().then(result => {
      return result && result.indexOf(phraseId) !== -1;
    });
  }
 
  favoritephrase(phraseId) {
    return this.getAllPhrases().then(result => {
      if (result) {
        result.push(phraseId);
        return this.storage.set(STORAGE_KEY, result);
      } else {
        return this.storage.set(STORAGE_KEY, [phraseId]);
      }
    });
  }
 
  unfavoritephrase(phraseId) {
    return this.getAllPhrases().then(result => {
      if (result) {
        var index = result.indexOf(phraseId);
        result.splice(index, 1);
        return this.storage.set(STORAGE_KEY, result);
      }
    });
  }
 
  getAllPhrases() {
    return this.storage.get(STORAGE_KEY);
  }
 
  retrieveAllPhrases() {
    this.storage.get(STORAGE_KEY)
      .then((data)=>{return data});
  }
 
}