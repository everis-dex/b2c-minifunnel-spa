import { Injectable } from '@angular/core';
import { ContratosPotenciales, FormData, Cups, Offers, AltaDirecta } from './../interfaces/interfaces';
import { FormHelperService } from './form-helper.service';

@Injectable({
    providedIn: 'root',
})
export class FormDataDto {

    formData!: FormData;
    offer!: Offers;
    contratosPotenciales: ContratosPotenciales = { Partner_fields: [], Alta_directa: {} };
    recaptcha!: string;
    idFunciona!: string;
    partner: any;
    cups!: Cups;
    altaDirecta!: AltaDirecta;
    submission: any;
    lead: any;

    constructor(private formHelper: FormHelperService) { }

      //sustituir todo lo del dataSrv: DataService


    getContratosPotenciales(AdmissionTypeLight__c?: string, checkedOwner?: boolean, data?: any): ContratosPotenciales {
        this.formData = data.formData;
        this.offer = data.offer;
        this.partner = data.partner;
        this.cups = data.cups;
        this.altaDirecta = data.altaDirect;
        this.submission = data.submussion;
        this.lead = data.lead;
        this.contratosPotenciales = this.getProductPotenciales(data);

        //BORJA ARAGONESES
        this.contratosPotenciales.allOffer = this.offer;
        this.contratosPotenciales.allPartner = this.partner;
        this.contratosPotenciales.allCups = this.cups;
        this.contratosPotenciales.allAltaDirecta = this.altaDirecta;
        this.contratosPotenciales.allSubmission = this.submission;
        this.contratosPotenciales.allLead = this.lead;

        this.contratosPotenciales.IdOferta = this.offer.IdOferta;
        this.contratosPotenciales.Nombre_Titular = this.formData.name;
        this.contratosPotenciales.Apellidos_Titular = this.formData.surname;
        this.contratosPotenciales.DNI_CIF_Titular = this.formData.idNum;
        this.contratosPotenciales.Telefono_pref_1 = this.formData.phone.toString();
        this.contratosPotenciales.Provincia_PS = this.formHelper.provinceFilter(this.formData.province) + ' - ' + (this.formData.province?.toUpperCase() ?? '');
        this.contratosPotenciales.Municipio_PS = this.formData.municipality;
        this.contratosPotenciales.Poblacion_PS = this.formData.town? this.formData.town : '';
        this.contratosPotenciales.Tipo_Via_PS = this.removeDiacritics(this.formData.roadType || '').toUpperCase();
        this.contratosPotenciales.Calle_PS = this.formData.address;
        this.contratosPotenciales.Numero_PS = this.formData.addressNum;
        this.contratosPotenciales.Piso_PS = this.formData.aptNum ? this.formData.aptNum : '';
        this.contratosPotenciales.Puerta = this.formData.door ? this.formData.door : '';
        this.contratosPotenciales.Cod_Postal_PS = this.formData.postCode;
        this.contratosPotenciales.Contrata_Opcion_Clima = this.formData.funcionaClima ? 'SI' : 'NO';
        this.contratosPotenciales.Correo_electron = this.formData.mail;
        this.contratosPotenciales.Cuenta_Bancaria = this.formData.iban?.toUpperCase().replace(/ /g, '').replace(/-/g, '');
        this.contratosPotenciales.EDP_Click = this.formData.discountclick ? 'SI' : 'NO';
        this.contratosPotenciales.EXPL_PERFLD_TIT = this.formData.check4 ? 'SI' : 'NO';
        this.contratosPotenciales.EXPL_ABAND_PROD_TIT = this.formData.check3 ? 'SI' : 'NO';
        this.contratosPotenciales.CONSENTIM_IMPLICITO_RGPD = 'SI';
        this.contratosPotenciales.Cambio_titular = this.formData.Cambio_titular ? 'SI' : 'NO';
        this.contratosPotenciales.Idioma = 'ESPAÑOL';
        this.contratosPotenciales.idRegistro = this.formData.idRegistro;
        if (this.cups.luz &&this.cups.luz.cupsluz) {
            this.contratosPotenciales.cupsLuz = this.cups.luz.cupsluz;
        } else if (this.cups.gas && this.cups.gas.cupsgas) {
            this.contratosPotenciales.cupsGas = this.cups.gas.cupsgas;
        }
        if (this.cups.Partner !== 'default') {
            this.contratosPotenciales.Partner = this.cups.Partner;
            this.contratosPotenciales.Partner_present = this.partner
                .Present_Selected
                ? this.partner.Present_Selected
                : '';
            this.contratosPotenciales.Partner_fields = this.partner
                .Partner_fields
                ? this.partner.Partner_fields
                : '';
        } else {
            this.contratosPotenciales.Partner = 'default';
            this.contratosPotenciales.Partner_present = '';
        }
        this.contratosPotenciales.Suministro_existente = this.altaDirecta.Suministro_existente;
        this.contratosPotenciales.Alta_directa = this.contratosPotenciales.Alta_directa || {};
        this.contratosPotenciales.Alta_directa.Alta_directa_gas = this.altaDirecta.Alta_directa_gas ? this.altaDirecta.Alta_directa_gas : '';
        this.contratosPotenciales.Alta_directa.Alta_directa_luz = this.altaDirecta.Alta_directa_luz ? this.altaDirecta.Alta_directa_luz : '';
        this.contratosPotenciales.Alta_directa.Alta_nueva_luz = this.altaDirecta.Alta_nueva_luz ? this.altaDirecta.Alta_nueva_luz : '';
        this.contratosPotenciales.Alta_directa.Certificado_luz = this.altaDirecta.Certificado_luz ? this.altaDirecta.Certificado_luz : '';
        this.contratosPotenciales.Alta_directa.Cups_gas = this.cups.gas?.cupsgas ? this.cups.gas.cupsgas : '';
        this.contratosPotenciales.Alta_directa.Cups_luz = this.cups.luz?.cupsluz ? this.cups.luz.cupsluz : '';
        this.contratosPotenciales.Alta_directa.PotenciaP1 = this.altaDirecta.PotenciaP1 ? this.altaDirecta.PotenciaP1 : '';
        this.contratosPotenciales.Alta_directa.PotenciaP2 = this.altaDirecta.PotenciaP2 ? this.altaDirecta.PotenciaP2 : '';
        this.contratosPotenciales.CONSEN_TOTAL_ALTA_DATADIS = this.formData.checkAltaDatadis ? 'SI' : 'NO';
        this.contratosPotenciales.CONSEN_TOTAL_VIS_DAT_SUMI = this.formData.checkVisDatSumi ? 'SI' : 'NO';
        this.contratosPotenciales.descuentoAplicado = this.formData.descuentoAplicado;
        this.contratosPotenciales.allLead = this.lead;

        if(AdmissionTypeLight__c) {
            this.contratosPotenciales.AdmissionTypeLight__c = AdmissionTypeLight__c;
        }
        if(checkedOwner) {
            this.contratosPotenciales.checkedOwner = checkedOwner;
        }

        return this.contratosPotenciales;
    }

