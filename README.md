# Desafio Luizalabs

Projeto de agendamento para envio de comunicação

## Description

O objetivo é o de prover 3 serviços (endpoints) relativos ao envio de comunicação
da empresa.
1. Agendamento de envio de comunicação;
2. Consulta do envio da comunicação;
3. Cancelamento do envio da comunicação

## Getting Started

### Dependencies


* [Docker](https://docs.docker.com/engine/install/)
* [Compose](https://docs.docker.com/compose/install/)

### Installing

1. Clone o repo
   ```sh
   git clone https://github.com/felipefrmelo/desafio-magalu.git
   ```
2. Build 
   ```sh
   docker-compose build
   ```


### Executing program

```sh
docker-compose up
```
Todos os comandos para rodar o programa e os testes estão no arquivo [Makefile](https://github.com/felipefrmelo/desafio-magalu/blob/main/Makefile)

Para testar no Postman basta importar a [collection](https://www.postman.com/collections/9b4b64de3bd504461c6a).


## License

This project is licensed under the [MIT] License - see the LICENSE file for details

