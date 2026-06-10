Creazione progetto NestJS
npm i -g @nestjs/cli
nest new backend-cards

👉 scegli npm

cd backend-cards
npm run start
🔧 2. Generazione controller
nest g controller cards

(opzionale ma consigliato)

nest g service cards
🔧 3. Abilitare CORS
📄 main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // 👈 fondamentale

  await app.listen(3000);
}
bootstrap();
🔧 4. Implementazione controller
📄 src/cards/cards.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('cards')
export class CardsController {

  private cards = [
    {
      id: 1,
      title: 'Card 1',
      description: 'Description 1',
      price: 10.99
    }
  ];

  private nextId = 2;

  @Get()
  getCards() {
    return this.cards;
  }

  @Post()
  createCard(@Body() body: any) {
    const newCard = {
      id: this.nextId++,
      title: body.title,
      description: body.description,
      price: body.price
    };

    this.cards.push(newCard);
    return newCard;
  }
}
🔧 5. Registrare il controller
📄 src/app.module.ts
import { Module } from '@nestjs/common';
import { CardsController } from './cards/cards.controller';

@Module({
  imports: [],
  controllers: [CardsController],
  providers: [],
})
export class AppModule {}
▶️ 6. Avvio server
npm run start

Test:

http://localhost:3000/cards
🌐 7. Frontend HTML
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Cards</title>
</head>
<body>

<h2>Aggiungi Card</h2>

<form id="form">
    <input type="text" id="title" placeholder="Titolo" required>
    <input type="text" id="description" placeholder="Descrizione" required>
    <input type="number" id="price" placeholder="Prezzo" required>
    <button type="submit">Salva</button>
</form>

<h2>Lista</h2>
<div id="container"></div>

<script>
const baseUrl = "http://localhost:3000";

function loadCards() {
    fetch(baseUrl + "/cards")
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("container");
            container.innerHTML = "";

            data.forEach(c => {
                const div = document.createElement("div");
                div.innerHTML = `
                    <h3>${c.title}</h3>
                    <p>${c.description}</p>
                    <strong>${c.price}</strong>
                    <hr>
                `;
                container.appendChild(div);
            });
        });
}

document.getElementById("form").addEventListener("submit", function(e) {
    e.preventDefault();

    const card = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: parseFloat(document.getElementById("price").value)
    };

    fetch(baseUrl + "/cards", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(card)
    })
    .then(res => res.json())
    .then(() => {
        loadCards();
        this.reset();
    });
});

loadCards();
</script>

</body>
</html>
🎯 Riassunto flusso
nest new → crea progetto
nest g controller cards → crea endpoint
GET /cards → lista
POST /cards → inserimento
fetch() → Promise frontend