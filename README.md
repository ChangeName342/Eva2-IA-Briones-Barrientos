Integrantes: Ignacio Barrientos y Jose Briones

Asignatura: Aplicaciones de Inteligencia Artificial (TI2082/D-IEI-N8-P1-C2/D Valdivia IEI)

Profesor: Vedran Hrvoj Tomicic Cantizano

Link: https://eva2-frontend.onrender.com/

**Estructura:**


<img width="627" height="434" alt="image" src="https://github.com/user-attachments/assets/b5bc4688-245c-4428-ac32-5e1e019fb1dc" />


**Instalacion y ejecucion (Local):**

1.- cd backend

2.- python -m venv .venv

3.- Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process

4.- .venv\Scripts\Activate

5.- pip install -r ../requirements.txt

6.- uvicorn app.main:app --reload

7.- cd frontend

8.- $env:Path += ";$Env:ProgramFiles\nodejs"

npm -v  (Esto por si tira error el npm)

8.- npm install

9.- npm run dev


**Preguntas:**



**1) ¿Cuál es el umbral ideal para el modelo de predicción de diabetes?**


R: La aplicación web permite ingresar distintos valores clínicos de un paciente (como glucosa, presión arterial, insulina, BMI, edad, etc.) y obtener un resultado inmediato sobre la probabilidad de tener diabetes.
El modelo que se encuentra detrás de esta interfaz es una regresión logística, entrenada previamente y subida a producción como servicio web. Este modelo entrega una probabilidad numérica entre 0 y 1, que la página interpreta como positivo o negativo según un umbral (threshold). El umbral óptimo configurado fue de 0.4, valor obtenido durante la etapa de pruebas del modelo.

Al probar distintos valores en la interfaz, se observa lo siguiente:

a) Cuando los valores de glucosa y BMI son bajos (por ejemplo, glucosa menor a 110 y BMI menor a 25), el modelo entrega una predicción negativa, indicando bajo riesgo de diabetes.

b) A medida que los valores aumentan (por ejemplo, glucosa sobre 150 o BMI sobre 30), la predicción pasa a positiva, indicando mayor probabilidad de padecer la enfermedad.

Esto se debe a que el modelo compara la probabilidad calculada con el umbral de 0.4:

a) Si la probabilidad es ≥ 0.4, la página muestra el resultado “Positivo: posible presencia de diabetes”.

b) Si es < 0.4, se muestra “Negativo: no se detecta diabetes”.

Gracias a este umbral más bajo que el estándar (0.5), la aplicación detecta más casos positivos, reduciendo el riesgo de falsos negativos.

En la web, el umbral ideal utilizado para clasificar los resultados del modelo de diabetes es 0.4, ya que permite detectar un mayor número de casos positivos sin afectar significativamente la precisión. Esto se comprueba directamente en la interfaz: al ingresar valores altos de glucosa o BMI, la predicción cambia de “negativo” a “positivo”, evidenciando el punto de decisión que el modelo aplica internamente. Este enfoque es especialmente útil en un contexto médico, donde es preferible detectar posibles casos de diabetes (mayor sensibilidad) aunque se produzcan algunos falsos positivos.

EJEMPLO: 

<img width="804" height="846" alt="image" src="https://github.com/user-attachments/assets/da6a995c-2dc8-4faa-b285-3d9a5bc3eab4" />

Resultado esperado: “No presenta diabetes” o “Probabilidad baja de diabetes”.
Interpretación: Todos los valores están dentro de rangos saludables. La probabilidad que el modelo calcula es inferior a 0.4, por lo tanto el modelo clasifica como negativo.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**2) ¿Cuales son los factores que más influyen en el precio de los costos asociados al seguro médico?**

R: La web permite ingresar distintos datos del paciente para estimar el costo del seguro médico anual. El modelo que usa esta parte del sistema es una regresión lineal optimizada (ElasticNet), entrenada con datos de edad, sexo, índice de masa corporal (BMI), número de hijos, hábito de fumar y región geográfica. Desde la interfaz, el usuario puede modificar estos valores y observar cómo cambia el resultado del precio proyectado, lo que permite visualizar directamente qué variables influyen más en la predicción.

