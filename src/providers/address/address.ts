import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AddressProvider {

  // ------- Declaração das variáveis -------
  // Key app_code da API
  app_code: string = 'app_code=6RoK8TbP9U7xSzoQtZClpg';
  // Key app_id da API
  app_id: string = '&app_id=x6MurxDjxE9V2Bmi8ubh';
  // URL da api com os parametros obrigatórios
  url: string = 'https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?' + this.app_code + this.app_id;
  // Parâmetro mode obrigatório na API
  mode: string = '&mode=retrieveAddresses';

  constructor(private _http: HttpClient) {}

  // Função para consultar a API e converter a latitude e longitude no endereço
  pegaEndereco(lat: number, lng: number){
    // Declaração das variáveis obrigatorias para consulta na API
    let pos = '&pos=' + lat + ',' + lng + ',0';
    let prox = '&prox=' + lat + ',' + lng + ',' +  25;
    // Retorna a respota da API para quem chamar o metodo 
    return this._http.get(this.url + pos + this.mode + prox);
  }
}
