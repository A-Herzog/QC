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

export {language};

let lang;

/* German */

const languageDE={};
lang=languageDE;

lang.GUI={};
lang.GUI.appName="Statistische Qualitätssicherung";
lang.GUI.homeURL="warteschlangensimulation.de";
lang.GUI.imprint="Impressum";
lang.GUI.privacy="Datenschutz";
lang.GUI.privacyInfo1="Info";
lang.GUI.privacyInfo2="Alle Berechnungen laufen vollständig im Browser ab.<br>Diese Webapp führt nach dem Laden des HTML- und Skriptcodes keine weitere Kommunikation mit dem Server durch.";
lang.GUI.simulators="Simulatoren";
lang.GUI.switchLanguage="Switch to <b>English</b>";
lang.GUI.switchLanguageHint="Switch to English";
lang.GUI.switchLanguageShort="English";
lang.GUI.switchLanguageMode='default';
lang.GUI.switchLanguageFile="index.html";
lang.GUI.tabColorMode="Farbmodus";
lang.GUI.tabColorModeLight="Hell";
lang.GUI.tabColorModeDark="Dunkel";
lang.GUI.tabColorModeSystemDefault="Systemvorgabe";
lang.GUI.downloadLabel="Diese Webapp steht auch als offline-nutzbare Anwendung zur Verfügung:";
lang.GUI.downloadButton="Download";
lang.GUI.downloadButtonExe="Windows-Anwendung (exe)";
lang.GUI.downloadButtonZip="Linux und MacOS-Anwendung (zip)";
lang.GUI.coordinateX="x-Koordinate";
lang.GUI.coordinateY="y-Koordinate";
lang.GUI.pageInfo="Allgemeine Erklärung";
lang.GUI.yAxis="Annahmewahrscheinlichkeit / mittlerer Durchschlupf";
lang.GUI.y2Axis="mittlerer Prüfaufwand";
lang.GUI.zoomInfo="Mit gedrückter <span class='border rounded-1 ps-1 pe-1 bg-light'><tt>Strg</tt></span>-Taste kann per Mausrad gezoomt werden und es können Zoom-Rahmen aufgezogen werden.";
lang.GUI.zoomReset="Standardzoom";
lang.GUI.samplingPlan="Stichprobenplan";
lang.GUI.samplingPlanInfo1="Der Lieferung werden n=";
lang.GUI.samplingPlanInfo2=" Teile entnommen und geprüft. Die Lieferung wird akzeptiert, wenn höchstens c=";
lang.GUI.samplingPlanInfo3=" defekte Teile in der Stichprobe enthalten sind.";
lang.GUI.defectRate="Ausschussanteil";
lang.GUI.searchOptimalPlanWithAnimation="Optimalen Plan bestimmen (mit Animation)";
lang.GUI.searchOptimalPlanFast="Optimalen Plan bestimmen (ohne Animation)";

