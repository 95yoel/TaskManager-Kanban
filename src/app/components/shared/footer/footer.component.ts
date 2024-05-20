import { Component } from '@angular/core';
import { TranslationPipe } from "../../../pipe/translation.pipe";
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-footer',
    standalone: true,
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    imports: [TranslationPipe,AsyncPipe]
})
export class FooterComponent {

  year:Number = 0

  ngOnInit():void{
    this.year = new Date().getFullYear()
  }


}
