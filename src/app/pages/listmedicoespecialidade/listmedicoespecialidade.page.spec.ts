import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListmedicoespecialidadePage } from './listmedicoespecialidade.page';

describe('ListmedicoespecialidadePage', () => {
  let component: ListmedicoespecialidadePage;
  let fixture: ComponentFixture<ListmedicoespecialidadePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListmedicoespecialidadePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListmedicoespecialidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
