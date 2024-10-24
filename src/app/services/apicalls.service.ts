import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { PopupsService } from './popup.service'
import { load } from 'recaptcha-v3-enterprise';
import { AltaDirecta } from '../interfaces/interfaces';
import { TagManagerService } from './tagManager.service';
// import { ParamsURLService } from './params-url.service';
import { FormDataDto } from './formData.dto';
import { of } from 'rxjs';
declare global {
  interface Window { dataLayer: any[]; }
}
@Injectable({
  providedIn: 'root',
})
  
export class ApicallsService {

  private baseUrl = 'https://total.vm';
  private apiUrl = '/en/api/v2/';
  private drupalOAuthUrl = '/en/oauth/token';
  private apiDrupalEsave = 'esave/token';
  private drupalSessionAuthUrl = '/en/session/token';
  private popupTextsUrl = "/sites/default/files/custom_messages/popup-s.json";
  private configBaseURLs: any = {};
  
  phoneValid: boolean = false;
  phoneValid_img: string = '';
  mailValid: boolean = false;
  mailValid_img: string = '';
  invalid = "assets/img/ico-close-red.svg";

  phoneCallIsSent = false;

  constructor(
    private http: HttpClient,
    private popups: PopupsService,
    // private paramsUrl: ParamsURLService,
    private tagManagerSrv: TagManagerService,
    private formDto: FormDataDto
  ) {
    // this.baseUrl = window.location.origin;
    //this.baseUrl = environment.server_url;
  } 

  async sendContact(contact: any, offer: any): Promise<any> {
    const contactInfo = {
      IdOferta: offer.IdOferta,
      ...contact,
    };
    return this.makePetition('total-lead?_format=json', contactInfo);
  }

  async sendC2C(info: any): Promise<any> {
    return this.makePetition('total-c2c?_format=json', info);
  }

  async sendCups(cups: any, partnerData: any): Promise<any>{
    let utm_params = window.location.search;
    cups.utm_params = utm_params;
    cups.parametro_url = partnerData.parametro_url;
    cups.partner = partnerData;
    return this.makePetition('total-consumer-cups-submission?_format=json', cups);
  }

  //envia la info del formulario
  async sendHiringForm(hiringFormData: any): Promise<any> {
    return this.makePetition('total-contract-consumer?_format=json', hiringFormData);
  }

  //envia la info del formulario V2
  async sendHiringFormV2(hiringFormData: any): Promise<any> {
    return this.makePetition('total-contract-consumer-V2?_format=json', hiringFormData);
  }