    getContratosPotencialesDirect(AdmissionTypeLight__c?: string, checkedOwner?: boolean, data?: any): ContratosPotenciales {
        this.formData = data.formData;
        this.offer = data.offer;
        this.partner = data.partner;
        this.cups = data.cups;
        this.altaDirecta = data.altaDirect;
        this.submission = data.submussion;
        this.lead = data.lead;
        this.contratosPotenciales = this.getProductPotenciales(data);

        //BORJA ARAGONESES
        this.contratosPotenciales.allOffer = this.offer;
        this.contratosPotenciales.allPartner = this.partner;
        this.contratosPotenciales.allCups = this.cups;
        this.contratosPotenciales.allAltaDirecta = this.altaDirecta;
        this.contratosPotenciales.allSubmission = this.submission;


        this.contratosPotenciales.IdOferta = this.offer.IdOferta;
        this.contratosPotenciales.Nombre_Titular = this.formData.name;
        this.contratosPotenciales.Apellidos_Titular = this.formData.surname;
        this.contratosPotenciales.DNI_CIF_Titular = this.formData.idNum;
        this.contratosPotenciales.Telefono_pref_1 = this.formData.phone.toString();
        this.contratosPotenciales.Provincia_PS = this.formHelper.provinceFilter(this.formData.province) + ' - ' + (this.formData.province?.toUpperCase() ?? '');
        this.contratosPotenciales.Municipio_PS = this.formData.municipality;
        this.contratosPotenciales.Poblacion_PS = this.formData.town;
        this.contratosPotenciales.Tipo_Via_PS = this.removeDiacritics(this.formData.roadType || '').toUpperCase();
        this.contratosPotenciales.Calle_PS = this.formData.address;
        this.contratosPotenciales.Numero_PS = this.formData.addressNum;
        this.contratosPotenciales.Piso_PS = this.formData.aptNum ? this.formData.aptNum : '';
        this.contratosPotenciales.Puerta = this.formData.door ? this.formData.door : '';
        this.contratosPotenciales.Cod_Postal_PS = this.formData.postCode;
        this.contratosPotenciales.Contrata_Opcion_Clima = this.formData.funcionaClima ? 'SI' : 'NO';
        this.contratosPotenciales.Correo_electron = this.formData.mail;
        this.contratosPotenciales.Cuenta_Bancaria = this.formData.iban?.toUpperCase().replace(/ /g, '').replace(/-/g, '');
        this.contratosPotenciales.EDP_Click = this.formData.discountclick ? 'SI' : 'NO';
        this.contratosPotenciales.EXPL_PERFLD_TIT = this.formData.check4 ? 'SI' : 'NO';
        this.contratosPotenciales.EXPL_ABAND_PROD_TIT = this.formData.check3 ? 'SI' : 'NO';
        this.contratosPotenciales.CONSENTIM_IMPLICITO_RGPD = 'SI';
        this.contratosPotenciales.Cambio_titular = this.formData.Cambio_titular ? 'SI' : 'NO';
        this.contratosPotenciales.Idioma = 'ESPAÑOL';
        this.contratosPotenciales.idRegistro = this.formData.idRegistro;
        if (this.cups.Partner !== 'default') {
            this.contratosPotenciales.Partner = this.cups.Partner;
            this.contratosPotenciales.Partner_present = this.partner.Present_Selected ? this.partner.Present_Selected : '';
            this.contratosPotenciales.Partner_fields = this.partner.Partner_fields ? this.partner.Partner_fields : '';
        } else {
            this.contratosPotenciales.Partner = 'default';
            this.contratosPotenciales.Partner_present = '';
        }
        this.contratosPotenciales.Suministro_existente = this.altaDirecta.Suministro_existente;
        this.contratosPotenciales.Alta_directa = this.contratosPotenciales.Alta_directa || {};
        this.contratosPotenciales.Alta_directa.Alta_directa_gas = this.altaDirecta.Alta_directa_gas ? this.altaDirecta.Alta_directa_gas : '';
        this.contratosPotenciales.Alta_directa.Alta_directa_luz = this.altaDirecta.Alta_directa_luz ? this.altaDirecta.Alta_directa_luz : '';
        this.contratosPotenciales.Alta_directa.Alta_nueva_luz = this.altaDirecta.Alta_nueva_luz ? this.altaDirecta.Alta_nueva_luz : '';
        this.contratosPotenciales.Alta_directa.Certificado_luz = this.altaDirecta.Certificado_luz ? this.altaDirecta.Certificado_luz : '';
        this.contratosPotenciales.Alta_directa.Cups_gas = this.cups.gas?.cupsgas ? this.cups.gas.cupsgas : '';
        this.contratosPotenciales.Alta_directa.Cups_luz = this.cups.luz?.cupsluz ? this.cups.luz.cupsluz : '';
        this.contratosPotenciales.Alta_directa.PotenciaP1 = this.altaDirecta.PotenciaP1 ? this.altaDirecta.PotenciaP1 : '';
        this.contratosPotenciales.Alta_directa.PotenciaP2 = this.altaDirecta.PotenciaP2 ? this.altaDirecta.PotenciaP2 : '';
        this.contratosPotenciales.CONSEN_TOTAL_ALTA_DATADIS = this.formData.checkAltaDatadis ? 'SI' : 'NO';
        this.contratosPotenciales.CONSEN_TOTAL_VIS_DAT_SUMI = this.formData.checkVisDatSumi ? 'SI' : 'NO';
        this.contratosPotenciales.descuentoAplicado = this.formData.descuentoAplicado;
        this.contratosPotenciales.allLead = this.lead;

        if(AdmissionTypeLight__c) {
            this.contratosPotenciales.AdmissionTypeLight__c = AdmissionTypeLight__c;
        }
        if(checkedOwner) {
            this.contratosPotenciales.checkedOwner = checkedOwner;
        }

        return this.contratosPotenciales;
    }

