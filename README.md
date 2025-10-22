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

<img width="852" height="868" alt="image" src="https://github.com/user-attachments/assets/44daa3ca-5fcc-41eb-8ffb-5b17a307cc45" />


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

<img width="828" height="728" alt="image" src="https://github.com/user-attachments/assets/3438ff8a-f02f-45ca-8b6c-b80d7ff6cacf" />



Predicción: $1576.92
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

En el modelo de predicción de diabetes, el RandomForest mostró que las variables más influyentes en la predicción de la enfermedad son la glucosa y el BMI (Índice de masa corporal). La glucosa tiene la mayor importancia, con un impacto cercano al 30-35%. Esto tiene sentido clínicamente, ya que niveles altos de glucosa en sangre son uno de los indicadores más claros de diabetes tipo 2. El BMI, con una importancia de alrededor del 20%, también es clave en la predicción, ya que un mayor índice de masa corporal está estrechamente asociado con un mayor riesgo de desarrollar diabetes.

La edad es otro factor significativo, con un impacto del 15%, ya que la probabilidad de desarrollar diabetes aumenta a medida que una persona envejece. En cambio, variables como insulina, presión arterial, grosor de piel y diabetes pedigree function tienen un peso mucho menor, siendo consideradas más como factores complementarios.

Cuando un usuario ingresa sus datos en la interfaz web, si los valores de glucosa o BMI son elevados, el modelo de predicción de diabetes generalmente indica una alta probabilidad de que el usuario padezca la enfermedad. Este comportamiento es coherente con lo que se espera en un diagnóstico real, donde altos niveles de glucosa y sobrepeso son factores de riesgo clave.

EJEMPLO: 
BMI BAJO
<img width="816" height="870" alt="image" src="https://github.com/user-attachments/assets/6f604e13-7f64-4c2d-bb21-612dcf83052e" />

BMI ALTO
<img width="840" height="880" alt="image" src="https://github.com/user-attachments/assets/a7f0d07c-912c-475d-ab5a-82769d68981b" />

Modelo 2 – Predicción de Seguro Médico

Por otro lado, el modelo de predicción de costos de seguro médico, basado en una regresión lineal, fue evaluado también con RandomForest para comprender qué factores afectan más el precio del seguro. En este caso, la variable más influyente es si la persona fuma o no. Los fumadores tienen un riesgo mucho mayor de desarrollar enfermedades, lo que eleva significativamente sus costos de seguro. El edad de la persona también tiene un impacto notable, ya que a medida que las personas envejecen, los costos del seguro aumentan debido a los riesgos asociados con la salud.

El BMI (Índice de masa corporal) también es un factor importante, aunque su impacto es menor comparado con el de fumar o la edad. Las variables como el número de hijos, el sexo y la región tienen un impacto menor en el costo del seguro. En este caso, cambiar el estado de “fumador: sí” en la interfaz de la web genera el mayor aumento en el costo del seguro, lo que confirma la gran influencia de esta variable en el modelo.

EJEMPLO:
NO FUMA
<img width="837" height="747" alt="image" src="https://github.com/user-attachments/assets/2278c0a8-1d0f-44bd-b27a-63d47e8551d4" />

SI FUMA
<img width="831" height="749" alt="image" src="https://github.com/user-attachments/assets/37f47896-e7e4-4084-97c6-09669c4ad62f" />

Comparación general entre ambos modelos
Si comparamos ambos modelos, encontramos algunas diferencias clave en cuanto a cómo las variables afectan las predicciones. El modelo de diabetes se basa principalmente en factores clínicos como glucosa y BMI, que tienen un impacto directo en la presencia de la enfermedad. En cambio, el modelo de seguro médico se enfoca en factores de riesgo de salud como el hábito de fumar, la edad y el BMI, que afectan el costo de la cobertura médica.

En cuanto a la visualización en la interfaz web, el modelo de diabetes muestra un cambio notable en la probabilidad de diagnóstico cuando los valores de glucosa o BMI son altos. Por otro lado, en el modelo de seguro médico, el valor del costo cambia drásticamente cuando el usuario es fumador o cuando tiene una edad avanzada.
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

