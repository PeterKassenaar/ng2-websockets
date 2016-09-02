import { Component } from '@angular/core';
import { ChatService } from '../shared/services/chat.service';

@Component({
	selector: 'create-message',
	template: `
	<h2>New message:</h2>	
		<form>
		  <div class="input-group col-xs-8">
                <input
                    [(ngModel)]="message.message"
                    name="msg"                    
                    type="text"
                    class="form-control"
                    placeholder="message...">
                <span class="input-group-btn">
                    <button                       
                        class="btn btn-secondary"
                        (click)="sendMsg()">send</button>
                </span>
            </div>
		</form>
	`,
})
export class CreateMessage {	
	btnDisabled: boolean = false;	
	private message = {
		author: 'peter',
		message: ''
	}
	constructor(private chatService: ChatService) {

	}

	sendMsg() {
		// console.log('new message from client: ', this.message);
		this.chatService.messages.next(this.message);
		this.message.message = '';
	}
}