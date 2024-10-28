import { Component } from '@angular/core';
import { StepCardComponent } from '../../shared/step-card/step-card.component';
import { StepStatus } from '../../interfaces/interfaces';
import { ApicallsService } from '../../services/apicalls.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupsService } from '../../services/popup.service';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [StepCardComponent, ButtonComponent],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss'
})

export class MainContainerComponent {

  stepStatus = StepStatus;
  icon: boolean = true;

  nextClicked() {
    console.log('El botón fue pulsado');
	}

  // partner_default = '22354f49';
  partner: string = '';
  partnerData!: Promise<any>;

  constructor(
    private apicalls: ApicallsService,
    private route: ActivatedRoute,
    private popups: PopupsService,
		private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.partner = params.get('partner') || '22354f49';
    });


    this.getPartnerInfo(this.partner);
  }

  async getPartnerInfo(brand: string): Promise<any> {
		const inputJson = { Partner_code: brand };
		(await this.apicalls.recoverPartnerData(inputJson)).subscribe(
			(data: any) => {
				if (data.PartnerStatus) {
					this.partnerData = data;
				} else {
					this.popups.openPartnerNoPublished();
				}
      },
      (error: any) => {
				// this.isLoading = false;
				this.popups.openPartnerError().subscribe(() => {
					this.router.navigate(['/']);
				});
			}
		);
	}

}
