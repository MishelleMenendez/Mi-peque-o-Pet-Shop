import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroComponent } from './registro.component';
import { FormsModule } from '@angular/forms';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update username model', () => {
    component.username = 'testuser';
    expect(component.username).toEqual('testuser');
  });

  it('should call onRegister method', () => {
    spyOn(component, 'onRegister');
    component.onRegister();
    expect(component.onRegister).toHaveBeenCalled();
  });
});
