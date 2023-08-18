import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CityStore } from '../../data-access/city.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  standalone: true,
  imports: [CardComponent, ListItemComponent, AsyncPipe],
})
export class CityCardComponent implements OnInit {
  cities$ = this.store.city$;

  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  deleteCity(id: number): void {
    this.store.deleteOne(id);
  }

  addNewCity(): void {
    this.store.addOne(randomCity());
  }
}
