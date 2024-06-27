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

export {GuentherBox};

import {language} from "./Language.js";
import {Box, Card, SplitCards, Diagram, Select, HorizontalSlider, VerticalMultiSlider, InfoText, Plan} from "./Tools.js";
import {calcOpCharacteristics} from "./MathTools.js";

/**
 * System for showing algorithm of Guenther quality control plan
 */
class GuentherBox extends Box {
  #xSteps;
  #diagram;
  #distribution;
  #sizeN;
  #points;
  #plan;
  #animationN;
  #animationC;
  #ready;

  /**
   * Constructor
   */
  constructor() {
    super();
    this.#xSteps=200;
    this.#ready=false;
    this.append(new Card(language.GUI.Guenther.name,language.GUI.Guenther.info));

    const cards=new SplitCards(8,4,language.GUI.Guenther.operationCharacteristic,language.GUI.Guenther.AQLandLQ);
    this.append(cards);

    cards.appendLeft(this.#diagram=new Diagram(this.#xSteps,language.GUI.Guenther.area));

    cards.appendRight(this.#distribution=new Select(language.GUI.Guenther.distribution+":",()=>this.#update(),[
      {name: language.GUI.Guenther.distributionHg, value: 0},
      {name: language.GUI.Guenther.distributionB, value: 1, selected: true},
      {name: language.GUI.Guenther.distributionP, value: 2}
    ]));