Al probar diferentes combinaciones de valores en la interfaz, se puede observar el siguiente comportamiento:

Factor	Cambio en la entrada	Efecto en el costo del seguro
Fumador (Smoker)	Cambiar de “No” a “Sí”	Aumenta drásticamente el precio (en algunos casos más del doble). Es el factor más influyente del modelo.
Edad	Aumentar la edad de 20 a 60 años	El costo aumenta de forma progresiva, ya que la edad se asocia con mayor riesgo de enfermedad.
BMI (Índice de masa corporal)	Aumentar de 22 a 35	El precio también sube, reflejando que un mayor índice de masa corporal incrementa el riesgo médico.
Número de hijos	Aumentar de 0 a 3	Produce un ligero aumento en el costo, ya que hay más dependientes asegurados.
Región geográfica	Cambiar entre Northwest, Southwest, Northeast, Southeast	El valor cambia levemente (por diferencias en el costo promedio por zona).
Sexo	Cambiar entre masculino y femenino	Tiene poca o ninguna variación en el precio final.

En la web, los factores que más influyen en el costo del seguro médico son el hábito de fumar, el índice de masa corporal (BMI) y la edad. Esto se evidencia directamente al modificar los valores en el formulario: cambiar “Fumador: Sí” genera el mayor aumento en la predicción, seguido por incrementos progresivos al aumentar la edad o el BMI. Los demás factores (sexo, región, número de hijos) tienen un impacto menor, lo que demuestra que el modelo prioriza las variables que reflejan riesgo de salud real al estimar el precio final.


EJEMPLO: 

<img width="836" height="699" alt="image" src="https://github.com/user-attachments/assets/2ca440c0-9e2f-4615-acad-0c763cad7eec" />


Predicción: $1324.42
Interpretación: Este valor representa el costo estimado más bajo del seguro médico. El modelo identifica a este paciente como bajo riesgo, ya que:

a) No fuma,

b) Tiene un BMI saludable (22),

c) Es joven (25 años),

d) No tiene dependientes ni factores de riesgo asociados.

Esto confirma que el modelo prioriza correctamente las variables que más impactan en los costos principalmente edad, BMI y hábito de fumar— y deja en evidencia que los demás factores (sexo y región) tienen un peso muy menor en la predicción.
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**3) Hacer un análisis comparativo de cada características de ambos modelos utilizando RandomForest.**

R: El modelo de Regresión Logística (para diabetes) y el de Regresión Lineal (para costos de seguro médico) fueron evaluados con un modelo adicional de RandomForest, con el objetivo de comparar la importancia de las variables en cada caso. El RandomForest permite observar qué factores son más determinantes al momento de hacer una predicción, ya que mide cuánto aporta cada característica a la precisión del modelo.

Modelo 1 – Predicción de Diabetes

En el conjunto de datos de diabetes (PIMA Indians), el RandomForest muestra que las variables con mayor peso predictivo son:

Característica	Importancia estimada	Interpretación
Glucosa	Alta (≈ 30–35%)	Es el factor más determinante. Niveles altos de glucosa se asocian directamente a la presencia de diabetes.
BMI (Índice de masa corporal)	Alta (≈ 20%)	Un mayor BMI indica sobrepeso u obesidad, lo que aumenta el riesgo de diabetes tipo 2.
Edad	Media-alta (≈ 15%)	La probabilidad de desarrollar diabetes aumenta con la edad.
Insulina	Media (≈ 10–12%)	Relacionada con la resistencia insulínica, aunque puede tener valores más dispersos.
Presión Arterial / Embarazos / Grosor de piel / Pedigree	Baja (≤ 10%)	Factores complementarios o de contexto, con menor peso individual.

Interpretación práctica: Si un usuario en la web ingresa valores altos en glucosa o BMI, el modelo de diabetes arroja una probabilidad alta de diagnóstico positivo. Esto coincide con lo esperado clínicamente y refuerza la coherencia del modelo.

EJEMPLO: 
BMI BAJO
<img width="812" height="829" alt="image" src="https://github.com/user-attachments/assets/b8b47ddd-ec50-49c2-88ef-94482772c0d4" />

BMI ALTO
<img width="829" height="821" alt="image" src="https://github.com/user-attachments/assets/06aef94a-8dda-486a-aaba-262d733f1c65" />



