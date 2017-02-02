import {Component} from '@angular/core';
import {ChatService} from '../shared/services/chat.service';

@Component({
	selector: 'data-component',
	template: `
		<div class="data">
			<h2>Recieved data ({{randomData.length}}, reset after 20): </h2>
			<p *ngFor="let data of randomData">{{ data }}</p>
		</div>
	`
})
export class DataComponent {

	randomData: number[] = [];

	constructor(private chatService: ChatService) {
		chatService.randomData.subscribe(num => {
			this.randomData.push(num);
			// reset if there are 20 numbers in the array
			if (this.randomData.length > 20) {
				this.randomData = [];
			}
		})
	}
}
