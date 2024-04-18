import { Component, OnInit } from '@angular/core';
import { DonwloadsStore } from 'src/store/downloads.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DonwloadsStore],
})
export class AppComponent implements OnInit {
  title = 'acompanhamento-downloads';

  constructor(
    public store: DonwloadsStore,
  ) {}

  ngOnInit(): void {
    this.store.configurarSolicitacoes();
  }

  comunicarInicioDownload(): void {}

  concluirDownload(): void {}

}
