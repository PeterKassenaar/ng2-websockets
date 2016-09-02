import { ChatService, Message  } from '../shared/services/chat.service';
import { Component, ElementRef  } from '@angular/core';
import * as Rx from 'rxjs/Rx';

@Component({
	selector: 'chat-component',
	template: `
		<div class="messages">
			<h2>Recieved messages:</h2>
			<p *ngFor="let msg of messages">{{msg.message}} ({{msg.newDate}})</p>
		</div>
	`
})
export class ChatComponent {
	private messages: Message[] = [];
	constructor(private chatService: ChatService) {
		chatService.messages.subscribe(msg => {			
			this.messages.push(msg);
		});
	}
}