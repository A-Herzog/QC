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

export {Box, Card, SplitCards, Select, VerticalMultiSlider, HorizontalSlider, InfoText, Heading, Diagram, Plan};

import {language} from "./Language.js";


/**
 * Generates a simple div element box.
 */
class Box {
  #mainDiv;

  /**
   * Constructor
   */
  constructor() {
    this.#mainDiv=document.createElement("div");
    this.#mainDiv.style.display="none";
  }

  /**
   * Appends a box type element to the box.
   * @param {Object} element Box type element
   */
  append(element) {
    if (element.setVisible) element.setVisible(true);
    this.#mainDiv.appendChild(element.div);
  }

  /**
   * html div element
   */
  get div() {
    return this.#mainDiv;
  }

  /**
   * Shows or hides the element
   * @param {boolean} visible Visible status
   */
  setVisible(visible) {
    this.#mainDiv.style.display=visible?"":"none";
  }
}


/**
 * Generates a card element.
 */
class Card extends Box {
  /**
   * Body element of the card
   */
  _body;

  /**
   *
   * @param {String} title Card title
   * @param {String} info Optional info text to be shown in the box
   */
  constructor(title, info=null) {
    super();
    this.div.className="card mb-3";

    const header=document.createElement("div");
    header.className="card-header";
    header.innerHTML=title;
    this.div.appendChild(header);

    this._body=document.createElement("div");
    this._body.className="card-body";
    this.div.appendChild(this._body);

    if (info!=null) this.append(new InfoText(info));
  }

  /**
   * Appends a box type element.
   * @param {Object} element Box type element
   */
  append(element) {
    if (element.setVisible) element.setVisible(true);
    this._body.appendChild(element.div);
  }
}


/**
 * Generates two cards next to each other.
 */
class SplitCards extends Box {
  #cardLeft;
  #cardRight;

  /**
   * Constructor
   * @param {Number} sizeLeft Size of the left card (value from 1 to 11)
   * @param {Number} sizeRight Size of the right card (value from 1 to 11)
   * @param {String} titleLeft Title of the left card
   * @param {String} titleRight Title of the right card
   */
  constructor(sizeLeft, sizeRight, titleLeft, titleRight) {
    super();
    this.div.className="row";
    this.#cardLeft=this.#addCard(sizeLeft,titleLeft);
    this.#cardRight=this.#addCard(sizeRight,titleRight);
  }

  #addCard(size, title) {
    const col=document.createElement("div");
    col.className="col-lg-"+size+" mb-3";
    this.div.appendChild(col);

    const card=document.createElement("div");
    card.className="card";
    col.appendChild(card);

    const cardHeader=document.createElement("div");
    cardHeader.className="card-header";
    cardHeader.innerHTML=title;
    card.appendChild(cardHeader);

    const cardBody=document.createElement("div");
    cardBody.className="card-body";
    card.appendChild(cardBody);
    return cardBody;
  }

  /**
   * html body div element of the left card
   */
  get divLeft() {
    return this.#cardLeft.div;
  }

  /**
   * * html body div element of the right card
   */
  get divRight() {
    return this.#cardRight.div;
  }

  /**
   * Appends a box type element to the left card.
   * @param {Object} element Box type element
   */
  appendLeft(element) {
    if (element.setVisible) element.setVisible(true);
    this.#cardLeft.appendChild(element.div);
  }

  /**
   * Appends a box type element to the right card.
   * @param {Object} element Box type element
   */
  appendRight(element) {
    if (element.setVisible) element.setVisible(true);
    this.#cardRight.appendChild(element.div);
  }
}


/**
 * Generates an info text element.
 */
class InfoText {
  /**
   * html div element in which the text is to be displayed
   */
  _div;

  /**
   * Constructor
   * @param {String} text Info text to be shown
   */
  constructor(text) {
    this._div=document.createElement("div");
    this._processInner(text);
  }

  /**
   * Preprocesses the text and sets it in the inner html div element.
   * @param {String} text Info text to be shown
   */
  _processInner(text) {
    this._div.innerHTML=text;
  }

  /**
   * @param {String} newText
   */
  set text(newText) {
    this._div.innerHTML="";
    this._processInner(newText);
  }

  /**
   * html div element
   */
  get div() {
    return this._div;
  }
}

/**
 * Generates a heading text element
 */
class Heading extends InfoText {
  /**
   * Constructor
   * @param {String} text Info text to be shown
   */
  constructor(text) {
    super(text);
    this._div.classList.add("mt-3");
    this._div.classList.add("mb-1");
  }

