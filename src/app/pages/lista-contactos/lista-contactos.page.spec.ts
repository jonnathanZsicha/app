import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaContactosPage } from './lista-contactos.page';

describe('ListaContactosPage', () => {
  let component: ListaContactosPage;
  let fixture: ComponentFixture<ListaContactosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaContactosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaContactosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