  //recupera informacion del partner
  async recoverPartnerData(brandId: any): Promise<any>{
    return of({
      "contract": "8731396",
      "cod_empleado": "",
      "facilitas": [
          "SinFacilita"
      ],
      "codigo_fases_equipo_medida": "M",
      "campaign_code": "1024_PFA003_ATA",
      "consumo_luz": null,
      "consumo_gas": {
          "gasto": "Consumption\u003C=5MWh",
          "tarifa": "R1"
      },
      "tarifa_luz": "",
      "descripci\u00f3n_Campa\u00f1a": "A Tu Aire - Precio Fijo Anual",
      "plan": "A TU AIRE",
      "version_luz": "No aplicada",
      "version_gas": "A",
      "Name": "1024_PFA003_ATA Gas",
      "Type": "Gas",
      "Segmento": "Home",
      "Factura": true,
      "Digital": true,
      "StartDate": "2024-10-15",
      "EndDate": "2024-12-31",
      "Voucher": null,
      "Tarifa_atr_luz": null,
      "Tarifa_atr_gas": "R1;R2;R3;R4;B5;S1;S2;S3;S4;S5",
      "Literal_Campa\u00f1a": "A Tu Aire - Precio Fijo Anual - Digital",
      "Descripci\u00f3n_Campa\u00f1a": "A Tu Aire - Precio Fijo Anual",
      "Plan": "A TU AIRE",
      "Empleado": false,
      "Condici\u00f3n": false,
      "V_Luz": null,
      "V_Gas": "A",
      "TipoPrecioLuz": null,
      "TipoPrecioGas": "FixedAnual",
      "Facilita": [
          "SinFacilita"
      ],
      "Products": [
          {
              "productcode": "TOTAL_PRD_GAS",
              "productname": "1024_PFA003_ATA Gas",
              "campaingDescription": "A Tu Aire - Precio Fijo Anual",
              "original": true,
              "catalog": "TOTAL_CAT_PDR_GAS_ML",
              "plan": "A TU AIRE",
              "image": "https:\/\/www.totalenergies.es\/sites\/default\/files\/images-sf\/sf-gas-web.svg",
              "Tarifagas": "Tarifa RL.1",
              "StatusProducto": "Validated",
              "prices": {
                  "USAGE_TF_GAS_STD_BASE_PRC_DAY": {
                      "withoutTaxes": 0.17490411,
                      "withTaxes": 0.2144653731
                  },
                  "USAGE_STD_PRC_VARIABLE_TERM_GAS": {
                      "withoutTaxes": 0.070397000000000001,
                      "withTaxes": 0.088011770000000003
                  },
                  "USAGE_STD_PRC_FIXED_TERM_GAS": {
                      "withoutTaxes": 0.17490411,
                      "withTaxes": 0.2144653731
                  },
                  "USAGE_TV_GAS_STD_BASE_PRC": {
                      "withoutTaxes": 0,
                      "withTaxes": 0.0028314
                  },
                  "USAGE_METER_GAS": {
                      "withoutTaxes": 0.84999999999999998,
                      "withTaxes": 1.0313314
                  },
                  "imageDescription": "A Tu Aire - Precio Fijo Anual",
                  "Descuento": null
              }
          },
          {
              "productcode": "TOTAL_PRD_DIGITAL",
              "productname": "+Digital",
              "catalog": "TOTAL_CAT_OTRAS_PROMOS",
              "image": "https:\/\/www.totalenergies.es\/sites\/default\/files\/images-sf\/sf-digital-web.svg",
              "Tarifagas": "Tarifa RL.1",
              "StatusProducto": "Validated",
              "prices": {
                  "discountenergia": -9,
                  "imageDescription": null
              }
          }
      ],
      "CampaignCode": "1024_PFA003_ATA",
      "IncludedProducts": [
          "TOTAL_PRD_LIGHT_20_1+1",
          "TOTAL_PRD_GAS"
      ],
      "cups": {
          "luz": {
              "cupsluz": ""
          },
          "gas": {
              "cupsgas": ""
          },
          "Partner": "default",
          "IdOferta": "",
          "IdProducto": "",
          "type": "gas",
          "typeSelected": "gas",
          "displayprice": "noCups",
          "flow": "estimation"
      },
      "utm_params": "?type=gas\u0026flow=estimation",
      "parametro_url": "",
      "partner": {
          "PartnerActive": true,
          "message_ok_funnel": "\u003Cp\u003E\u003Cimg src=\u0022https:\/\/primavera.prod.acquia-sites.com\/sites\/default\/files\/2024-01\/tick-verde_0.png\u0022 alt=\u0022\u0022 width=\u0022100\u0022 height=\u0022100\u0022\u003E\u003C\/p\u003E\u003Cp\u003E\u0026nbsp;\u003C\/p\u003E\u003Ch2\u003E\u003Cstrong\u003ECONTRATACI\u00d3N FINALIZADA CORRECTAMENTE\u003C\/strong\u003E\u003C\/h2\u003E\u003Ch2\u003EEn unos minutos recibir\u00e1s en tu correo todos los detalles sobre tu contataci\u00f3n incluyendo tu contrato.\u003C\/h2\u003E\u003Ch2\u003EMuy pronto podr\u00e1s disfrutar de todas las ventajas de ser de TotalEnergies.\u003C\/h2\u003E\u003Cp\u003E\u0026nbsp;\u003C\/p\u003E\u003Cp\u003E\u003Ca href=\u0022http:\/\/www.totalenergies.es\/\u0022\u003EInicio\u003C\/a\u003E\u003C\/p\u003E",
          "message_fraudulent_funnel": "\u003Cp\u003E\u003Cimg src=\u0022\/sites\/default\/files\/2024-01\/tick-verde_0.png\u0022 alt=\u0022\u0022 width=\u0022100\u0022 height=\u0022100\u0022\u003E\u003C\/p\u003E\u003Cp\u003E\u0026nbsp;\u003C\/p\u003E\u003Ch2\u003E\u003Cstrong\u003ETE LLAMAREMOS PARA FINALIZAR LA CONTRATACI\u00d3N\u003C\/strong\u003E\u003C\/h2\u003E\u003Ch2\u003EMuy pronto podr\u00e1s disfrutar de todas las ventajas de ser de TotalEnergies.\u003C\/h2\u003E\u003Cp\u003E\u0026nbsp;\u003C\/p\u003E\u003Cp\u003E\u003Ca href=\u0022http:\/\/www.totalenergies.es\/\u0022\u003EInicio\u003C\/a\u003E\u003C\/p\u003E",
          "Presents": [
              {
                  "Name": "",
                  "Description": "",
                  "Picture": ""
              }
          ],
          "PartnerStatus": true,
          "Exclude_energy": [],
          "b2c_lead": false,
          "Logo": "",
          "Fields_starting_screen": [],
          "Partner_name": "Default",
          "Invoice_flow": true,
          "Cups_flow": true,
          "Estimation_flow": true,
          "No_C2C": "FALSE",
          "Phone": "900929272",
          "ID_required": "FALSE",
          "Text_starting_screen": null,
          "disableChat": "TRUE",
          "showBanner": false,
          "showYaCliente": true,
          "Texto_banner_superior": "",
          "CampaingCode": "1024_PFA003_ATA",
          "IncludedProducts": [
              "TOTAL_PRD_LIGHT_20_1+1",
              "TOTAL_PRD_GAS"
          ],
          "Channel": "Digital",
          "Subchannel": "Website",
          "Subchannel2": "E2E Digital",
          "SubchannelDetail": "TotalEnergies",
          "MetatagTitle": "DEFAULT",
          "MetatagDescription": "descripcion",
          "DatalayerSegmento": "funnelb2c",
          "ChannelBanned": null,
          "SubchannelBanned": null,
          "Subchannel2Banned": null,
          "SubchannelDetailBanned": null,
          "sms_verification": true,
          "MARCA_SOCIA": null,
          "parametro_url": "",
          "parametro_url_sf": null,
          "showAbandonedCart": false,
          "flow_selector": []
      },
      "recaptcha": "03AFcWeA5NcgEsHsHyDXz2YGxtKLexM_NX_9KydLAySbdWE6QGLJfeNErpPqTjjGg3ADHFip7FYUUnLwfCMJ19Yu1qOihNcqT_vrRUiHjITnRSXLMXxrSl5U6CRmvz5zXaIzCU7Ib3CbP9j3BnZZnD05utjwfEmFVcTL9VGz_pzefvZZtyM6us0li4zbQNP5fvnmnaHVfDcJ1_sHPef0X-hcXYMF3-GQNtBlkMRpoSAVs1Y2AvZED8Ieh1iYV2R9TPzPgrPG38UQE9BuFKtjY5pMGC-kgi48w6Vy2DCrlBZ4N3pw0H_6P1l2xlStel9qZrd1N22iPYNgnQuI_DP-Dt8klDlR4Q2nXSHPDa67yyjBZXqPXbU8kwFigPgB5XE1NebT9AMhOKmq5yxl57DWmjgCnQnUjUlJ-c6x4Gwuo_ZUHzkkDWE6RcOyoE3y-ymn3t1U3IoeGqr6Xmqu62AqwIKT3x50fo_77KJ24bL9_Z6IuaurKMHQGSERwLrQUCfYGLe1o_Zhe-jajX0hAZ6AIJuxn4WsrxlFRKLPFHuW66K_sSOFQlPsB3ZbroqKgOJRtg6JJO-gE54zfBDe-Chzob6MyXiT0o_Rn4_MroqzolqYvwSQ_S1X59dkxsN2OlhYt2oR2nkI4aY9rrUSRH9w2EU6b2FMMRfUKw222Fwr6tz1I9p6Rc0Jdx3ndUX2GaolkErzexbN8BIGfxFNTwaVmtT0ERpIxBtemykfhgPJfwFbC8FhiEQA9D39kFvIQ7PsnGQCSAzHCCT6ez6VZLZZkXNDF1Ct9CDd-C6PK6EKjyRP1tplGhoNVowoXidxPPiubdi2DE3chtc0zyerFpz2qwZYLvYOeIovH3G69Vvm7ape5tPvTR8wv8lMLL4LsDtzd5evhiR-i7S2lDfhKGI6a6K83HgYBl7iwfNciA5tTUCPIhrJOpOWb4gHwBY8YO5aaM2CdyxvmQ9uHvcoox1LFkOVrLBprFqT-G3NMQ5-uYpa1GmSmj1dFmZLgz0O8Xsqj2Q5vSHJfc6Uvp9LDXxE3q_xJdBLWX8Z54Qgw4-pxmoC6Knr_jxEIYqozUTaL2Fl5-vnxhtbmh2y7sqbTtUFsgM-nv0Lhq_Z2Wufrl0fmSFQ3nmK-10fGmyP-qQEFVPik6GTTjgHwSd28S3dQQKbvxFdEufkS5Ef4UsNnEtDd1TUVPWhU_1X0CyWRRFJENvb0YWLX4sxUui4ls1s8fgKHLOXmPraVOP8QI9hjHyyb7FvJEcRGjfQAb-eNH1DCC3-vGVtridgcCde3Bp3bHGIRXZROXcKtaiinmMsEk6ijrXoGbIndNZmaYmkMk1ksz1QsX4ZTn4KirAVoONvVVOk3LBCJ-GEktNR9rpYirZsBNr4091-ejDVcyLmScqKwEE9IujvQ0N_FnA15F5k2J08I9Gb5ae2jpVIy8CTpVfuwgfHi1CoE76mle3wBIuxCnlkal7mxbErz3TWnqzEthkMnMH2Ouipog2cTIsd_fvH9rJ--vLA35H19o8XHnsMyYNTpu8Wogg9oMevieeusEU4Ogr11shfWz5MDJOzmEVWURCvzSFg-QE4OqXPdajXy_rUkXSDl2TmzDAtjW17dP9UxLeI65CXBtzpMTXpk6x3LAHgGYdWlh_URbmzMtkclcHfLcxFRikW6jTT29GMbw_yY2jHajGqGoW__bVhWsnld7uAuFr4EmydiCypoHG51FfB_9YleTw0mzvI37pQdzz6hJtUCtpRhdYFaRye3ZdubqQfbn33QTI_hBlvWj36mtazJaWDow71bMb1X4j3rVDeYA9tuPzUMAY2lxp3B-ZUE3BAdvEYiGe8KDKBXRD4C0gVzBklcuZCj7xvFrmVoSFawqQpa3amMnSP59MU9HEjitcEH2IejrqQ82unyvkVmcSyZhoxF9SgzZVzpncg5ZjqAoN0R6aquyv1QWLA",
      "referer": "https:\/\/www.totalenergies.es\/particulares\/contrata\/simulador-gas?type=gas\u0026flow=estimation",
      "recaptchaObject": {
          "userAgent": "Mozilla\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/130.0.0.0 Safari\/537.36",
          "hostname": "www.totalenergies.es",
          "userIpAddress": "77.230.244.75",
          "expectedAction": {
              "name": "createTokenAndNavigation",
              "threshold": 0.5
          }
      },
      "OfferFound": "Yes",
      "P1": 0,
      "consumoGas": {
          "gasto": "Consumption\u003C=5MWh",
          "tarifa": "R1"
      },
      "Session_ID": "73868513",
      "IdOferta": "ID73868513",
      "twoProducts": "SI",
      "DisplayPrice": "noCups"
  })
    // return this.makePetition('total-partner?_format=json', brandId);
  }

