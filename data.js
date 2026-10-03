// Datos de la Guía de Bolsillo: kV, mA, mAs por proyección (columnas: región|proyección|kV|mA|mAs|página)
const RAW=`Cráneo|Cráneo de frente P.A.|63|100|40|24
Cráneo|Cráneo de frente A.P.|63|100|40|25
Cráneo|Cráneo lateral|63|100|40|26
Cráneo|Cráneo lateral supino|63|100|40|27
Cráneo|Caldwell|72|200|30|29
Cráneo|Towne|80|200|30|32
Cráneo|Hirtz|80|200|30|33
Macizo facial|Waters|65|100|50|35
Macizo facial|Blondeau|65|100|50|36
Macizo facial|Senos paranasales lateral|65|100|50|37
Macizo facial|Huesos propios de la nariz lateral|46|100|6|40
Macizo facial|Cavum|57|100|32|41
Macizo facial|Maxilar inferior PA|63|100|40|42
Macizo facial|Maxilar inferior lateral|63|100|40|43
Macizo facial|Articulación temporomaxilar|63|100|40|44
Columna cervical|Cervical de AP|70|100|16|46
Columna cervical|Cervical de perfil|70|100|16|47
Columna cervical|Cervical oblicuas|70|100|16|48
Columna cervical|Cervical integral|56|100|32|49
Columna cervical|Transoral (atlas y axis)|56|100|32|50
Columna cervical|Cervical funcional de frente|56|100|32|51
Columna cervical|Cervical funcional lateral (flex./ext.)|56|100|32|52
Columna cervical|Cérvico-dorsal|63|100|40|53
Tórax|Tórax de frente|70|100|16|55
Tórax|Tórax de perfil|75|100|18|56
Tórax|Oblicua anterior derecha|68|100|16|57
Tórax|Oblicua anterior izquierda|68|100|16|58
Tórax|Lordótica apical|70|100|11|59
Tórax|Lumbago hueco (descentrada de vértice)|70|100|11|60
Tórax|Esternón de frente|76|200|40|61
Tórax|Costillas anteriores|65|100|16|63
Tórax|Costillas posteriores|65|100|16|64
Tórax|Costillas unilaterales|68|100|11|65
Columna torácica|Torácica AP|73|100|40|67
Columna torácica|Torácica lateral|70|200|60|68
Abdomen|Directa de abdomen (decúbito)|63|100|40|70
Abdomen|Directa de abdomen (de pie)|80|100|65|71
Columna lumbar|Lumbosacra de frente|80|100|45|74
Columna lumbar|Lumbosacra de perfil|90|200|60|75
Columna lumbar|Lumbar funcional de frente|80|100|40|76
Columna lumbar|Lumbar funcional de perfil|90|200|60|77
Columna lumbar|Lumbar oblicua|75|100|40|78
Pelvis y sacro|Técnica de Fergusson|80|100|40|80
Pelvis y sacro|Pelvis de frente|75|200|60|81
Pelvis y sacro|Inlet|75|200|70|82
Pelvis y sacro|Outlet|75|200|70|83
Pelvis y sacro|Técnica alar|75|200|70|84
Pelvis y sacro|Técnica obturatriz|75|200|70|85
Pelvis y sacro|Cadera de frente|75|200|70|86
Pelvis y sacro|Cadera de perfil|75|200|70|87
Pelvis y sacro|Ambas caderas de perfil|75|200|70|88
Hombro|Hombro de frente|50|100|10|98
Hombro|Hombro perfil transtorácico|75|100|10|99
Hombro|Hombro axial|64|200|25|100
Hombro|Hombro en Y|67|100|10|101
Hombro|Lamy o Neer|67|100|10|102
Hombro|Escápula de frente|67|100|10|103
Hombro|Escápula de perfil|67|100|10|104
Hombro|Clavícula de frente|67|100|10|105
Hombro|Clavícula axial|67|100|10|106
Hombro|Articulación acromioclavicular|65|100|10|107
Brazo|Brazo de frente|67|100|10|109
Brazo|Brazo de perfil|67|100|10|110
Brazo|Brazo transtorácico|75|100|10|111
Codo y antebrazo|Codo de frente|40|100|4|113
Codo y antebrazo|Codo de perfil|40|100|4|114
Codo y antebrazo|Antebrazo de frente|44|100|4|116
Codo y antebrazo|Antebrazo de perfil|44|100|4|117
Muñeca y carpo|Muñeca de frente|44|100|4|119
Muñeca y carpo|Muñeca de perfil|44|100|4|120
Muñeca y carpo|Escafoides|40|100|2.8|121
Muñeca y carpo|Túnel carpiano|44|100|4|122
Mano|Mano de frente|40|100|2.8|125
Mano|Mano de perfil|40|100|2.8|126
Mano|Mano oblicua|40|100|2.8|127
Mano|Mano oblicua (método de Norgaard)|40|100|2.8|128
Fémur|Fémur de frente|80|200|40|130
Fémur|Fémur de perfil|80|200|40|131
Rodilla|Rodilla de frente|50|100|10|133
Rodilla|Rodilla monopodálica de frente|50|100|10|134
Rodilla|Rodilla de perfil|50|100|10|135
Rodilla|Rodilla monopodálica de perfil|50|100|6|136
Rodilla|Rodilla oblicua|50|100|10|137
Rodilla|Fosa intercondílea|55|100|6|138
Rótula|Rótula de frente|47|100|6|140
Rótula|Rótula de perfil|47|100|6|141
Rótula|Rótula axial|47|100|6|142
Rótula|Axial de Jaroschy|47|100|6|143
Pierna|Pierna de frente|45|100|4|145
Pierna|Pierna de perfil|45|100|4|146
Tobillo|Tobillo de frente|46|100|5.6|148
Tobillo|Tobillo de perfil|46|100|5.6|149
Pie|Calcáneo de perfil|44|100|5|151
Pie|Calcáneo axial|55|100|5|152
Pie|Pie de frente|44|100|2.8|153
Pie|Pie de perfil|44|100|2.8|154
Pie|Pie oblicuo|44|100|2.8|155
Pie|Pie con carga|44|100|3.2|156`;
// Rayo directo, DFP/chasis y notas por página de la guía
const INFO={
"24": {
"rd": "Incide perpendicularmente al plano de apoyo, en el Inion y emerge en el Nasion.",
"dfp": "1 m — 24x30 longitudinal, 5cm sobre el vértex",
"n": ""
},
"25": {
"rd": "La cruz incide en el nasión. Perpendicular, haz longitudinal coincide con plano medio sagital, haz transversal con plano meato-orbitario, pasa por CAE. Emerge en el inion.",
"dfp": "1 m — 24x30 longitudinal",
"n": ""
},
"26": {
"rd": "Perpendicular al plano de apoyo, sobre la línea auricular, 3 a 4 cm encima del CAE.",
"dfp": "1 m — 24x30 apaisado, 5cm sobre el vértex",
"n": ""
},
"27": {
"rd": "Tubo horizontal. Incide perpendicular sobre paciente y película, 3cm encima del meato auditivo del lado opuesto al estudio.",
"dfp": "1 m — 24x30 perpendicular, en contacto con región lateral de cabeza",
"n": ""
},
"32": {
"rd": "Angulación 25° a 30° caudal respecto al plano meatoorbitario. Haz transversal a nivel de los CAE.",
"dfp": "1 m — 24x30 longitudinal",
"n": ""
},
"33": {
"rd": "Perpendicular, incide 5cm detrás de la sínfisis mentoniana, emerge en el vértex. Haz transversal pasa por los CAE.",
"dfp": "1 m — 24x30 longitudinal",
"n": ""
},
"35": {
"rd": "Horizontal. Perpendicular al plano de apoyo. Emergiendo en el punto denominado Acantion.",
"dfp": "1 m — 18x24 longitudinal",
"n": ""
},
"36": {
"rd": "Horizontal. Perpendicular al plano de apoyo. Emergiendo en el punto denominado Acantion.",
"dfp": "1 m — 18x24 longitudinal",
"n": ""
},
"37": {
"rd": "Perpendicular al plano de apoyo, en la intersección de la línea infraorbitaria y la línea de la comisura palpebral externa.",
"dfp": "1 m — 18x24 longitudinal",
"n": ""
},
"40": {
"rd": "Incide perpendicular al apoyo y en el nasión.",
"dfp": "1 m — 18x24 longitudinal",
"n": ""
},
"41": {
"rd": "Perpendicular al plano de apoyo, incidiendo 4cm arriba del gonion.",
"dfp": "1 m — 18x24 longitudinal",
"n": ""
},
"42": {
"rd": "Angulación cefálica de 25°, incide en la nuca, proyección transversal por el ángulo del maxilar inferior.",
"dfp": "1 m — 18x24 longitudinal",
"n": ""
},
"43": {
"rd": "Perpendicular al apoyo, incide a media distancia entre gonion y sínfisis mentoniana del lado opuesto al estudio.",
"dfp": "1 m — 18x24 longitudinal",
"n": ""
},
"44": {
"rd": "Angulación cefálica de 30°. Ingresa por el cuello del lado que no se estudia, emerge en la articulación en estudio, en contacto con la mesa.",
"dfp": "1 m — 18x24 longitudinal",
"n": ""
},
"46": {
"rd": "Angulación cefálica de 15°, incidiendo sobre el cartílago tiroideo. Compensa la curvatura cervical para diferenciar cuerpos vertebrales.",
"dfp": "1 m — 18x24 longitudinal",
"n": ""
},
"47": {
"rd": "Horizontal, perpendicular al potter. Haz transversal sobre cartílago tiroideo. Haz longitudinal por la región media-posterior del cuello.",
"dfp": "1,20 a 1,50 m — 18x24 longitudinal",
"n": ""
},
"48": {
"rd": "Angulación cefálica de 15°. Haz transversal coincidente con el cartílago tiroideo.",
"dfp": "1 m — 18x24 longitudinal",
"n": ""
},
"49": {
"rd": "Angulación cefálica de 15°, incidiendo en el cartílago tiroides.",
"dfp": "1 m — 18x24 longitudinal",
"n": ""
},
"50": {
"rd": "Perpendicular o con angulación de 5° cefálica, tangente al borde inferior de los incisivos superiores.",
"dfp": "1 m — 18x24 longitudinal",
"n": ""
},
"51": {
"rd": "Angulación de 15° cefálicos, sobre el cartílago tiroideo.",
"dfp": "1 m — 18x24 longitudinal",
"n": ""
},
"52": {
"rd": "Horizontal, perpendicular al plano de apoyo, el haz transversal pasa por el cartílago tiroideo.",
"dfp": "1,20 a 1,50 m — 18x24 apaisado",
"n": ""
},
"53": {
"rd": "Incide a la altura de D2 (base del cuello). Perpendicular si el paciente desnivela bien los hombros, o angulación de 5° caudal si no.",
"dfp": "1 m — 18x24 longitudinal",
"n": ""
},
"56": {
"rd": "Perpendicular al plano de apoyo, línea axilar media a la altura del vértice inferior de las escápulas.",
"dfp": "1,20 a 1,50 m — 35x43 longitudinal",
"n": ""
},
"57": {
"rd": "Perpendicular, mitad posterior del hemitórax izquierdo a nivel de la 6ta vértebra dorsal.",
"dfp": "1,80 m — 35x43 longitudinal",
"n": ""
},
"58": {
"rd": "Perpendicular, a nivel de la 6ta vértebra dorsal, mitad posterior del hemitórax derecho.",
"dfp": "1,80 m — 35x43 longitudinal",
"n": ""
},
"59": {
"rd": "Incide sobre el manubrio esternal, con angulación cefálica de 30°.",
"dfp": "1 m — 30x40 apaisada",
"n": ""
},
"60": {
"rd": "Perpendicular al potter, sobre el manubrio esternal.",
"dfp": "1 m — 30x40 apaisada",
"n": ""
},
"61": {
"rd": "Perpendicular, emerge en tercio medio del esternón, ~10cm debajo del manubrio esternal.",
"dfp": "1 m — 24x30 longitudinal",
"n": ""
},
"63": {
"rd": "Perpendicular al receptor, centrado en T7 (18-20cm bajo la vértebra prominente, como en PA de tórax).",
"dfp": "1 m — 35x43 longitudinal",
"n": ""
},
"64": {
"rd": "Sobre diafragma: centrado 8-10cm bajo escotadura yugular (T7). Bajo diafragma: centrado entre xifoides y caja torácica inferior.",
"dfp": "1 m — 35x43 longitudinal",
"n": ""
},
"65": {
"rd": "Sobre diafragma: centrado entre plano medio sagital y borde externo del tórax. Bajo diafragma: alinear el lado en estudio con el RC.",
"dfp": "1 m — 35x43 longitudinal",
"n": ""
},
"67": {
"rd": "Perpendicular, punto medio entre horquilla esternal y apéndice xifoides (técnica dorsolumbar: en el xifoides).",
"dfp": "1 m — 35x43 longitudinal",
"n": ""
},
"68": {
"rd": "Perpendicular, a nivel de línea axilar posterior; haz transversal a la altura del vértice de las escápulas.",
"dfp": "1 m — 35x43 o 30x40 longitudinal",
"n": ""
},
"70": {
"rd": "Perpendicular, sobre plano medio sagital a la altura de las crestas ilíacas.",
"dfp": "1 m — 35x43 longitudinal",
"n": ""
},
"71": {
"rd": "Perpendicular, sobre plano medio sagital a la altura de las crestas ilíacas.",
"dfp": "1 m — 35x43 longitudinal",
"n": ""
},
"74": {
"rd": "Perpendicular, plano medio sagital, 2 traveses encima de crestas ilíacas.",
"dfp": "1 m — 24x30 o 30x40 longitudinal",
"n": ""
},
"75": {
"rd": "De pie: perpendicular, 2-3 traveses bajo crestas ilíacas. Decúbito lateral: angulación caudal 5° (H) / 8° (M).",
"dfp": "1 m — 24x30 o 30x40 longitudinal",
"n": ""
},
"76": {
"rd": "Perpendicular, plano parasagital 3cm del PMS hacia la inclinación, 2 traveses sobre crestas ilíacas.",
"dfp": "1 m — 30x40 o 35x43 longitudinal",
"n": ""
},
"77": {
"rd": "Perpendicular, 2-3 traveses sobre crestas ilíacas (altura L3).",
"dfp": "1 m — 30x40 o 35x43 longitudinal",
"n": ""
},
"78": {
"rd": "Perpendicular; haz longitudinal sobre línea medio clavicular, haz transversal 2 traveses sobre cresta ilíaca.",
"dfp": "1 m — 24x30 o 30x40 longitudinal",
"n": ""
},
"80": {
"rd": "Decúbito dorsal: 2 traveses sobre el pubis, angulación cefálica 25-30°. Decúbito ventral: 25-30° caudal sobre el sacro.",
"dfp": "1 m — 18x24 o 24x30 longitudinal",
"n": ""
},
"81": {
"rd": "Perpendicular, a mitad de distancia entre pubis y espinas ilíacas anterosuperiores (~10cm sobre el pubis), o por el pulso femoral.",
"dfp": "1 m — 35x43 apaisada",
"n": ""
},
"82": {
"rd": "Angulación caudal de 40°, incidiendo 10cm encima del pubis.",
"dfp": "1 m — 35x43 apaisada",
"n": ""
},
"83": {
"rd": "Angulación cefálica de 40°, incidiendo 10cm encima del pubis.",
"dfp": "1 m — 35x43 apaisada",
"n": ""
},
"84": {
"rd": "Perpendicular al plano de apoyo. Haz transversal coincide con la espina ilíaca anterosuperior.",
"dfp": "1 m — 24x30 longitudinal",
"n": ""
},
"85": {
"rd": "Angulación cefálica de 10°. Cruz del colimador en línea imaginaria entre sínfisis pubiana y trocánter mayor.",
"dfp": "1 m — 24x30 longitudinal",
"n": ""
},
"86": {
"rd": "Perpendicular en el pulso femoral, en la ingle.",
"dfp": "1 m — 24x30 longitudinal",
"n": ""
},
"87": {
"rd": "Perpendicular en el pulso femoral.",
"dfp": "1 m — 24x30 apaisada",
"n": ""
},
"88": {
"rd": "Perpendicular sobre plano medio sagital, a la altura del pulso femoral.",
"dfp": "1 m — 24x30 apaisada (niños) / 35x43 (adultos)",
"n": ""
},
"98": {
"rd": "Perpendicular, en el punto que une tercio medio y tercio distal de la clavícula.",
"dfp": "1 m — 24x30 apaisada",
"n": ""
},
"99": {
"rd": "Sobre línea axilar media, 5cm bajo el hueco axilar. Si no eleva el hombro sano: angulación cefálica 10-15°.",
"dfp": "1 m — 24x30 longitudinal",
"n": ""
},
"100": {
"rd": "Incide en el hueco axilar, angulación cefálica de 15° a 30° hacia el plano medio sagital.",
"dfp": "1 m — 24x30 sobre el macizo del hombro",
"n": ""
},
"101": {
"rd": "Perpendicular a la región superior del borde medial de la escápula.",
"dfp": "1 m — 24x30 longitudinal",
"n": ""
},
"102": {
"rd": "Angulación caudal de 10-15°, emergiendo bajo la articulación acromioclavicular.",
"dfp": "1 m — 24x30 longitudinal",
"n": ""
},
"103": {
"rd": "Perpendicular, 5cm debajo de la mitad de la clavícula.",
"dfp": "1 m — 24x30 apaisada",
"n": ""
},
"104": {
"rd": "Perpendicular a la mitad del borde interno de la escápula.",
"dfp": "1 m — 24x30 longitudinal",
"n": ""
},
"105": {
"rd": "Ventral sobre la mitad de la clavícula / Dorsal emergiendo por la mitad de la clavícula.",
"dfp": "1 m — 24x30 apaisada",
"n": ""
},
"106": {
"rd": "Angulación cefálica de 25° a 30° sobre la mitad de la clavícula.",
"dfp": "1 m — 24x30 apaisada",
"n": ""
},
"107": {
"rd": "Perpendicular sobre el plano medio sagital, incidiendo sobre la hendidura esternal.",
"dfp": "1 m — 35x43 apaisada",
"n": ""
},
"109": {
"rd": "Perpendicular en el tercio medio del brazo (entre codo y hombro).",
"dfp": "1 m — 35x43 longitudinal",
"n": ""
},
"110": {
"rd": "Perpendicular en el tercio medio del húmero.",
"dfp": "1 m — 35x43 longitudinal",
"n": ""
},
"111": {
"rd": "Horizontal, perpendicular al plano de apoyo, a través del tórax. Emerge en el tercio medio del húmero.",
"dfp": "1 m — 35x43 longitudinal",
"n": ""
},
"113": {
"rd": "Perpendicular al plano de apoyo, sobre la flexura del codo.",
"dfp": "1 m — 18x24 long. o 24x30 apaisada",
"n": ""
},
"114": {
"rd": "Perpendicular en la articulación del codo.",
"dfp": "1 m — 18x24 long. o 24x30 apaisada",
"n": ""
},
"116": {
"rd": "Perpendicular al plano de apoyo, en el tercio medio del antebrazo.",
"dfp": "1 m — 35x43 longitudinal",
"n": ""
},
"117": {
"rd": "Perpendicular en la mitad del antebrazo.",
"dfp": "1 m — 35x43 longitudinal",
"n": ""
},
"119": {
"rd": "Perpendicular al plano de apoyo en la mitad del carpo.",
"dfp": "1 m — 18x24 apaisado",
"n": ""
},
"120": {
"rd": "Perpendicular al plano de apoyo, en la apófisis estiloides del radio.",
"dfp": "1 m — 18x24 apaisado",
"n": ""
},
"121": {
"rd": "Siempre sobre el escafoides, tenga o no angulación.",
"dfp": "1 m — 18x24 apaisado",
"n": ""
},
"122": {
"rd": "Angulación de 25° a 30° hacia el antebrazo, incidencia en el talón de la mano.",
"dfp": "1 m — 18x24 apaisado",
"n": ""
},
"126": {
"rd": "Perpendicular, sobre art. metacarpofalángica del 2do dedo (que mira al tubo).",
"dfp": "1 m — 24x30 apaisado",
"n": ""
},
"127": {
"rd": "Perpendicular, sobre art. metacarpofalángica del 3er dedo.",
"dfp": "1 m — 24x30 apaisado",
"n": ""
},
"128": {
"rd": "Perpendicular, punto medio entre ambas manos a nivel de la art. metacarpofalángica del 3er dedo.",
"dfp": "1 m — 24x30 apaisado",
"n": ""
},
"130": {
"rd": "Perpendicular al plano de apoyo, en el medio del fémur.",
"dfp": "1 m — 35x43 longitudinal",
"n": ""
},
"131": {
"rd": "Perpendicular al plano de apoyo, en el medio del fémur.",
"dfp": "1 m — 35x43 longitudinal",
"n": ""
},
"133": {
"rd": "Perpendicular, sobre el vértice inferior de la rótula.",
"dfp": "1 m — 24x30 o 30x40 apaisada",
"n": ""
},
"134": {
"rd": "Sobre la articulación en estudio, borde inferior de la rótula. Ambas rodillas en una proyección: a la altura del vértice de la rótula, entre ambos MMII.",
"dfp": "1 m — 18x24 long. (unilateral) / 35x43 apaisada (bilateral)",
"n": ""
},
"135": {
"rd": "Perpendicular sobre la articulación en estudio.",
"dfp": "1 m — 18x24 longitudinal",
"n": ""
},
"136": {
"rd": "Perpendicular en el epicóndilo medial, a la altura del vértice de la rótula.",
"dfp": "1 m — 18x24 long. (unilateral) / 35x43 apaisada (bilateral)",
"n": ""
},
"137": {
"rd": "Angulación de 5° cefálico a la altura del vértice rotuliano.",
"dfp": "1 m — 18x24 longitudinal",
"n": ""
},
"138": {
"rd": "A) Angulación caudal de 35° a 40°, en el hueco poplíteo. B) Perpendicular al plano de apoyo, sobre el hueco poplíteo.",
"dfp": "1 m — 18x24 longitudinal",
"n": ""
},
"140": {
"rd": "Perpendicular a la región poplítea, emergiendo por la rótula en estudio.",
"dfp": "1 m — 18x24 longitudinal",
"n": ""
},
"141": {
"rd": "Perpendicular sobre el borde anterior del cóndilo medial de la articulación en estudio.",
"dfp": "1 m — 18x24 longitudinal",
"n": ""
},
"142": {
"rd": "A) Angulado 20° cefálico sobre el vértice de la rótula, perpendicular a la articulación (Sol naciente). B) Angulado 45° caudal, incidiendo sobre la articulación (Método de Hughston).",
"dfp": "1 m — 18x24 longitudinal",
"n": ""
},
"143": {
"rd": "A) Eje pierna-muslo a 60°, rayo perpendicular. B) A 90°, rayo forma 15° con eje de la pierna (caudal). C) A 120°, rayo forma 10° con eje de la pierna (caudal).",
"dfp": "1 m — 30x40 apaisada",
"n": ""
},
"145": {
"rd": "Perpendicular en la mitad de la pierna.",
"dfp": "1 m — 35x43 longitudinal",
"n": ""
},
"146": {
"rd": "Perpendicular en la mitad de la pierna.",
"dfp": "1 m — 35x43 longitudinal",
"n": ""
},
"148": {
"rd": "Perpendicular al apoyo. Haz transversal sobre la mortaja tibioperoneoastragalina (extremo distal del maléolo tibial). Eje longitudinal se proyecta en el 5to dedo.",
"dfp": "1 m — 18x24 o 24x30 apaisada",
"n": ""
},
"149": {
"rd": "Perpendicular sobre el maléolo interno (tibial), emergiendo en el maléolo del peroné.",
"dfp": "1 m — 18x24 o 24x30 apaisada",
"n": ""
},
"151": {
"rd": "Perpendicular sobre el calcáneo.",
"dfp": "1 m — 18x24 apaisada",
"n": ""
},
"152": {
"rd": "Incide sobre el calcáneo con angulación de 30° a 45°.",
"dfp": "1 m — 18x24 longitudinal",
"n": ""
},
"153": {
"rd": "Perpendicular al plano de apoyo, sobre la base del tercer metatarsiano.",
"dfp": "1 m — 24x30 longitudinal",
"n": ""
},
"154": {
"rd": "Perpendicular al plano de apoyo, sobre la base del tercer metatarsiano.",
"dfp": "1 m — 24x30 apaisada",
"n": ""
},
"155": {
"rd": "Perpendicular al plano de apoyo, sobre la base del tercer metatarsiano.",
"dfp": "1 m — 24x30 apaisada",
"n": ""
},
"156": {
"rd": "A) Frente: angulación de 15° hacia el talón, incide sobre la base del tercer metatarsiano. B) Perfil: rayo horizontal, incide sobre la cabeza del quinto metatarsiano.",
"dfp": "1 m — A) 24x30 longitudinal — B) 24x30 apaisado",
"n": ""
},
"29": {
"rd": "Angulación caudal de 15°, emergiendo en la glabela.",
"dfp": "1 m — 18x24 longitudinal",
"n": "Senos paranasales: 1. Water, 2. Caldwell, 3. Lateral — 60 y 12.5"
},
"55": {
"rd": "Perpendicular a la altura de la 6ta vértebra dorsal o el ángulo inferior de las escápulas.",
"dfp": "1,80 m — 35x43 longitudinal o apaisada",
"n": "Pediátrico 60-12.5"
},
"125": {
"rd": "Perpendicular, sobre la articulación metacarpofalángica del 3er dedo.",
"dfp": "1 m — 24x30 apaisado",
"n": "Edad ósea pediátrico 40 -1.6 · Geriátrico 40 - 2.2 · Yeso 45,47 - 2.8,5.6"
}
};
