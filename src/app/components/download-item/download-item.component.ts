import { Component, OnInit, Input } from '@angular/core';
import { DonwloadItemModel, DonwloadsStore } from '../../../store/downloads.store';
import { StatusDownloadEnum } from 'src/enum/status-download.enum';
import { obterDescricaoPorStatusDownload } from 'src/shared/functions';

@Component({
  selector: 'app-download-item',
  templateUrl: './download-item.component.html',
  styleUrls: ['./download-item.component.scss']
})
export class DownloadItemComponent implements OnInit {

  tempoMedioDownload: number = 30000;
  agora = Date.now();
  status = StatusDownloadEnum;

  @Input() item!: DonwloadItemModel;

  get exibirCarregamento(): boolean {
    return this.item.status != StatusDownloadEnum.Pendente
  }

  get descricaoStatus(): string {
    return obterDescricaoPorStatusDownload[this.item.status];
  }

  constructor(
    public store: DonwloadsStore,
  ) { }

  ngOnInit(): void {
  }

  configurarProgresso() {

  }

}