lang.GUI.mainInfo=`
<img src="./images/FlowChart.gif" style="float: right; max-width: 400px;">
<p>Sowohl während seiner Entwicklung als auch während seiner Herstellung durchläuft ein Produkt verschiedene Qualifizierungsstufen. Die Sicherstellung seiner technischen Spezifikationen durch prozessintegrierte Meßsysteme und computergestützte Auswerteverfahren stellt für alle Unternehmen eine besondere Herausforderung dar. Besonders Großserien–Hersteller wie PC–, Automobil-, Elektronik- oder Lebensmittelhersteller müssen sich darauf verlassen können, dass die von ihnen verwendeten Komponenten und Zutaten einwandfrei sind. Aber auch der Kunde möchte sicher sein, ein fehlerfreies Produkt zu erwerben. Eventuell erforderlich werdende Garantieleistungen und Rückrufaktionen sind nicht nur mit hohen Kosten sondern auch mit einem erheblichen Vertrauensschwund bei den Kunden verbunden. Aus diesem Grund betreiben fast alle großen Firmen ein umfassendes Qualitätsmanagement, das die mit der Qualitätsüberwachung einhergehenden Geschäftsprozesse koordiniert und die für die Erfassung und Auswertung der Qualitätsdaten erforderlichen Methoden und Verfahren zur Verfügung stellt. Aufgrund der Datenmengen werden dabei auch große Anforderungen an die Informationstechnik gestellt.</p>
<p>Der mit einer Vollkontrolle einhergehende technische und personelle Aufwand steht oftmals in keinem Verhältnis zum Erlös, der mit dem Produkt erzielt werden kann, oder zum Risiko, das mit dem Versagen des Produkts verbunden ist. Hinzu kommt, dass viele Prüfverfahren zerstörenden Charakter haben, weshalb eine Vollkontrolle nicht in Frage kommt. Umfangreiche Tests verlängern außerdem die Durchlaufzeiten durch die Fertigung, was im Rahmen einer schlanken Produktion nicht erwünscht ist. Die mathematischen Verfahren der Gut–Schlecht– Prüfung zielen darauf ab, die mit der Qualitätsüberprüfung verbundenen Kosten aufgrund einer Stichprobenprüfung zu reduzieren und die Möglichkeit einer Fehlentscheidung unter Kontrolle zu halten.</p>
<div id="downloadInfoArea" class="mt-5"></div>
`;

lang.GUI.Guenther={};
lang.GUI.Guenther.name="Algorithmus von Günther";
lang.GUI.Guenther.distribution="Verteilungsfunktion";
lang.GUI.Guenther.distributionHg="Hypergeometrische Verteilung";
lang.GUI.Guenther.distributionB="Binomialverteilung";
lang.GUI.Guenther.distributionP="Poissonverteilung";
lang.GUI.Guenther.DeliverySize="Liefergröße";
lang.GUI.Guenther.operationCharacteristic="Operationscharakteristik";
lang.GUI.Guenther.AQLandLQ="Gut- und Schlechtgrenze";
lang.GUI.Guenther.AQLandLQinfo="AQL=Gutgrenze (Acceptable Quality Level)<br>LQ=Schlechtgrenze (Limiting Quality)";
lang.GUI.Guenther.area="Bereich";
lang.GUI.Guenther.AQLInfo1="Lieferungen mit höchstens <i>P<sub>1-&alpha;</sub></i>=";
lang.GUI.Guenther.AQLInfo2=" Ausschuss sollen mit einer Wahrscheinlichkeit von mindestens <i>1-&alpha;</i>=";
lang.GUI.Guenther.AQLInfo3=" angenommen werden.";
lang.GUI.Guenther.LQInfo1="Lieferungen mit über <i>P<sub>&beta;</sub></i>=";
lang.GUI.Guenther.LQInfo2=" Ausschuss sollen mit einer Wahrscheinlichkeit von höchstens <i>&beta;</i>=";
lang.GUI.Guenther.LQInfo3=" angenommen werden.";
lang.GUI.Guenther.AOQInfo="Mittlerer Durchschlupf (Average Outgoing Quality)";
lang.GUI.Guenther.AOQInfoShort="mittlerer Durchschlupf";
lang.GUI.Guenther.AOQLInfo="Maximaler mittlere Durchschlupf (Average Outgoing Quality Limit)";
lang.GUI.Guenther.StatusTT="<span style='color: green;'>Der Stichprobenplan hält Gut- und Schlechtgrenze ein.</span>";
lang.GUI.Guenther.StatusTF="<span style='color: green;'>Der Stichprobenplan hält die Gutgrenze ein</span>, <span style='color: red;'>verletzt aber die Schlechtgrenze</span>.";
lang.GUI.Guenther.StatusFT="<span style='color: green;'>Der Stichprobenplan hält die Schlechtgrenze ein</span>, <span style='color: red;'>verletzt aber die Gutgrenze</span>.";
lang.GUI.Guenther.StatusFF="<span style='color: red;'>Der Stichprobenplan verletzt sowohl die Gut- als auch die Schlechtgrenze.</span>";
lang.GUI.Guenther.searchOptimalPlanInfo="Gesucht wird ein <i>(n-c)</i>-Stichprobenplan, der Gut- und Schlechtgrenze einhält und mit einem möglichst kleinen Stichprobenumfang auskommt. Beginnend mit <i>n</i>=1, <i>c</i>=0 wird <i>n</i> so lange erhöht, bis die Schlechtgrenze eingehalten wird. Ist in diesem Fall auch die Gutgrenze erfüllt, so endet der Algorithmus. Andernfalls wird <i>c</i> um eins erhöhe und es wird wieder ab <i>n</i>=<i>c</i> angefangen zu suchen.";
lang.GUI.Guenther.cancelInfo="Die Berechnung wurde abgebrochen, weil n=2000 erreicht wurde, ohne dass ein gültiger Plan gefunden werden konnte.";

