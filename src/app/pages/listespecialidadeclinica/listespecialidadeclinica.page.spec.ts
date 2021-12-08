import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListespecialidadeclinicaPage } from './listespecialidadeclinica.page';

describe('ListespecialidadeclinicaPage', () => {
  let component: ListespecialidadeclinicaPage;
  let fixture: ComponentFixture<ListespecialidadeclinicaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListespecialidadeclinicaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListespecialidadeclinicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
