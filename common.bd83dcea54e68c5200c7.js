(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{TG6D:function(e,t,n){"use strict";n.d(t,"a",function(){return m}),n.d(t,"b",function(){return h});var l=n("ofXK"),i=n("zHT3"),s=n("fXoL"),a=n("cLXs"),c=n("hBBj");const o=["avatarElement"],r=["boxElement"],u=["textElement"];function b(e,t){if(1&e&&(s.Pb(0,"span",9),s.uc(1),s.Ob()),2&e){const e=t.$implicit;s.Bb("opacity-70",!e.finalized),s.yb(1),s.wc("",e.value," ")}}function y(e,t){if(1&e&&(s.Nb(0),s.Pb(1,"div",1),s.Kb(2,"div",2,3),s.Pb(4,"div",4,5),s.Pb(6,"div",6,7),s.sc(8,b,2,3,"span",8),s.Ob(),s.Ob(),s.Ob(),s.Mb()),2&e){const e=t.ngIf,n=s.bc().ngIf,l=s.bc();s.yb(1),s.Bb("show",n.globalStyle.alwaysShow.value||e.show||2===e.speechServiceState),s.yb(1),s.Bb("hidden",!n.avatarStyle.backgroundImage.value),s.yb(6),s.hc("ngForOf",e.sentences)("ngForTrackBy",l.track)}}function p(e,t){if(1&e&&(s.Nb(0),s.sc(1,y,9,6,"ng-container",0),s.cc(2,"async"),s.Mb()),2&e){const e=s.bc();s.yb(1),s.hc("ngIf",s.dc(2,1,e.speechQuery.state$))}}let m=(()=>{class e{constructor(e,t,n){this.speechQuery=e,this.styleQuery=t,this.detector=n,this.track=(e,t)=>t.id&&t.value}BuildTypedValue(e){switch(e.type){case i.b.pixels:return e.value+"px";case i.b.ms:return e.value+"ms";case i.b.url:return`url(${e.value})`;default:return e.value}}ApplyElementStyleDAta(e,t){for(const n in t)e.style[n]=this.BuildTypedValue(t[n])}ApplyCompositeElementStyleData(e,t){for(const n in t)e.style[n]=Object.values(t[n]).map(e=>this.BuildTypedValue(e)).join(" ")}ApplyStyles(e){this.ApplyElementStyleDAta(this.avatarElement.nativeElement,e.avatarStyle),this.ApplyElementStyleDAta(this.boxElement.nativeElement,e.boxStyle),this.ApplyElementStyleDAta(this.textElement.nativeElement,e.textStyle),this.ApplyCompositeElementStyleData(this.textElement.nativeElement,e.textStyleComposite)}ngAfterViewInit(){this.styleQuery.current$.subscribe(e=>this.ApplyStyles(e))}ngOnInit(){this.speechQuery.sentences$.subscribe(e=>{var t,n,l,i;this.detector.detectChanges(),null===(l=null===(n=null===(t=this.boxElement)||void 0===t?void 0:t.nativeElement)||void 0===n?void 0:n.scrollTo)||void 0===l||l.call(n,{top:null===(i=this.boxElement.nativeElement)||void 0===i?void 0:i.scrollHeight,behavior:"smooth"})})}}return e.\u0275fac=function(t){return new(t||e)(s.Jb(a.a),s.Jb(c.a),s.Jb(s.h))},e.\u0275cmp=s.Db({type:e,selectors:[["app-stt-renderer"]],viewQuery:function(e,t){if(1&e&&(s.xc(o,1),s.xc(r,1),s.xc(u,1)),2&e){let e;s.jc(e=s.Yb())&&(t.avatarElement=e.first),s.jc(e=s.Yb())&&(t.boxElement=e.first),s.jc(e=s.Yb())&&(t.textElement=e.first)}},decls:2,vars:3,consts:[[4,"ngIf"],[1,"stt-container","flex","items-end","relative"],[1,"z-50","-mr-4","w-36","h-36","bg-contain","bg-center","bg-no-repeat",2,"animation-iteration-count","infinite","animation-timing-function","ease-in-out"],["avatarElement",""],[1,"stt-box","flex","flex-col","w-96","h-24","bg-secondary","text-secondary-content","overflow-y-scroll","overflow-x-hidden",2,"scroll-behavior","smooth"],["boxElement",""],[1,"p-4","stt-box-text","w-full","min-h-full",2,"flex","0 0 auto"],["textElement",""],["class","break-words",3,"opacity-70",4,"ngFor","ngForOf","ngForTrackBy"],[1,"break-words"]],template:function(e,t){1&e&&(s.sc(0,p,3,3,"ng-container",0),s.cc(1,"async")),2&e&&s.hc("ngIf",s.dc(1,1,t.styleQuery.current$))},directives:[l.m,l.l],pipes:[l.b],encapsulation:2,changeDetection:0}),e})(),h=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=s.Hb({type:e}),e.\u0275inj=s.Gb({imports:[[l.c]]}),e})()}}]);