import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AfterViewInit, Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as literalsJson from '../../../../assets/i18n/sp.json'
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
// import { ParamsURLService } from 'src/app/services/params-url.service';
import { PopupsService } from '../../../services/popup.service';
import { ApicallsService } from '../../../services/apicalls.service';
import { TagManagerService } from '../../../services/tagManager.service';
import { AltaDirecta } from '../../../interfaces/interfaces';
import { FormDataDto } from '../../../services/formData.dto';
import { FileSizePipe } from '../../../pipes/bytes.pipe';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
		FileSizePipe
	]
})
export class GenericModalComponent implements OnInit, AfterViewInit {
  @ViewChild("formPopUps") formPopUp!: NgForm;
  srcValid = "assets/img/ico-tick-green.svg";
	srcInvalid = "assets/img/ico-close-red.svg";
  fields = [];
  actions = [];
  checkDatalayer = false;
  eventClient = '';
  popupName = '';
  datalayerCommentDefault: {message: string, type: string};
  options: {
    altaDirecta: AltaDirecta,
    AdmissionTypeLight__c?: string,
    isLoadingEvent?: any
  };
  smsButtonText = [{
    id: 'verificar-sms',
    text: 'Verificar SMS'
  }, {
    id: 'volver-a-enviar-sms',
    text: 'Volver a enviar el SMS'
  }];

  dataInfo: any;
  typeOfModal: string;
  popupContent: any;
  popupStyle: string = '';
  situation: string;
  links: {text: string, enlace: string, resetSession:boolean}[] = [];

  isSending = false;
  isSendingAgain = false;
  private popupTexts = [];
  private popupData: any = {};
  private formData: any;
  popUpInputData: any = {};
  isComplex: boolean = false;
  bodySections: string[] = [];
  private PLACEHOLDER_INPUTS = "#CAMPOS#";
  energy: any;
  cups: any;
  partner: any;
  offer: any;
  subject: string = '';

  literals = (literalsJson as any).default.popUps.c2c;
	literalsPopUp = (literalsJson as any).default.popUps;
  textButton = this.literalsPopUp.buttonText;
	systemError = "System error";
  isCodeError: boolean = false;
  resend_sms: boolean = true;
  textSmsError: string = '';
  isAlert = false;
  isManteinancePopup = false;
  hasInputIcon = false;
  inputIcon = "assets/img/phone.svg";

  //successType: string;

  constructor(
    private dialogRefence: MatDialogRef<GenericModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private popups: PopupsService,
    private fileSizePipe: FileSizePipe,
    private apiCalls: ApicallsService,
    private tagManagerSrv: TagManagerService,
		private formDto: FormDataDto,
		// private paramsUrl: ParamsURLService,
  ) {
    this.typeOfModal = data.type;
    this.popupTexts = data.dataInfo.popupTexts;    
    this.formData = data.dataInfo.formData;
    this.popupData = data.popupData;
    this.situation = data.popupType;
    //this.successType = data.successType;
    this.datalayerCommentDefault = data.datalayerComment;
    this.options = data.options;
    this.dialogRefence.disableClose = data.disableClose;
    this.dataInfo = data.dataInfo;
  }  

  ngOnInit(): void {
    this.getPopupText();
    /* if (this.successType) {
      this.dialogRefence.beforeClosed().subscribe(() => {
        this.popups.openNoConnectionForOneType(this.successType);
      });
    } */
    this.setupPopupMessage();
    this.checkIsBlocked();

    if(this.checkDatalayer) {
      this.tagManagerSrv.pushEvent(this.eventClient, this.popupName);
    }

    this.offer = this.dataInfo.offer;
    this.partner = this.dataInfo.partner;
    this.cups = this.dataInfo.cups;
		this.energy = this.cups ? this.cups.type : null;
		switch (this.situation) {
			case "AlreadyCustomer":
				this.subject = "Invoice client";
				break;
			case "NoOfferFound":
				this.subject = "No oferta disponible";
				break;
			case "Te-llamamos":
				this.subject = "Petición de llamada - " + this.typeOfPage();
				break;
      case "fraudulent":
        this.subject = 'fraudulent'
        this.textButton = this.literals.title.call;
        break;
      case "telegestion":
        this.subject = "telegestion";
        break;
      case "pagina_mantenimiento":
        this.subject = "Te llamamos PdR B2C";
        this.isManteinancePopup = true;
        break;
		}

    this.sendPopupData();
  }