Modelo 2 – Predicción de Seguro Médico

En el modelo de regresión lineal para costos de seguro, el RandomForest también permite medir la influencia de cada variable:

Característica	Importancia estimada	Interpretación
Fumador (Smoker)	Muy alta (≈ 50%)	El hábito de fumar es el principal factor que eleva los costos. Los fumadores pueden pagar hasta 3–4 veces más.
Edad	Alta (≈ 25%)	A mayor edad, mayor riesgo y mayor costo de seguro.
BMI	Media-alta (≈ 15%)	Un índice de masa corporal alto implica más riesgos de enfermedades relacionadas.
Número de hijos	Baja (≈ 5%)	Incrementa el costo de manera leve, por dependientes adicionales.
Sexo y Región	Muy baja (≤ 3%)	No generan diferencias significativas en el precio.

Interpretación práctica: Al probar en la interfaz de la web, cambiar el valor “Fumador: Sí” genera el aumento más notorio, lo que confirma el peso real de esta variable según el modelo RandomForest.

EJEMPLO:
NO FUMA
<img width="804" height="698" alt="image" src="https://github.com/user-attachments/assets/02ea91d1-bc31-4b03-bf13-54f180fda657" />

SI FUMA
<img width="835" height="699" alt="image" src="https://github.com/user-attachments/assets/a1bd2e84-fb3c-4055-8fb5-86e7118a0559" />


Comparación general entre ambos modelos
Aspecto	Modelo de Diabetes	Modelo de Seguro Médico
Tipo de modelo	Clasificación (0 o 1)	Regresión continua ($)
Variable principal	Glucosa	Fumador
Factores secundarios	BMI, Edad, Insulina	Edad, BMI
Variables con menor impacto	Pedigree, Grosor de piel	Sexo, Región
Sensibilidad al cambio	Alta (cambia el resultado de clase)	Proporcional (aumenta o disminuye el precio)
Interpretación visual en la web	La probabilidad cambia drásticamente si la glucosa o BMI suben	El valor en dólares cambia mucho si el paciente fuma o envejece

El análisis con RandomForest demuestra que ambos modelos se comportan de forma coherente con la lógica médica:

.- En diabetes, los valores clínicos (glucosa y BMI) son los principales determinantes del diagnóstico.

.- En seguro médico, los factores de riesgo de salud (fumar, edad, sobrepeso) son los que más encarecen el costo.

Esto evidencia que los modelos implementados en la aplicación web no solo predicen correctamente, sino que además reflejan fielmente la relación entre las variables y el riesgo médico que representan.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**4) ¿Qué técnica de optimización mejora el rendimiento de  ambos modelos?**

R: Ambos modelos el de predicción de diabetes y el de costos de seguro médico fueron entrenados utilizando algoritmos base de regresión:

a) Regresión Logística para diabetes.

b) Regresión Lineal para costos de seguro médico.

Sin embargo, para mejorar su rendimiento antes de subirlos a la aplicación web, se aplicaron distintas técnicas de optimización y ajuste de hiperparámetros, que permitieron aumentar la precisión, reducir el error y mejorar la estabilidad del modelo en producción.

💗 Modelo de Diabetes (Regresión Logística)

En este modelo, la técnica más efectiva fue el ajuste del umbral de decisión (threshold) y la normalización de los datos.

Optimización aplicada:

1. Escalado de variables (StandardScaler):
Las variables del dataset (glucosa, presión, BMI, etc.) estaban en diferentes rangos. Al estandarizarlas, la regresión logística aprendió mejor y evitó que los valores grandes (como glucosa o insulina) dominaran el modelo.

2. Ajuste del umbral (threshold tuning):
En vez del valor por defecto (0.5), se determinó que un umbral de 0.4 entregaba mejor equilibrio entre sensibilidad (detectar casos reales de diabetes) y precisión. Esto significa que el modelo identifica más correctamente los pacientes positivos sin aumentar demasiado los falsos positivos.

3. Validación cruzada (Cross-validation):
Se probó el modelo en varios subconjuntos del dataset para asegurar que no se sobreajustara (overfitting).

