import { test } from 'qunit';
import moduleForAcceptance from 'cybr8470-ember/tests/helpers/module-for-acceptance';
import Service from '@ember/service';

let StubMapsService = Service.extend({
  getMapElement() {
    return document.createElement('div');
  }
});

moduleForAcceptance('Acceptance | list rentals', {
  beforeEach() {
    this.application.register('service:stubMaps', StubMapsService);
    this.application.inject('component:location-map', 'maps', 'service:stubMaps');
  }
});
//1
test('should show rentals as the home page', function (assert) {
  visit('/');
  andThen(function() {
    assert.equal(currentURL(), '/rentals', 'should redirect automatically');
  });
});
//2
test('should link to information about the company.', function (assert) {
  visit('/');
  click('a:contains("About")');
  andThen(function() {
    assert.equal(currentURL(), '/about', 'should navigate to about');
  });
});
//3
test('should link to contact information', function (assert) {
  visit('/');
  click('a:contains("Contact")');
  andThen(function() {
    assert.equal(currentURL(), '/contact', 'should navigate to contact');
  });
});
//4
test('should list available rentals.', function (assert) {
  visit('/');
  andThen(function() {
    assert.equal(find('.listing').length, 3, 'should see 3 listings');
  });
});
//5
test('should filter the list of rentals by city.', function (assert) {
  visit('/');
  fillIn('.list-filter input', 'Seattle');
  keyEvent('.list-filter input', 'keyup', 69);
  andThen(function() {
    assert.equal(find('.listing').length, 1, 'should show 1 listing');
    assert.equal(find('.listing .location:contains("Seattle")').length, 1, 'should contain 1 listing with location Seattle');
  });
});

// test('should show details for a selected rental', function (assert) {
// });
