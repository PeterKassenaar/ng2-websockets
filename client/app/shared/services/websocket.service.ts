import {Injectable} from '@angular/core';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class WebSocketService {
	private subject: Rx.Subject<MessageEvent>;
	private subjectData: Rx.Subject<number>;

	// For chat box
	public connect(url: string): Rx.Subject<MessageEvent> {
		if (!this.subject) {
			this.subject = this.create(url);
		}
		return this.subject;
	}
	private create(url: string): Rx.Subject<MessageEvent> {
		let ws = new WebSocket(url);

		let observable = Rx.Observable.create(
			(obs: Rx.Observer<MessageEvent>) => {
				ws.onmessage = obs.next.bind(obs);
				ws.onerror   = obs.error.bind(obs);
				ws.onclose   = obs.complete.bind(obs);

				return ws.close.bind(ws);
			});

		let observer = {
			next: (data: Object) => {
				if (ws.readyState === WebSocket.OPEN) {
					ws.send(JSON.stringify(data));
				}
			}
		};

		return Rx.Subject.create(observer, observable);
	}

	// For random numbers
	public connectData(url: string): Rx.Subject<number> {
		if (!this.subjectData) {
			this.subjectData = this.createData(url);
		}
		return this.subjectData;
	}

	private createData(url: string): Rx.Subject<number> {
		let ws = new WebSocket(url);

		let observable = Rx.Observable.create(
			(obs: Rx.Observer<number>) => {
				ws.onmessage = obs.next.bind(obs);
				ws.onerror   = obs.error.bind(obs);
				ws.onclose   = obs.complete.bind(obs);

				return ws.close.bind(ws);
			});

		let observer = {
			next: (data: Object) => {
				if (ws.readyState === WebSocket.OPEN) {
					ws.send(JSON.stringify(data));
				}
			}
		};

		return Rx.Subject.create(observer, observable);
	}
} // end class WebSocketService