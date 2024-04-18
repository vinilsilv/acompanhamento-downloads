import { StatusDownloadEnum } from "src/enum/status-download.enum";

export const obterEstiloPorStatusDownload: Record<StatusDownloadEnum, string> = {
  [StatusDownloadEnum.Pendente]: 'pendente',
  [StatusDownloadEnum.EmAndamento]: 'em-andamento',
  [StatusDownloadEnum.Finalizado]: 'finalizado',
}

export const obterDescricaoPorStatusDownload: Record<StatusDownloadEnum, string> = {
  [StatusDownloadEnum.Pendente]: 'Pendente',
  [StatusDownloadEnum.EmAndamento]: 'Em andamento',
  [StatusDownloadEnum.Finalizado]: 'Finalizado',
}