lang.GUI.Guenther.info=`
<p>
In der Darstellung ist die Operationscharakteristik <i>L<sub>N,n,c</sub>(p)</i> zu sehen.
Die Werte für die Größe der Lieferungen <i>N</i>, die Größe der Stichproben <i>n</i> und die maximal zulässige Anzahl defekter Teile in einer Stichprobe <i>c</i> können unter der Darstellung eingestellt werden.
Außerdem kann eingestellt werden, welche Verteilung der Operationscharakteristik zu Grunde gelegt werden soll.
Zusätzlich können über die Schieberegler unter der Darstellung die <b>Gutgrenze</b> <i>(p<sub>1-&alpha;</sub>,&alpha;)</i> und die <b>Schlechtgrenze</b> <i>(p<sub>&beta;</sub>,&beta;)</i> festgelegt werden.
</p>
<p>
Ziel des <i>(n-c)</i>-Stichprobenplanes ist es, durch Einstellung der Werte <i>n</i> und <i>c</i> eine Operationscharakteristik <i>L<sub>N,n,c</sub>(p)</i> zu finden, die oberhalb von <i>(p<sub>1-&alpha;</sub>,&alpha;)</i> und
unterhalb von <i>(p<sub>&beta;</sub>,&beta;)</i> verläuft - und dies bei möglichst kleinem <i>n</i>.
</p>
`;

lang.GUI.Philips={};
lang.GUI.Philips.name="Philips Stichprobenplan";
lang.GUI.Philips.operationCharacteristic="Operationscharakteristik";
lang.GUI.Philips.IndifferencePoint="Indifferenzpunkt";
lang.GUI.Philips.point="Punkt";
lang.GUI.Philips.pAndHInfo="P<sub>0,5</sub>=Indifferenzpunkt<br>h<sub>0</sub>=Steilheit am Indifferenzpunkt";
lang.GUI.Philips.SteepnessActual="Steilheit (ist)";
lang.GUI.Philips.SteepnessTarget="Steilheit (soll)";
lang.GUI.Philips.searchOptimalPlanInfo="Gesucht wird ein (<i>n</i>-<i>c</i>)-Stichprobenplan, so dass die Steilheit am Indifferenzpunkt <i>P</i><sub>p0,5</sub> größer als <i>h</i><sub>0</sub> ist. Zur Bestimmgung von <i>c</i> wird dieses beginnend mit <i>c</i>=0 so lange erhöht, bis 2(<i>np</i><sub>0,5</sub>)<sup><i>c</i>+1</sup>/<i>c</i>!*exp(-<i>np</i><sub>0,5</sub>) größer als die vorgegebene gewünschte Steilheit ist. Das zugehörige <i>n</i> lässt sich dann mit Hilfe der &chi;<sup>2</sup>-Verteilung bestimmen.";
lang.GUI.Philips.setupInfo1="Am Indifferenzpunkt ";
lang.GUI.Philips.setupInfo2=" soll eine Steilheit von ";
lang.GUI.Philips.setupInfo3=" vorliegen.";
lang.GUI.Philips.resultInfo1="Lieferungen mit einem Ausschussanteil von ";
lang.GUI.Philips.resultInfo2="% sollen genau mit der Wahrscheinlichkeit von 50% angenommen werden. Die Steilheit der Operationscharakteristik in diesem Punkt soll ";
lang.GUI.Philips.resultInfo3=" betragen.";
lang.GUI.Philips.resultInfoT1="<span style='color: green'>Die Steilheit ist mit ";
lang.GUI.Philips.resultInfoT2=" im Indifferenzpunkt größer als vorgegeben.<\/span>";
lang.GUI.Philips.resultInfoF1="<span style='color: red'>Mit ";
lang.GUI.Philips.resultInfoF2=" ist die Steilheit im Indifferenzpunkt kleiner als vorgegeben.<\/span>";

