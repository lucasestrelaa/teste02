import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListorgaosemissoresPage } from './listorgaosemissores.page';

describe('ListorgaosemissoresPage', () => {
  let component: ListorgaosemissoresPage;
  let fixture: ComponentFixture<ListorgaosemissoresPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListorgaosemissoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListorgaosemissoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