<img width="790" height="862" alt="image" src="https://github.com/user-attachments/assets/c6fb4e4f-5ddf-4a63-807b-d13ccdade0d7" />



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

<img width="804" height="740" alt="image" src="https://github.com/user-attachments/assets/38a782d9-8d30-40d5-a538-92d053452760" />



Resultado: Al ingresar valores promedio del dataset de seguros médicos, la aplicación muestra un costo estimado medio. Esto evidencia que el modelo fue entrenado con datos realistas y generaliza correctamente al aplicarse en la interfaz web, manteniendo coherencia con el comportamiento del dataset original.

Importancia práctica: El dataset refleja el comportamiento económico real de los seguros médicos:

-- Fumar, tener sobrepeso o ser mayor de edad incrementa los costos.

-- Personas jóvenes, sanas y no fumadoras pagan menos.

Así el modelo sirve como una simulación del impacto de los factores de salud sobre los costos médicos.


El modelo de diabetes se centra en datos clínicos para detectar una enfermedad, mientras que el modelo de seguro médico utiliza factores demográficos y de estilo de vida para estimar un costo. En conjunto, ambos modelos muestran cómo los datos pueden transformarse en herramientas predictivas útiles y visuales dentro de una aplicación web funcional.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**6) Analizar el sesgo que presentan los modelos y explicar porqué.**

R: Análisis del Sesgo en los Modelos

En los modelos implementados para la predicción de diabetes y los costos del seguro médico, es esencial considerar el sesgo que podrían presentar durante el proceso de entrenamiento y evaluación. El sesgo se refiere a la tendencia de un modelo a hacer predicciones sistemáticamente incorrectas debido a su incapacidad para generalizar correctamente a partir de los datos de entrenamiento. Este sesgo puede estar relacionado tanto con los datos utilizados como con la elección del modelo o la configuración de los hiperparámetros.

Modelo 1 – Predicción de Diabetes (Regresión Logística)

En el caso del modelo de predicción de diabetes, basado en regresión logística, podemos identificar ciertos factores que podrían inducir sesgo. Primero, los datos de entrenamiento podrían estar sesgados si no reflejan adecuadamente la diversidad de la población en términos de características como la edad, el género o la etnia. El conjunto de datos utilizado en este proyecto, conocido como PIMA Indians, proviene de una población específica (Indios Pima), lo que limita la generalización del modelo a otras poblaciones. Esta limitación puede generar un sesgo en las predicciones cuando el modelo se enfrenta a datos de personas que no pertenecen a este grupo, afectando su precisión al hacer predicciones en poblaciones distintas.

Otro aspecto relevante es el umbral de clasificación utilizado en el modelo de regresión logística. El umbral de decisión se fijó en 0.4 para incrementar la sensibilidad del modelo y detectar más casos positivos (es decir, identificar más personas con riesgo de diabetes). Esto implica que el modelo tiene una mayor propensión a clasificar a más individuos como "positivos" (en riesgo de diabetes), lo que puede generar un sesgo hacia una tasa más alta de falsos positivos. Este sesgo es intencional, ya que se prioriza la detección temprana de la enfermedad sobre evitar diagnósticos erróneos, lo cual es común en el ámbito médico, donde es preferible tratar de más personas que potencialmente están en riesgo que pasar por alto a aquellas que realmente lo están.

Modelo 2 – Predicción de Costos de Seguro Médico (Regresión Lineal)

En el caso del modelo de predicción de costos de seguro médico, que emplea regresión lineal, el sesgo podría originarse en las características que se usan para predecir los costos. Por ejemplo, la variable "smoker" (fumar) tiene un peso mucho mayor en el modelo, lo que implica que el modelo podría estar sobrerrepresentando la influencia de este factor en el costo del seguro. En la vida real, el comportamiento de fumar es un factor relevante, pero no es el único factor determinante. Sin embargo, en el modelo, un cambio en la variable "smoker" puede tener un impacto mucho más significativo que en otras características como la edad o el BMI (Índice de Masa Corporal). Este sesgo hacia el factor "smoker" puede llevar a predicciones en las que se sobrevaloran los costos de los fumadores y se subestiman los costos de otros grupos de riesgo, como los que tienen un BMI alto.