  /**
   * Preprocesses the text and sets it in the inner html div element.
   * @param {String} text Info text to be shown
   */
  _processInner(text) {
    const strong=document.createElement("strong");
    this._div.append(strong);
    strong.innerHTML=text;
  }
}

/**
 * Counter for ids.
 */
let nextId=1;

/**
 * Returns a next free id for a html element.
 * @returns ID for html element
 */
function getID() {
  return "id"+(nextId++);
}


/**
 * Generates a form html element.
 */
class FormElement {
  #id;
  _label;
  #changeCallback;

  /**
   * Constructor
   * @param {String} labelText Label text for the form element
   * @param {Object} changeCallback Function which is called if the value of the form element is changed
   */
  constructor(labelText, changeCallback) {
    this._id=getID();
    this.#changeCallback=changeCallback;

    this._label=document.createElement("label");
    this._label.className="form-label";
    this._label.htmlFor=this._id;
    this._label.innerHTML=labelText;
  }

  /**
   * ID of the html form element
   */
  get id() {
    this.#id;
  }

  /**
   * Is called if the value of the html form element is changed by the user.
   */
  _fireChangeNotify() {
    this.#changeCallback();
  }
}


/**
 * Generates a html select element.
 */
class Select extends FormElement {
  #div;
  #select;

  /**
   * Constructor
   * @param {String} labelText Label text for the form element
   * @param {Object} changeCallback Function which is called if the value of the form element is changed
   * @param {Array} items Elements to be shown in the list (Each entry is an object with these properties: name, value, select; "select" is optional)
   */
  constructor(labelText, changeCallback, items) {
    super(labelText,changeCallback);

    this.#div=document.createElement("div");
    this.#div.appendChild(this._label);

    const select=document.createElement("select");
    select.className="form-select";
    select.id=this._id;
    this.#select=select;
    this.#div.appendChild(select);

    for (let item of items) {
      const option=document.createElement("option");
      select.appendChild(option);
      option.value=item.value;
      option.innerHTML=item.name;
      if (item.selected) option.selected=true;
    }

    select.onchange=()=>this._fireChangeNotify();

    this._fireChangeNotify();
  }

  /**
   * html div element
   */
  get div() {
    return this.#div;
  }

  /**
   * Current value
   */
  get value() {
    return this.#select.value;
  }
}


/**
 * Generates multiple vertical range select html elements
 */
class VerticalMultiSlider {
  #changeCallback;
  #div;
  #sliders;
  #info;
  #infoText;
  #infoFormat;

  /**
   * Constructor
   * @param {Number} height Height of the box
   * @param {Number} width Width per slider
   * @param {Object} changeCallback Function which is called if the value of the form element is changed
   * @param {Array} items Elements to be shown (Each entry is an object with these properties: label, min, max, step, default, info, format)
   */
  constructor(height, width, changeCallback, items) {
    this.#changeCallback=changeCallback;

    this.#div=document.createElement("div");
    this.#div.style.height=height+"px";
    this.#div.style.position="relative";

    this.#sliders=[];
    this.#info=[];
    this.#infoText=[];
    this.#infoFormat=[];
    let index=0;
    for (let item of items) {
      const id=getID();

      const label=document.createElement("label");
      label.className="form-label";
      label.style.position="absolute";
      label.style.top="0px";
      label.style.left=(5+index*width)+"px";
      label.htmlFor=id;
      label.innerHTML=item.label;
      this.#div.appendChild(label);

      const slider=document.createElement("input");
      slider.className="form-range";
      slider.id=id;
      slider.type="range";
      slider.min=item.min;
      slider.max=item.max;
      slider.step=item.step;
      slider.value=item.default;
      slider.style.position="absolute";
      slider.style.transform="rotate(270deg)";
      slider.style.width=(height-80)+"px";
      slider.style.top=Math.round(height/2-20)+"px";
      slider.style.left=Math.round(-(height-80)/2+index*width+30)+"px";
      slider.oninput=()=>this._fireChangeNotify();
      this.#div.appendChild(slider);

      const info=document.createElement("span");
      info.className="small";
      info.style.position="absolute";
      info.style.top=(height-30)+"px";
      info.style.left=(5+index*width)+"px";
      info.innerHTML=item.info;
      this.#div.appendChild(info);

      this.#sliders.push(slider);
      this.#info.push(info);
      this.#infoText.push(item.info);
      this.#infoFormat.push(item.format);
      index++;
    }

    this._fireChangeNotify();
  }

  /**
   * Is called if the value of the html form element is changed by the user.
   */
  _fireChangeNotify() {
    for (let i=0;i<this.#info.length;i++) {
      this.#info[i].innerHTML=this.#infoText[i]+this.#infoFormat[i](this.#sliders[i].value);
    }
    this.#changeCallback();
  }

