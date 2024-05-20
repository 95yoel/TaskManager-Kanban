import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { LANGUAGES } from '../models/languages';

interface Translations {
  [key: string]: { [key: string]: string };
}

@Injectable({
  providedIn: 'root'
})

export class TranslationService {

  private languageSubject = new BehaviorSubject<string>('en')
  language$ = this.languageSubject.asObservable()

  private translations:Translations = LANGUAGES

  setLanguage(lang:string){
    this.languageSubject.next(lang)
  }

  getTranslation(key: string): Observable<string> {
    return this.language$.pipe(
      map(lang => this.translations[lang][key] || key)
    );
  }


}
