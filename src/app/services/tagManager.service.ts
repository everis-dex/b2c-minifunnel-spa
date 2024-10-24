import { Injectable } from '@angular/core';
import { gtmTag } from '../interfaces/interfaces';
import sha256 from 'crypto-js/sha256';
import Hex from "crypto-js/enc-hex"

declare global {
  interface Window { dataLayer: any[]; }
}

@Injectable({
  providedIn: 'root'
})
export class TagManagerService {

  constructor() { }

  setfunnelStepB2cEvent() {
    window.dataLayer.push(
      {'event': 'funnel_step_b2c'}
    );
  }
  
  pushTag(gtmTag: gtmTag) {
    window.dataLayer.push(gtmTag);
  }

  pushPagename(name:string) {
    window.dataLayer.push({
      'page_name': name,
    });
    this.setfunnelStepB2cEvent();
  }

  pushSegment(partnerSegment:string) {
    if(partnerSegment) {
      window.dataLayer.push({
        'segmento': partnerSegment,
      });
    }
  }

  pushErrorEvent(eventName: string) {
    window.dataLayer.push({
      'event': 'error_funnel_b2c',
      'error_event': eventName,
    });
  }

  pushEvent(eventName: string, eventDatalayer?: string) {
    window.dataLayer.push({
      'event': eventDatalayer,
      'popupName': eventName
    });
  }
  
  processIsContactEvent(data: any, info?: any) {
    if (data.Event_IsClient) {
      let phoneFormatted;
      let event: { event: string; phone?: string; email?: string } = {
        event: data.Event_IsClient,
      };
      
      if(info?.Telefono) {
        phoneFormatted = this.formatPhoneNumber(info.Telefono);
        event.phone = sha256(phoneFormatted).toString(Hex);
      }
      if(info?.email) {
        event.email = sha256(info.email).toString(Hex);
      }

      window.dataLayer.push(event);
    }
  }

  pushEventE2EEncripted(email: string, phone: string, isClient: boolean, isGoodScoring: boolean): void {
    phone = this.formatPhoneNumber(phone);

    const event = {
      event: "e2e-enviado-push",
      user: isClient ? "KNOWN" : "UNKNOWN",
      status: isGoodScoring ? "OK" : "KO",
      phone: sha256(phone).toString(Hex),
      mail: sha256(email).toString(Hex)
    }
    window.dataLayer.push(event);
  }

  private formatPhoneNumber(phone: string): string {
    phone = phone.trim();

    if (phone.length > 9) {
      phone = phone.slice(-9);
    }
    
    if (phone.length === 9) {
      phone = "+34".concat(phone);
    }

    return phone;
  }

}
