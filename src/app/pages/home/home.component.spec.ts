import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
// $(function () {
//   let count = 0;
//   $('.arrow1').on('click', function (e) {
//       e.preventDefault()
//       if (count != 0) {
//           $('main').animate({
//               scrollLeft: `-=${window.innerWidth}`
//           }, 2000, 'easeOutSine')
//           count--
//       }
//       else {
//           count = 2
//           $('main').animate({
//               scrollLeft: `${window.innerWidth * 2}`
//           })
//       }
//       $('.aside1 a').removeAttr('class');
//       $('.aside1 a').eq(count).attr('class', 'active')
//   })
//   $('.arrow2').on('click', function (e) {
//       e.preventDefault()
//       if (count != 2) {
//           $('main').animate({
//               scrollLeft: `+=${window.innerWidth}`
//           }, 2000, 'easeOutSine')
//           count++
//       }
//       else {
//           count = 0
//           $('main').animate({
//               scrollLeft: `0`
//           })
//       }
//       $('.aside1 a').removeAttr('class');
//       $('.aside1 a').eq(count).attr('class', 'active')
//   })
//   $('.aside1 a').each(function (index, element) {
//       $(element).click(function (e) {
//           e.preventDefault()
//           let id = $(this).attr('href');
//           let left = $(id)[0].offsetLeft;
//           console.log($(id));

//           $('.aside1 a').removeAttr('class');
//           $(this).attr('class', 'active');
//           count = index;
//           $('main').animate({
//               scrollLeft: left
//           }, 2000, 'easeOutSine')
//       })
//   })

// setTimeout(function () {
//   setInterval(function () {
//       if (count != 6) {
//           $('main').css({
//               left: `-=300px`
//           }, 0)
//           count++
//       }
//       else {
//           count = 0
//           $('main').css({
//               left: `0`
//           })
//       }
//       $('.aside1 a').removeAttr('class');
//       $('.aside1 a').eq(count).attr('class', 'active')
//   }, 2000)
// })


// })