---
title: "Idempotencia"
---

La API ofrece soporte para la idempotencia para repetir solicitudes de forma segura sin ejecutar accidentalmente la misma operación dos veces. Esto es útil cuando una llamada de API se interrumpe en tránsito y no recibes una respuesta. Por ejemplo, si una solicitud para crear un cobro no responde debido a un error de conexión de red, podrás intentar nuevamente la solicitud con la misma clave de idempotencia para garantizar que no se cree más de un cobro.

Para ejecutar una solicitud idempotente, proporciona un encabezado adicional `X-Idempotency-Key: <key>` a la solicitud.

Ejemplo de Solicitud:

```bash
curl -i \
-H "Authorization: Bearer $KOBANA_TOKEN" \
-d '{"bank_billet":{"amount":12.34, "expire_at": "2021-11-15", "description": "Prestación de Servicio", "customer_person_name": "Nombre del Cliente", "customer_cnpj_cpf": "125.812.717-28", "customer_zipcode": "12312123", "customer_address": "Calle quinientos", "customer_city_name": "Río de Janeiro", "customer_state": "RJ", "customer_neighborhood": "barrio"}}' \
-H 'Content-Type: application/json' \
-H 'X-Idempotency-Key: 4wE7HVG5rW3R7Xg1' \
-H 'User-Agent: MyApp (myapp@example.com)' \
-X POST 'https://api-sandbox.kobana.com.br/v1/bank_billets'
```

La idempotencia de Kobana funciona guardando el código de estado resultante y el cuerpo de la primera solicitud realizada para cualquier clave de idempotencia, independientemente de si fue exitosa o falló. Las solicitudes posteriores con la misma clave retornan el mismo resultado, incluyendo errores `500`.

Una clave de idempotencia es un valor único generado por el cliente que el servidor utiliza para reconocer intentos posteriores de la misma solicitud. Cómo crees claves exclusivas depende de ti, pero te sugerimos usar `UUIDs V4` u otra cadena aleatoria con suficiente entropía para evitar colisiones.

Las claves de idempotencia pueden tener hasta 255 caracteres.

Las claves califican para ser removidas del sistema automáticamente después de haber estado en uso durante al menos 24 horas, y se generará una nueva solicitud si una clave se reutiliza después de la eliminación de la original. La capa de idempotencia compara los parámetros de entrada con los de la solicitud original y los errores, a menos que sean los mismos para evitar el uso indebido accidental.

Los resultados se guardan solo si un endpoint de API comienza a ejecutarse. Si los parámetros de entrada fallan en la validación o la solicitud entra en conflicto con otra que se ejecutaba simultáneamente, ningún resultado idempotente se guardará porque ningún endpoint de API inició la ejecución. Es seguro repetir estas solicitudes.

Todas las solicitudes `POST`, `PUT` y `PATCH` aceptan claves de idempotencia. El envío de claves de idempotencia en solicitudes `GET` y `DELETE` no tiene efecto y debe evitarse, ya que estas solicitudes son idempotentes por definición.