Resultado: La optimización aumentó la precisión global y redujo los errores de clasificación, permitiendo que el modelo mostrado en la web entregue predicciones coherentes y realistas según los datos ingresados por el usuario.

💙 Modelo de Seguro Médico (Regresión Lineal)

En este caso, se aplicó una optimización de tipo Regularización, combinando técnicas de Ridge y Lasso, conocidas como ElasticNet.

Optimización aplicada:

1. Regularización (Ridge + Lasso = ElasticNet):
Se penalizan los coeficientes más grandes para evitar que el modelo dependa excesivamente de una sola variable (por ejemplo, el “fumador”). Esto equilibra la influencia de las variables y mejora la generalización.

2. Normalización de los datos:
Igual que en el modelo anterior, se escalaron las variables numéricas (edad, BMI, número de hijos) para evitar que los valores grandes sesgaran la regresión.

3. Búsqueda de hiperparámetros (GridSearchCV):
Se probaron diferentes combinaciones de parámetros alpha y l1_ratio para encontrar el mejor equilibrio entre error cuadrático medio (MSE) y estabilidad del modelo.

Resultado: La aplicación de ElasticNet redujo el error de predicción (MSE) en las pruebas y mejoró la precisión de los valores mostrados en la web. El modelo ahora reacciona suavemente a los cambios en las variables, mostrando un precio de seguro coherente con el riesgo real del paciente.



Comparación entre ambos modelos
Aspecto	Modelo de Diabetes	Modelo de Seguro Médico
Tipo de optimización	Ajuste de umbral + normalización	Regularización (ElasticNet)
Objetivo de la optimización	Mejorar la detección de casos positivos	Evitar sobreajuste y mejorar precisión del costo
Resultado observable en la web	Predicciones más precisas (probabilidad coherente)	Valores estables y realistas (sin saltos extremos)


Las técnicas de optimización aplicadas como ajuste de umbral, normalización y regularización permitieron que ambos modelos funcionen correctamente en la página web, mostrando resultados coherentes y consistentes con los datos clínicos ingresados. En producción, estas optimizaciones aseguran que la predicción de diabetes sea sensible a los cambios relevantes (glucosa, BMI, edad), y que el modelo de costos médicos mantenga un cálculo equilibrado y realista frente a distintos perfiles de pacientes.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**5) Explicar contexto de los datos.**

R: 💗 Modelo de Predicción de Diabetes

El modelo de predicción de diabetes utiliza el conjunto de datos “PIMA Indians Diabetes Database”, un dataset médico clásico usado para el entrenamiento de modelos de clasificación binaria (diabetes: sí/no). Los datos provienen de estudios realizados en mujeres de origen Pima (Arizona, EE.UU.), un grupo con alta incidencia de diabetes tipo 2.

Características principales del dataset:

Cada fila del dataset representa a una paciente y contiene 8 variables clínicas relacionadas con la salud metabólica:

V1

Variable	Descripción	Tipo
Embarazos	Cantidad de veces que la paciente ha estado embarazada	Entero
Glucosa	Nivel de glucosa en sangre (mg/dL)	Numérica
Presión Arterial	Presión diastólica promedio (mm Hg)	Numérica
Grosor de Piel	Espesor del pliegue cutáneo (mm)	Numérica
Insulina	Nivel de insulina sérica (mu U/ml)	Numérica
BMI	Índice de masa corporal (peso/altura²)	Decimal
Diabetes Pedigree Function	Probabilidad hereditaria de diabetes	Decimal
Edad	Edad de la paciente (años)	Entero

Variable objetivo: Outcome --> 0 (no tiene diabetes) / 1 (tiene diabetes).


V2
Variable	Descripción	Tipo de dato real (Python/pandas)
Pregnancies	Cantidad de veces que la paciente ha estado embarazada	int64
Glucose	Nivel de glucosa en sangre (mg/dL)	int64
BloodPressure	Presión diastólica promedio (mm Hg)	int64
SkinThickness	Espesor del pliegue cutáneo (mm)	int64
Insulin	Nivel de insulina sérica (mu U/ml)	int64
BMI	Índice de masa corporal (peso/altura²)	float64
DiabetesPedigreeFunction	Probabilidad hereditaria de diabetes	float64
Age	Edad de la paciente (años)	int64
Outcome	Resultado: 0 (no tiene diabetes) / 1 (tiene diabetes)	int64

