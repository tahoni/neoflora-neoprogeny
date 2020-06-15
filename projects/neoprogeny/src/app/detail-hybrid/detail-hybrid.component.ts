import {Component, OnInit} from '@angular/core';
import {LegendService} from "../legend.service";
import {IconService} from "../icon.service";
import {ActivatedRoute} from "@angular/router";
import {HybridService} from "../hybrid.service";
import {SharedService} from "../shared.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-crud',
  templateUrl: './detail-hybrid.component.html',
  styleUrls: ['./detail-hybrid.component.css']
})
export class DetailHybridComponent implements OnInit {

  activatedRoute: ActivatedRoute;

  sharedService: SharedService;
  iconService: IconService;
  legendService: LegendService;
  hybridService: HybridService;

  hybrid: any;

  constructor(activatedRoute: ActivatedRoute, sharedService: SharedService,
              iconService: IconService, legendService: LegendService, hybridService: HybridService) {
    this.activatedRoute = activatedRoute;
    this.sharedService = sharedService;
    this.iconService = iconService;
    this.legendService = legendService;
    this.hybridService = hybridService;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.hybrid = this.hybridService.getHybrid(params.id);
      });
  }

  saveHybrid(hybridForm) {
    let success: boolean = true;
    let valid: boolean = hybridForm.valid;
    let changed: boolean = hybridForm.dirty;

    if (!valid) {
      Swal.fire('Error', 'Not valid', 'error')
      success = false;
    }

    if ((changed) && (valid)) {
      const hybrid = {
        id: this.hybrid.id,
        code: hybridForm.value.code,
        parent: hybridForm.value.parent,
        description: hybridForm.value.description,
        seed: hybridForm.value.seed,
        offspring: hybridForm.value.offspring,
        image: this.hybrid.image,
        comment: hybridForm.value.comment
      }
      success = this.hybridService.setHybrid(hybrid);
    }

    return success;
  }

  cancelHybrid() {
    this.sharedService.redirect('/');
  }

  uploadHybridPhoto() {

  }
}
