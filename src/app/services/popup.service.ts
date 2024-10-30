import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PopUpClientComponent } from '../shared/pop-ups/pop-up-client/pop-up-client.component';
import { TagManagerService } from './tagManager.service';
import { GenericModalComponent } from '../shared/pop-ups/generic/generic-modal.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Injectable } from '@angular/core';
import { PhonecallComponent } from '../shared/phonecall/phonecall.component';


@Injectable({
  providedIn: 'root',
})
export class PopupsService {
  generalError = 'System error';
  noExistsCups = 'No technical info found';
  noDataFromCups = 'Some techinical info missing';
  clientAlreadyExists =
    'User is already a customer for electricity/gas/electricity and gas';
  noProductsAviable =
    'No online products are available for electricity/gas/electricity and gas';
  noProductsAvailable = 'noProductsAvailable';
  noCupsFile = 'noCupsFile';

  constructor(public dialog: MatDialog, private router: Router, private tagManagerSrv: TagManagerService,
    private deviceService: DeviceDetectorService) {}

  openPrivacyPolicy(tipo: string): void {
    this.openGenericPopup('tipo', {}, {});
  }

  openGeneralError(modalType?: boolean): void {
    this.openGenericPopup("generic-error", {}, {}, "NoOfferFound");
  }

  openTokenError(modalType?: boolean): void {
    this.openGenericPopup('errorToken', {}, {}).subscribe((data) => {
      location.href =
        'https://www.totalenergies.es/es/hogares/atencion-al-cliente/contacto';
    });
  }


  openCupsError(): void {
    this.openGenericPopup("cups_error", {}, {}, "NoOfferFound");
  }

  openScoringError(): void {
    this.tagManagerSrv.pushErrorEvent('e2e_scoring_ko');
    this.openCupsNoAviablePopUp('scoringError');
  }

  openClientError(): void {
    this.openCupsNoAviablePopUp('isClientError');
  }

  openPartnerError(): Observable<void> {
    return this.openGenericPopup('generalError', {}, {});
}

  openCupsNoAviablePopUp(modalType: string): void {
    this.openGenericPopup(modalType, {}, {});
  }

  openContactSuccess(): void {
    this.openGenericPopup('success', {}, {});
  }

  openNoConnectionForOneType(situation: string): void {
    this.openGenericPopup(situation, {}, {});
  }

  showCupsErrors(errorType: string): void {
    switch (errorType) {
      case this.noExistsCups:
        this.openCupsNoAviablePopUp('noExistsCups');
        break;
      case this.noDataFromCups:
        this.openCupsNoAviablePopUp('noDataFromCups');
        break;
      case this.noProductsAviable:
        this.openCupsNoAviablePopUp('noProductsAviable');
        break;
      case this.clientAlreadyExists:
        this.openGenericPopup('AlreadyCustomer', {}, {});
        break;
      case this.noProductsAvailable: {
        this.openCupsNoAviablePopUp('noProductsAviable');
        break;
      }
      case this.noCupsFile:
        this.openCupsNoAviablePopUp('noFoundCups');
        break;
      case 'noExistsCups':
        this.openCupsNoAviablePopUp('noExistsCups');
        break;
      default:
        this.openCupsNoAviablePopUp('generalError');
        break;
    }
  }

  closeAll(): void {
    this.dialog.closeAll();
  }

  openformError(): void {
    this.openGenericPopup("error_validacion_formulario", {}, {});
  }

  openPopupClient(recaptcha: any, phone: any): void {
    const dialogRef = this.dialog.open(PopUpClientComponent, {
      data: { recaptcha, phone },
      width: this.getWidth('', null, null, true),
      maxWidth: undefined,
      panelClass: "dialog-responsive"
    });
  }

  openPartnerNoPublished() {
    this.openGenericPopup("partner_nopublicado", {}, {});
  }

  openPhoneCallComponent(): void {
    this.dialog.open(PhonecallComponent, {
      panelClass: 'mat-dialog-phonecall',
    });
  }

  openGenericPopup(modalType: string, popupData: any = {}, dataInfo: any, situation?: string, options?: any, disableClose = true) {
    const dialogRef = this.dialog.open(GenericModalComponent, {
      data: {
        type: "popup-"+modalType,
        popupData: popupData,
        popupType: situation,
        options: options,
        disableClose: disableClose,
        dataInfo: dataInfo,
      },
      width: this.getWidth('popup-'+modalType, situation, popupData.text),
      maxWidth: undefined,
      panelClass: "dialog-responsive"
    });
    return dialogRef.afterClosed();
  }

  private getWidth(typeOfModal: string, situation: any, popupTexts?: any, isAlert2Button = false) {
    let popupContent = popupTexts[typeOfModal];
    if (this.deviceService.isMobile()) {
      return '343px';
    } else {
      let hasFields = popupContent?.field_campos ? Object.values(popupContent.field_campos).length > 0 : false;
      if ((hasFields || isAlert2Button || typeOfModal === 'popup-cambio_titularidad') && situation !== 'sms-verification') {
        return '622px';
      } else {
        return '408px';
      }
    }
  }

}