lang.GUI.Philips.info=`
<p>
Zur Bestimmung eines Philips Stichprobenplanes müssen der <b>Indifferenzpunkt</b> <i>p<sub>0.5</sub></i>, d.h. der Punkt für den <i>L<sub>n,c</sub>(p<sub>0,5</sub>)=0,5</i>
gelten soll, sowie die <b>Steilheit</b> <i>h<sub>0</sub></i> an diesem Punkt vorgegeben werden.
</p>
`;

/* English */

const languageEN={};
lang=languageEN;

lang.GUI={};
lang.GUI.appName="Statistical quality control";
lang.GUI.homeURL="queueingsimulation.de";
lang.GUI.imprint="Imprint";
lang.GUI.privacy="Privacy";
lang.GUI.privacyInfo1="Info";
lang.GUI.privacyInfo2="All calculations are performed entirely in the browser.<br>This Webapp does not perform any further communication with the server after loading the HTML and script code.";
lang.GUI.simulators="Simulators";
lang.GUI.switchLanguage="Auf <b>Deutsch</b> umschalten";
lang.GUI.switchLanguageHint="Auf Deutsch umschalten";
lang.GUI.switchLanguageShort="Deutsch";
lang.GUI.switchLanguageMode='de';
lang.GUI.switchLanguageFile="index_de.html";
lang.GUI.tabColorMode="Color mode";
lang.GUI.tabColorModeLight="Light";
lang.GUI.tabColorModeDark="Dark";
lang.GUI.tabColorModeSystemDefault="System default";
lang.GUI.downloadLabel="This webapp is also available as an offline usable application:";
lang.GUI.downloadButton="Download";
lang.GUI.downloadButtonExe="Windows application (exe)";
lang.GUI.downloadButtonZip="Linux and macOS application (zip)";
lang.GUI.coordinateX="x-coordinate";
lang.GUI.coordinateY="y-coordinate";
lang.GUI.pageInfo="General explanation";
lang.GUI.yAxis="Acceptance probability / average Outgoing Quality";
lang.GUI.y2Axis="average testing effort";
lang.GUI.zoomInfo="By holding down the <span class='border rounded-1 ps-1 pe-1 bg-light'><tt>Ctrl</tt></span> key, the mouse wheel can be used to zoom in and out, and zoom frames can be drawn.";
lang.GUI.zoomReset="Reset zoom";
lang.GUI.samplingPlan="Sampling plan";
lang.GUI.samplingPlanInfo1="n=";
lang.GUI.samplingPlanInfo2=" parts are taken from the delivery and checked. The delivery is accepted if the sample contains a maximum of c=";
lang.GUI.samplingPlanInfo3=" defective parts.";
lang.GUI.defectRate="Defect rate";
lang.GUI.searchOptimalPlanWithAnimation="Search optimal plan (with animation)";
lang.GUI.searchOptimalPlanFast="Search optimal plan (without animation)";

