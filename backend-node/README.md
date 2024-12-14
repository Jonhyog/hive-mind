
# API Description

Uma breve descrição sobre os métodos disponíveis na API.

## Documentação da API

#### Lista as colmeias

```http
  GET /hive
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `hiveId` | `string` | Filtro por identificador único da colmeia. |
| `location` | `string` |  Filtro por descrição do local da colmeia. |
| `description` | `string` | Filtro por descrição da colmeia. |

#### Cria uma colmeia

```http
  POST /hive
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `hiveId` | `string` | **Obrigatório.** Identificador único da colmeia |
| `location` | `string` |   **Obrigatório.** Descrição do local da colmeia. |
| `description` | `string` |  **Obrigatório.** Descrição da colmeia. |

#### Lista os sensores

```http
  GET /sensor
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `hiveId` | `string` | Filtro por identificador único da colmeia. |
| `metricType` | `string` |   Filtro por tipo de métrica (e.g.Temperatura). |

#### Cria um novo sensor

```http
  POST /sensor
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `hiveId` | `string` | **Obrigatório.** Identificador único da colmeia. |
| `sensorId` | `string` | **Obrigatório.** Identificador único do sensor. |
| `metric` | `string` |   **Obrigatório.** Tipo do sensor (e.g. Temperatura). |
| `description` | `string` |  **Obrigatório.** Descrição do sensor. |

#### Lista os dados para um tipo de métrica

```http
  GET /metrics/{metric}
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `hiveId` | `string` |  Filtro por identificador único da colmeia. |
| `sensorId` | `string` |  Filtro por identificador único do sensor. |
| `limit` | `string` | Filtro por númerode medições. |
| `startDate` | `ISO date` | Filtro por data inicial. |
| `endDate` | `ISO date` | Filtro por data final. |
| `timestamp` | `ISO date` | Filtro por timestamp. |
| `value` | `number` | Filtro por valores da medição. |

#### Adiciona uma nova medição para um tipo de métrica

```http
  POST /metrics/{metric}
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `hiveId` | `string` |  **Obrigatório.** Identificador único da colmeia. |
| `sensorId` | `string` |  **Obrigatório.** Identificador único do sensor. |
| `timestamp` | `ISO date` | **Obrigatório.** Timestamp da medida. |
| `value` | `number` | **Obrigatório.** Valor medido. |

#### Lista os vídeos processados

```http
  GET /videos
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` |  Filtro por identificador do vídeo. |

#### Cria um novo job de processamento de vídeo

```http
  POST /videos/upload
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `detector_type` | `string` |  **Obrigatório.** Algoritmo de Detecção que deve ser utilizado. |
| `videoFile` | `File` |  **Obrigatório.** Arquivo MP4 para análise. |

#### Recebe os resultados de um vídeo processado

```http
  POST /videos/callback
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `video_id` | `string` |  **Obrigatório.** Algoritmo de Detecção que deve ser utilizado. |
| `filename` | `string` |  **Obrigatório.** Nome do arquivo MP4 analisado. |
| `duration` | `number` |  **Obrigatório.** Duração do vídeo processado. |
| `resolution` | `string` |  **Obrigatório.** Resolução do vídeo processado. |
| `processing_time` | `Number` |  **Obrigatório.** Tempo de processamento em segundos. |
| `events` | `object[]` |  **Obrigatório.** Array de eventos de detecção. |
| `status` | `string` |  **Obrigatório.** Novo status do processo. |

