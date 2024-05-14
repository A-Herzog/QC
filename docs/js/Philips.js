/*
Copyright 2024 Alexander Herzog

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

export {PhilipsBox};

import {language} from "./Language.js";
import {Box, Card, SplitCards, Diagram, Select, HorizontalSlider, VerticalMultiSlider, InfoText, Plan} from "./Tools.js";
import {factorial, calcOpCharacteristics} from "./MathTools.js";

/**
 * System for showing Philips quality control plan
 */
class PhilipsBox extends Box {
  #xSteps;
  #diagram;
  #distribution;
  #sizeN;
  #points;
  #plan;
  #animationC;
  #ready;

  /**
   * Constructor
   */
  constructor() {
    super();
    this.#xSteps=500;
    this.#ready=false;
    this.append(new Card(language.GUI.Philips.name,language.GUI.Philips.info));

    const cards=new SplitCards(8,4,language.GUI.Philips.operationCharacteristic,language.GUI.Philips.IndifferencePoint);
    this.append(cards);

    cards.appendLeft(this.#diagram=new Diagram(this.#xSteps,language.GUI.Philips.point));

    cards.appendRight(this.#distribution=new Select(language.GUI.Guenther.distribution+":",()=>this.#update(),[
      {name: language.GUI.Guenther.distributionHg, value: 0},
      {name: language.GUI.Guenther.distributionB, value: 1, selected: true},
      {name: language.GUI.Guenther.distributionP, value: 2}
    ]));