lang.GUI.mainInfo=`
<img src="./images/FlowChart.gif" style="float: right; max-width: 400px;">
<p>Both during its development and during its production a product is running through different qualification levels. Ensuring its technical specifications through process-integrated measurement systems and computer-based evaluation is a particular challenge for all companies. Especially large-scale manufacturers such as PC, automotive, electronics or food producers need to be confident that the components and ingredients used by them are perfect. But also the customer wants to be sure to buy a flawless product. Possibly any necessary warranty and recall actions are not only associated with high costs but also to a considerable loss of confidence among customers. For this reason, almost all major companies operate a comprehensive quality management, which coordinates associated with the quality monitoring business processes and the information necessary for the collection and evaluation of data quality methods and processes. Due to the amount of data there are also great demands on the information technology.</p>
<p>The technical and human effort associated with a full-control is often disproportionate to the revenue that can be achieved with the product, or to the risk associated with the failure of the product. In addition, many tests have a destructive character, which is why a full inspection is not an option. Extensive tests also extend the cycle times through the production, which is not desirable in the context of lean production. The mathematical method of good-bad-examination are intended to reduce the costs associated with the quality monitoring by using a sampling inspection and to keep the possibility of a wrong decision under control.</p>
<div id="downloadInfoArea" class="mt-5"></div>
`;

lang.GUI.Guenther={};
lang.GUI.Guenther.name="Algorithm from Günther";
lang.GUI.Guenther.distribution="Distribution";
lang.GUI.Guenther.distributionHg="Hypergeometric distribution";
lang.GUI.Guenther.distributionB="Binomial distribution";
lang.GUI.Guenther.distributionP="Poisson distribution";
lang.GUI.Guenther.DeliverySize="Delivery size";
lang.GUI.Guenther.operationCharacteristic="Operations characteristics";
lang.GUI.Guenther.AQLandLQ="Acceptable Quality Level / Limiting Quality";
lang.GUI.Guenther.AQLandLQinfo="AQL=Acceptable Quality Level<br>LQ=Limiting Quality";
lang.GUI.Guenther.area="area";
lang.GUI.Guenther.AQLInfo1="Deliveries with a maximum of <i>P<sub>1-&alpha;</sub></i>=";
lang.GUI.Guenther.AQLInfo2=" defects should be accepted with a probability of at least <i>1-&alpha;</i>=";
lang.GUI.Guenther.AQLInfo3=".";
lang.GUI.Guenther.LQInfo1="Deliveries with more than <i>P<sub>&beta;</sub></i>=";
lang.GUI.Guenther.LQInfo2=" defects should be accepted with a maximum probability of <i>&beta;</i>=";
lang.GUI.Guenther.LQInfo3=".";
lang.GUI.Guenther.AOQInfo="Average Outgoing Quality";
lang.GUI.Guenther.AOQInfoShort="Average Outgoing Quality";
lang.GUI.Guenther.AOQLInfo="Average Outgoing Quality Limit";
lang.GUI.Guenther.StatusTT="<span style='color: green;'>The sampling plan complies with the acceptable quality level and the limiting quality.</span>";
lang.GUI.Guenther.StatusTF="<span style='color: green;'>The sampling plan complies with the acceptable quality level</span>, <span style='color: red;'>but violates the limiting quality</span>.";
lang.GUI.Guenther.StatusFT="<span style='color: green;'>The sampling plan complies with the limiting quality</span>, <span style='color: red;'>but violates the acceptable quality level</span>.";
lang.GUI.Guenther.StatusFF="<span style='color: red;'>The sampling plan violates both the acceptable quality level and the limiting quality.</span>";
lang.GUI.Guenther.searchOptimalPlanInfo="We search a (<i>n</i>-<i>c</i>) sample plan, which fulfills the acceptable qualitiy level and the limiting quality and that has a as small as possible sample size. Starting with <i>n</i>=1, <i>c</i>=0 the value of <i>n</i> will be increased until the limiting quality is hold. If the acceptable quality limit is also hold in this case, the algorithmus stops. In the other case <i>c</i> will be increased and the algorithmus will start again with <i>n</i>=<i>c</i>.";
lang.GUI.Guenther.cancelInfo="The calculation was aborted because n=2000 was reached without a valid plan being found.";