  async getPopupText() {
    (await this.apiCalls.getPopups()).subscribe(
      (data: any) => {
        this.popupTexts = data;
      }
    );
  }

  async sendPopupData() {
    let dataPopUpJson: any = {
      field_admissiontypegas__c: null,
      field_admissiontypelight__c: this.options?.AdmissionTypeLight__c,
      field_cupsgas__c: this.cups.luz.cupsgas,
      field_cupslight__c: this.cups.luz.cupsluz,
      field_cups_type: this.cups.type,
      field_flow_type: this.cups.flow,
      field_offer_flow: this.offer.Type,
      field_partner_name: this.partner.Partner_name,
      field_event_client: this.popupContent.field_event_client,
      field_event_datalayer: this.popupContent.field_event_datalayer,
      field_dis_popup_url: window.location.href,
    };

    (await this.apiCalls.sendPopupData(dataPopUpJson)).subscribe(
      (data: any) => { }
    );
  }

  typeOfPage(): string {
		const url = window.location.href;
		let page = "";
		if (url.includes("suministro-existente")) {
			page = "Suministro existente screen";
		} else if (url.includes("identificar-cups")) {
			page = "Modo de calcular screen";
		} else if (url.includes("cups")) {
			page = "CUPS/factura screen";
		} else if (url.includes("contratacion")) {
			page = "Contratación screen";
		} else if (url.includes("tarifas")) {
			page = "Oferta screen";
		} else if (url.includes("servicios")) {
			page = "Funciona screen";
		} else if (url.includes("simulador")) {
			page = "Simulador screen";
		} else {
			page = "Tipo de energía screen";
		}
    return page;
  }

  callAction(i: number = 0) {
    let action = '';
    let popup_name = '';
    if(this.actions && this.actions.length > 0) {
      action = this.actions[i]['action'];
      popup_name = this.actions[i]['popup_name'];
    }
    if (action === "C2C") {
      const offer = this.dataInfo.offer;
      const lead = this.dataInfo.lead;

      let infoJson: any = {
        recaptcha: "",
        Flow: "C2C",
        Partner: this.partner.Partner_name,
        ScanID: "",
        Privacy: this.popUpInputData['Privacy'] ? "Yes" : "No",
        IdOferta: offer.IdOferta ? offer.IdOferta : "",
        IdProducto: offer.Productos ? offer.Producto1[0].IdProducto : this.cups.IdProducto ? this.cups.IdProducto : "",
        Nombre: this.popUpInputData['Nombre'] ? this.popUpInputData['Nombre'] : " ",
        Telefono: this.popUpInputData['Teléfono'] || this.popUpInputData['Teléfono móvil'],
        Legal_text: this.literalsPopUp.phoneCall.check + " " + this.literalsPopUp.phoneCall.text + " política de privacidad",
        Asunto: this.subject,
        lead: lead
      };
      if(this.popUpInputData['Email']) {
        infoJson.email = this.popUpInputData['Email'];
      }
      if (this.situation === 'AlreadyCustomer') {
        infoJson['is_client'] = true;
      }
      this.isSending = true;
      this.textButton = this.literalsPopUp.buttonTextSending;
      return this.sendInfo(infoJson);
    } else if (action === "Abre otro popup") {
      this.popups.openGenericPopup(popup_name.replace("popup-", ""), {}, {}, this.situation);
    } else if (action === 'verificar-sms') {
      this.isSending = this.isSendingAgain = true;
      this.smsVerification(this.options?.AdmissionTypeLight__c);
    } else if (action === 'volver-a-enviar-sms') {
      this.isSending = this.isSendingAgain = true;
      this.isCodeError = false;
      this.sendSms();
    } else if (action === 'cambiar_titular') {
      if(this.situation === 'sms') {
        this.options.isLoadingEvent.emit(true);
        this.apiCalls.showPopUpSms(this.systemError, 'CC_CT', this.options.isLoadingEvent, true);
      }
      if(this.situation === 'HiringFormToServer') {
        const data = {
          formData: this.formData,
          offer: this.dataInfo.offer,
          partner: this.dataInfo.partner,
          cups: this.dataInfo.cups,
          altaDirecta: this.dataInfo.altaDirecta,
          submission: this.dataInfo.submission,
          lead: this.dataInfo.lead,
      };
        this.options.isLoadingEvent.emit(true);
        this.apiCalls.sendHiringFormToServer(this.options.altaDirecta, this.systemError, 'CC_CT', this.options.isLoadingEvent, true);
      }
      this.dialogRefence.close();
    } else if (action === 'mantener_titular') {
      if(this.situation === 'sms') {
        this.options.isLoadingEvent.emit(true);
        this.apiCalls.showPopUpSms(this.systemError, 'CC', this.options.isLoadingEvent, true);
      }
      
      if(this.situation === 'HiringFormToServer') {
        this.options.isLoadingEvent.emit(true);
        this.apiCalls.sendHiringFormToServer(this.options.altaDirecta, this.systemError, 'CC', this.options.isLoadingEvent, true);
      }
      this.dialogRefence.close();
    }
    else {
      this.dialogRefence.close();
    }
  }

