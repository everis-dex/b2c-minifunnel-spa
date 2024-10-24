import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { C2C, Cups, FormData, Offers } from './../../../interfaces/interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormDataPopUp } from '../../../interfaces/interfaces';
import { ApicallsService } from '../../../services/apicalls.service';
import { FormHelperService } from '../../../services//form-helper.service';
import { PopupsService } from '../../../services/popup.service';
import { Router } from '@angular/router';
import * as literalsJson from '../../../../assets/i18n/sp.json'

import { TagManagerService } from '../../../services/tagManager.service'


@Component({
  selector: 'app-pop-up-client',
  templateUrl: './pop-up-client.component.html',
  styleUrls: ['./pop-up-client.component.scss'],
})
export class PopUpClientComponent implements OnInit {
  textButton = 'popUps.buttonText';
  isSending = false;
  formdata: FormDataPopUp = {};
  formdatas!: FormData;
  @ViewChild('formPopUps')
    formPopUp!: NgForm;
  srcValid = 'assets/icons/ico-tick.svg';
  srcInvalid = 'assets/img/ico-close-red.svg';
  inputMailValid = false;
  inputMailError = false;
  inputPhoneInitValid = false;
  inputPhoneInitError = false;
  info!: C2C;
  partner: any;
  cups!: Cups;
  offer!: Offers;
  dataRecaptcha: any;
  isChecked!: Boolean;
  literalsPopUp = (literalsJson as any).popUps;
  phoneNumber: any;
  dataInfo: any;
  constructor(
    private dialogRef: MatDialogRef<PopUpClientComponent>,
    private popups: PopupsService,
    private apicallsSrv: ApicallsService,
    private formHelper: FormHelperService,
    private router: Router,
    private tagManagerSrv: TagManagerService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.formdata.path = window.location.pathname;
    this.dataRecaptcha = data.recaptcha;
    this.phoneNumber = data.phone;
    this.dialogRef.disableClose = data.disableClose;
    this.dataInfo = data.dataInfo;
  }

  ngOnInit(): void {
    this.partner = this.dataInfo.partner;
    this.cups = this.dataInfo.cups;
    this.offer = this.dataInfo.offer;
    if(this.phoneNumber){
      this.formdata.phone = this.phoneNumber;
      this.ValidatePhoneNumber(this.phoneNumber);
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

  async submit(f: NgForm): Promise<any> {

    this.isSending = true;
    if (this.inputPhoneInitValid) {
      this.info = {
        recaptcha: this.dataRecaptcha,
        Flow: 'C2C',
        Partner: this.partner.Partner_name,
				Partner_fields: this.partner?.Partner_fields ?? [],
        ScanID: '',
        Privacy: this.isChecked ? 'Yes' : 'No',
        IdOferta: this.offer.IdOferta ? this.offer.IdOferta : '',
        IdProducto: this.offer.Producto1 ? this.offer.Producto1[0].IdProducto : this.cups.IdProducto ? this.cups.IdProducto : '',
        Nombre:  ' ',
        Telefono: f.form.value.phone,
        Legal_text: this.literalsPopUp.phoneCall.check + ' ' + this.literalsPopUp.phoneCall.text + ' política de privacidad',
        Asunto: 'Invoice client',
        is_client: true
      };
      this.textButton = 'popUps.buttonTextSending';
      this.sendInfo(this.info);
    }
  }

  async sendInfo(info: any) {
    (await this.apicallsSrv.sendC2C(info)).subscribe((data: any) => {
      
      if (data.Message === 'Received') {
        this.tagManagerSrv.processIsContactEvent(data, info);
        this.dialogRef.close({ sendRates: true });
        window.location.href = "https://www.totalenergies.es/es/hogares/atencion-al-cliente/que-necesitas"
      } else if(data.Message === 'Banned') {
				this.popups.openGenericPopup("fraudulent", {}, {}, "fraudulent");
			} else {
        this.openError();
      }
    });
  }

  openError() {
    this.popups.openGeneralError();
  }

  closePopUp() {
    this.dialogRef.close(true);
  }
}