  /**
   * html div element
   */
  get div() {
    return this.#div;
  }

  /**
   * Returns the values of the sliders as an array.
   */
  get values() {
    return this.#sliders.map(s=>parseFloat(s.value));
  }

  /**
   * Enables or disables all sliders
   * @param {boolean} isEnabled Enable status
   */
  set enabled(isEnabled) {
    this.#sliders.forEach(slider=>slider.disabled=!isEnabled);
  }
}


/**
 * Base class for a single horizonal range slider.
 */
class FormElementHorizontal {
  _id;
  #mainDiv;
  _label;
  _inputDiv;
  _rightDiv;
  #changeCallback;

  /**
   * Constructor
   * @param {String} labelText Label text for the form element
   * @param {Object} changeCallback Function which is called if the value of the form element is changed
   * @param {Boolean} rightArea Add a div on the right side of the slider (optional, default to false)
   */
  constructor(labelText, changeCallback, rightArea=false) {
    this._id=getID();
    this.#changeCallback=changeCallback;

    const mainDiv=document.createElement("div");
    mainDiv.className="row";
    this.#mainDiv=mainDiv;

    const label=document.createElement("label");
    label.className="col-form-label col-sm-2";
    label.htmlFor=this._id;
    label.innerHTML=labelText;
    mainDiv.appendChild(label);
    this._label=label;

    const inputDiv=document.createElement("div");
    inputDiv.className=rightArea?"col-sm-8":"col-sm-10";
    mainDiv.appendChild(inputDiv);
    this._inputDiv=inputDiv;

    if (rightArea) {
      const rightDiv=document.createElement("div");
      rightDiv.className="col-sm-2";
      mainDiv.appendChild(rightDiv);
      this._rightDiv=rightDiv;
    }
  }

  /**
   * Shows or hides the element
   * @param {boolean} visible Visible status
   */
  setVisible(visible) {
    this.#mainDiv.style.display=visible?"":"none";
  }

  /**
   * html div element
   */
  get div() {
    return this.#mainDiv;
  }

  /**
   * Is called if the value of the html form element is changed by the user.
   */
  _fireChangeNotify() {
    this.#changeCallback();
  }
}


/**
 * Generates a single horizonal range slider.
 */
class HorizontalSlider extends FormElementHorizontal {
  #labelText;
  #input;
  #labelValueFormatCallback;
  #info;

