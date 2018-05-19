import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  list = ["bonjour", "monsieur", "merci", "merci beaucoup"];

  constructor(public navCtrl: NavController, private tts: TextToSpeech) {

  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  speak(word, language) {
    return this.tts.speak({
      text: word,
      locale: language
    })
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));
  }
  
  
  async readList(list) {
    list = this.list;
    for (let i=0; i<list.length; i++) {
      await this.speak(list[i], "fr-FR")
      await this.sleep(1000);
    }
  }
}