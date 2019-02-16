import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

// Imports
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AddressProvider } from './../../providers/address/address';

@IonicPage()
@Component({
  selector: 'page-geolocalization',
  templateUrl: 'geolocalization.html',
})
export class GeolocalizationPage {
  // Declaração das variáveis
  map: any; //Usado para mostrar o mapa na tela
  address: string; //Usado para mostrar o endereço na tela
  lat: number; //Usado para mostrar a latitude na tela
  lng: number; //Usado para mostrar a longitude na tela

  constructor(
    public navCtrl: NavController, //Propriedade do tipo NavController
    public navParams: NavParams, //Propriedade do tipo NavParams
    private _geolocation: Geolocation, //Propriedade do tipo Geolocation
    private _consultaEndereco: AddressProvider, //Propriedade do tipo AddressProvider
    private _alertCtrl: AlertController
  ) {}

  pegaLocalizacao() { //Quando ocorre o click no botão essa função é acionada
    this._geolocation.getCurrentPosition() //Usa a propriedade _geolocation e chama o método getCurrentPosition
    .then((resp) => { // Caso ocorra tudo com sucesso, é retornado o 'resp'
      this.lat = resp.coords.latitude; //A variável lat recebe o valor da latitude e a tela atualiza automaticamente 
      this.lng = resp.coords.longitude; //A variável lng recebe o valor da longitude e a tela atualiza automaticamente

      this._consultaEndereco.pegaEndereco(resp.coords.latitude, resp.coords.longitude)//Usa a propriedade _getAddress para acessar o metodo getAddress, passando a latitude e a longitude
      .subscribe( // Se inscreve no metodo
        (json: JSON) => { //Caso não ocorra erros sera retornado o json
          var response = json; //Atribui json à variável response
          var street = JSON.stringify(response['Response']['View']['0']['Result']['0']['Location']['Address']['Label']); //Atribui o endereço que foi retornado na consulta à variável street
          this.verificaEndereco(street); //Chama metodo para verificar com o usuário se o endereço esta correto
        }
      );
    }).catch((error) => { //Caso dê erro
      console.log('Erro ao recuperar sua posição', error); //Printa no console
    });
  }

  verificaEndereco(address){ //Cria metodo que recebe o endereço atual
    this._alertCtrl.create({ //Cria um novo alerta
      message: 'Esse é seu endereço?\n' + address, //Define mensagem do primeiro alerta
      buttons: [ 
        {
          text: 'Não', //Texto do primeiro botão
          handler: () => { //Caso ele seja clicado
            this._alertCtrl.create({ //Cria um novo alerta
              message: 'Obrigado por nos informar!\nEstamos trabalhando para melhorar!', //Mensagem do novo alerta
              buttons: [{ text: 'OK' }] //Botão de confirmação do novo alerta
            }).present(); //Mostra o novo alerta
            this.address = ''; //Limpa o endereço atual na tela
          }
        }, {
          text: 'Sim', //Texto do segundo botão
          handler: () => { //Caso ele seja clicado
            this._alertCtrl.create({ //Cria um novo alerta
              message: 'Obrigado por nos informar!\nEndereço confirmado!', //Mensagem do novo alerta
              buttons: [{ text: 'OK' }] //Botão de confirmação do novo alerta
            }).present(); //Mostra o novo alerta
            this.address = address; //Atribui o valor de street à variavel address e automatimante atualiza na tela
          }
        }
      ]
    }).present();
  }
}
