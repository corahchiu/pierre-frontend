import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  phrases: any[] = ["bonjour", "monsieur", "merci", "merci beaucoup", "pantalon", "salle de bain", "toilettes"];
  // data: any;
  phrasesArr: any[] = [];

  constructor(public navCtrl: NavController, public storage: Storage, public navParams: NavParams, public favoriteProvider: FavoriteProvider, private tts: TextToSpeech) {
    // this.retrieve();
  }

  retrieve() {
    this.storage.get('phrases')
    .then((value) => {
      if (value.phrasesArr) {
        // this.data = value;
        this.phrasesArr = value.phrasesArr;
        console.log(this.phrasesArr[0].phrase);
      }
    }).catch((err) => console.log(err));;  
  }


  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async displayData() {
    await this.retrieve();
    console.log(this.phrasesArr + '');
  }

  speak(phrase, language) {
    return this.tts.speak({
      text: phrase,
      locale: "fr-FR"
    })
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));
  }
  
  async readPhrases(phrases) {
    phrases = this.phrases;
    for (let i=0; i<phrases.length; i++) {
      await this.speak(phrases[i], "fr-FR")
      await this.sleep(1000);
    }
  }

  // addNewPhrase(phrase) {
    // this.favoriteProvider.addNewPhrase(phrase);
  // }

  async addNewPhrase(phrase) {
    // console.log(phrase);    
    let allData = this.phrasesArr.push({"phrase": phrase});
    await this.storage.set('phrases', {"phrasesArr": allData});
  }

}