  async smsVerification(AdmissionTypeLight__c?: string | undefined) {
    let sendHiringFormV2Data = {
      ...this.formDto.getContratosPotencialesDirect(AdmissionTypeLight__c),
      contract: this.popupData.contract,
      codigoSMS: this.popUpInputData['código de verificación']
    };

    (await this.apiCalls.sendHiringFormV2(sendHiringFormV2Data)).pipe(take(1)).subscribe(
      (data: any) => {
        this.textSmsError = data.text;
        if (data && data.Message && data.Message === 'VerificationFailed') {
          this.isCodeError = true;
        } else {
          this.tagManagerSrv.pushEventE2EEncripted(this.formDto.formData.mail, this.formDto.formData.phone.toString(), data.Message === "isClient", data.Message !== "noApto");
          if (data && data.Message && data.Message === "noApto") {
            this.popups.openScoringError();
            return;
          }
          else if (data && data.Message && data.Message === "isClient") {
            this.popups.openPopupClient(null, null);
            return
          }
          this.popups.closeAll();
          // this.paramsUrl.navigate("contrata/contratado");
        }
        this.isSending = false;
        this.isSendingAgain = false;
      },
      (error: any) => {
        this.popups.openCupsNoAviablePopUp(this.systemError);
      }
    );
  }

  async sendSms() {
    let verificationCode = {
      ...this.formDto.getContratosPotencialesDirect(),
      resend_sms: this.resend_sms,
      contract: this.popupData.contract
    };

    (await this.apiCalls.getVerificationCode(verificationCode)).pipe(take(1)).subscribe(
      (data: any) => {
        if (data && data.Message && data.Message === 'VerificationFailed') {
          this.popups.openCupsNoAviablePopUp(this.systemError);
        } else {
          if (data && data.Message && data.Message === "noApto") {
            this.popups.openScoringError();
            return;
          }
          else if (data && data.Message && data.Message === "isClient") {
            this.popups.openPopupClient(null, null);
            return;
          }
          this.popupData = data;
        }
        if (!data.isBlocked) {
          this.isSending = false;
          this.isSendingAgain = false;
        } else {
          this.textSmsError = data.text;
          this.isCodeError = true;
        }
      },
      (error: any) => {
        this.popups.openCupsNoAviablePopUp(this.systemError);
      }
    );
  }

  checkIsBlocked() {
    if (!!this.popupData.isBlocked && this.popupData.isBlocked === true) {
      this.isSending = this.isSendingAgain = true;
      this.textSmsError = this.popupData.text;
      this.isCodeError = true;
    }
  }

  async sendInfo(info: any): Promise<any> {
    (await this.apiCalls.sendC2C(info)).subscribe((data: any) => {
      if (data.Message === 'Received' && this.situation !== 'pagina_mantenimiento') {
        this.tagManagerSrv.processIsContactEvent(data, info);
        this.popups.closeAll();
        if(this.typeOfModal !== 'popup-carrito-abandonado') {
          this.apiCalls.phoneCallIsSent = true;
          this.popups.openContactSuccess(/* info.Nombre */);
        }
      } else if (data.Message === 'Received' && this.situation === 'pagina_mantenimiento') {
        this.tagManagerSrv.processIsContactEvent(data, info);
        this.popups.closeAll();
        // this.paramsUrl.navigate("contrata/mantenimiento");
      } else if(data.Message === 'Rejected' && this.situation === 'fraudulent') {
        this.popups.closeAll();
        // this.paramsUrl.navigate("contrata/contrato-fallido");
			} else {
        this.popups.closeAll();
        this.popups.openGeneralError();
      }
    });
  }

  ngAfterViewInit(): void {
    this.options?.isLoadingEvent?.emit(false);
    const botonToggleFacilita: Element = document.getElementsByClassName("no-facilita")[0] || null;
    if (botonToggleFacilita) {
      botonToggleFacilita.addEventListener("click", () => {
        this.formData.funciona = this.formData.funciona2 = false;
        // this.dataSrv.saveFormData(this.formData);
        this.popups.dialog.closeAll();
      });
    }
  }