  /**
   * Constructor
   * @param {String} labelText Label text for the form element
   * @param {Number} minValue Minimum value for the slider
   * @param {Number} maxValue Maximum value for the slider
   * @param {Number} step Step width
   * @param {Number} startValue Initial value for the slider
   * @param {Object} labelValueFormatCallback Function which is called for formatting the current slider value to be displayed in the info text
   * @param {Object} changeCallback Function which is called if the value of the form element is changed
   * @param {Number} infoMode Info next to the slider: 0=off, 1=span, 2=plain div (optional, defaults to 0)
   */
  constructor(labelText, minValue, maxValue, step, startValue, labelValueFormatCallback, changeCallback, infoMode=0) {
    super(labelText,changeCallback,infoMode>0);

    this.#labelText=labelText;
    this.#labelValueFormatCallback=labelValueFormatCallback;

    /* Slider */
    const input=document.createElement("input");
    input.type="range";
    input.className="form-range";
    input.min=minValue;
    input.max=maxValue;
    input.step=step;
    input.value=startValue;
    input.id=this._id;
    this._inputDiv.appendChild(input);
    this.#input=input;

    /* Info/Setup on right side */
    if (infoMode==1) {
      this.#info=document.createElement("span");
      this._rightDiv.appendChild(this.#info);
    }

    input.oninput=()=>this._fireChangeNotify();

    this._fireChangeNotify();
  }

  /**
   * Sets the info text on the right side of the slider.
   * @param {string} text Anzuzeigender Text
   */
  set info(text) {
    this.#info.innerHTML=text;
  }

  /**
   * Returns the div on the right side of the slider.
   */
  get info() {
    return this._rightDiv;
  }

  /**
   * Is called if the value of the html form element is changed by the user.
   */
  _fireChangeNotify() {
    const value=this.#input.value;
    this._label.innerHTML=this.#labelText+this.#labelValueFormatCallback(value);
    super._fireChangeNotify();
  }

  /**
   * Sets a new minimum value for the slider.
   * @param {Number} newMin New minimum value
   */
  setMin(newMin) {
    if (parseInt(this.#input.value)<newMin) {
      this.#input.value=newMin;
      this._label.innerHTML=this.#labelText+this.#labelValueFormatCallback(newMin);
    }
    this.#input.min=newMin;
  }

  /**
   * Sets a new maximum value for the slider.
   * @param {Number} newMin New maximum value
   */
  setMax(newMax) {
    if (parseInt(this.#input.value)>newMax) {
      this.#input.value=newMax;
      this._label.innerHTML=this.#labelText+this.#labelValueFormatCallback(newMax);
    }
    this.#input.max=newMax;
  }

  /**
   * Current value
   */
  get value() {
    return parseInt(this.#input.value);
  }

  /**
   * Sets a new value for the slider
   */
  set value(newValue) {
    this.#input.value=newValue;
    this._label.innerHTML=this.#labelText+this.#labelValueFormatCallback(newValue);
  }

  /**
   * Enables or disables the slider
   * @param {boolean} isEnabled Enable status
   */
  set enabled(isEnabled) {
    this.#input.disabled=!isEnabled;
  }
}


/**
 * Generates a Chartjs diagram
 */
class Diagram {
  #div;
  #data;
  #chart;
  #infoDiv;

  /**
   * Constructor
   * @param {Number} steps  Number of values to be calculated from minimum to maximum x value
   * @param {String} legendHideKeyword Data sets containing this keyword in the label will be hidden in the legend
   */
  constructor(steps, legendHideKeyword=null) {
    this.#div=document.createElement("div");
    const canvas=document.createElement("canvas");
    this.#div.appendChild(canvas);

    this.#data={};
    const setup={data: this.#data, options: this.#getOptions(steps, legendHideKeyword)};
    this.#chart=new Chart(canvas,setup);

    const div=document.createElement("div");
    div.className="mt-3";
    this.#div.appendChild(div);

    div.appendChild(this.#infoDiv=document.createElement("div"));
    this.#infoDiv.className="mb-3";

    const button=document.createElement("button");
    button.className="btn btn-warning btn-sm bi-zoom-out mt-1 me-2 mb-2";
    button.innerHTML=" "+language.GUI.zoomReset;
    button.onclick=()=>this.#chart.resetZoom();
    div.appendChild(button);

    const infoSpan=document.createElement("div");
    div.appendChild(infoSpan);
    infoSpan.innerHTML=language.GUI.zoomInfo;
  }

  #getOptions(steps, legendHideKeyword) {
    return {
      scales: {
        x: {
          title: {display: true, text: language.GUI.defectRate},
          ticks: {callback: value=>(value%Math.round(steps/20)!=0)?null:(Math.round(value*100/steps)+"%")}
        },
        y: {
          title: {display: true, text: language.GUI.yAxis},
          min: 0,
          max: 1,
          ticks: {callback: value=>(value*100).toLocaleString()+"%"}
        },
        y2: {
          position: 'right',
          title: {display: true, text: language.GUI.y2Axis},
          min: 0,
          ticks: {callback: function(value, index, values) {return value.toLocaleString();}}
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {filter: (item,_)=>(legendHideKeyword==null || !item.text.includes(legendHideKeyword))}
        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
              modifierKey: "ctrl",
            },
            pinch: {
              enabled: true
            },
            drag: {
              enabled: true,
              modifierKey: "ctrl",
            },
            mode: 'xy',
          }
        },
        tooltip: {
          callbacks: {
              label: function(context) {
                  let label=context.dataset.label || '';
                  if (label) label+=': ';
                  if (context.parsed.y!==null) label+=(Math.round(context.parsed.y*1000)/10).toLocaleString()+"%";
                  return label;
              }
          }
        }
      },
      animation: {duration: 0}
    };
  }

  /**
   * Enables or disables the second y axis (shown on the right).
   * @param {boolean} visible Show right y axis
   */
  secondAxisVisible(visible) {
    this.#chart.options.scales.y2.display=visible;
  }

  /**
   * Returns the array containing the data sets.
   */
  get data() {
    return this.#data;
  }

  /**
   * Return the Chartjs object.
   */
  get chart() {
    return this.#chart;
  }

  /**
   * html div element
   */
  get div() {
    return this.#div;
  }

  /**
   * Sets the info text to be shown below the diagram.
   * @param {string} infoText Info text below the diagram
   */
  set info(infoText) {
    this.#infoDiv.innerHTML=infoText;
  }
}


/**
 * Generates the sample plan setup card.
 */
class Plan extends Card {
  #changeCallback;
  #isOkCallback;
  #planN;
  #planC;
  #info;
  #buttons;
  #ready;
  #maxN;

  /**
   * Constructor
   * @param {Number} n Initial value for sample plan parameter n
   * @param {Number} c Initial value for sample plan parameter n
   * @param {Object} changeCallback Function which is called if the value of the form element is changed
   * @param {Object} isOkCallback Function which returns a string which is shown below the parameter setup sliders indicating if the plan is valid (parameters: n,c)
   * @param {Object} optimizeCallback Function which is called to optimize the sample plan (parameters: show animation?)
   * @param {String} optimizeInfo Info text explaining the optimization process
   */
  constructor(n, c, changeCallback, isOkCallback, optimizeCallback, optimizeInfo) {
    super(language.GUI.samplingPlan);
    this.#ready=false;
    this.#changeCallback=changeCallback;
    this.#isOkCallback=isOkCallback;

    this.append(this.#planN=new HorizontalSlider("n=",1,200,1,n,v=>v,()=>this._fireChangeNotify(),2));
    this.append(this.#planC=new HorizontalSlider("c=",0,200,1,c,v=>v,()=>this._fireChangeNotify(),1));
    this.append(this.#info=new InfoText());

    /* Select element for maxN */
    const label=document.createElement("label");
    label.className="form-label";
    label.innerHTML="max<sub>N</sub>=";
    label.style.paddingRight="5px";
    this.#planN.info.appendChild(label);
    this.#maxN=document.createElement("select");
    this.#planN.info.appendChild(this.#maxN);
    this.#maxN.className="form-select";
    this.#maxN.style.width="unset";
    this.#maxN.style.display="inline";
    this.#maxN.onchange=()=>{
      this.#planN.setMax(this.#maxN.value);
      this.updateStatus();
    };
    let option;
    this.#maxN.appendChild(option=document.createElement("option"));
    option.value=200;
    option.innerHTML="200";
    this.#maxN.appendChild(option=document.createElement("option"));
    option.value=2000;
    option.innerHTML="2000";

    this.#buttons=[];
    let button;
    const buttonDiv=document.createElement("div");
    buttonDiv.className="mt-3";
    this._body.appendChild(buttonDiv);

    buttonDiv.appendChild(button=document.createElement("button"));
    button.className="btn btn-primary btn-sm bi-caret-right mt-1 me-2 mb-2";
    button.innerHTML=" "+language.GUI.searchOptimalPlanWithAnimation;
    button.onclick=()=>optimizeCallback(true);
    this.#buttons.push(button);

    buttonDiv.appendChild(button=document.createElement("button"));
    button.className="btn btn-primary btn-sm bi-calculator mt-1 me-2 mb-2";
    button.innerHTML=" "+language.GUI.searchOptimalPlanFast;
    button.onclick=()=>optimizeCallback(false);
    this.#buttons.push(button);

    this.append(new InfoText(optimizeInfo));

    this.#ready=true;
    this._fireChangeNotify();
  }

  /**
   * Is called to update the status text below the sliders.
   */
  updateStatus() {
    const n=this.#planN.value;
    this.#planC.setMax(n);
    this.#planC.info="max<sub>C</sub>="+n;
    const c=this.#planC.value;

    const info=[];
    info.push(language.GUI.samplingPlanInfo1+n+language.GUI.samplingPlanInfo2+c+language.GUI.samplingPlanInfo3);
    if (this.#isOkCallback) info.push(this.#isOkCallback(n,c));
    this.#info.text=info.join("<br>");
  }

  /**
   * Is called if the value of the html form element is changed by the user.
   */
  _fireChangeNotify() {
    if (!this.#ready) return;
    this.updateStatus();
    this.#changeCallback();
  }

  /**
   * Sets a new sample plan
   * @param {Number} n Sample plan parameter n
   * @param {Number} c Sample plan parameter c
   * @return Returns true if the plan could be set
   */
  setPlan(n, c) {
    if (n>2000) return false;
    if (n>200 && this.#maxN.value==200) {
      this.#maxN.value=2000;
      this.#planN.setMax(this.#maxN.value);
    }
    this.#planN.value=n;
    this.#planC.setMax(n);
    this.#planC.value=c;
    this._fireChangeNotify();
    return true;
  }

  /**
   * Sample plan parameter n
   */
  get n() {
    return parseInt(this.#planN.value);
  }

  /**
   * Sample plan parameter c
   */
  get c() {
    return parseInt(this.#planC.value);
  }

  /**
   * Enables or disables the sliders and the buttons.
   * @param {boolean} isEnabled Enable status
   */
  set enabled(isEnabled) {
    this.#planN.enabled=isEnabled;
    this.#planC.enabled=isEnabled;
    this.#buttons.forEach(button=>button.disabled=!isEnabled);
  }
}
