import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Drugservice } from '../services/drug.service';
import { HttpClient } from '@angular/common/http';
import { Drugs } from 'src/model/drugs.model';
import { Image } from 'src/model/image.model';


@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.css'],
})
export class DrugsComponent implements OnInit {
  drugs!: Drugs[];
  apiURL = 'http://localhost:8888/drugs/api/image';

  constructor(
    public drugService: Drugservice,
    public authService: AuthService,
    private http : HttpClient
  ) {}

  ngOnInit(): void {
    this.chargerDrugs();
  }

  chargerDrugs() {
    this.drugService.listeDrugs().subscribe((drug) => {
      console.log(drug);
      this.drugs = drug;

      this.drugs.forEach((drug) => {
        this.http.get<Image[]>(this.apiURL+"/getImagesDru/"+drug.id).subscribe((images) => {
          drug.images = images;
          drug.imageStr = 'data:' + drug.images[0].type + ';base64,' + drug.images[0].image;
        }
        );
      }
      );
    }
    );
  }

  supprimerDrug(d: number) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) this.drugService.supprimerDrug(d).subscribe(() => {
      console.log('Drug supprimé');
      this.chargerDrugs();
    });
  }
}
