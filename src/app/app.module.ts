import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {QuestionAreaComponent} from './components/question-area/question-area.component';
import {QuestionMediaComponent} from './components/question-media/question-media.component';
import { CarComponent } from './components/subjects/car/car.component';


@NgModule({
	declarations: [
		AppComponent,
		QuestionAreaComponent,
		QuestionMediaComponent,
  	CarComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MaterialModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
