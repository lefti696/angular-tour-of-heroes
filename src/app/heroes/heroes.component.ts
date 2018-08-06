import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // selectedHero: Hero;

  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  initHeros(): void {
    // stare podejscie
    // this.heroes = this.heroService.getHeros();
    this.heroService.getHeroes().subscribe((heroes) => this.heroes = heroes);
  }

  ngOnInit() {
    this.initHeros();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {  // jezeli to wyzej sie wykona poprawnie to zostanie zwrocony obiekt Hero
        this.heroes.push(hero); // i zostanie dodany do tablicy obiektow wczytanych czyli heroes
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero); // zostawia w liscie wszystkie hero rozne od kasowanego
    this.heroService.deleteHero(hero).subscribe();
  }

  // onSelect(hero: Hero) {
  //   this.selectedHero = hero;
  //   console.log(hero.name + ' clicked');
  // }

}