    cards.appendRight(this.#sizeN=new HorizontalSlider(language.GUI.Guenther.DeliverySize,1,2000,1,1000,v=>v,()=>this.#update()));

    cards.appendRight(this.#points=new VerticalMultiSlider(400,70,()=>this.#update(),[
      {label: "AQL x", info: "<i>P<sub>1-&alpha;</sub></i>=", min: 0, max: 1, step: 0.001, default: 0.05, format: v=>(v*100).toLocaleString()+"%"},
      {label: "AQL y", info: "<i>1-&alpha;</i>=", min: 0, max: 1, step: 0.001, default: 0.95, format: v=>(v*100).toLocaleString()+"%"},
      {label: "LQ x", info: "<i>P<sub>&beta;</sub></i>=", min: 0, max: 1, step: 0.001, default: 0.2, format: v=>(v*100).toLocaleString()+"%"},
      {label: "LQ y", info: "<i>&beta;</i>=", min: 0, max: 1, step: 0.001, default: 0.1, format: v=>(v*100).toLocaleString()+"%"}
    ]));
    this.#points.div.classList.add("mt-3");

    let info=new InfoText(language.GUI.Guenther.AQLandLQinfo);
    cards.appendRight(info);
    info.div.classList.add("small");

    this.append(this.#plan=new Plan(25,5,()=>this.#update(),(n,c)=>this.#isPlanOkText(n,c),animation=>this.#optimize(animation),language.GUI.Guenther.searchOptimalPlanInfo));

    this.#ready=true;
    this.#update();
  }

  #update() {
    if (!this.#ready) return;

    this.#plan.updateStatus();

    const mode=parseInt(this.#distribution.value);
    const limits=this.#points.values;
    const n=this.#plan.n;
    const c=this.#plan.c;

    /* Update size N */
    this.#sizeN.setMin(n);
    this.#sizeN.setVisible(mode==0);
    const N=this.#sizeN.value;

    /* Calculate operation characteristics */
    const xValues=Array.from({length: this.#xSteps+1}, (_,i)=>i/this.#xSteps);
    const d=calcOpCharacteristics(mode,n,c,N,xValues);
    const dlimits=calcOpCharacteristics(mode,n,c,N,[limits[0],limits[2]]);
    const p1=dlimits[0];
    const p2=dlimits[1];

    /* Show AQL and LQ information */
    const limitsPercent=limits.map(v=>(v*100).toLocaleString()+"%");
    const info=[];
    info.push("<small>");
    info.push(language.GUI.Guenther.AQLInfo1+limitsPercent[0]+language.GUI.Guenther.AQLInfo2+limitsPercent[1]+language.GUI.Guenther.AQLInfo3);
    info.push(language.GUI.Guenther.LQInfo1+limitsPercent[2]+language.GUI.Guenther.LQInfo2+limitsPercent[3]+language.GUI.Guenther.LQInfo3);
    info.push(language.GUI.Guenther.AOQInfo+" AOQ:=p&middot;L<sub>n,c</sub>(p)");
    info.push(language.GUI.Guenther.AOQLInfo+" AOQL:=max(AOQ)&approx;"+(Math.round(d.map((v,i)=>v*i/this.#xSteps).reduce((a,b)=>Math.max(a,b))*1000)/10).toLocaleString()+"%");
    info.push("</small>");
    this.#diagram.info=info.join("<br>");

    /* Update chart */
    let index;
    index=Math.round(limits[0]*this.#xSteps);
    const AQLpoint=Array.from({length: this.#xSteps+1},(_,i)=>(i==index)?limits[1]:undefined);
    index=Math.round(limits[0]*this.#xSteps);
    const AQLarea=Array.from({length: this.#xSteps+1},(_,i)=>(i<=index)?limits[1]:undefined);
    index=Math.round(limits[2]*this.#xSteps);
    const LQpoint=Array.from({length: this.#xSteps+1},(_,i)=>(i==index)?limits[3]:undefined);
    index=Math.round(limits[2]*this.#xSteps);
    const LQarea=Array.from({length: this.#xSteps+1},(_,i)=>(i>=index)?limits[3]:undefined);

    const datasets=[
      {label: "AQL", type: "line", pointRadius: 4, data: AQLpoint, borderWidth: 2, borderColor: (p1>=limits[1])?'green':'red', backgroundColor: "rgba(0, 255, 180, 0.1)"},
      {label: "AQL "+language.GUI.Guenther.area, type: "line", pointStyle: false, fill: {value: 1}, data: AQLarea, borderWidth: 0, borderColor: (p1>=limits[1])?'green':'red', backgroundColor: "rgba(0, 255, 180, 0.2)"},
      {label: "LQ", type: "line", pointRadius: 4, data: LQpoint, borderWidth: 2, borderColor: (p2<=limits[3])?'green':'red', backgroundColor: "rgba(255, 180, 0, 0.2)"},
      {label: "LQ "+language.GUI.Guenther.area, type: "line", pointStyle: false, fill: {value: 0}, data: LQarea, borderWidth: 0, borderColor: (p2<=limits[3])?'green':'red', backgroundColor: "rgba(255, 180, 0, 0.2)"},
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

  #isPlanOk(n, c) {
    const mode=parseInt(this.#distribution.value);
    const N=this.#sizeN.value;
    const limits=this.#points.values;

    const d=calcOpCharacteristics(mode,n,c,N,[limits[0],limits[2]]);
    return [d[0]>=limits[1], d[1]<=limits[3]];
  }

  #isPlanOkText(n,c) {
    const isOk=this.#isPlanOk(n,c);
    if (isOk[0]) {
      if (isOk[1]) {
        /* AQL, LQ */
        return language.GUI.Guenther.StatusTT;
      } else {
        /* AQL, !LQ */
        return language.GUI.Guenther.StatusTF;
      }
    } else {
      if (isOk[1]) {
        /* !AQL, LQ */
        return language.GUI.Guenther.StatusFT;
      } else {
        /* !AQL, !LQ */
        return language.GUI.Guenther.StatusFF;
      }
    }
  }

  #optimizeWithoutAnimation() {
    let c=-1;
    let n;
    let result;
    do {
      c++;
      n=c;
      do {
        n++;
        if (n>2000) {
          alert(language.GUI.Guenther.cancelInfo);
          return false;
        }
        result=this.#isPlanOk(n,c);
      } while (result[0] && !result[1]);
    } while (!result[0]);

    this.#plan.setPlan(n,c);
  }

  #optimizeStep() {
    this.#plan.setPlan(this.#animationN,this.#animationC);
    const result=this.#isPlanOk(this.#animationN,this.#animationC);
    if (result[0] && !result[1]) {
      this.#animationN++;
      if (this.#animationN>2000) {
        alert(language.GUI.Guenther.cancelInfo);
        return;
      }
    } else {
      if (result[0]) {
        this.#points.enabled=true;
        this.#plan.enabled=true;
        return;
      }
      this.#animationC++;
      this.#animationN=this.#animationC;
    }
    setTimeout(()=>this.#optimizeStep(),10);
  }

  #optimize(animation) {
    if (animation) {
      this.#animationN=1;
      this.#animationC=0;
      this.#points.enabled=false;
      this.#plan.enabled=false;
      this.#optimizeStep();
    } else {
      this.#optimizeWithoutAnimation();
    }
  }
}