  setActionsButtonsText() {
    this.actions.forEach((action: { action: string; text?: string }) => {
      this.smsButtonText.forEach(sms => {
        if (action.action === sms.id) {
          action.text = sms.text;
        }
      });
    })
  }

  goTo(link: {text: string, enlace: string, resetSession:boolean}) {
    if(link.resetSession) {
      sessionStorage.clear();
    }
    this.popups.closeAll();
    window.location.href = window.location.origin + link.enlace;
  }

  setupPopupMessage() {
    this.isComplex = typeof this.popupTexts[this.typeOfModal as keyof typeof this.popupTexts] === "object";
    this.popupContent = this.popupTexts[this.typeOfModal as keyof typeof this.popupTexts];
    if (!!this.popupContent?.field_actions) {
      this.actions = Object.values(this.popupContent.field_actions);
    }

    this.actions.filter((action: { action: string; text: string }) => {
      if (action.action === 'redireccion-a') {
        this.links.push(JSON.parse(action.text));
      }
    });

    this.checkDatalayer = this.popupContent.field_check_datalayer;
    this.popupName = this.popupContent.field_event_client;
    this.eventClient = this.popupContent.field_event_datalayer;
    //this.setActionsButtonsText();

    if (this.isComplex) {
      this.fields = [];
      if (this.popupContent && this.popupContent.body) {
        if(this.popupContent.field_campos) {
          this.fields = Object.values(this.popupContent.field_campos);
          this.fields.forEach((field: { field_required: any; field_name: string }) => {
            field.field_required = field.field_required === '1' ? true : false;
            if (field.field_name === 'Teléfono' || field.field_name === 'Teléfono móvil') {
              this.popUpInputData[field.field_name] = this.popupData['telefono'];
              this.inputIcon = "assets/img/phone.svg"
              this.hasInputIcon = true;
            } else if (field.field_name === 'Email') {
              this.inputIcon = "assets/img/mail.svg"
              this.hasInputIcon = true;
            }
          });
        }

        this.popupContent.body = this.replacePlaceholders(this.popupContent.body, this.popupData);
        this.bodySections = this.popupContent.body.split(this.PLACEHOLDER_INPUTS);
        this.readStyleTagFromContent(this.popupContent.body);
      }
      this.isAlert = this.fields.length <= 0;
    }
    else {
      this.popupContent = this.popupTexts[this.typeOfModal as keyof typeof this.popupTexts];
      if (this.popupContent) {
        this.popupContent = this.replacePlaceholders(this.popupContent, this.popupData);
        this.readStyleTagFromContent(this.popupContent);
        console.log(this.popupContent);
      }  
    }
  }

  submit(formData: { submitted: boolean; valid: any; }, i?: number | undefined) {
    formData.submitted = true;
    if (formData.valid) {
      //TODO: okey
      this.callAction(i);
    }
  }

  private readStyleTagFromContent(content: string) {
    const positionOpenStyleTag = content.indexOf("<style");
    let styleContentStart = 0;
    if (positionOpenStyleTag !== -1) {
      styleContentStart = positionOpenStyleTag + 23;
    }

    const positionCloseStyleTag = content.indexOf("</style>");
    let styleContentEnd = -1;
    if (positionCloseStyleTag !== -1) {
      styleContentEnd = positionCloseStyleTag - 1;
    }

    if (styleContentStart !== -1 && styleContentEnd !== -1) {
      let contentStyle = content.substring(styleContentStart, styleContentEnd);
      contentStyle = contentStyle.replace(/(\r\n|\n|\r)/gm, "");

      const body = document.body;
      const style = document.createElement('style');
      style.type = 'text/css';
      style.appendChild(document.createTextNode(contentStyle));
      body.appendChild(style);
    }
  }

  private replacePlaceholders(content: string, variables: any) {
    if (!this.isObjectEmpty(this.popupData)) {
      Object.keys(variables).forEach((key: string) => {
        if (this.typeOfModal === 'popup-attachment_too_big') {
          variables[key] = this.fileSizePipe.transform(variables[key]);
        }
        content = content.replace(new RegExp('\{\{' + key + '\}\}'), variables[key]);
      });
    }
    
    return content;
  }

  private isObjectEmpty = (objectName: {}) => {
    return Object.keys(objectName).length === 0
  }

  closePopUp() {
    this.dialogRefence.close(true);
  }
}
