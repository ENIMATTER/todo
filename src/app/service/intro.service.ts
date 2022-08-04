import {Injectable} from '@angular/core';

// @ts-ignore
import * as introJs from 'intro.js/intro.js';

@Injectable({
  providedIn: 'root'
})

export class IntroService {

  private static INTRO_VIEWED_KEY = 'intro-viewed'; // ключ
  private static INTRO_VIEWED_VALUE = 'done'; // значение


  private introJS = introJs();

  constructor() {
  }

  public startIntroJS(checkViewed: boolean) {

    if (checkViewed === true && localStorage.getItem(IntroService.INTRO_VIEWED_KEY) === IntroService.INTRO_VIEWED_VALUE) {
      return;
    }

    this.introJS.setOptions(
      {
        nextLabel: 'Вперед',
        prevLabel: 'Назад',
        doneLabel: 'Выход',
        exitOnEsc: true,
        exitOnOverlayClick: false
      });

    this.introJS.start();

    this.introJS.onexit((_: any) => localStorage.setItem(IntroService.INTRO_VIEWED_KEY, IntroService.INTRO_VIEWED_VALUE));

  }

}
