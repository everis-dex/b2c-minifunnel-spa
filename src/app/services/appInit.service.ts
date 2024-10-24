import { Injectable } from '@angular/core';
import { ApicallsService } from './apicalls.service';

@Injectable()
export class AppInitService {
  private partner_default = '22354f49';
  private metatagDefault = {
    title: '¡Contrata la Tarifa de Luz más Barata! - TotalEnergies',
    description: 'Sube tu factura y te bajamos el precio ¡Garantizado! Tenemos la tarifa de luz más barata. ¿A qué esperar para ahorrar en tu factura?'
  }
  
  constructor(
    private apiCall: ApicallsService,
  ) { }

  
  Init() {
    return new Promise<void>(async (resolve, reject) => {
      (await this.apiCall.getApiConfig()).subscribe(
        (config: any) => { this.apiCall.setConfig(config) }, 
        (error: any) => this.getParnerData(resolve), 
        () => this.getParnerData(resolve)
      );
    });
  }

  async getParnerData(resolve: any) {
    const inputJson = { Partner_code: this.partner_default};
    (await this.apiCall.recoverPartnerData(inputJson)).subscribe(
      (data: any) => {

        const title = data.MetatagTitle ? data.MetatagTitle : this.metatagDefault.title;
        const description = data.MetatagDescription ? data.MetatagDescription : this.metatagDefault.description;
        //meta primary
        const metaTitle = document.getElementById("meta-title");
        const metaDescription = document.getElementById("meta-description");
        //meta og
        const ogMetaTitle = document.getElementById("ogmeta-title");
        const ogMetaDescription = document.getElementById("ogmeta-description");
        //meta twitter
        const twMetaTitle = document.getElementById("twmeta-title");
        const twMetaDescription = document.getElementById("twmeta-description");

        if (metaTitle && metaDescription) {
          metaTitle.setAttribute("content", title);
          metaDescription.setAttribute("content", description);
        }

        if (ogMetaTitle && ogMetaDescription) {
          ogMetaTitle.setAttribute("content", title);
          ogMetaDescription.setAttribute("content", description);
        }

        if (twMetaTitle && twMetaDescription) {
          twMetaTitle.setAttribute("content", title);
          twMetaDescription.setAttribute("content", description);
        }
      },
      (error: any) => {},
      () => resolve()
    );
  }
}