Aplicación: En la interfaz, estos mismos campos se piden al usuario para estimar la probabilidad de diabetes. El modelo entrenado con este dataset permite simular diferentes perfiles de pacientes y observar cómo cambia la probabilidad según los valores ingresados (por ejemplo, aumentando glucosa o BMI).

EJEMPLO:

<img width="834" height="838" alt="image" src="https://github.com/user-attachments/assets/6ac6b124-6dcf-4c97-ba9b-91de169f0a50" />


Resultado: Una predicción de riesgo Bajo. Esto demuestra que app utiliza datos clínicos reales y coherentes con los valores del dataset PIMA.

Importancia práctica: Este dataset refleja datos reales de salud, lo que permite al modelo generar predicciones clínicas interpretables y coherentes, siempre bajo un enfoque educativo y demostrativo.

💙 Modelo de Predicción de Costos de Seguro Médico

El modelo de regresión lineal para estimar los costos médicos utiliza el dataset “Medical Cost Personal Dataset”, que contiene información de distintos individuos en Estados Unidos. El objetivo es predecir cuánto podría costar el seguro médico anual de una persona en función de sus características personales y hábitos de salud.

V1
Características principales del dataset
Variable	Descripción	Tipo
Edad	Edad del asegurado (años)	Numérica
Sexo	Masculino o femenino	Categórica
BMI	Índice de masa corporal	Decimal
Hijos	Número de dependientes cubiertos por el seguro	Entero
Fumador	Si la persona fuma o no	Binaria
Región	Zona geográfica (noroeste, suroeste, noreste, sureste)	Categórica
Gastos Médicos	Costo anual del seguro (variable objetivo)	Numérica ($)

Variable objetivo: charges --> Costo del seguro médico en dólares (valor continuo).


V2
Variable	Descripción	Tipo de dato real (Python/pandas)
age	Edad del asegurado (años)	int64
sex	Masculino o femenino	object
bmi	Índice de masa corporal	float64
children	Número de dependientes cubiertos por el seguro	int64
smoker	Si la persona fuma o no	object
region	Zona geográfica (noroeste, suroeste, noreste, sureste)	object
charges	Costo anual del seguro (variable objetivo)	float64

Aplicación: En la interfaz, el usuario puede ingresar valores como edad, BMI, región o hábito de fumar, y el modelo calcula el costo estimado en dólares. Esto permite visualizar cómo cada variable afecta directamente el precio final.

EJEMPLO: 

<img width="845" height="704" alt="image" src="https://github.com/user-attachments/assets/44aa2095-f62d-4b02-ab23-0d3934d3f4ff" />


Resultado: Al ingresar valores promedio del dataset de seguros médicos, la aplicación muestra un costo estimado medio. Esto evidencia que el modelo fue entrenado con datos realistas y generaliza correctamente al aplicarse en la interfaz web, manteniendo coherencia con el comportamiento del dataset original.

Importancia práctica: El dataset refleja el comportamiento económico real de los seguros médicos:

-- Fumar, tener sobrepeso o ser mayor de edad incrementa los costos.

-- Personas jóvenes, sanas y no fumadoras pagan menos.

Así el modelo sirve como una simulación del impacto de los factores de salud sobre los costos médicos.


El modelo de diabetes se centra en datos clínicos para detectar una enfermedad, mientras que el modelo de seguro médico utiliza factores demográficos y de estilo de vida para estimar un costo. En conjunto, ambos modelos muestran cómo los datos pueden transformarse en herramientas predictivas útiles y visuales dentro de una aplicación web funcional.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**6) Analizar el sesgo que presentan los modelos y explicar porqué.**

R: 💗 Modelo de Predicción de Diabetes

El modelo de diabetes presenta un sesgo de datos (data bias), originado principalmente por la naturaleza del dataset “PIMA Indians Diabetes Database”.

Causas del sesgo:

1.- Población limitada:
Todos los registros corresponden a mujeres de origen Pima, por lo tanto el modelo puede no generalizar correctamente si se utiliza con hombres o personas de otras etnias.
En la aplicación web, si se ingresan valores que no representan el perfil promedio de ese grupo, la predicción puede ser menos precisa.

