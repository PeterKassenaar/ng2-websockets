import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Observer} from "rxjs/Observer";

@Injectable()
export class WebSocketService {
	private subject: Subject<MessageEvent>;
	private subjectData: Subject<number>;

	// For chat box
	public connect(url: string): Subject<MessageEvent> {
		if (!this.subject) {
			this.subject = this.create(url);
		}
		return this.subject;
	}

	private create(url: string): Subject<MessageEvent> {
		let ws = new WebSocket(url);

		let observable = Observable.create(
			(obs: Observer<MessageEvent>) => {
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

		return Subject.create(observer, observable);
	}

	// For random numbers
	public connectData(url: string): Subject<number> {
		if (!this.subjectData) {
			this.subjectData = this.createData(url);
		}
		return this.subjectData;
	}

	private createData(url: string): Subject<number> {
		let ws = new WebSocket(url);

		let observable = Observable.create(
			(obs: Observer<number>) => {
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

		return Subject.create(observer, observable);
	}
} // end class WebSocketService