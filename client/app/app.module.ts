// modules
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

// services
import {ChatService} from './shared/services/chat.service';
import {WebSocketService} from './shared/services/websocket.service';

// components
import {AppComponent} from './app.component';
import {CreateMessage} from './create-message/create-message.component';
import {ChatComponent} from './chat/chat.component';
import {DataComponent} from "./random-data/data.component";

@NgModule({
	imports     : [BrowserModule, FormsModule],
	declarations: [
		AppComponent,
		ChatComponent,
		CreateMessage,
		DataComponent
	],
	providers   : [ChatService, WebSocketService],
	bootstrap   : [AppComponent]
})
export class AppModule {
}
