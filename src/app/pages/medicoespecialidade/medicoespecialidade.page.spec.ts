import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MedicoespecialidadePage } from './medicoespecialidade.page';

describe('MedicoespecialidadePage', () => {
  let component: MedicoespecialidadePage;
  let fixture: ComponentFixture<MedicoespecialidadePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicoespecialidadePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicoespecialidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
