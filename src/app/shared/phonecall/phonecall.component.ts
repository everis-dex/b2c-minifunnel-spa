import { ApicallsService } from './../../services/apicalls.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PopupsService } from './../../services/popup.service';
//import { ReCaptchaV3Service } from 'ng-recaptcha';
import { load } from 'recaptcha-v3-enterprise';
import { C2C } from './../../interfaces/interfaces';
import { environment } from '../../../environments/environment';
import { FormHelperService } from './../../services/form-helper.service';
import * as literalsJson from './../../../assets/i18n/sp.json';
import { TagManagerService } from './../../services/tagManager.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { TranslatePipe } from '@codeandweb/ngx-translate';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-phonecall',
  templateUrl: './phonecall.component.html',
  styleUrls: ['./phonecall.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, TranslatePipe, ButtonComponent],
})

export class PhonecallComponent implements OnInit {
  isVisible = true;
  @Output() isVisibleEvent = new EventEmitter<boolean>();
  @Input() noC2C: any;
  @Input() isFacilitaDual: any;
  @Input() flow: any;
  partnerPhone: string = '';
  isChecked: boolean = false;
  isSending = false;
  srcValid = 'assets/icons/ico-tick.svg';
  srcInvalid = 'assets/img/ico-close-red.svg';
  infoJson?: C2C;
  domainUrl = environment.documents_url;
  partner: any;
  inputPhoneInitValid = false;
  inputPhoneInitError = false;
  literalsPopUp = (literalsJson as any).default.popUps;
  flowArr = ['facilita', 'twoP'];
  mobileMode: boolean = false;

  constructor(
    private popups: PopupsService,
    private formHelper: FormHelperService,
    private apiCallsSrv: ApicallsService,
    //private recaptchaV3Service: ReCaptchaV3Service,
    private popService: PopupsService,
    private tagManagerSrv: TagManagerService
  ) {}

  ngOnInit(): void {
    this.partner = this.apiCallsSrv.recoverPartnerData(''); // Temporal 
    this.noC2C = this.partner.No_C2C ? this.partner.No_C2C : 'FALSE';

    if (this.partner.Partner_name) {
      this.partnerPhone = this.partner.Phone
        ? this.partner.Phone
        : this.partnerPhone;
    } else {
      this.partnerPhone = '900670503';
    }

    if (this.partner && this.partner.Partner_name === 'Default' && this.noC2C === 'TRUE') {
      this.tagManagerSrv.pushErrorEvent('no_salta_c2c');
    }

    this.flowMobile();
  }

  close(): void {
    this.isVisibleEvent.emit(false);
    this.isVisible = false;
  }

  openDialog(): void {
    //const dialogRef = this.popService.openC2CPopUp('Te-llamamos');
    if(!this.apiCallsSrv.phoneCallIsSent) {
      const dialogRef = this.popService.openGenericPopup('te-llamamos', {}, 'Te-llamamos');
    } else {
      this.popups.openContactSuccess(/* ' ' */);
    }
  }

  ValidatePhoneNumber(num: number): void {
    if (this.formHelper.validatePhoneNum(num.toString())) {
      this.inputPhoneInitValid = true;
      this.inputPhoneInitError = false;
    } else {
      this.inputPhoneInitError = true;
      this.inputPhoneInitValid = false;
    }
  }

  submitClicked(f: NgForm): void {
    if (f.valid && this.inputPhoneInitValid) {
      this.isSending = true;
      // const offer = this.apiCallsSrv.recoverPartnerData(''); // Temporal 
      const partner = this.apiCallsSrv.recoverPartnerData(''); // Temporal 
      // const lead = this.apiCallsSrv.recoverPartnerData(''); // Temporal 
      this.infoJson = {
        recaptcha: '',
        Flow: 'C2C',
        // Partner: partner.Partner_name,
        Partner: 'partner',
				// Partner_fields: partner?.Partner_fields ?? [],
        ScanID: '',
        Privacy: this.isChecked ? 'Yes' : 'No',
        // IdOferta: offer.IdOferta ? offer.IdOferta : '',
        // IdProducto: offer.Productos ? offer.Producto1[0].IdProducto : '',
        Nombre: f.form.value.nameAndSurname ? f.form.value.nameAndSurname : ' ',
        Telefono: f.form.value.telephoneNumber,
        Legal_text: this.literalsPopUp.phoneCall.check + ' ' + this.literalsPopUp.phoneCall.text + ' política de privacidad',
        Asunto: 'Petición de llamada - ' + this.typeOfPage(),
        // lead: lead
      };
      /* this.recaptchaV3Service
        .execute('createTokenAndNavigation')
        .subscribe((recaptchaToken) => {
          this.infoJson.recaptcha = recaptchaToken;
          return this.sendInfo(this.infoJson);
      }); */
      load(environment.site_key_recaptcha).then((recaptcha) => {
        recaptcha.execute('createTokenAndNavigation').then((recaptchaToken) => {
          
          // this.infoJson['recaptcha'] = recaptchaToken;

          if (this.infoJson) {
            this.infoJson.recaptcha = recaptchaToken;
          }
          
          return this.sendInfo(this.infoJson);
        });
      });
    }
  }

  async sendInfo(info: any): Promise<any> {
    (await this.apiCallsSrv.sendC2C(info)).subscribe((data: any) => {
      this.isSending = false;
      if (data.Message === 'Received') {
        this.tagManagerSrv.processIsContactEvent(data, info);
        this.apiCallsSrv.phoneCallIsSent = true;
      } else if(data.Message === 'Banned') {
				this.popups.openGenericPopup("fraudulent", {}, "fraudulent");
			} else {
        this.popups.openGeneralError();
      }
    });
  }

  typeOfPage(): string {
    const url = window.location.href;
    let page = '';
    if (url.includes('suministro-existente')) {
      page = 'Suministro existente screen';
    } else if (url.includes('identificar-cups')) {
      page = 'Modo de calcular screen';
    } else if (url.includes('cups')) {
      page = 'CUPS/factura screen';
    } else if (url.includes('contratacion')) {
      page = 'Contratación screen';
    } else if (url.includes('tarifas')) {
      page = 'Oferta screen';
    } else if (url.includes('servicios')) {
      page = 'Funciona screen';
    } else if (url.includes('simulador')) {
      page = 'Simulador screen';
    } else {
      page = 'Tipo de energía screen';
    }
    return page;
  }

  flowMobile() {
    this.flowArr.forEach((f) => {
      if (f === this.flow) {
        this.mobileMode = true;
      }
    });

  }
}