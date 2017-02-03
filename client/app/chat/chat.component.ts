import {Component, OnInit} from '@angular/core';
import {ChatService, Message} from '../shared/services/chat.service';

@Component({
	selector: 'chat-component',
	template: `
		<div class="messages">
			<h2>Recieved messages:</h2>
			<p *ngFor="let msg of messages">
				<strong>({{msg.author}})</strong> 
				{{msg.message}} ({{msg.newDate}})</p>
		</div>
	`
})
export class ChatComponent implements OnInit {
	messages: Message[] = [];

	constructor(private chatService: ChatService) {

	}

	ngOnInit() {
		this.chatService.messages.subscribe(msg => {
			this.messages.push(msg);
		});
	}
}