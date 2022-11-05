import {Component, OnInit} from '@angular/core';
import {SituationService} from './services/situation.service';
import {Situation} from './models/situation';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
	title = 'bachelor-driving';

	constructor(private situationService: SituationService) {}

	ngOnInit() {
		this.situationService.generateNewSituation();
	}

	reload(): void {
		window.location.reload();
	}

	getCurrentSituation(): Situation {
		return this.situationService.currentSituation;
	}
}