    removeDiacritics(s: string): string {
        s = s.toLowerCase();
        const non_asciis: { [key: string]: string } = {
            a: '[àáâãäå]',
            ae: 'æ',
            c: 'ç',
            e: '[èéêë]',
            i: '[ìíîï]',
            n: 'ñ',
            o: '[òóôõö]',
            oe: 'œ',
            u: '[ùúûűü]',
            y: '[ýÿ]',
        };
        for (let i in non_asciis) {
            s = s.replace(new RegExp(non_asciis[i], 'g'), i);
        }
        return s;
    }

    private getProductPotenciales(data: any) {
        var offerSelected = data.offerSelected;
        var offerSelectedFacilita = data.offerDualSelectedFacilita;
        
        var offerDualSelected = data.offerDualSelected;
        var offerDualSelectedFacilita = data.offerDualSelectedFacilita;

        this.contratosPotenciales.productSelected = !this.formData.facilitaSelected ? offerSelected : offerSelectedFacilita;
        if (this.formData.facilitaPRD) {
            this.contratosPotenciales.facilitaSelected = this.formData.facilitaPRD;
        }
        if (this.formData.digitalProductSelected) {
            this.contratosPotenciales.productDigital = this.formData.digitalProductSelected;
        }
        if (this.cups.type === 'luz-gas') {
            this.contratosPotenciales.productGasDualSelected = !this.formData.facilitaSelected ? offerDualSelected : offerDualSelectedFacilita;  
        }

        return this.contratosPotenciales;
    }
}