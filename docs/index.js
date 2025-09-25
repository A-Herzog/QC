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

/* Select language */
import {selectLanguage} from './js/LanguageTools.js';
import {language} from "./js/Language.js";
import {initApp, isDesktopApp} from './js/Main.js';

function start() {
  /* Language */
  if (selectLanguage([{name: "default", file: "index.html"}, {name: "de", file: "index_de.html"}])) return;

  /* Select color mode */
  let selectedColorMode=localStorage.getItem('selectedColorMode');
  if (selectedColorMode==null) selectedColorMode=(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)?"dark":"light";
  document.documentElement.dataset.bsTheme=selectedColorMode;

  /* Init app */

  initApp();

  if (isDesktopApp) {
    const footer=document.querySelector('footer');
    for (let link of footer.querySelectorAll("a")) if (link.href!='') {
      const href=link.href;
      link.onclick=()=>Neutralino.os.open(href);
      link.removeAttribute("href");
      link.style.cursor="pointer";
      link.classList.add("link-primary");
    }
  }

  const html=[];
  if (!isDesktopApp) {
    const downloadButton="<button class='btn btn-primary dropdown-toggle my-1 bi-download' type='button' data-bs-toggle='dropdown' aria-expanded='false'>&nbsp;"+language.GUI.downloadButton+"</button>";
    const downloadOptions=[
      "<a class='dropdown-item bi bi-windows' href='https://github.com/A-Herzog/QC/releases/latest/download/QC.exe'>&nbsp;"+language.GUI.downloadButtonExe+"</a>",
      "<a class='dropdown-item bi bi-file-zip' href='https://github.com/A-Herzog/QC/releases/latest/download/QC_Linux_MacOS.zip'>&nbsp;"+language.GUI.downloadButtonZip+"</a>"
    ];
    html.push("<p class='mt-3'>"+language.GUI.downloadLabel+"</p>");
    html.push("<p><div class='dropdown'>"+downloadButton);
    html.push("<ul class='dropdown-menu'><li>"+downloadOptions.join("</li><li>")+"</li></ul>"+"</div>");
    html.push("</p>");
  }
  html.push("<p class='mt-3'>"+language.GUI.infoLabel+"</p>");
  html.push("<p>");
  if (language.mode=='de') {
    html.push("<a class='btn btn-primary bi bi-file-earmark-pdf me-3' href='./info/MethodenDerStatistischenQualitaetssicherung.pdf' target='_blank'> "+language.GUI.infoPDF+"</a>");
  }
  html.push("<a class='btn btn-primary bi bi-filetype-py' href='./info/StatisticalQualityControl.ipynb'> "+language.GUI.infoIPYNB+"</a>");
  html.push("</p>");
  downloadInfoArea.innerHTML=html.join("\n");

}

start();
