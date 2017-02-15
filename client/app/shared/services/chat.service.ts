import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {WebSocketService} from './websocket.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

const CHAT_URL = 'ws://localhost:3005';
const DATA_URL = 'ws://localhost:3006';

export interface Message {
	author: string,
	message: string,
	newDate?: string
}

@Injectable()
export class ChatService {
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
				return response.data;
			})
	}
} // end class ChatService