2.- Variables clínicas incompletas:
No se incluyen factores como alimentación, actividad física o antecedentes familiares más detallados, lo que puede llevar a falsos negativos o positivos al depender solo de los valores numéricos disponibles.

3.- Umbral de decisión fijo (0.4):
Aunque optimizado, este umbral sigue siendo general y puede sobreestimar casos positivos cuando los valores están cerca del límite.
Esto genera un sesgo hacia la sobrepredicción (detecta diabetes con mayor frecuencia para evitar falsos negativos).


EJEMPLO:

PERSONA SANA
<img width="889" height="833" alt="image" src="https://github.com/user-attachments/assets/159e39c7-2aee-4634-840e-5a61e901962a" />


PERSONA CON VALORES INTERMEDIOS
<img width="771" height="834" alt="image" src="https://github.com/user-attachments/assets/99e0a68b-cc8e-4d42-b3c3-ed1c156c4448" />


PERSONA CON VALORES ALTOS
<img width="796" height="836" alt="image" src="https://github.com/user-attachments/assets/a93e71b8-9f98-45bf-9a37-22c5f84b0f81" />



Evidencia práctica: Al ingresar datos de pacientes jóvenes, saludables y con valores normales, el modelo predice correctamente “sin diabetes”. Sin embargo, si se introducen valores moderadamente altos (por ejemplo, glucosa 130 o BMI 29), el modelo puede clasificar como “positivo” aunque clínicamente aún no sea un diagnóstico confirmado. Esto demuestra que el modelo prefiere prevenir que omitir casos, lo cual es útil en contextos médicos, pero no exento de sesgo.


💙 Modelo de Predicción de Costos de Seguro Médico

El modelo de costos médicos presenta un sesgo de regresión y socioeconómico, originado en los datos del “Medical Cost Personal Dataset”.

Causas del sesgo:

1.- Distribución desigual del costo:
La variable objetivo (charges) tiene una alta variabilidad entre fumadores y no fumadores.
Esto provoca que el modelo asigne demasiado peso al hábito de fumar, aumentando el costo incluso cuando el resto de las variables indican bajo riesgo.

2.- Sesgo por región y estilo de vida:
El dataset refleja costos en EE.UU., donde las diferencias regionales (Northeast, Southwest, etc.) responden a contextos económicos específicos.
Por eso, al usar el modelo en otro país o contexto, los resultados pueden no coincidir con la realidad local.

3.- Sesgo lineal:
Al ser un modelo de regresión lineal (incluso con ElasticNet), supone relaciones lineales entre las variables y el costo, cuando en la realidad esas relaciones pueden ser no lineales o más complejas.


EJEMPLO:

CASO 1: PERSONA JOVEN NO FUMADORA
<img width="826" height="701" alt="image" src="https://github.com/user-attachments/assets/a81cfe3a-6526-4f1c-b417-2ef6dfb6f9de" />



CASO 2: PERSONA JOVEN SI FUMADORA
<img width="804" height="706" alt="image" src="https://github.com/user-attachments/assets/74fe2577-1895-48d3-9980-f5039ef020da" />


Evidencia práctia: En la aplicación, se observa que marcar la opción “Fumador: Sí” provoca un aumento desproporcionado del precio, incluso en usuarios jóvenes y saludables. Esto muestra el sesgo aprendido por el modelo: el fumar domina la predicción y puede eclipsar otros factores relevantes (como la edad o el BMI). Aunque el comportamiento es coherente con la realidad médica, el modelo no distingue matices (por ejemplo, exfumadores o fumadores ocasionales).


Conclusion: Ambos modelos presentan sesgos derivados de sus conjuntos de entrenamiento:

1.- El modelo de diabetes tiene un sesgo demográfico y clínico, pues fue entrenado con datos limitados a un grupo específico de mujeres.

2.- El modelo de seguro médico tiene un sesgo económico y conductual, ya que exagera el impacto del hábito de fumar sobre el costo total.

A pesar de esto, los modelos funcionan correctamente dentro del propósito educativo de la aplicación, mostrando cómo los algoritmos pueden aprender patrones reales pero también heredar las limitaciones y desigualdades de sus datos de origen.


