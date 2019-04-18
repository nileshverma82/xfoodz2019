import { TestBed } from '@angular/core/testing';

import { OrderResolverService } from './order.resolver';

describe('Order.ResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderResolverService = TestBed.get(OrderResolverService);
    expect(service).toBeTruthy();
  });
});
