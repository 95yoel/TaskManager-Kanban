import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { Observable } from 'rxjs';

@Pipe({
  name: 'translation',
  standalone: true
})
export class TranslationPipe implements PipeTransform {

  private readonly translationService = inject(TranslationService)
  
  transform(value: string): Observable<string> {
    return this.translationService.getTranslation(value);
  }

}
