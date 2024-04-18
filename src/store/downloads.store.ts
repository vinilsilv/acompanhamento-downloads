import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { StatusDownloadEnum } from "src/enum/status-download.enum";
import * as uuid from 'uuid';

const initialState = {
  downloadList: []
}

interface DownloadsModel {
  downloadList: DonwloadItemModel[],
}

export interface DonwloadItemModel {
  id: string,
  progress: number,
  status: StatusDownloadEnum,
  dataProcessoIniciado: Date,
}

@Injectable()
export class DonwloadsStore extends ComponentStore<DownloadsModel> {
  constructor() {
    super(initialState)
  }

  readonly TEMPO_MEDIO_DOWNLOAD = 60000;
  readonly CHAVE_LOCAL_STORAGE = 'listaDownloads';

  downloadList$ = this.select(s => s.downloadList);

  configurarSolicitacoes() {
    this.obterListaLocalStorage();
    setInterval(() => { this.configurarProgresso() }, 1000);
  }

  configurarProgresso() {
    const agora = Date.now();
    const listaDownloads = this.get().downloadList;

    this.patchState((s) => ({
      downloadList: listaDownloads.map((d) => {
        if (d.status !== StatusDownloadEnum.EmAndamento)
          return d;

        const start = new Date(d.dataProcessoIniciado);
        const end = new Date(start.getTime() + this.TEMPO_MEDIO_DOWNLOAD);

        const total = +end - +start;
        const elaps = +agora - +start;
        const porcentagem = ((elaps / total) * 100)
        const progress = porcentagem >= 98
          ? 98
          : porcentagem;

        return { ...d, progress };
      }),
    }))
  }

  solicitarDownload = () => {
    const novoDownload: DonwloadItemModel = {
      id: uuid.v4(),
      progress: 0,
      status: StatusDownloadEnum.Pendente,
      dataProcessoIniciado: new Date(),
    };

    this.patchState((s) => ({
      downloadList: [novoDownload, ...s.downloadList],
    }));

    this.atualizarLocalStorage();
  };

  iniciarProcesso(id: string) {
    this.configurarStatusProcesso(id, StatusDownloadEnum.EmAndamento);
  }

  concluirProcesso(id: string) {
    this.configurarStatusProcesso(id, StatusDownloadEnum.Finalizado);
  }

  deletarItem(id: string) {
    this.patchState((s) => ({
      downloadList: s.downloadList.filter(d => d.id !== id),
    }));

    this.atualizarLocalStorage();
  }

  private configurarStatusProcesso(id: string, status: StatusDownloadEnum) {
    this.patchState(s => ({
      downloadList: s.downloadList.map((d) => {
        if (d.id !== id)
          return d;

        return {
          ...d,
          status,
          dataProcessoIniciado: status == StatusDownloadEnum.EmAndamento
            ? new Date()
            : d.dataProcessoIniciado,
          progress: status === StatusDownloadEnum.Finalizado
            ? 100
            : d.progress,
        };
      })
    }));

    this.atualizarLocalStorage();
  }

  private atualizarLocalStorage() {
    localStorage.setItem(this.CHAVE_LOCAL_STORAGE, JSON.stringify(this.get().downloadList));
  }

  private obterListaLocalStorage() {
    const listaArmazenada = localStorage.getItem(this.CHAVE_LOCAL_STORAGE)
    if(!listaArmazenada)
      return;

    this.patchState(() => ({ downloadList: JSON.parse(listaArmazenada)}))
  }
}