  async getApiConfig(): Promise<any> {
    return this.makePetition('total_rest_api?_format=json', {});
  }

  //recupera los tipos de popups y los guarda al hacer esta llamada en appInit
  async getPopups(): Promise<any> {
    return this.http.get(
      this.baseUrl + this.popupTextsUrl.concat(`?timestamp=${Date.now()}`),
    );
  }

  //recupera el codigo de verificacion del sms
  async getVerificationCode(hiringFormData: any): Promise<any> {
    return this.makePetition('total-verification?_format=json', hiringFormData);
  }

  async makePetition(url: string, data: any): Promise<any> {
    this.readApiConfig(url);
    const recaptchaToken = await this.createRecaptchaToken();
    const drupalData: any = await this.drupalAuth(this.baseUrl);
    const drupalSession: any = await this.drupalSessionToken(this.baseUrl);

    this.injectRecaptcha(url, data, recaptchaToken);
    data['referer'] = window.location.href;
    data['recaptchaObject'] = await this.getRecaptchaObject();

    return this.http.post(
      this.baseUrl + this.apiUrl + url,
      data,
      this.generateHeaders('Bearer ' + drupalData.access_token, drupalSession)
    );
  }

  async getRecaptchaObject() {
    const promise = new Promise((resolve, reject) => {
      this.http.get("https://api.ipify.org/?format=json").subscribe((result: any) => {
        resolve({
          userAgent: window.navigator.userAgent,
          hostname: window.location.hostname,
          userIpAddress: result.ip,
          expectedAction: {
            name: "createTokenAndNavigation",
            threshold: 0.5,
          }
        });
      });
    });
    return promise;
  }

