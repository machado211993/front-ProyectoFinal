import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarCompraComponentComponent } from './finalizar-compra-component.component';

describe('FinalizarCompraComponentComponent', () => {
  let component: FinalizarCompraComponentComponent;
  let fixture: ComponentFixture<FinalizarCompraComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalizarCompraComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalizarCompraComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
