/* =========================================================
   CLUB CETTO · DELIVERY FINAL (SITIO ESTÁTICO)
   - 100% JavaScript (un solo archivo)
   - 3 modos: Marida tu Platillo · Sommelier Dinámico · Comparador
   - Motor unificado (reglas + scoring + explicación)
   ========================================================= */
(function(){
  "use strict";

  /* =========================
     0) DATA (PLATILLOS)
     Fuente: club-cetto-platillos-completo.json
  ========================== */
  const DISHES = [{"cocina":"Mexicana","categoria":"Entradas","platillo":"Guacamole con Totopos","vinoSugerido":"Línea Clásica Fumé Blanc","porQueFunciona":"La acidez cítrica corta la grasa del aguacate."},{"cocina":"Mexicana","categoria":"Entradas","platillo":"Queso Fundido","vinoSugerido":"Reserva Privada Chardonnay","porQueFunciona":"La untuosidad del vino con barrica iguala la textura del queso."},{"cocina":"Mexicana","categoria":"Entradas","platillo":"Sopes y Pellizcadas","vinoSugerido":"Sierra Blanca Zinfandel Rosé","porQueFunciona":"Frescura y ligero abocado para masa, grasa y salsas."},{"cocina":"Mexicana","categoria":"Entradas","platillo":"Tacos Dorados (Flautas)","vinoSugerido":"Sierra Blanca Sauvignon Blanc","porQueFunciona":"Acidez firme que limpia el paladar de la fritura."},{"cocina":"Mexicana","categoria":"Entradas","platillo":"Esquites","vinoSugerido":"Línea Clásica Chardonnay","porQueFunciona":"Notas de mantequilla van bien con el maíz y la mayonesa."},{"cocina":"Mexicana","categoria":"Entradas","platillo":"Chicharrón de Rib Eye","vinoSugerido":"Sierra Blanca Cabernet Sauvignon","porQueFunciona":"Taninos firmes para cortar la grasa intensa de la carne."},{"cocina":"Mexicana","categoria":"Sopas","platillo":"Sopa de Tortilla","vinoSugerido":"Línea Clásica Tempranillo","porQueFunciona":"Tinto frutal que acompaña al jitomate."},{"cocina":"Mexicana","categoria":"Sopas","platillo":"Caldo Tlalpeño","vinoSugerido":"Don Luis Viognier","porQueFunciona":"Notas florales que complementan el epazote y verduras."},{"cocina":"Mexicana","categoria":"Sopas","platillo":"Jugo de Carne","vinoSugerido":"Reserva Privada Petite Sirah","porQueFunciona":"Vino potente para igualar el concentrado de res."},{"cocina":"Mexicana","categoria":"Sopas","platillo":"Pozole Rojo","vinoSugerido":"Sierra Blanca Zinfandel Rosé","porQueFunciona":"Maneja la complejidad de condimentos y carne de cerdo."},{"cocina":"Mexicana","categoria":"Carnes","platillo":"Tacos al Pastor","vinoSugerido":"Estaciones Primavera (Rosado)","porQueFunciona":"Fresco y con estructura para la grasa y la piña."},{"cocina":"Mexicana","categoria":"Carnes","platillo":"Cochinita Pibil","vinoSugerido":"Línea Clásica Chenin Blanc","porQueFunciona":"Perfil abocado que equilibra la acidez de la naranja agria."},{"cocina":"Mexicana","categoria":"Carnes","platillo":"Arrachera","vinoSugerido":"Boutique Malbec","porQueFunciona":"Taninos dulces y fruta negra para el ahumado del carbón."},{"cocina":"Mexicana","categoria":"Carnes","platillo":"Carne en su Jugo","vinoSugerido":"Línea Clásica Zinfandel (Tinto)","porQueFunciona":"Notas especiadas para el tocino y frijoles."},{"cocina":"Mexicana","categoria":"Carnes","platillo":"Puntas de Filete","vinoSugerido":"Boutique Syrah","porQueFunciona":"Pimienta del vino para salsas condimentadas."},{"cocina":"Mexicana","categoria":"Aves","platillo":"Pollo con Mole","vinoSugerido":"Reserva Privada Nebbiolo","porQueFunciona":"Notas de higo y especias armonizan con el chocolate/chiles."},{"cocina":"Mexicana","categoria":"Aves","platillo":"Enchiladas Suizas","vinoSugerido":"Línea Clásica Chardonnay","porQueFunciona":"Notas de mantequilla para la salsa cremosa y queso."},{"cocina":"Mexicana","categoria":"Aves","platillo":"Tinga de Pollo","vinoSugerido":"Estaciones Otoño (Gamay)","porQueFunciona":"Tinto ligero que refresca el picante del chipotle."},{"cocina":"Mexicana","categoria":"Mariscos","platillo":"Aguachile Verde","vinoSugerido":"Línea Clásica Fumé Blanc","porQueFunciona":"Acidez cítrica que empata con el limón y picante."},{"cocina":"Mexicana","categoria":"Mariscos","platillo":"Ceviche de Pescado","vinoSugerido":"Estaciones Verano (Colombard)","porQueFunciona":"Fresco y floral, respeta la delicadeza del pescado."},{"cocina":"Mexicana","categoria":"Mariscos","platillo":"Pescado a la Veracruzana","vinoSugerido":"Boutique Pinot Noir","porQueFunciona":"Tomate y aceitunas piden tinto ligero, no blanco."},{"cocina":"Mexicana","categoria":"Mariscos","platillo":"Pescado a la Talla","vinoSugerido":"Línea Clásica Tempranillo","porQueFunciona":"Tinto joven que soporta el adobo de chiles secos."},{"cocina":"Mexicana","categoria":"Postres","platillo":"Pastel de Tres Leches","vinoSugerido":"Línea Clásica Blanc de Zinfandel","porQueFunciona":"Dulzor amable que acompaña sin empalagar."},{"cocina":"Mexicana","categoria":"Postres","platillo":"Flan Napolitano","vinoSugerido":"Línea Clásica Chenin Blanc","porQueFunciona":"Notas de miel de abeja que van con el caramelo."},{"cocina":"Mexicana","categoria":"Postres","platillo":"Arroz con Leche","vinoSugerido":"Línea Clásica Blanc de Zinfandel","porQueFunciona":"Frutal y ligeramente dulce para el arroz."},{"cocina":"Mexicana","categoria":"Postres","platillo":"Ate con Queso","vinoSugerido":"Línea Clásica Merlot","porQueFunciona":"Fruta roja y taninos suaves con el membrillo."},{"cocina":"Mexicana","categoria":"Postres","platillo":"Pan de Elote","vinoSugerido":"Reserva Privada Chardonnay","porQueFunciona":"Notas de barrica realzan el sabor del elote."},{"cocina":"Internacional","categoria":"Entradas","platillo":"Carpaccio de Res","vinoSugerido":"Boutique Pinot Noir","porQueFunciona":"Ligereza para no opacar la carne cruda."},{"cocina":"Internacional","categoria":"Entradas","platillo":"Tostadas de Atún Fresco","vinoSugerido":"Don Luis Viognier","porQueFunciona":"Untuosidad y notas florales para atún y aguacate."},{"cocina":"Internacional","categoria":"Entradas","platillo":"Calamares Fritos","vinoSugerido":"Línea Clásica Blanc de Blancs","porQueFunciona":"Limpio y brillante para cortar la grasa del empanizado."},{"cocina":"Internacional","categoria":"Entradas","platillo":"Croquetas","vinoSugerido":"Sierra Blanca Tempranillo","porQueFunciona":"Estructura para el jamón y la bechamel."},{"cocina":"Internacional","categoria":"Sopas","platillo":"Jugo de Carne","vinoSugerido":"Línea Clásica Petite Sirah","porQueFunciona":"Color intenso y potencia para el concentrado de res."},{"cocina":"Internacional","categoria":"Sopas","platillo":"Sopa de Cebolla","vinoSugerido":"Estaciones Otoño (Gamay)","porQueFunciona":"Corta la grasa del queso gruyere gratinado."},{"cocina":"Internacional","categoria":"Sopas","platillo":"Crema de Almeja","vinoSugerido":"Reserva Privada Chardonnay","porQueFunciona":"Vino cremoso para una sopa cremosa."},{"cocina":"Internacional","categoria":"Sopas","platillo":"Fideo Seco","vinoSugerido":"Línea Clásica Merlot","porQueFunciona":"Taninos suaves para la pasta y crema."},{"cocina":"Internacional","categoria":"Carnes","platillo":"Rib Eye / New York","vinoSugerido":"Don Luis Terra","porQueFunciona":"Ensamble robusto que limpia el paladar de la grasa."},{"cocina":"Internacional","categoria":"Carnes","platillo":"Filete Mignon","vinoSugerido":"Don Luis Merlot","porQueFunciona":"Corte magro requiere taninos pulidos."},{"cocina":"Internacional","categoria":"Carnes","platillo":"Hamburguesa Gourmet","vinoSugerido":"Línea Clásica Zinfandel","porQueFunciona":"Amable y frutal, ideal para carne y catsup (dulce/ácido)."},{"cocina":"Internacional","categoria":"Aves","platillo":"Pechuga Cordon Bleu","vinoSugerido":"Línea Clásica Chardonnay","porQueFunciona":"Para el queso y el jamón."},{"cocina":"Internacional","categoria":"Aves","platillo":"Pollo a la Parmesana","vinoSugerido":"Península Espaldera (Sangiovese)","porQueFunciona":"La uva italiana ideal para salsa de tomate y queso."},{"cocina":"Internacional","categoria":"Pescados","platillo":"Salmón a la Parrilla","vinoSugerido":"Boutique Pinot Noir","porQueFunciona":"Pescado graso va excelente con tinto ligero."},{"cocina":"Internacional","categoria":"Pescados","platillo":"Atún Sellado","vinoSugerido":"Don Luis Merlot","porQueFunciona":"Atún es \"carne roja de mar\", Merlot respeta su textura."},{"cocina":"Internacional","categoria":"Ensaladas","platillo":"Ensalada César","vinoSugerido":"Reserva Privada Chardonnay","porQueFunciona":"El aderezo cremoso (anchoa/huevo) pide un blanco con barrica."},{"cocina":"Internacional","categoria":"Ensaladas","platillo":"Ensalada Caprese","vinoSugerido":"Sierra Blanca Sauvignon Blanc","porQueFunciona":"Notas que resaltan la albahaca fresca."},{"cocina":"Internacional","categoria":"Ensaladas","platillo":"Ensalada Griega","vinoSugerido":"Sierra Blanca Zinfandel Rosé","porQueFunciona":"Queso feta va bien con la frescura del rosado."},{"cocina":"Internacional","categoria":"Postres","platillo":"Volcán de Chocolate","vinoSugerido":"Boutique Malbec","porQueFunciona":"Notas de chocolate y mermelada complementan el cacao."},{"cocina":"Internacional","categoria":"Postres","platillo":"Crepas (Cajeta/Nutella)","vinoSugerido":"Línea Clásica Chenin Blanc","porQueFunciona":"Dulzor para acompañar la cajeta."},{"cocina":"Internacional","categoria":"Postres","platillo":"Cheesecake Frutos Rojos","vinoSugerido":"Línea Clásica Blanc de Zinfandel","porQueFunciona":"Notas de fresa se unen a la salsa del postre."},{"cocina":"Internacional","categoria":"Postres","platillo":"Strudel de Manzana","vinoSugerido":"Línea Clásica Chenin Blanc","porQueFunciona":"Notas de manzana y pera congruentes."},{"cocina":"Baja Med","categoria":"Entradas","platillo":"Aguachile Negro","vinoSugerido":"Don Luis Viognier","porQueFunciona":"Notas florales equilibran la salsa negra (soya/tatemado)."},{"cocina":"Baja Med","categoria":"Entradas","platillo":"Ostiones Frescos","vinoSugerido":"Línea Clásica Blanc de Blancs","porQueFunciona":"Acidez limpia respeta la salinidad del ostión."},{"cocina":"Baja Med","categoria":"Entradas","platillo":"Carpaccio de Betabel","vinoSugerido":"Sierra Blanca Sauvignon Blanc","porQueFunciona":"Carácter herbal va con el betabel y queso de cabra."},{"cocina":"Baja Med","categoria":"Entradas","platillo":"Tacos de Pescado","vinoSugerido":"Sierra Blanca Sauvignon Blanc","porQueFunciona":"Acidez para cortar la grasa del capeado (tempura)."},{"cocina":"Baja Med","categoria":"Entradas","platillo":"Almejas Chocolatas","vinoSugerido":"Línea Clásica Chardonnay","porQueFunciona":"Soporta el gratinado o la textura carnosa."},{"cocina":"Baja Med","categoria":"Sopas","platillo":"Crema de Almeja","vinoSugerido":"Reserva Privada Chardonnay","porQueFunciona":"Vino cremoso para sopa cremosa."},{"cocina":"Baja Med","categoria":"Sopas","platillo":"Sopa de Mariscos","vinoSugerido":"Sierra Blanca Zinfandel Rosé","porQueFunciona":"Limpia el paladar del caldo de mar."},{"cocina":"Baja Med","categoria":"Carnes","platillo":"Lechón Pibil/Horno","vinoSugerido":"Estaciones Primavera (Rosado)","porQueFunciona":"Estructura suficiente para la grasa del lechón."},{"cocina":"Baja Med","categoria":"Carnes","platillo":"Costillas de Borrego","vinoSugerido":"Reserva Privada Petite Sirah","porQueFunciona":"Carne intensa requiere taninos marcados."},{"cocina":"Baja Med","categoria":"Carnes","platillo":"Codorniz Asada","vinoSugerido":"Boutique Pinot Noir","porQueFunciona":"Carne de caza pide vino elegante."},{"cocina":"Baja Med","categoria":"Aves","platillo":"Pato con Frutas","vinoSugerido":"Reserva Privada Nebbiolo","porQueFunciona":"Acidez natural corta la grasa del pato; higo va con fruta."},{"cocina":"Baja Med","categoria":"Pescados","platillo":"Risotto de Mariscos","vinoSugerido":"Don Luis Viognier","porQueFunciona":"Textura aceitosa con arroz cremoso."},{"cocina":"Baja Med","categoria":"Pescados","platillo":"Pulpo a las Brasas","vinoSugerido":"Sierra Blanca Tempranillo","porQueFunciona":"Tinto con cuerpo medio ideal para el carbón."},{"cocina":"Baja Med","categoria":"Pescados","platillo":"Langosta Puerto Nuevo","vinoSugerido":"Reserva Privada Chardonnay","porQueFunciona":"Maridaje clásico de langosta con mantequilla y vino untuoso."},{"cocina":"Baja Med","categoria":"Postres","platillo":"Pay de Dátil","vinoSugerido":"Boutique Malbec","porQueFunciona":"Notas de mermelada y frutos secos."},{"cocina":"Baja Med","categoria":"Postres","platillo":"Pastel de Crepas","vinoSugerido":"Línea Clásica Chenin Blanc","porQueFunciona":"Acompaña la crema pastelera."},{"cocina":"Baja Med","categoria":"Postres","platillo":"Higos en Almíbar","vinoSugerido":"Línea Clásica Blanc de Zinfandel","porQueFunciona":"Equilibra el almíbar y el queso."},{"cocina":"Parrilla","categoria":"Entradas","platillo":"Empanadas de Carne","vinoSugerido":"Boutique Malbec","porQueFunciona":"Fruta y especias para la carne picada y comino."},{"cocina":"Parrilla","categoria":"Entradas","platillo":"Chorizo Argentino","vinoSugerido":"Sierra Blanca Cabernet Sauvignon","porQueFunciona":"Taninos firmes para la grasa del embutido."},{"cocina":"Parrilla","categoria":"Entradas","platillo":"Mollejas","vinoSugerido":"Línea Clásica Fumé Blanc","porQueFunciona":"Acidez blanca para limpiar la textura grasa de la molleja."},{"cocina":"Parrilla","categoria":"Entradas","platillo":"Provoleta","vinoSugerido":"Línea Clásica Tempranillo","porQueFunciona":"Frutal para el queso asado y orégano."},{"cocina":"Parrilla","categoria":"Carnes","platillo":"Bife de Chorizo","vinoSugerido":"Don Luis Concordia","porQueFunciona":"Potencia (Cabernet/Shiraz) para un corte jugoso."},{"cocina":"Parrilla","categoria":"Carnes","platillo":"Vacío","vinoSugerido":"Reserva Privada Petite Sirah","porQueFunciona":"Corte fibroso y sabroso necesita vino robusto."},{"cocina":"Parrilla","categoria":"Carnes","platillo":"Entraña","vinoSugerido":"Boutique Malbec","porQueFunciona":"Se complementa con la fruta madura y cuero del Malbec."},{"cocina":"Parrilla","categoria":"Carnes","platillo":"Picaña","vinoSugerido":"Reserva Privada Cabernet Sauvignon","porQueFunciona":"Taninos maduros para la capa de grasa."},{"cocina":"Parrilla","categoria":"Carnes","platillo":"Milanesa Napolitana","vinoSugerido":"Línea Clásica Merlot","porQueFunciona":"Para no pelear con el empanizado y tomate."},{"cocina":"Parrilla","categoria":"Carnes","platillo":"Chivito (Uruguay)","vinoSugerido":"Reserva Privada Cabernet Sauvignon","porQueFunciona":"Estructura para soportar la mezcla de ingredientes."},{"cocina":"Parrilla","categoria":"Aves","platillo":"Pamplona de Pollo","vinoSugerido":"Reserva Privada Chardonnay","porQueFunciona":"Pollo con grasa de cerdo requiere blanco potente."},{"cocina":"Parrilla","categoria":"Pastas","platillo":"Sorrentinos","vinoSugerido":"Boutique Pinot Noir","porQueFunciona":"Pasta rellena suave con tinto suave."},{"cocina":"Parrilla","categoria":"Pastas","platillo":"Ñoquis de Papa","vinoSugerido":"Línea Clásica Merlot","porQueFunciona":"Vino suave para pasta suave."},{"cocina":"Parrilla","categoria":"Pastas","platillo":"Ravioles con Tuco","vinoSugerido":"Península Lyra","porQueFunciona":"Uvas italianas (Montepulciano) perfectas para el tomate."},{"cocina":"Parrilla","categoria":"Postres","platillo":"Alfajor / Dulce de Leche","vinoSugerido":"Línea Clásica Chenin Blanc","porQueFunciona":"Dulzor meloso para acompañar la intensidad del dulce de leche."},{"cocina":"Parrilla","categoria":"Postres","platillo":"Panqueque Dulce de Leche","vinoSugerido":"Línea Clásica Blanc de Zinfandel","porQueFunciona":"Dulce pero refrescante."},{"cocina":"Parrilla","categoria":"Postres","platillo":"Chajá (Uruguay)","vinoSugerido":"Don Luis Viognier","porQueFunciona":"Notas frutales (durazno/chabacano) congruentes."},{"cocina":"Parrilla","categoria":"Postres","platillo":"Rogel","vinoSugerido":"Boutique Syrah","porQueFunciona":"Notas especiadas para el dulzor extremo del merengue."},{"cocina":"Oriental","categoria":"Sushi","platillo":"Sushi Fresco (Nigiri)","vinoSugerido":"Sierra Blanca Sauvignon Blanc","porQueFunciona":"Acidez firme corta la grasa del pescado crudo."},{"cocina":"Oriental","categoria":"Sushi","platillo":"Rollos Empanizados","vinoSugerido":"Línea Clásica Blanc de Zinfandel","porQueFunciona":"Dulzor ligero va bien con salsa de anguila y fritura."},{"cocina":"Oriental","categoria":"Platos","platillo":"Teppanyaki / Teriyaki","vinoSugerido":"Don Luis Viognier","porQueFunciona":"Soporta la intensidad de la soya y carnes asadas."},{"cocina":"Oriental","categoria":"Platos","platillo":"Cerdo Agridulce","vinoSugerido":"Línea Clásica Blanc de Zinfandel","porQueFunciona":"Vino con toque dulce para no sentirse amargo con la salsa."},{"cocina":"Oriental","categoria":"Sopas","platillo":"Ramen / Sopas","vinoSugerido":"Sierra Blanca Zinfandel Rosé","porQueFunciona":"Limpia el paladar de caldos grasos o especiados."},{"cocina":"Italiana","categoria":"Entradas","platillo":"Carpaccio de Res","vinoSugerido":"Boutique Pinot Noir","porQueFunciona":"Respeta la carne cruda y acompaña el limón."},{"cocina":"Italiana","categoria":"Entradas","platillo":"Bruschettas","vinoSugerido":"Línea Clásica Tempranillo","porQueFunciona":"Acompaña la acidez del tomate fresco."},{"cocina":"Italiana","categoria":"Entradas","platillo":"Calamari Fritti","vinoSugerido":"Champbrulé Brut","porQueFunciona":"Limpian la grasa de la fritura."},{"cocina":"Italiana","categoria":"Entradas","platillo":"Tabla de Embutidos","vinoSugerido":"Don Luis Concordia","porQueFunciona":"Estructura y especias para salami y quesos curados."},{"cocina":"Italiana","categoria":"Sopas","platillo":"Minestrone","vinoSugerido":"Península Espaldera (Sangiovese)","porQueFunciona":"Acidez italiana perfecta para caldo de tomate."},{"cocina":"Italiana","categoria":"Sopas","platillo":"Crema de Tomate","vinoSugerido":"Península Lyra","porQueFunciona":"Corta la cremosidad y acompaña el tomate."},{"cocina":"Italiana","categoria":"Sopas","platillo":"Crema de Champiñones","vinoSugerido":"Don Luis Merlot","porQueFunciona":"Notas terrosas se funden con los hongos."},{"cocina":"Italiana","categoria":"Carnes","platillo":"Filete al Marsala","vinoSugerido":"Don Luis Merlot","porQueFunciona":"Acompaña la dulzura de la salsa Marsala."},{"cocina":"Italiana","categoria":"Carnes","platillo":"Milanesa a la Parmigiana","vinoSugerido":"Península Espaldera (Sangiovese)","porQueFunciona":"Acidez ideal para carne, fritura y tomate."},{"cocina":"Italiana","categoria":"Carnes","platillo":"Tagliata (con Arúgula)","vinoSugerido":"Don Luis Terra","porQueFunciona":"Potencia para la carne y equilibrio para el amargor."},{"cocina":"Italiana","categoria":"Aves","platillo":"Pollo Parmigiana","vinoSugerido":"Boutique Sangiovese","porQueFunciona":"Maridaje por excelencia para salsa roja y queso."},{"cocina":"Italiana","categoria":"Aves","platillo":"Pollo al Limone","vinoSugerido":"Línea Clásica Chardonnay","porQueFunciona":"Acidez y notas cítricas armonizan con la salsa."},{"cocina":"Italiana","categoria":"Pescados","platillo":"Salmón al Grill","vinoSugerido":"Boutique Pinot Noir","porQueFunciona":"Pescado graso va con tinto ligero."},{"cocina":"Italiana","categoria":"Pescados","platillo":"Pesca a la Livornesa","vinoSugerido":"Sierra Blanca Zinfandel Rosé","porQueFunciona":"Soporta la salsa de tomate y aceitunas."},{"cocina":"Italiana","categoria":"Platos","platillo":"Lasaña Boloñesa","vinoSugerido":"Península Espaldera (Sangiovese)","porQueFunciona":"Corta la grasa de la carne/queso y eleva el tomate."},{"cocina":"Italiana","categoria":"Platos","platillo":"Fettuccine Alfredo","vinoSugerido":"Reserva Privada Chardonnay","porQueFunciona":"Vino con madera para salsa cremosa."},{"cocina":"Italiana","categoria":"Platos","platillo":"Pizza Margarita","vinoSugerido":"Boutique Sangiovese","porQueFunciona":"Resalta tomate y albahaca."},{"cocina":"Italiana","categoria":"Platos","platillo":"Pizza Pepperoni","vinoSugerido":"Don Luis Concordia","porQueFunciona":"El pepperoni pide un tinto con notas especiadas."},{"cocina":"Italiana","categoria":"Postres","platillo":"Tiramisú","vinoSugerido":"Línea Clásica Chenin Blanc","porQueFunciona":"Dulzor y miel equilibran el amargor del café/cacao."},{"cocina":"Italiana","categoria":"Postres","platillo":"Panna Cotta","vinoSugerido":"Línea Clásica Blanc de Zinfandel","porQueFunciona":"Complemento perfecto para la salsa."},{"cocina":"Española","categoria":"Tapas","platillo":"Jamón Serrano / Manchego","vinoSugerido":"Sierra Blanca Tempranillo","porQueFunciona":"La uva reina de España es el maridaje natural."},{"cocina":"Española","categoria":"Tapas","platillo":"Pulpo a la Gallega","vinoSugerido":"Sierra Blanca Sauvignon Blanc","porQueFunciona":"Acidez para cortar el aceite y pimentón."},{"cocina":"Española","categoria":"Tapas","platillo":"Tortilla Española","vinoSugerido":"Línea Clásica Chardonnay","porQueFunciona":"Notas de mantequilla para el huevo y papa."},{"cocina":"Española","categoria":"Tapas","platillo":"Croquetas de Jamón","vinoSugerido":"Champbrulé Brut","porQueFunciona":"Burbujas para la bechamel y fritura."},{"cocina":"Española","categoria":"Platos","platillo":"Paella Valenciana","vinoSugerido":"Línea Clásica Tempranillo","porQueFunciona":"Fruta roja y acidez media limpian el azafrán y grasas."},{"cocina":"Española","categoria":"Platos","platillo":"Paella de Mariscos","vinoSugerido":"Sierra Blanca Zinfandel Rosé","porQueFunciona":"Acompaña el sabor concentrado de mariscos."},{"cocina":"Española","categoria":"Platos","platillo":"Cochinillo Asado","vinoSugerido":"Estaciones Primavera (Cabernet)","porQueFunciona":"Frescura y taninos para la grasa del lechón."},{"cocina":"Española","categoria":"Platos","platillo":"Fabada Asturiana","vinoSugerido":"Reserva Privada Petite Sirah","porQueFunciona":"Plato graso y potente necesita taninos firmes."},{"cocina":"Española","categoria":"Postres","platillo":"Crema Catalana","vinoSugerido":"Línea Clásica Chenin Blanc","porQueFunciona":"Notas de miel armonizan con el postre."},{"cocina":"Española","categoria":"Postres","platillo":"Churros con Chocolate","vinoSugerido":"Boutique Malbec","porQueFunciona":"Notas de café/cacao del vino complementan."}];

  /* =========================
     1) CATÁLOGO DE VINOS (MOTOR)
     Nota: si ya tienes perfiles oficiales, reemplaza SOLO este bloque (WINE_CATALOG).
     Estructura esperada por el motor:
     {
       id, etiqueta, tipo, perfil: { cuerpo, acidez, fruta, barrica, intensidadAromatica, dulzor }
     }
  ========================== */
  const WINE_LABELS = ["Boutique Malbec","Boutique Pinot Noir","Boutique Sangiovese","Boutique Syrah","Champbrulé Brut","Don Luis Concordia","Don Luis Merlot","Don Luis Terra","Don Luis Viognier","Estaciones Otoño (Gamay)","Estaciones Primavera (Cabernet)","Estaciones Primavera (Rosado)","Estaciones Verano (Colombard)","Línea Clásica Blanc de Blancs","Línea Clásica Blanc de Zinfandel","Línea Clásica Chardonnay","Línea Clásica Chenin Blanc","Línea Clásica Fumé Blanc","Línea Clásica Merlot","Línea Clásica Petite Sirah","Línea Clásica Tempranillo","Línea Clásica Zinfandel","Línea Clásica Zinfandel (Tinto)","Península Espaldera (Sangiovese)","Península Lyra","Reserva Privada Cabernet Sauvignon","Reserva Privada Chardonnay","Reserva Privada Nebbiolo","Reserva Privada Petite Sirah","Sierra Blanca Cabernet Sauvignon","Sierra Blanca Sauvignon Blanc","Sierra Blanca Tempranillo","Sierra Blanca Zinfandel Rosé"];

  function inferWineType(label){
    const s = (label||"").toLowerCase();
    if (s.includes("brut") || s.includes("espum")) return "blanco";
    if (s.includes("ros") || s.includes("blanc de zinfandel")) return "rosado";
    if (s.includes("chardonnay") || s.includes("chenin") || s.includes("viognier") || s.includes("sauvignon") || s.includes("fumé") || s.includes("blanc de blancs") || s.includes("colombard")) return "blanco";
    return "tinto";
  }

  // Perfiles base por tipo (valores 1–5). Defaults para que el motor funcione en estático.
  const BASE_PROFILES = {
    tinto:   { cuerpo:4, acidez:3, fruta:4, barrica:3, intensidadAromatica:4, dulzor:1 },
    blanco:  { cuerpo:2, acidez:4, fruta:3, barrica:1, intensidadAromatica:3, dulzor:1 },
    rosado:  { cuerpo:2, acidez:3, fruta:3, barrica:1, intensidadAromatica:3, dulzor:2 },
  };

  // Ajustes por "línea" detectada en el nombre (para coherencia con tiers).
  function lineAdjust(label){
    const s=(label||"").toLowerCase();
    if (s.includes("don luis")) return { cuerpo:+1, barrica:+1, intensidadAromatica:+1 };
    if (s.includes("boutique")) return { cuerpo:+1, intensidadAromatica:+1 };
    if (s.includes("reserva privada")) return { cuerpo:+1, barrica:+1 };
    if (s.includes("línea clásica") || s.includes("sierra blanca") || s.includes("estaciones")) return { };
    return {};
  }

  function clamp(n,min=1,max=5){ return Math.max(min, Math.min(max, n)); }

  function makeWine(label){
    const tipo=inferWineType(label);
    const base={...BASE_PROFILES[tipo]};
    const adj=lineAdjust(label);
    Object.keys(adj).forEach(k=> base[k]=clamp((base[k]||1)+adj[k]));
    return {
      id: "auto-"+label.normalize("NFD").replace(/\p{Diacritic}/gu,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),
      etiqueta: label,
      tipo,
      perfil: base
    };
  }

  const WINE_CATALOG = WINE_LABELS.map(makeWine);

  /* =========================================================
     2) MOTOR UNIFICADO (TU TRABAJO, SIN CAMBIOS DE LÓGICA)
     - Se pegaron tus módulos y se removieron imports/exports
  ========================================================= */

  // ===== proteinCatalog.js =====
  const PROTEINS = {

    /* =======================
       🥩 RES
    ======================= */
    res: {
      label: "Res",
      base: { cuerpo: 3, intensidad: 3, umami: 2, grasa: 2 },
      cortes: {
        filete:   { cuerpo: 1, grasa: 0, intensidad: 1, umami: 0 },
        ribeye:   { cuerpo: 1, grasa: 2, intensidad: 2, umami: 0 },
        tbone:    { cuerpo: 1, grasa: 1, intensidad: 2, umami: 0 },
        picanha:  { cuerpo: 1, grasa: 2, intensidad: 2, umami: 0 },
        arrachera:{ cuerpo: 1, grasa: 1, intensidad: 2, umami: 0 },
        shortRib: { cuerpo: 1, grasa: 3, intensidad: 3, umami: 1 },
        brisket:  { cuerpo: 1, grasa: 2, intensidad: 3, umami: 1 },
        costilla: { cuerpo: 1, grasa: 3, intensidad: 3, umami: 1 }
      }
    },

    /* =======================
       🐖 CERDO
    ======================= */
    cerdo: {
      label: "Cerdo",
      base: { cuerpo: 2, intensidad: 2, umami: 2, grasa: 3 },
      cortes: {
        lomo:     { cuerpo: 0, grasa: 0, intensidad: 1, umami: 0 },
        panceta:  { cuerpo: 1, grasa: 3, intensidad: 2, umami: 1 },
        costilla: { cuerpo: 1, grasa: 2, intensidad: 2, umami: 1 },
        pierna:   { cuerpo: 1, grasa: 1, intensidad: 2, umami: 1 }
      }
    },

    /* =======================
       🐓 AVE
    ======================= */
    ave: {
      label: "Ave",
      base: { cuerpo: 2, intensidad: 2, umami: 1, grasa: 1 },
      cortes: {
        pechuga: { cuerpo: 0, grasa: 0, intensidad: 1, umami: 0 },
        muslo:   { cuerpo: 1, grasa: 1, intensidad: 2, umami: 0 },
        pato:    { cuerpo: 1, grasa: 2, intensidad: 2, umami: 1 }
      }
    },

    /* =======================
       🐟 PESCADO
    ======================= */
    pescado: {
      label: "Pescado",
      base: { cuerpo: 1, intensidad: 1, umami: 1, grasa: 1 },
      cortes: {
        blanco: { cuerpo: 0, grasa: 0, intensidad: 0, umami: 0 },
        salmon: { cuerpo: 1, grasa: 2, intensidad: 1, umami: 0 },
        atun:   { cuerpo: 1, grasa: 1, intensidad: 2, umami: 1 }
      }
    },

    /* =======================
       🦐 MARISCOS
    ======================= */
    mariscos: {
      label: "Mariscos",
      base: { cuerpo: 1, intensidad: 1, umami: 1, grasa: 1 },
      cortes: {
        camaron: { cuerpo: 0, grasa: 0, intensidad: 1, umami: 0 },
        pulpo:   { cuerpo: 1, grasa: 0, intensidad: 2, umami: 1 },
        almeja:  { cuerpo: 0, grasa: 0, intensidad: 1, umami: 1 }
      }
    },

    /* =======================
       🥬 VEGETAL
    ======================= */
    vegetal: {
      label: "Vegetal",
      base: { cuerpo: 1, intensidad: 1, umami: 0, grasa: 0 },
      cortes: {
        hongos:   { cuerpo: 1, grasa: 0, intensidad: 2, umami: 2 },
        verduras: { cuerpo: 0, grasa: 0, intensidad: 1, umami: 0 }
      }
    }
  };

  // ===== sauceCatalog.js =====
  const SAUCES = {

    /* =========================
       🔴 MEXICANAS / PICANTES
    ========================= */
    adobo:     { label: "Adobo",     intensidad: 2, picante: 2, dulzor: 1, umami: 1 },
    mole:      { label: "Mole",      intensidad: 3, picante: 2, dulzor: 2, umami: 2 },
    roja:      { label: "Salsa Roja",intensidad: 2, picante: 2, dulzor: 0, umami: 1 },
    verde:     { label: "Salsa Verde",intensidad: 2, picante: 2, dulzor: 0, umami: 1 },

    /* =========================
       🟤 ORIENTAL / FERMENTADAS
    ========================= */
    soya:      { label: "Soya",      intensidad: 2, picante: 0, dulzor: 0, umami: 3, salinidad: 3 },
    teriyaki:  { label: "Teriyaki",  intensidad: 2, picante: 0, dulzor: 2, umami: 2, salinidad: 2 },
    miso:      { label: "Miso",      intensidad: 2, picante: 0, dulzor: 0, umami: 3, salinidad: 2 },

    /* =========================
       🟡 CREMOSAS
    ========================= */
    crema:     { label: "Crema",     intensidad: 1, picante: 0, dulzor: 0, umami: 1, grasa: 2 },
    mantequilla:{ label:"Mantequilla",intensidad: 1, picante: 0, dulzor: 0, umami: 1, grasa: 2 },

    /* =========================
       🟠 BBQ / DULCES
    ========================= */
    bbq:       { label: "BBQ",       intensidad: 2, picante: 1, dulzor: 2, umami: 2 }
  };

  // ===== cookingRules.js =====
  const COOKING_RULES = {
    crudo:     { intensidad: -1, acidez: 1 },
    plancha:   { intensidad: 1 },
    horno:     { intensidad: 2 },
    brasa:     { intensidad: 3, umami: 1 },
    frito:     { intensidad: 2, grasa: 2 },
    guisado:   { intensidad: 2, umami: 1, grasa: 1 },
    estofado:  { intensidad: 3, umami: 2, grasa: 1 }
  };

  // ===== ingredientRules.js =====
  const INGREDIENT_RULES = {
    mantequilla: { grasa: 2 },
    crema:       { grasa: 2 },
    queso:       { grasa: 2, umami: 1 },
    parmesano:   { grasa: 1, umami: 2 },

    tocino:      { grasa: 2, umami: 2, intensidad: 1 },
    chorizo:     { grasa: 1, umami: 2, intensidad: 1 },

    limon:       { acidez: 2 },
    vinagre:     { acidez: 2 },
    jitomate:    { acidez: 1, umami: 1 },

    chile:       { picante: 3, intensidad: 1 },
    chipotle:    { picante: 2, intensidad: 2, dulzor: 1 },
    habanero:    { picante: 4, intensidad: 2 },

    cacao:       { intensidad: 2, dulzor: 1, umami: 1 },
    mole:        { intensidad: 3, dulzor: 2, umami: 2, picante: 2 },

    soya:        { umami: 3, intensidad: 1 },
    miso:        { umami: 3, intensidad: 1 },

    hierbas:     { acidez: 0, intensidad: 1 },
    ajo:         { intensidad: 1, umami: 1 },

    frutas:      { dulzor: 2, acidez: 1 },
    pina:        { dulzor: 2, acidez: 1 },
    mango:       { dulzor: 2, acidez: 1 }
  };

  // ===== weights.js =====
  const PROFILE_WEIGHTS = {
    cuerpo: 4,
    acidez: 3,
    grasa: 3,
    dulzor: 2,
    intensidad: 2,
    umami: 2,
    picante: 1
  };

  // ===== tiers.js =====
  function getWineTier(wine) {
    const id = wine.id || "";
    if (id.startsWith("bt-") || id.startsWith("dl-") || id.startsWith("pn-")) return 3;
    if (id.startsWith("rp-")) return 2;
    return 1;
  }

  // ===== dishTier.js =====
  function getDishTier(dish) {
    let tier = 1;
    const allInputs = [dish.proteina, dish.corte, dish.coccion, dish.salsa, ...(dish.ingredientes || [])].filter(Boolean);

    if (allInputs.includes("mole") || allInputs.includes("shortRib") || allInputs.includes("brisket")) tier = 3;
    if (dish.proteina === "res" && (dish.corte === "ribeye" || dish.corte === "tbone")) tier = 2;
    if (dish.coccion === "brasa" || dish.coccion === "estofado") tier = Math.max(tier, 2);

    return tier;
  }

  // ===== buildDishProfile.js =====
  function buildDishProfile(dish) {
    let profile = {
      cuerpo: 2,
      grasa: 1,
      acidez: 1,
      dulzor: 1,
      intensidad: 1,
      picante: 0,
      umami: 0
    };

    // Proteína base + corte
    const protein = PROTEINS[dish.proteina];
    if (protein) {
      Object.assign(profile, protein.base);

      const corte = protein.cortes?.[dish.corte];
      if (corte) {
        Object.entries(corte).forEach(([k, v]) => {
          profile[k] = Math.min(5, (profile[k] || 1) + v);
        });
      }
    }

    // Método de cocción
    const cook = COOKING_RULES[dish.coccion];
    if (cook) {
      Object.entries(cook).forEach(([k, v]) => {
        profile[k] = Math.min(5, (profile[k] || 1) + v);
      });
    }

    // Ingredientes
    (dish.ingredientes || []).forEach(ing => {
      const rule = INGREDIENT_RULES[ing];
      if (!rule) return;
      Object.entries(rule).forEach(([k, v]) => {
        profile[k] = Math.min(5, (profile[k] || 1) + v);
      });
    });

    // Salsa
    const sauce = SAUCES[dish.salsa];
    if (sauce) {
      ["intensidad","picante","dulzor","umami","grasa","acidez"].forEach(k => {
        if (sauce[k]) profile[k] = Math.min(5, (profile[k] || 1) + sauce[k]);
      });
    }

    // Normalizar piso
    Object.keys(profile).forEach(k => {
      if (k === "picante" || k === "umami") return;
      profile[k] = Math.max(1, Math.min(5, profile[k]));
    });

    return profile;
  }

  // ===== normalizeWineProfile.js =====
  function clamp2(value, min = 1, max = 5) {
    return Math.min(max, Math.max(min, value));
  }

  function normalizeWineProfile(wine) {
    const p = wine.perfil;

    return {
      cuerpo: clamp2(p.cuerpo ?? 2),
      acidez: clamp2(p.acidez ?? 2),
      grasa: clamp2(
        p.barrica >= 4 ? 4 :
        p.barrica >= 2 ? 3 : 1
      ),
      dulzor: clamp2(p.dulzor ?? 1),
      intensidad: clamp2(
        Math.round(
          (p.cuerpo * 0.35) +
          (p.fruta * 0.35) +
          (p.intensidadAromatica * 0.3)
        )
      ),
      picante: 0,
      umami: clamp2(
        wine.tipo === "tinto" ? 3 :
        wine.tipo === "rosado" ? 2 : 1
      )
    };
  }

  // ===== explanation.js =====
  function generateExplanation(dish, wine) {
    if (!dish || !wine) return "Maridaje recomendado por equilibrio general.";

    const protein = dish.proteina || "";
    const cook = dish.coccion || "";
    const ings = dish.ingredientes || [];

    // Reglas explicativas (Wine Folly)
    if (ings.includes("queso") || ings.includes("crema") || ings.includes("mantequilla")) {
      return "Acidez vs. grasa: la frescura del vino limpia la untuosidad del platillo.";
    }
    if (ings.includes("chile") || ings.includes("chipotle") || ings.includes("habanero")) {
      return "Dulzor vs. picante: el vino suaviza el golpe del chile y mantiene equilibrio.";
    }
    if (protein === "res" || protein === "cordero") {
      return "Tanino vs. proteína: un tinto con estructura acompaña la carne y equilibra su intensidad.";
    }
    if (protein === "pescado" && cook === "crudo") {
      return "Delicadeza: un blanco fresco respeta el sabor del pescado crudo y acompaña su textura.";
    }
    if (cook === "brasa") {
      return "Intensidad con intensidad: el carácter del vino acompaña el ahumado de la parrilla.";
    }

    return "Maridaje recomendado por equilibrio general.";
  }

  // ===== narrative.js =====
  function generatePairingNarrative(dish, wine) {
    return `Elegimos este vino porque acompaña el perfil del platillo y mantiene equilibrio en boca.`;
  }

  // ===== recommend.js =====
  function scoreWine(wineProfile, dishProfile) {
    let score = 0;
    let max = 0;

    Object.entries(PROFILE_WEIGHTS).forEach(([key, weight]) => {
      if (dishProfile[key] !== undefined) {
        const wineValue = wineProfile[key] ?? 1;
        const diff = Math.abs(dishProfile[key] - wineValue);

        // diff 0 => 1.0, diff 1 => 0.8, diff 2 => 0.6, diff 3 => 0.4, diff 4 => 0.2
        const closeness = Math.max(0.2, 1 - (diff * 0.2));

        score += closeness * weight;
        max += 1 * weight;
      }
    });

    const percent = Math.round((score / max) * 100);

    return { score, max, percent };
  }

  function recommendWineFinal(wines, dish) {
    if (!Array.isArray(wines) || !wines.length) {
      return { top: [], explicacion: "" };
    }

    let dishProfile;
    try {
      dishProfile = buildDishProfile(dish);
    } catch {
      return { top: [], explicacion: "" };
    }

    const scored = wines.map(wine => {
      let wineProfile;

      try {
        wineProfile = normalizeWineProfile(wine);
      } catch {
        wineProfile = { cuerpo: 2, acidez: 2, grasa: 1, dulzor: 1, intensidad: 2, picante: 0, umami: 1 };
      }

      const s = scoreWine(wineProfile, dishProfile);

      return { wine, ...s };
    });

    // Filtrar por tiers (plato vs vino)
    const dishTier = getDishTier(dish);
    const filtered = scored.filter(x => getWineTier(x.wine) >= Math.min(3, dishTier));

    const finalList = (filtered.length ? filtered : scored)
      .sort((a, b) => b.percent - a.percent);

    const top = finalList.slice(0, 3);

    const explicacion = generateExplanation(dish, top[0]?.wine);

    return { top, explicacion };
  }

  /* =========================================================
     3) UI (CLUB CETTO) · 3 MODOS
     - DOM generado por JS (sin HTML base)
  ========================================================= */

  const rootId = "club-cetto-app";
  const existing = document.getElementById(rootId);
  if (existing) existing.remove();

  const root = document.createElement("div");
  root.id = rootId;
  document.body.appendChild(root);

  // Estilos (scope simple)
  const style = document.createElement("style");
  style.textContent = `
    #${rootId} {
      font-family: system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
      background: radial-gradient(circle at 10% 0%, #1b1b1b, #0b0b0b 55%);
      color: #f3f3f3;
      padding: 22px;
    }
    #${rootId} .cc-wrap {
      max-width: 980px; margin: 0 auto;
      background: rgba(20,20,20,.8);
      border: 1px solid #2a2a2a;
      border-radius: 18px;
      padding: 18px;
    }
    #${rootId} h1 { margin:0; font-weight:600; letter-spacing:.4px; }
    #${rootId} .cc-sub { color:#b9a27a; margin:6px 0 14px; }
    #${rootId} .cc-tabs { display:flex; gap:10px; flex-wrap:wrap; margin: 10px 0 14px; }
    #${rootId} .cc-tab {
      padding: 10px 14px; border-radius: 999px;
      border: 1px solid #3a2f1f; background:#14100a; color:#f3f3f3;
      cursor:pointer; user-select:none;
    }
    #${rootId} .cc-tab.active { background:#241a0e; border-color:#8c734b; }
    #${rootId} .cc-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
    @media (max-width: 760px) { #${rootId} .cc-grid { grid-template-columns:1fr; } }
    #${rootId} label { display:block; margin-top:12px; color:#d0c6b4; font-size:14px; }
    #${rootId} select, #${rootId} input[type="text"] {
      width:100%; margin-top:6px; padding:11px 12px;
      border-radius: 12px; border:1px solid #2a2a2a;
      background:#0f0f0f; color:#fff; font-size:15px;
      outline:none;
    }
    #${rootId} .cc-checks label {
      display:flex; gap:10px; align-items:center; margin-top:8px; color:#f0f0f0;
    }
    #${rootId} .cc-btn {
      width:100%; margin-top:16px; padding:12px 14px;
      border-radius: 14px; border:0;
      background:#8c734b; color:#0b0b0b; font-weight:800;
      cursor:pointer;
    }
    #${rootId} .cc-result {
      margin-top:18px; padding-top:14px; border-top:1px solid #2a2a2a;
    }
    #${rootId} .cc-wine { font-size:22px; color:#d4b37c; margin-top:8px; }
    #${rootId} .cc-muted { color:#a9a9a9; margin-top:8px; line-height:1.45; }
    #${rootId} .cc-chip {
      display:inline-flex; align-items:center; gap:8px;
      padding: 8px 10px; border-radius:999px;
      background:#0f0f0f; border:1px solid #2a2a2a; color:#d8d8d8;
      font-size:13px; margin-top:8px;
    }
    #${rootId} a.cc-link {
      display:inline-block; margin-top:12px; color:#d4b37c; text-decoration:none;
      border:1px solid #8c734b; border-radius:12px; padding:10px 12px; background:#241a0e;
    }
    #${rootId} a.cc-link:hover { filter:brightness(1.08); }
  `;
  document.head.appendChild(style);

  root.innerHTML = `
    <div class="cc-wrap">
      <h1>Club Cetto</h1>
      <div class="cc-sub">Sommelier interactivo · Maridaje con principios Wine Folly</div>

      <div class="cc-tabs">
        <div class="cc-tab active" data-tab="dish">Marida tu Platillo</div>
        <div class="cc-tab" data-tab="dynamic">Sommelier Dinámico</div>
        <div class="cc-tab" data-tab="compare">Comparador de Vinos</div>
      </div>

      <div id="cc-view"></div>
    </div>
  `;

  const view = root.querySelector("#cc-view");
  const tabs = Array.from(root.querySelectorAll(".cc-tab"));

  function setActive(tab){
    tabs.forEach(t=>t.classList.toggle("active", t.dataset.tab===tab));
  }
  function uniq(arr){ return Array.from(new Set(arr)); }

  /* ============ MODO 1: MARIDA TU PLATILLO ============ */
  function renderDishMode(){
    setActive("dish");
    const cocinas = uniq(DISHES.map(d=>d.cocina)).sort((a,b)=>a.localeCompare(b,"es"));
    view.innerHTML = `
      <div class="cc-grid">
        <div>
          <label>Cocina</label>
          <select id="cc-cocina"><option value="">Selecciona</option></select>
        </div>
        <div>
          <label>Categoría</label>
          <select id="cc-categoria"><option value="">Selecciona</option></select>
        </div>
      </div>

      <label>Platillo</label>
      <select id="cc-platillo"><option value="">Selecciona</option></select>

      <button class="cc-btn" id="cc-ver">Ver maridaje</button>

      <div class="cc-result" id="cc-out"></div>
    `;

    const selC = view.querySelector("#cc-cocina");
    const selCat = view.querySelector("#cc-categoria");
    const selP = view.querySelector("#cc-platillo");
    const out = view.querySelector("#cc-out");

    cocinas.forEach(c=>{
      const o=document.createElement("option"); o.value=c; o.textContent=c; selC.appendChild(o);
    });

    selC.onchange = () => {
      const subset = DISHES.filter(d=>d.cocina===selC.value);
      const cats = uniq(subset.map(d=>d.categoria)).sort((a,b)=>a.localeCompare(b,"es"));
      selCat.innerHTML = `<option value="">Selecciona</option>` + cats.map(x=>`<option value="${escapeHtml(x)}">${escapeHtml(x)}</option>`).join("");
      selP.innerHTML = `<option value="">Selecciona</option>`;
      out.innerHTML = `<div class="cc-muted">Elige categoría y platillo.</div>`;
    };

    selCat.onchange = () => {
      const subset = DISHES
        .filter(d=>d.cocina===selC.value && d.categoria===selCat.value)
        .sort((a,b)=>a.platillo.localeCompare(b.platillo,"es"));
      selP.innerHTML = `<option value="">Selecciona</option>` + subset.map(x=>`<option value="${escapeHtml(x.platillo)}">${escapeHtml(x.platillo)}</option>`).join("");
      out.innerHTML = `<div class="cc-muted">Selecciona el platillo y pulsa “Ver maridaje”.</div>`;
    };

    view.querySelector("#cc-ver").onclick = () => {
      const item = DISHES.find(d=>d.cocina===selC.value && d.categoria===selCat.value && d.platillo===selP.value);
      if(!item){
        out.innerHTML = `<div class="cc-muted">Selecciona un platillo válido.</div>`;
        return;
      }
      out.innerHTML = `
        <div class="cc-chip">${escapeHtml(item.cocina)} · ${escapeHtml(item.categoria)}</div>
        <div class="cc-wine">${escapeHtml(item.vinoSugerido)}</div>
        <div class="cc-muted">${escapeHtml(item.porQueFunciona)}</div>
        <a class="cc-link" href="https://lacetto.mx" target="_blank" rel="noopener">Quiero maridarlo</a>
      `;
    };
  }

  /* ============ MODO 2: SOMMELIER DINÁMICO (TU MOTOR) ============ */
  function renderDynamicMode(){
    setActive("dynamic");

    const proteinKeys = Object.keys(PROTEINS || {});
    const cookingKeys = Object.keys(COOKING_RULES || {});
    const sauceKeys = Object.keys(SAUCES || {});
    const ingredientKeys = Object.keys(INGREDIENT_RULES || {});

    view.innerHTML = `
      <div class="cc-grid">
        <div>
          <label>Proteína</label>
          <select id="cc-proteina"><option value="">Selecciona</option></select>
        </div>
        <div>
          <label>Método de cocción</label>
          <select id="cc-coccion"><option value="">Selecciona</option></select>
        </div>
      </div>

      <label>Corte / tipo</label>
      <select id="cc-corte"><option value="">Selecciona</option></select>

      <label>Ingredientes clave</label>
      <div class="cc-checks" id="cc-ingredientes"></div>

      <label>Salsa (opcional)</label>
      <select id="cc-salsa"><option value="">Sin salsa</option></select>

      <button class="cc-btn" id="cc-reco">Recomendar vino</button>

      <div class="cc-result" id="cc-outdyn"></div>
    `;

    const selProt = view.querySelector("#cc-proteina");
    const selCook = view.querySelector("#cc-coccion");
    const selCut  = view.querySelector("#cc-corte");
    const selSau  = view.querySelector("#cc-salsa");
    const wrapIng = view.querySelector("#cc-ingredientes");
    const out = view.querySelector("#cc-outdyn");

    proteinKeys.forEach(k=>{
      const o=document.createElement("option");
      o.value=k;
      o.textContent=PROTEINS[k]?.label || k;
      selProt.appendChild(o);
    });

    cookingKeys.forEach(k=>{
      const o=document.createElement("option");
      o.value=k;
      o.textContent=capitalize(k);
      selCook.appendChild(o);
    });

    sauceKeys.forEach(k=>{
      const o=document.createElement("option");
      o.value=k;
      o.textContent=SAUCES[k]?.label || capitalize(k);
      selSau.appendChild(o);
    });

    const ingList = ingredientKeys.slice(0, 18);
    ingList.forEach(key=>{
      const lab = document.createElement("label");
      lab.innerHTML = `<input type="checkbox" value="${escapeHtml(key)}"> <span>${escapeHtml(prettyKey(key))}</span>`;
      wrapIng.appendChild(lab);
    });

    selProt.onchange = () => {
      selCut.innerHTML = `<option value="">Selecciona</option>`;
      const cortes = PROTEINS[selProt.value]?.cortes || {};
      Object.keys(cortes).forEach(k=>{
        const o=document.createElement("option");
        o.value=k;
        o.textContent=prettyKey(k);
        selCut.appendChild(o);
      });
      out.innerHTML = `<div class="cc-muted">Completa el platillo y pide recomendación.</div>`;
    };

    view.querySelector("#cc-reco").onclick = () => {
      const dish = {
        nombre: "",
        proteina: selProt.value,
        corte: selCut.value,
        coccion: selCook.value,
        salsa: selSau.value,
        ingredientes: Array.from(wrapIng.querySelectorAll("input:checked")).map(i=>i.value)
      };

      if (!dish.proteina || !dish.coccion) {
        out.innerHTML = `<div class="cc-muted">Selecciona al menos proteína y método de cocción.</div>`;
        return;
      }

      const result = recommendWineFinal(WINE_CATALOG, dish);
      if (!result?.top?.length) {
        out.innerHTML = `<div class="cc-muted">No se pudo generar recomendación.</div>`;
        return;
      }

      const best = result.top[0];
      const wine = best.wine;

      out.innerHTML = `
        <div class="cc-chip">Sommelier Dinámico</div>
        <div class="cc-wine">${escapeHtml(wine.etiqueta)}</div>
        <div class="cc-muted">${escapeHtml(result.explicacion || "")}</div>
        <div class="cc-muted">${escapeHtml(generatePairingNarrative(dish, wine) || "")}</div>
        <a class="cc-link" href="https://lacetto.mx" target="_blank" rel="noopener">Quiero maridarlo</a>
      `;
    };
  }

  /* ============ MODO 3: COMPARADOR DE VINOS ============ */
  function renderCompareMode(){
    setActive("compare");

    const wineOptions = WINE_CATALOG.map(w=>w.etiqueta).sort((a,b)=>a.localeCompare(b,"es"));

    view.innerHTML = `
      <div class="cc-chip">Comparador</div>
      <div class="cc-muted">Compara 2 vinos contra el mismo platillo (usa el mismo motor).</div>

      <div class="cc-grid" style="margin-top:10px">
        <div>
          <label>Vino A</label>
          <select id="cc-v1"><option value="">Selecciona</option></select>
        </div>
        <div>
          <label>Vino B</label>
          <select id="cc-v2"><option value="">Selecciona</option></select>
        </div>
      </div>

      <div class="cc-grid" style="margin-top:10px">
        <div>
          <label>Proteína</label>
          <select id="cc-proteina2"><option value="">Selecciona</option></select>
        </div>
        <div>
          <label>Método de cocción</label>
          <select id="cc-coccion2"><option value="">Selecciona</option></select>
        </div>
      </div>

      <label>Corte / tipo</label>
      <select id="cc-corte2"><option value="">Selecciona</option></select>

      <label>Ingredientes clave</label>
      <div class="cc-checks" id="cc-ingredientes2"></div>

      <label>Salsa (opcional)</label>
      <select id="cc-salsa2"><option value="">Sin salsa</option></select>

      <button class="cc-btn" id="cc-compare">Comparar vinos</button>

      <div class="cc-result" id="cc-outcmp"></div>
    `;

    const selV1 = view.querySelector("#cc-v1");
    const selV2 = view.querySelector("#cc-v2");
    const selProt = view.querySelector("#cc-proteina2");
    const selCook = view.querySelector("#cc-coccion2");
    const selCut  = view.querySelector("#cc-corte2");
    const selSau  = view.querySelector("#cc-salsa2");
    const wrapIng = view.querySelector("#cc-ingredientes2");
    const out = view.querySelector("#cc-outcmp");

    wineOptions.forEach(lbl=>{
      const o1=document.createElement("option"); o1.value=lbl; o1.textContent=lbl; selV1.appendChild(o1);
      const o2=document.createElement("option"); o2.value=lbl; o2.textContent=lbl; selV2.appendChild(o2);
    });

    Object.keys(PROTEINS||{}).forEach(k=>{
      const o=document.createElement("option"); o.value=k; o.textContent=PROTEINS[k]?.label || k; selProt.appendChild(o);
    });
    Object.keys(COOKING_RULES||{}).forEach(k=>{
      const o=document.createElement("option"); o.value=k; o.textContent=capitalize(k); selCook.appendChild(o);
    });
    Object.keys(SAUCES||{}).forEach(k=>{
      const o=document.createElement("option"); o.value=k; o.textContent=SAUCES[k]?.label || capitalize(k); selSau.appendChild(o);
    });

    const ingredientKeys = Object.keys(INGREDIENT_RULES||{}).slice(0, 18);
    ingredientKeys.forEach(key=>{
      const lab = document.createElement("label");
      lab.innerHTML = `<input type="checkbox" value="${escapeHtml(key)}"> <span>${escapeHtml(prettyKey(key))}</span>`;
      wrapIng.appendChild(lab);
    });

    selProt.onchange = () => {
      selCut.innerHTML = `<option value="">Selecciona</option>`;
      const cortes = PROTEINS[selProt.value]?.cortes || {};
      Object.keys(cortes).forEach(k=>{
        const o=document.createElement("option");
        o.value=k;
        o.textContent=prettyKey(k);
        selCut.appendChild(o);
      });
      out.innerHTML = `<div class="cc-muted">Selecciona vinos y construye el platillo.</div>`;
    };

    view.querySelector("#cc-compare").onclick = () => {
      const lblA = selV1.value;
      const lblB = selV2.value;
      if (!lblA || !lblB || lblA===lblB) {
        out.innerHTML = `<div class="cc-muted">Elige dos vinos distintos.</div>`;
        return;
      }

      const dish = {
        nombre: "",
        proteina: selProt.value,
        corte: selCut.value,
        coccion: selCook.value,
        salsa: selSau.value,
        ingredientes: Array.from(wrapIng.querySelectorAll("input:checked")).map(i=>i.value)
      };
      if (!dish.proteina || !dish.coccion) {
        out.innerHTML = `<div class="cc-muted">Selecciona al menos proteína y cocción.</div>`;
        return;
      }

      let dishProfile;
      try {
        dishProfile = buildDishProfile(dish);
      } catch {
        out.innerHTML = `<div class="cc-muted">No se pudo analizar el platillo.</div>`;
        return;
      }

      const wineA = WINE_CATALOG.find(w=>w.etiqueta===lblA);
      const wineB = WINE_CATALOG.find(w=>w.etiqueta===lblB);

      const aProfile = normalizeWineProfile(wineA);
      const bProfile = normalizeWineProfile(wineB);

      const a = scoreWine(aProfile, dishProfile);
      const b = scoreWine(bProfile, dishProfile);

      const winner = a.percent >= b.percent ? {wine:wineA, score:a} : {wine:wineB, score:b};
      const runner = a.percent >= b.percent ? {wine:wineB, score:b} : {wine:wineA, score:a};

      out.innerHTML = `
        <div class="cc-wine">🥇 ${escapeHtml(winner.wine.etiqueta)} <span style="color:#a9a9a9;font-size:14px">(${winner.score.percent}%)</span></div>
        <div class="cc-muted">${escapeHtml(generateExplanation(dish, winner.wine))}</div>

        <div class="cc-wine" style="font-size:18px;margin-top:14px">🥈 ${escapeHtml(runner.wine.etiqueta)} <span style="color:#a9a9a9;font-size:14px">(${runner.score.percent}%)</span></div>
        <div class="cc-muted">${escapeHtml(generateExplanation(dish, runner.wine))}</div>

        <a class="cc-link" href="https://lacetto.mx" target="_blank" rel="noopener">Quiero maridarlo</a>
      `;
    };
  }

  /* ============ Helpers UI ============ */
  function escapeHtml(str){
    return String(str ?? "")
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }
  function capitalize(s){ return (s||"").charAt(0).toUpperCase() + (s||"").slice(1); }
  function prettyKey(key){
    return String(key||"")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[_-]+/g, " ")
      .replace(/\b\w/g, m=>m.toUpperCase());
  }

  tabs.forEach(t=>{
    t.addEventListener("click", () => {
      const tab=t.dataset.tab;
      if(tab==="dish") renderDishMode();
      if(tab==="dynamic") renderDynamicMode();
      if(tab==="compare") renderCompareMode();
    });
  });

  // Default
  renderDishMode();

})();
