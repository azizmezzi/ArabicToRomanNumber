/* eslint-disable no-unused-vars */
let clients = [];
const romainNumber = '';

/* eslint-disable no-bitwise */
const concatNumLetters = (letter, num) => {
  let text = '';
  for (let i = 0; i < num; i += 1) {
    text += letter;
  }
  return text;
};

// optimized function
const arabicToRomanNumber = (arabicNumber) => {
  let arabic = parseInt(arabicNumber, 10);
  let roman = '';
  if (arabic >= 1000) {
    // eslint-disable-next-line no-bitwise
    const thousands = ~~(arabic / 1000);
    roman = concatNumLetters('M', thousands);
    arabic -= thousands * 1000;
  }

  if (arabic >= 900) {
    roman += 'CM';
    arabic -= 900;
  }

  if (arabic >= 500) {
    roman += 'D';
    arabic -= 500;
  }

  if (arabic >= 400) {
    roman += 'CD';
    arabic -= 400;
  }

  if (arabic >= 100) {
    const hundreds = ~~(arabic / 100);
    roman += concatNumLetters('C', hundreds);
    arabic -= hundreds * 100;
  }

  if (arabic >= 90) {
    roman += 'XC';
    arabic -= 90;
  }

  if (arabic >= 50) {
    roman += 'L';
    arabic -= 50;
  }

  if (arabic >= 40) {
    roman += 'XL';
    arabic -= 40;
  }

  if (arabic >= 10) {
    const dozens = ~~(arabic / 10);
    roman += concatNumLetters('X', dozens);
    arabic -= dozens * 10;
  }

  if (arabic >= 9) {
    roman += 'IX';
    arabic -= 9;
  }

  if (arabic >= 5) {
    roman += 'V';
    arabic -= 5;
  }

  if (arabic >= 4) {
    roman += 'IV';
    arabic -= 4;
  }

  if (arabic >= 1) {
    roman += concatNumLetters('I', arabic);
  }

  return roman;
};

const sendRomainNumber = (romain) => {
  clients.forEach((client) => {
    client.response.write(`data: ${JSON.stringify(romain)}\n\n`);
  });
};

const GetRomainNumber = (request, response, next) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  };
  response.writeHead(200, headers);

  const data = `data: ${JSON.stringify(romainNumber)}\n\n`;

  response.write(data);

  const clientId = Date.now();

  const newClient = {
    id: clientId,
    response,
  };

  clients.push(newClient);

  request.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((client) => client.id !== clientId);
  });
};

const ConvertNumber = async (request, respsonse, next) => {
  const {
    body: { number },
  } = request;
  const romain = arabicToRomanNumber(number);

  respsonse.json(romain);
  return sendRomainNumber(romain);
};

const status = (request, response) => {
  response.send({ clients: clients.length });
};

const controller = {
  ConvertNumber,
  GetRomainNumber,
  status,
};

module.exports = controller;