    cards.appendRight(this.#sizeN=new HorizontalSlider(language.GUI.Guenther.DeliverySize,1,2000,1,1000,v=>v,()=>this.#update()));

    cards.appendRight(this.#points=new VerticalMultiSlider(400,70,()=>this.#update(),[
      {label: "P<sub>"+(0.5).toLocaleString()+"</sub>", info: "<i>P<sub>"+(0.5).toLocaleString()+"</sub></i>=", min: 0, max: 0.5, step: 0.01, default: 0.15, format: v=>(v*100).toLocaleString()+"%"},
      {label: "h<sub>0</sub>", info: "<i>h<sub>0</sub></i>=", min: 0.1, max: 8, step: 0.1, default: 1.5, format: v=>parseFloat(v).toLocaleString()},
    ]));
    this.#points.div.classList.add("mt-3");

    let info=new InfoText(language.GUI.Philips.pAndHInfo);
    cards.appendRight(info);
    info.div.classList.add("small");

    this.append(this.#plan=new Plan(50,20,()=>this.#update(),(n,c)=>this.#isPlanOkText(n,c),animation=>this.#optimize(animation),language.GUI.Philips.searchOptimalPlanInfo));

    this.#ready=true;
    this.#update();
  }

  #update() {
    if (!this.#ready) return;

    this.#plan.updateStatus();

    const mode=parseInt(this.#distribution.value);
    const limits=this.#points.values;
    const p=limits[0];
    const h=limits[1];
    const n=this.#plan.n;
    const c=this.#plan.c;

    /* Update size N */
    this.#sizeN.setMin(n);
    this.#sizeN.setVisible(mode==0);
    const N=this.#sizeN.value;

    /* Calculate operation characteristics */
    const xValues=Array.from({length: this.#xSteps+1}, (_,i)=>i/this.#xSteps);
    const d=calcOpCharacteristics(mode,n,c,N,xValues);

    let pOp=0;
    for (let i=0;i<d.length;i++) if (d[i]<=0.5) {pOp=i/this.#xSteps; break;}
    const hOp=2*Math.pow(n*p,c+1)/factorial(c)*Math.exp(-n*p);
    const dL=-h*0.5/p;
    const dLOp=(d[Math.round(pOp*this.#xSteps)+1]-d[Math.round(pOp*this.#xSteps)])*this.#xSteps;

    /* Show P_0.5 and h_0 information */
    const info=[];
    const half=(0.5).toLocaleString();
    info.push("<small>");
    info.push(language.GUI.Philips.setupInfo1+"(P<sub>"+half+"</sub>;"+half+")=("+p.toLocaleString()+";"+half+")"+language.GUI.Philips.setupInfo2+"h<sub>0</sub>="+h.toLocaleString()+language.GUI.Philips.setupInfo3);
    info.push(language.GUI.Guenther.AOQInfo+" AOQ:=p&middot;L<sub>n,c</sub>(p)");
    info.push(language.GUI.Guenther.AOQLInfo+" AOQL:=max(AOQ)&approx;"+(Math.round(d.map((v,i)=>v*i/this.#xSteps).reduce((a,b)=>Math.max(a,b))*1000)/10).toLocaleString()+"%");
    info.push("</small>");
    this.#diagram.info=info.join("<br>");

    /* Update chart */
    let index;
    index=Math.round(p*this.#xSteps);
    const userIndiffPoint=Array.from({length: this.#xSteps+1},(_,i)=>(i==index)?0.5:undefined);
    index=Math.round(pOp*this.#xSteps);
    const opIndiffPoint=Array.from({length: this.#xSteps+1},(_,i)=>(i==index)?0.5:undefined);
    const userDL=Array.from({length: this.#xSteps+1},(_,i)=>{const x=i/this.#xSteps; const y=0.5+(x-p)*dL; return (y>=0.1 && y<=0.9)?y:undefined;});
    const opDL=Array.from({length: this.#xSteps+1},(_,i)=>{const x=i/this.#xSteps; const y=0.5+(x-pOp)*dLOp; return (y>=0.1 && y<=0.9)?y:undefined;});

    const datasets=[
      {label: "user P0.5 "+language.GUI.Philips.point, type: "line", pointRadius: 4, data: userIndiffPoint, borderColor: 'green'},
      {label: "op P0.5 "+language.GUI.Philips.point, type: "line", pointRadius: 4, data: opIndiffPoint, borderColor: 'red'},
      {label: language.GUI.Philips.SteepnessTarget, type: "line", pointStyle: false, data: userDL, borderWidth: 1, borderColor: 'green'},
      {label: language.GUI.Philips.SteepnessActual, type: "line", pointStyle: false, data: opDL, borderWidth: 1, borderColor: 'red'},
      {label: language.GUI.Guenther.operationCharacteristic, type: "line", pointStyle: false, data: d, borderColor: 'blue'},
      {label: language.GUI.Guenther.AOQInfoShort, type: "line", pointStyle: false, borderDash: [5, 5], data: d.map((v,i)=>v*i/this.#xSteps), borderColor: 'magenta'}
    ];
    if (mode==0) {
      datasets.push({label: language.GUI.y2Axis, type: "line", pointStyle: false, data: d.map(v=>n*v+N*(1-v)), borderColor: 'orange', yAxisID: "y2", borderWidth: 1});
      this.#diagram.secondAxisVisible(true);
    } else {
      this.#diagram.secondAxisVisible(false);
    }

    this.#diagram.data.datasets=datasets;
    this.#diagram.data.labels=xValues;

    this.#diagram.chart.update();
  }

  #isPlanOkText(n, c) {
    const limits=this.#points.values;
    const p=limits[0];
    const h=limits[1];

    const hOp=2*Math.pow(n*p,c+1)/factorial(c)*Math.exp(-n*p);

    let info=language.GUI.Philips.resultInfo1+(p*100).toLocaleString()+language.GUI.Philips.resultInfo2+h.toLocaleString()+language.GUI.Philips.resultInfo3;
    info+=" ";
    if (hOp>h) {
      info+=language.GUI.Philips.resultInfoT1+hOp.toLocaleString()+language.GUI.Philips.resultInfoT2;
    } else {
      info+=language.GUI.Philips.resultInfoF1+hOp.toLocaleString()+language.GUI.Philips.resultInfoF2;
    }
    return info;
  }

  #getN(c,p) {
    const degreesOfFreedom=2*(c+1);

    let x=0;
    let cdf=0;
    let i=0;
    while (cdf<0.5) {
      i++;
      x=i/this.#xSteps;
      cdf=jStat.lowRegGamma(degreesOfFreedom/2,x/2);
    }

    console.log("cdf("+x+")="+cdf);

    return Math.ceil(x/2/p);
  }

  #optimizeWithoutAnimation() {
    const limits=this.#points.values;
    const p=limits[0];
    const h=limits[1];

    let c=0;
    let n=this.#getN(c,p);
    console.log("c="+c+"\tn="+n);
    console.log("h="+(2*(n*p)**(c+1)/factorial(c)*Math.exp(-n*p)));

    /* Target: 2(n*p)^(c+1)/c!*exp(-n*p)>=h */
    while (2*(n*p)**(c+1)/factorial(c)*Math.exp(-n*p)<h) {
      c++;
      n=this.#getN(c,p);
      console.log("c="+c+"\tn="+n);
      console.log("h="+(2*(n*p)**(c+1)/factorial(c)*Math.exp(-n*p)));
    }

    this.#plan.setPlan(n,c);
  }

  #optimizeStep() {
    const limits=this.#points.values;
    const p=limits[0];
    const h=limits[1];

    let c=this.#animationC;
    let n=this.#getN(c,p);
    this.#plan.setPlan(n,c);

    if (2*(n*p)**(c+1)/factorial(c)*Math.exp(-n*p)>=h) {
      this.#points.enabled=true;
      this.#plan.enabled=true;
      return;
    }

    this.#animationC++;

    setTimeout(()=>this.#optimizeStep(),10);
  }

  #optimize(animation) {
    if (animation) {
      this.#animationC=0;
      this.#points.enabled=false;
      this.#plan.enabled=false;
      this.#optimizeStep();
    } else {
      this.#optimizeWithoutAnimation();
    }
  }
}