  //autentificacion del token a drupal
  async drupalAuth(baseUrl?: string): Promise<any> {
    const formdata = new FormData();
      // tslint:disable-next-line: no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
        this.http.post(
          (baseUrl ? baseUrl : this.baseUrl) + this.drupalOAuthUrl,
          formdata,
          { responseType: 'json' }
        ).toPromise().then((data: any) => {
          resolve(data);
        }).catch((err: HttpErrorResponse) => {
          this.popups.openTokenError();
        });
      });
    return promise;
  }

  setConfig(configs: any) {
    this.configBaseURLs = configs;
  }

  //token de la sesion
  async drupalSessionToken(baseUrl?: string) {
		// tslint:disable-next-line: no-shadowed-variable
		const promise = new Promise((resolve, reject) => {
			this.http
				.get((baseUrl ? baseUrl : this.baseUrl) + this.drupalSessionAuthUrl, { responseType: "text" })
				.toPromise()
				.then((data: any) => {
					resolve(data);
				});
		});

		return promise;
  }

  private async createRecaptchaToken() {
    const promise = new Promise((resolve, reject) => {
      load(environment.site_key_recaptcha).then((recaptcha: { execute: (arg0: string) => Promise<any>; }) => {
        recaptcha.execute('createTokenAndNavigation').then((data: any) => {
          resolve(data);
        }).catch((err: HttpErrorResponse) => {
          this.popups.openTokenError();
        });
      });
    });
    return promise;
  }

  //genera los headers para enviar en la makePetition
  private generateHeaders(authtoken: string, sessionToken? : string) {
		if (sessionToken) {
			return {
				headers: new HttpHeaders({
					"Content-Type": "application/json",
					Authorization: authtoken,
					"X-CSRF-TOKEN": sessionToken
				}),
			};
		} else {
			return {
				headers: new HttpHeaders({
					"Content-Type": "application/json",
					Authorization: authtoken
				}),
			};
		}
	}

  private injectRecaptcha(url: string, data: any, recaptchaToken: unknown) {
    if (url.includes("total-partner")) {
      data['recaptchaToken'] = recaptchaToken;
    }
    else {
      data['recaptcha'] = recaptchaToken;
    }
  }

  private readApiConfig(url: string) {
    let pathWithoutQueryParams = url;
    if (url.indexOf('?') !== -1) {
      pathWithoutQueryParams = url.slice(0, url.indexOf('?'));
    }

    let configBaseUrl: string = this.configBaseURLs[pathWithoutQueryParams];
    if (configBaseUrl && configBaseUrl.endsWith('/')) {
      configBaseUrl = configBaseUrl.slice(0, configBaseUrl.lastIndexOf('/'));
    }
    this.baseUrl = configBaseUrl ? configBaseUrl : this.baseUrl;
  }

  //muestra los popups en el paso de verificacion de sms
  async showPopUpSms(systemError: string, AdmissionTypeLight__c: string, isLoadingEvent?: any, checkedOwner?: boolean) {
		(await this.getVerificationCode(this.formDto.getContratosPotencialesDirect(AdmissionTypeLight__c, checkedOwner))).pipe(take(1)).subscribe(
			(data: any) => {
				if (data && data.Message && data.Message === 'VerificationFailed') {
					this.popups.openCupsNoAviablePopUp(systemError);
				} else if(data && data.Message && data.Message === 'Banned') {
					this.popups.openGenericPopup("fraudulent", {}, {}, "fraudulent");
				} else if(data && data.Message && data.Message === 'changeOwner') {
					this.popups.openGenericPopup("cambio_titularidad", {}, {}, "sms", {isLoadingEvent});
				} else {
          isLoadingEvent.emit(false);
					if (data && data.Message && data.Message === "noApto") {
						this.popups.openScoringError();
						return;
					} else if (data && data.Message && data.Message === "isClient") {
						this.popups.openPopupClient(null, null);
						return;
					}
					this.popups.openGenericPopup('sms-verification', data, {}, 'sms-verification', null);
				}
				isLoadingEvent.emit(false);
			},
			(error: any) => {
				this.popups.openCupsNoAviablePopUp(systemError);
			}
		);
	}

  //envia la info al server despues de rellenar todos los datos, es el paso final de la contratacion
  async sendHiringFormToServer(altaDirecta: AltaDirecta, systemError: string, AdmissionTypeLight__c: string, isLoadingEvent?: any, 
    checkedOwner?: boolean, data?: any): Promise<any> {
		if (altaDirecta.Suministro_existente === "NO") {
			(await this.sendHiringForm(this.formDto.getContratosPotencialesDirect(AdmissionTypeLight__c, checkedOwner))).pipe(take(1)).subscribe(
				(data: any) => {
					if(data && data.Message && data.Message === 'Rejected') {
						let popupText = this.getPopupText(data);
						this.popups.openGenericPopup(popupText, {}, {}, "");
						isLoadingEvent.emit(false);
					} else if(data && data.Message && data.Message === 'Banned') {
						this.popups.openGenericPopup("fraudulent", {}, {}, "fraudulent");
					} else if(data && data.Message && data.Message === 'changeOwner') {
						this.popups.openGenericPopup("cambio_titularidad", {}, {}, "HiringFormToServer" , {isLoadingEvent});
					} else {
						this.tagManagerSrv.pushEventE2EEncripted(this.formDto.formData.mail, this.formDto.formData.phone.toString(), data.Message === "isClient" , data.Message !== "noApto");
						isLoadingEvent.emit(false);
						if (data && data.Message && data.Message === "noApto") {
							this.popups.openScoringError();
							return;
						}
						else if (data && data.Message && data.Message === "isClient") {
							this.popups.openPopupClient(null, null);
							return;
						}
            // pendiente de resolver duda cliente
						// this.paramsUrl.navigate("contrata/contratado");
					}
				},
				(error: any) => {
					this.popups.openCupsNoAviablePopUp(systemError);
				}
			);
		} else {
			(await this.sendHiringForm(this.formDto.getContratosPotenciales(AdmissionTypeLight__c, checkedOwner, data))).pipe(take(1)).subscribe(
				(data: any) => {
					if(data && data.Message && data.Message === 'Rejected') {
						let popupText = this.getPopupText(data);
						this.popups.openGenericPopup(popupText, {}, {}, "");
						isLoadingEvent.emit(false);
					} else if(data && data.Message && data.Message === 'Banned') {
						this.popups.openGenericPopup("fraudulent", {}, {}, "fraudulent");
					} else if(data && data.Message && data.Message === 'changeOwner') {
						this.popups.openGenericPopup("cambio_titularidad", {}, {}, "HiringFormToServer", {isLoadingEvent});
					} else {
						this.tagManagerSrv.pushEventE2EEncripted(this.formDto.formData.mail, this.formDto.formData.phone.toString(), data.Message === "isClient" , data.Message !== "noApto");
						isLoadingEvent.emit(false);
						if (data && data.Message && data.Message === "noApto") {
							this.popups.openScoringError();
							return;
						}
						else if (data && data.Message && data.Message === "isClient") {
						this.popups.openPopupClient(null, null);
						return
					}
					// this.paramsUrl.navigate("contrata/contratado");
					}
				},
				(error: any) => {
					this.popups.openCupsNoAviablePopUp(systemError);
				}
			);
		}
	}

  //cuando se envian los datos del formulario al recibir el tipo de dato 'Rejected', se muestra unos de los siguientes popups de error
	private getPopupText(data: any) {
		let popupText = '';
		if (data['Code Message'] === 'popup-phone-field-error') {
			popupText = 'phone-field-error';
			this.phoneValid = false;
			this.phoneValid_img = this.invalid;
		} else if (data['Code Message'] === 'popup-email-field-error') {
			popupText = 'email-field-error';
			this.mailValid = false;
			this.mailValid_img = this.invalid;
		}
		else {
			popupText = data['Code Message'].substring(6);
		}
		return popupText;
	}

  //envia los campos de los popups a drupal
  async sendPopupData(data:any): Promise<any> {
    return this.makePetition('total-displayed-popups?_format=json', data);
  }
}
