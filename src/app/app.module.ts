import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PadreComponent } from './padre/padre.component';
import { HijoComponent } from './hijo/hijo.component';
import { FormsModule } from '@angular/forms';
import { HermanoComponent } from './hermano/hermano.component';
import { MiPipePersonalizadoPipe } from './mi-pipe-personalizado.pipe';
import { NumberBingoComponent } from './number-bingo/number-bingo.component';
import { TABLABINGOComponent } from './tablabingo/tablabingo.component';
import { MainComponentComponent } from './main-component/main-component.component';
import { TableroBolasComponent } from './tablero-bolas/tablero-bolas.component';
import { BolaComponent } from './bola/bola.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfJugadasComponent } from './modal-conf-jugadas/modal-conf-jugadas.component';
import { VisorBingosComponent } from './visor-bingos/visor-bingos.component';
import { ContextMenuModule } from '@perfectmemory/ngx-contextmenu';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ClipboardModule } from '@angular/cdk/clipboard'
import { ToastsContainer } from './components/toast/toas-container.component';
import { ModalCreateTablaBingoComponent } from './modal-create-tabla-bingo/modal-create-tabla-bingo.component';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { NumeroBingoPipe } from './pipes/numeroBingoPipes';

const dbConfig: DBConfig  = {
  name: 'BINGOS-APP',
  version: 1,
  objectStoresMeta: [{
    store: 'hojas',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'email', keypath: 'email', options: { unique: false } }
    ]
  }]
};

@NgModule({
  declarations: [
    AppComponent,
    PadreComponent,
    HijoComponent,
    HermanoComponent,
    MiPipePersonalizadoPipe,
    NumberBingoComponent,
    TABLABINGOComponent,
    TABLABINGOComponent,
    MainComponentComponent,
    TableroBolasComponent,
    BolaComponent,
    ModalConfJugadasComponent,
    VisorBingosComponent,
    ConfirmDialogComponent,
    ToastsContainer,
    ModalCreateTablaBingoComponent,
    NumeroBingoPipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ContextMenuModule,
    ClipboardModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [],
  bootstrap: [AppComponent] ,
  
})
export class AppModule { }