Además, el modelo de regresión lineal, por ser lineal, puede no ser el mejor para capturar las relaciones no lineales entre algunas variables y los costos del seguro. Por ejemplo, el impacto del BMI en el costo del seguro puede no ser lineal (un pequeño aumento en el BMI podría tener un impacto mayor en ciertos rangos que en otros), lo que sugiere que el modelo podría estar mostrando un sesgo de subajuste al no capturar completamente esta relación compleja.

Análisis del Sesgo en Ambos Modelos

En general, ambos modelos presentan sesgos inherentes debido a las siguientes razones:

Datos sesgados: Ambos modelos fueron entrenados con conjuntos de datos específicos que podrían no representar toda la población. En el caso de la diabetes, el conjunto de datos proviene de una población particular, lo que limita su aplicabilidad a otros grupos. En el caso del seguro médico, el modelo puede estar sesgado si no refleja adecuadamente la diversidad de situaciones médicas que pueden influir en los costos.

Umbral de decisión: El modelo de regresión logística para diabetes utiliza un umbral de 0.4, lo que aumenta la sensibilidad pero a costa de una tasa más alta de falsos positivos. Este sesgo puede ser deseado para asegurar que más personas en riesgo sean identificadas, pero también implica que el modelo puede clasificar erróneamente a muchas personas como diabéticas, especialmente cuando los datos de entrada no corresponden exactamente con los patrones de la población usada en el entrenamiento.

Elección del modelo: El modelo de regresión lineal para los costos del seguro médico podría estar mostrando un sesgo por no capturar adecuadamente las relaciones no lineales entre variables, como el impacto del BMI. Aunque la regresión lineal es fácil de interpretar, su simplicidad puede ser una limitación cuando las relaciones entre las características son complejas.

Impacto de las características: Ambos modelos tienen características que pueden estar sobrerrepresentadas o subrepresentadas. En el modelo de diabetes, la glucosa y el BMI tienen un peso crucial, lo cual es correcto desde el punto de vista clínico, pero también implica que el modelo podría no estar considerando otros factores relevantes, como la genética o los antecedentes familiares, que no están presentes en los datos. En el modelo de seguro, el factor "fumar" tiene un peso excesivo en comparación con otros factores.


EJEMPLO:

PERSONA SANA
<img width="818" height="871" alt="image" src="https://github.com/user-attachments/assets/49f99cea-bf83-4f0f-996e-49685cbb8047" />

PERSONA CON VALORES INTERMEDIOS
<img width="826" height="876" alt="image" src="https://github.com/user-attachments/assets/085cee89-a68f-40d1-bec2-8e3d3e73df7f" />

PERSONA CON VALORES ALTOS
<img width="827" height="874" alt="image" src="https://github.com/user-attachments/assets/775c48f7-71ba-4f67-9f4f-74d7dbfaeaae" />


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
<img width="839" height="738" alt="image" src="https://github.com/user-attachments/assets/d7dac75a-0a96-43c9-a5ca-0d181954f779" />


CASO 2: PERSONA JOVEN SI FUMADORA
<img width="829" height="736" alt="image" src="https://github.com/user-attachments/assets/8c2f62da-c370-4ae3-86d0-fa7baeaa4a6f" />


Evidencia práctia: En la aplicación, se observa que marcar la opción “Fumador: Sí” provoca un aumento desproporcionado del precio, incluso en usuarios jóvenes y saludables. Esto muestra el sesgo aprendido por el modelo: el fumar domina la predicción y puede eclipsar otros factores relevantes (como la edad o el BMI). Aunque el comportamiento es coherente con la realidad médica, el modelo no distingue matices (por ejemplo, exfumadores o fumadores ocasionales).


Conclusion: Ambos modelos presentan sesgos derivados de sus conjuntos de entrenamiento:

1.- El modelo de diabetes tiene un sesgo demográfico y clínico, pues fue entrenado con datos limitados a un grupo específico de mujeres.

2.- El modelo de seguro médico tiene un sesgo económico y conductual, ya que exagera el impacto del hábito de fumar sobre el costo total.

A pesar de esto, los modelos funcionan correctamente dentro del propósito educativo de la aplicación, mostrando cómo los algoritmos pueden aprender patrones reales pero también heredar las limitaciones y desigualdades de sus datos de origen.