lang.GUI.Guenther.info=`
<p>
In the illustration the operation characteristic <i>L<sub>N,n,c</sub>(p)</i>
is displayed. The values for the size of deliveries <i>N</i>, the size of the
sampling <i>n</i> and the maximum allowed number of defective parts in a
sample <i>c</i> can be set up below the graph. Additionally one can define
the distribution function, which is the operating characteristic curve is based on.
Furthermore the <b>acceptable quality level</b> <i>(p<sub>1-&alpha;</sub>,&alpha;)</i>
and the <b>limiting quality</b> <i>(p<sub>&beta;</sub>,&beta;)</i> can be set up by the sliders below.
</p>
<p>
Target of the <i>(n-c)</i> sampling plan is to find an operation characteristic
<i>L<sub>N,n,c</sub>(p)</i> by adjusting the values <i>n</i> and <i>c</i> that
runs above <i>(p<sub>1-&alpha;</sub>,&alpha;)</i> and below <i>(p<sub>&beta;</sub>,&beta;)</i>
and has a as small as possible value for <i>n</i>.
</p>
`;

lang.GUI.Philips={};
lang.GUI.Philips.name="Philips sampling plan";
lang.GUI.Philips.operationCharacteristic="Operations characteristics";
lang.GUI.Philips.IndifferencePoint="Indifference point";
lang.GUI.Philips.point="point";
lang.GUI.Philips.pAndHInfo="P<sub>0.5</sub>=Indifference point<br>h<sub>0</sub>=Steepness at the indifference point";
lang.GUI.Philips.SteepnessActual="Steepness (actual)";
lang.GUI.Philips.SteepnessTarget="Steepness (target)";
lang.GUI.Philips.searchOptimalPlanInfo="We search a (<i>n</i>-<i>c</i>) sample plan with a steppness at the indefference point <i>P</i><sub>0.5</sub> of more than <i>h</i><sub>0</sub>. For the determination of <i>c</i> we start at <i>c</i>=0 and increase <i>c</i> until 2(<i>np</i><sub>0.5</sub>)<sup><i>c</i>+1</sup>/<i>c</i>!*exp(-<i>np</i><sub>0.5</sub>) is bigger than the reuqired steepness. The corresponding <i>n</i> can be calculated from the &chi;<sup>2</sup> distribution.";
lang.GUI.Philips.setupInfo1="At the indifference point ";
lang.GUI.Philips.setupInfo2=" a steppness of ";
lang.GUI.Philips.setupInfo3=" should be present.";
lang.GUI.Philips.resultInfo1="Deliveries with a defect rate of ";
lang.GUI.Philips.resultInfo2="% should be accepted with a probability of exactly 50%. The steppness of the operation characteristic at this point should be ";
lang.GUI.Philips.resultInfo3=".";
lang.GUI.Philips.resultInfoT1="<span style='color: green'>The steppness at the indifference point is with ";
lang.GUI.Philips.resultInfoT2=" larger than required.<\/span>";
lang.GUI.Philips.resultInfoF1="<span style='color: red'>The steppness at the indifference point is with ";
lang.GUI.Philips.resultInfoF2=" smaller than required.<\/span>";

lang.GUI.Philips.info=`
<p>
To determine a Philips sampling plan the <b>indifference point</b> <i>p<sub>0.5</sub></i>,
i.e. the point at which <i>L<sub>n,c</sub>(p<sub>0,5</sub>)=0,5</i> is, and the
<b>steepness</b> <i>h<sub>0</sub></i> have to be defined.
</p>`;

/* Activate language */

const language=(document.documentElement.lang=='de')?languageDE:languageEN;
