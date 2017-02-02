import {Injectable, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs/Rx';
import {WebSocketService} from './websocket.service';

const CHAT_URL = 'ws://localhost:3005';
const DATA_URL = 'ws://localhost:3006';

export interface Message {
	author: string,
	message: string,
	newDate?: string
}

@Injectable()
export class ChatService implements OnInit {
	public messages: Subject<Message>  = new Subject<Message>();
	public randomData: Subject<number> = new Subject<number>();

	constructor(private wsService: WebSocketService) {

		// 1. subscribe to chatbox
		this.messages   = <Subject<Message>>this.wsService
			.connect(CHAT_URL)
			.map((response: MessageEvent): Message => {
				let data = JSON.parse(response.data);
				return {
					author : data.author,
					message: data.message,
					newDate: data.newDate
				}
			});
		// 2. subscribe to random data
		this.randomData = <Subject<number>>this.wsService
			.connectData(DATA_URL)
			.map((response: any): number => {
				let num = response.data;
				return num;
			})
	}

	ngOnInit() {

	}
} // end class ChatService