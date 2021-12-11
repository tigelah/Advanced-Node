# Alterar Foto de Perfil

> ## Dados

* Id do Usuário
* Foto

> ## Fluxo primário

1. Gravar a foto recebida em um FileStorage
2. Enviar uma chave única para o FileStorage para evitar que sobrescreva alguma imagem que já existe
3. Atualizar os dados do usuário com a url da foto retirada pelo FileStorage
4. Limpar o campo de iniciais do nome do usuário
5. Retornar a url da foto e as iniciais do usuário


> ## Fluxo de exceção: Erro ao atualizar dados do usuário

1. Apagar a foto criada no FileStorage
2. Repassar o mesmo erro recebido
